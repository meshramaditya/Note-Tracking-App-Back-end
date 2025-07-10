"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.createNote = exports.getNotes = void 0;
const Note_1 = __importDefault(require("../models/Note"));
const getNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const notes = yield Note_1.default.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.json(notes);
});
exports.getNotes = getNotes;
const createNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { content } = req.body;
    const note = yield Note_1.default.create({ content, userId: req.user.userId });
    res.status(201).json(note);
});
exports.createNote = createNote;
const deleteNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deleted = yield Note_1.default.findOneAndDelete({ _id: id, userId: req.user.userId });
    if (!deleted) {
        return res.status(404).json({ message: 'Note not found ❌' });
    }
    res.json({ message: 'Note deleted ✅' });
});
exports.deleteNote = deleteNote;
