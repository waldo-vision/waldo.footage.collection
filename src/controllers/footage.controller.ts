import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import ytdl from 'ytdl-core';
import * as fs from 'fs';
import { Footage, FootageInput } from '../models/footage.interface';
import { Types } from 'mongoose';
const createFootage = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  const { id, username, url } = req.body;

  if (!id || !username || !url) {
    return res
      .status(422)
      .json({ message: 'The fields id, username, and URL are required' });
  }

  // checks if the id is a mongodb ObjectID type, otherwise the console spits out an error and won't let you send anymore requests.

  if (typeof username !== 'string') {
    return res
      .status(404)
      .json({ message: 'The username field must be a string.' });
  }
  if (typeof url !== 'string') {
    return res.status(404).json({ message: 'The url field must be a string.' });
  }

  const footageId = uuidv4();
  const footageInput: FootageInput = {
    id: footageId,
    discordId: id,
    username,
    youtubeUrl: url,
    isCsgoFootage: false,
    isAnalyzed: false,
  };

  try {
    // Validate that the URL contains a video that can be downloaded.
    await ytdl.getInfo(url);
    // Download video and save as a local MP4 to be used for processing.
    await ytdl(url).pipe(fs.createWriteStream(`${footageId}.mp4`));

    // TODO: Implement functionality to trigger python kill shot parsing script.
    // https://www.tutorialspoint.com/run-python-script-from-node-js-using-child-process-spawn-method
    // https://github.com/waldo-vision/aimbot-detection-prototype/blob/main/auto_clip.py
    // If we get resulting clips, then isCsgoFootage should be true.

    // TODO: Implement functionality to trigger logic to shrink video capture width & height.
    // It would be best to do this logic directly within Python script when saving the clip files.
    // Otherwise cropping could be achieved by using FFMPEG or something along those lines.

    // TODO: Submit clips with unique IDs and association to footage ID (API to set DB & FS to create clip file).
    // Each clip should be submitted to the database as a ClipInput.
    // Each clip should be stored to a location on the local server where it can be obtained by the Analysis team.

    const footageCreated = await Footage.create(footageInput);

    return res.status(201).json({ data: footageInput });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(404).json({ message: error.message });
    }

    return res
      .status(404)
      .json({ message: 'Something went wrong parsing video from URL' });
  }
};

const getAllFootage = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  const footage = await Footage.find().sort('-createdAt').exec();

  return res.status(200).json({ data: footage });
};

const getFootage = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  const { id } = req.params;

  // checks if the id is a mongodb ObjectID type, otherwise the console spits out an error and won't let you send anymore requests.
  const ObjectID = Types.ObjectId;
  const isValidId: boolean = ObjectID.isValid(id);
  if (isValidId === false) {
    return res
      .status(404)
      .json({ message: `Id: ${id} is not a valid ObjectId Type.` });
  }

  const footage = await Footage.findOne({ _id: id });

  if (!footage) {
    return res
      .status(404)
      .json({ message: `Footage with id "${id}" not found.` });
  }

  return res.status(200).json({ data: footage });
};

// TODO: Implement getUserFootage endpoint to get all footage based on user ID.
const getUserFootage = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  const { id } = req.params;

  const filter = { discordId: id };
  const userFootage = await Footage.find(filter);

  if (userFootage.length === 0) {
    return res
      .status(200)
      .json({ message: 'User has no footage.', data: userFootage });
  }

  return res.status(200).json({ data: userFootage });
};

// TODO: Implement getFootageClips endpoint to get all associated clips based on footage ID.
// const getFootageClips = async (req: Request, res: Response) => {
//
// };

// TODO: Implement updateFootage endpoint to update after parsing & analysis.
// const updateFootage = async (req: Request, res: Response) => {
//
// };

const deleteFootage = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  const { id } = req.params;

  const ObjectID = Types.ObjectId;
  const isValidId: boolean = ObjectID.isValid(id);
  if (isValidId === false) {
    return res
      .status(404)
      .json({ message: `Id: ${id} is not a valid ObjectId Type.` });
  }

  await Footage.findByIdAndDelete(id);

  return res.status(200).json({ message: 'Footage deleted successfully.' });
};

export {
  createFootage,
  deleteFootage,
  getAllFootage,
  getFootage,
  getUserFootage,
};
