
import React from 'react';
import { Note } from '../types';
import IconButton from './IconButton';

interface NoteListProps {
  notes: Note[];
  activeNoteId: string | null;
  onSelectNote: (id: string) => void;
  onAddNote: () => void;
  onDeleteNote: (id: string) => void;
}

const NoteList: React.FC<NoteListProps> = ({
  notes,
  activeNoteId,
  onSelectNote,
  onAddNote,
  onDeleteNote,
}) => {
  const handleDeleteClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    onDeleteNote(id);
  };

  return (
    <aside className="w-64 md:w-80 bg-slate-800/50 border-r border-slate-700 flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        <h1 className="text-xl font-bold tracking-wider">Note Ped</h1>
        <IconButton onClick={onAddNote} ariaLabel="Add new note">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </IconButton>
      </div>
      <div className="flex-1 overflow-y-auto">
        {notes.length > 0 ? (
          <ul>
            {notes.map(note => (
              <li key={note.id}>
                <button
                  onClick={() => onSelectNote(note.id)}
                  className={`w-full text-left p-4 border-l-4 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                    activeNoteId === note.id
                      ? `${note.color.replace('bg-', 'border-')} bg-slate-700/50`
                      : `border-transparent hover:bg-slate-700/30`
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold truncate flex-1 pr-2">{note.title}</h3>
                    <IconButton
                      onClick={(e) => handleDeleteClick(e, note.id)}
                      className="text-slate-500 hover:text-rose-500 opacity-50 hover:opacity-100"
                      ariaLabel="Delete note"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </IconButton>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    {new Date(note.lastModified).toLocaleDateString("en-US", {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-4 text-center text-slate-500">
            <p>No notes yet. Create one!</p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default NoteList;
