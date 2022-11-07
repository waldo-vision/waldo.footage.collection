import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Clip, ClipInput } from '../models/clip.interface';

const createClip = async (req: Request, res: Response) => {
  const { footage } = req.body;
  const uniqueId = uuidv4();

  if (!footage) {
    return res.status(422).json({ message: 'The field footage is required' });
  }

  const clipInput: ClipInput = {
    id: uniqueId,
    footage,
  };

  const clipCreated = await Clip.create(clipInput);

  return res.status(201).json({ data: clipCreated });
};

const getAllClips = async (req: Request, res: Response) => {
  const clips = await Clip.find().sort('-createdAt').exec();

  return res.status(200).json({ data: clips });
};

const getClip = async (req: Request, res: Response) => {
  const { id } = req.params;

  const clip = await Clip.findOne({ _id: id });

  if (!clip) {
    return res.status(404).json({ message: `Clip with id "${id}" not found.` });
  }

  return res.status(200).json({ data: clip });
};

const deleteClip = async (req: Request, res: Response) => {
  const { id } = req.params;

  await Clip.findByIdAndDelete(id);

  return res.status(200).json({ message: 'Clip deleted successfully.' });
};

export { createClip, deleteClip, getAllClips, getClip };
