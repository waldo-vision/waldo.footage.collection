import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Clip } from '../models/clip.interface';

/**
 * POST /clip/:footage
 * @summary Endpoint to create new clip based on provided Footage UUID.
 * @param {string} footage.params.required - The associated Footage UUID.
 * @return {ClipDocument} 200 - Success response returns created Clip document.
 * @return 422 - The Footage UUID is missing from the request.
 */
const createClip = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  const { footage } = req.params;
  const uniqueId = uuidv4();

  if (!footage) {
    return res.status(422).json({ message: 'The field footage is required' });
  }

  // TODO: Implement logic to store clips to storage directory named after the Footage ID.

  const clipCreated = await Clip.create({
    id: uniqueId,
    footage,
  });

  return res.status(201).json({ data: clipCreated });
};

/**
 * GET /clip
 * @summary Endpoint to get all available Clip documents.
 * @return {array<ClipDocument>} 200 - Success response returns an array of Clip documents.
 */
const getAllClips = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  const clips = await Clip.find().sort('-createdAt').exec();

  return res.status(200).json({ data: clips });
};

/**
 * GET /clip/:uuid
 * @summary Endpoint to get a specific Clip document.
 * @return {ClipDocument} 200 - Success response returns Clip document.
 * @return 404 - Clip document with UUID not found.
 */
const getClip = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  const { uuid } = req.params;
  const clipDocument = await Clip.findOne({ uuid: uuid });

  if (!clipDocument) {
    return res
      .status(404)
      .json({ message: `Clip with uuid "${uuid}" not found.` });
  }

  return res.status(200).json({ data: clipDocument });
};

/**
 * DELETE /clip/:uuid
 * @summary Endpoint to delete a specific Clip document.
 * @return 200 - Successfully deleted Clip document based on UUID.
 * @return 404 - Clip UUID not found.
 */
const deleteClip = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  const { uuid } = req.params;
  const deleteResult = await Clip.deleteOne({ uuid: uuid });

  if (deleteResult.deletedCount === 0) {
    return res.status(404).send(`Footage with id "${uuid}" not found.`);
  }

  return res.status(200).json({ message: 'Clip deleted successfully.' });
};

export { createClip, deleteClip, getAllClips, getClip };
