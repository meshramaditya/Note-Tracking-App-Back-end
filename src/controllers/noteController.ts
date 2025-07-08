import { Request, Response } from 'express';
import Note from '../models/Note';
import { AuthRequest } from '../middleware/authMiddleware';
import { RequestHandler } from 'express';

export const getNotes = async (req: AuthRequest, res: Response) => {
  const notes = await Note.find({ userId: req.user!.userId }).sort({ createdAt: -1 });
  res.json(notes);
};


export const createNote = async (req: AuthRequest, res: Response) => {
  const { content } = req.body;
  const note = await Note.create({ content, userId: req.user!.userId });
  res.status(201).json(note);
};


export const deleteNote = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const deleted = await Note.findOneAndDelete({ _id: id, userId: req.user!.userId });

  if (!deleted) {
    return res.status(404).json({ message: 'Note not found ❌' });
  }

  res.json({ message: 'Note deleted ✅' });
};