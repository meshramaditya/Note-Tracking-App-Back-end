import express from 'express';
import { getNotes, createNote, deleteNote } from '../controllers/noteController';
import verifyToken from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', verifyToken as express.RequestHandler, getNotes);
router.post('/', verifyToken as express.RequestHandler, createNote as express.RequestHandler);
router.delete('/:id', verifyToken as express.RequestHandler, deleteNote as express.RequestHandler);

export default router;
