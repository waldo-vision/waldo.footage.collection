import { Router } from 'express';
import {
  createFootage,
  deleteFootage,
  getAllFootage,
  getFootage,
  getUserFootage,
} from '../controllers/footage.controller';

const footageRoute = (): Router => {
  const router = Router();

  router.post('/', createFootage);

  router.get('/', getAllFootage);

  router.get('/:id', getFootage);

  router.get('/user/:id', getUserFootage);

  // router.get('/clips/:id', getFootageClips);

  // router.patch('/:id', updateFootage);

  router.delete('/:id', deleteFootage);

  return router;
};

export { footageRoute };
