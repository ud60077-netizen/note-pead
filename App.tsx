
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Note } from './types';
import NoteList from './components/NoteList';
import NoteEditor from './components/NoteEditor';
import { NOTE_COLORS } from './constants';

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const storedNotes = localStorage.getItem('notes-app');
      if (storedNotes) {
        setNotes(JSON.parse(storedNotes));
      }
    } catch (error) {
      console.error("Failed to parse notes from localStorage", error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('notes-app', JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = useCallback(() => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: 'New Note',
      content: '',
      color: NOTE_COLORS[0],
      lastModified: Date.now(),
    };
    setNotes(prevNotes => [newNote, ...prevNotes]);
    setActiveNoteId(newNote.id);
  }, []);

  const handleUpdateNote = useCallback((updatedNote: Partial<Note> & { id: string }) => {
    setNotes(prevNotes => {
      return prevNotes.map(note =>
        note.id === updatedNote.id
          ? { ...note, ...updatedNote, lastModified: Date.now() }
          : note
      );
    });
  }, []);
  
  const handleDeleteNote = useCallback((id: string) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
    if (activeNoteId === id) {
      setActiveNoteId(null);
    }
  }, [activeNoteId]);

  const sortedNotes = useMemo(() => {
    return [...notes].sort((a, b) => b.lastModified - a.lastModified);
  }, [notes]);

  const activeNote = useMemo(() => {
    return notes.find(note => note.id === activeNoteId);
  }, [notes, activeNoteId]);

  return (
    <div className="flex h-screen bg-slate-900 text-white font-sans">
      <NoteList
        notes={sortedNotes}
        activeNoteId={activeNoteId}
        onSelectNote={setActiveNoteId}
        onAddNote={handleAddNote}
        onDeleteNote={handleDeleteNote}
      />
      <main className="flex-1 flex flex-col">
        {activeNote ? (
          <NoteEditor
            key={activeNote.id}
            note={activeNote}
            onUpdateNote={handleUpdateNote}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-slate-500 p-8 text-center">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-24 h-24 mb-4 text-slate-700">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            <h2 className="text-2xl font-bold">Select a note to get started</h2>
            <p className="mt-2">Or create a new one to jot down your thoughts!</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
