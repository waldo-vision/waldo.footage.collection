import { Router } from 'express';
import {
  createFootage,
  deleteFootage,
  getAllFootage,
  getUserFootage,
  getFootage,
  getFootageClips,
} from '../controllers/footage.controller';

const footageRoute = (): Router => {
  const router = Router();

  router.post('/:footage', createFootage);

  router.get('/', getAllFootage);

  router.get('/:uuid', getFootage);

  router.get('/user/:id', getUserFootage);

  router.get('/clips/:uuid', getFootageClips);

  // router.patch('/:id', updateFootage);

  router.delete('/:uuid', deleteFootage);

  return router;
};

export { footageRoute };
