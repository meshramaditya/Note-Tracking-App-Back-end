import { Response } from 'express';
import Note from '../models/Note';
import { AuthRequest } from '../middleware/authMiddleware';

// ✅ Get all notes for authenticated user
export const getNotes = async (req: AuthRequest, res: Response) => {
  try {
    const notes = await Note.find({ userId: req.user!.userId }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    console.error('Get Notes Error:', err);
    res.status(500).json({ message: 'Failed to load notes ❌' });
  }
};

// ✅ Create new note
export const createNote = async (req: AuthRequest, res: Response) => {
  const { content } = req.body;
  if (!content) {
    return res.status(400).json({ message: 'Note content is required ❌' });
  }

  try {
    const note = await Note.create({ content, userId: req.user!.userId });
    res.status(201).json(note);
  } catch (err) {
    console.error('Create Note Error:', err);
    res.status(500).json({ message: 'Failed to create note ❌' });
  }
};

// ✅ Delete note by ID
export const deleteNote = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  try {
    const deleted = await Note.findOneAndDelete({ _id: id, userId: req.user!.userId });

    if (!deleted) {
      return res.status(404).json({ message: 'Note not found ❌' });
    }

    res.json({ message: 'Note deleted ✅' });
  } catch (err) {
    console.error('Delete Note Error:', err);
    res.status(500).json({ message: 'Failed to delete note ❌' });
  }
};
