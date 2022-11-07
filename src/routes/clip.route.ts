import { Router } from 'express';
import { createClip, deleteClip, getAllClips, getClip } from '../controllers/clip.controller';

const clipRoute = () => {
  const router = Router();

  router.post('/', createClip);

  router.get('/', getAllClips);

  router.get('/:id', getClip);

  // router.patch('/clip/:id', updateClip);

  router.delete('/:id', deleteClip);

  return router;
};

export { clipRoute };
