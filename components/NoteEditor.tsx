
import React, { useState, useEffect } from 'react';
import { Note } from '../types';
import ColorPicker from './ColorPicker';

interface NoteEditorProps {
  note: Note;
  onUpdateNote: (updatedNote: Partial<Note> & { id: string }) => void;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ note, onUpdateNote }) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [color, setColor] = useState(note.color);

  useEffect(() => {
    setTitle(note.title);
    setContent(note.content);
    setColor(note.color);
  }, [note]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    onUpdateNote({ id: note.id, title: e.target.value });
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    onUpdateNote({ id: note.id, content: e.target.value });
  };

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    onUpdateNote({ id: note.id, color: newColor });
  };

  return (
    <div className="flex-1 flex flex-col p-4 sm:p-6 md:p-8 bg-slate-900 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <div className={`w-3 h-3 rounded-full ${color}`}></div>
        <ColorPicker selectedColor={color} onColorChange={handleColorChange} />
      </div>

      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        placeholder="Note Title"
        className="bg-transparent text-4xl font-bold focus:outline-none mb-4"
      />
      <textarea
        value={content}
        onChange={handleContentChange}
        placeholder="Start writing..."
        className="bg-transparent flex-1 text-lg text-slate-300 focus:outline-none resize-none leading-relaxed"
      />
    </div>
  );
};

export default NoteEditor;
