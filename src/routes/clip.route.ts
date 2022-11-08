import { Router } from 'express';
import {
  createClip,
  deleteClip,
  getAllClips,
  getClip,
} from '../controllers/clip.controller';

const clipRoute = (): Router => {
  const router = Router();

  router.post('/', createClip);

  router.get('/', getAllClips);

  router.get('/:uuid', getClip);

  // router.patch('/clip/:id', updateClip);

  router.delete('/:uuid', deleteClip);

  return router;
};

export { clipRoute };
