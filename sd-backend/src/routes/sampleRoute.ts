import { Router } from 'express';
import { getSample } from '../controllers/sampleController';

const router = Router();

router.get('/sample', getSample);

export default router;
