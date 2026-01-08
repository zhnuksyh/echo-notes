import React, { useState } from 'react';
import { Waypoints, Plus, Search, Trash2, Keyboard } from 'lucide-react';
import ShortcutsModal from './ShortcutsModal';

/**
 * Sidebar Component
 * Displays the list of notes and search functionality.
 */
const Sidebar = ({
    isSidebarOpen,
    handleCreateNote,
    searchQuery,
    setSearchQuery,
    filteredNotes,
    activeNoteId,
    setActiveNoteId,
    setIsSidebarOpen,
    handleDeleteNote,
    formatDate
}) => {
    const [showShortcuts, setShowShortcuts] = useState(false);

    return (
        <>
            <div className={`
        fixed inset-y-0 left-0 z-20 bg-neutral-900 border-r border-neutral-800 transition-transform duration-300 ease-in-out flex flex-col w-[85vw] max-w-xs md:w-80
        ${isSidebarOpen
                    ? 'translate-x-0'
                    : '-translate-x-full'}
      `}>
                {/* Sidebar Header */}
                <div className="p-4 border-b border-neutral-800 min-w-[20rem]"> {/* min-w prevents text squashing during collapse */}
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-xl font-bold text-white flex items-center gap-2">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                                <Waypoints className="text-black" size={18} />
                            </div>
                            Echo
                        </h1>
                        <button
                            onClick={handleCreateNote}
                            className="p-2 bg-neutral-800 text-neutral-300 border border-neutral-700 rounded-lg hover:bg-neutral-700 transition-colors"
                            title="New Echo"
                        >
                            <Plus size={20} />
                        </button>
                    </div>

                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={16} />
                        <input
                            type="text"
                            placeholder="Search echoes..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-neutral-200 placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-neutral-500 transition-all"
                        />
                    </div>
                </div>

                {/* Note List Scroll Area */}
                <div className="flex-1 overflow-y-auto w-full"> {/* w-full ensures content stays wide during transitions */}
                    {filteredNotes.length === 0 ? (
                        <div className="p-8 text-center text-neutral-600 text-sm min-w-[20rem]">
                            {searchQuery ? 'No echoes found.' : 'No echoes yet.'}
                        </div>
                    ) : (
                        filteredNotes.map((note, index) => {
                            const tempDiv = document.createElement('div');
                            tempDiv.innerHTML = note.content;
                            const previewText = tempDiv.textContent || tempDiv.innerText || "No additional text";

                            return (
                                <div
                                    key={note.id}
                                    onClick={() => {
                                        setActiveNoteId(note.id);
                                        setIsSidebarOpen(false);
                                    }}
                                    className={`
                      group relative p-3 mx-2 rounded-lg cursor-pointer transition-all hover:bg-neutral-800/50 mb-1 animate-fade-in
                      ${activeNoteId === note.id ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-neutral-200'}
                    `}
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                >
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-medium truncate flex-1 pr-2">
                                            {note.title || 'Untitled'}
                                        </h3>
                                        {/* DELETE BUTTON */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteNote(e, note.id);
                                            }}
                                            className={`
                          p-1.5 text-neutral-500 hover:text-red-400 hover:bg-red-900/20 rounded opacity-0 group-hover:opacity-100 transition-all
                          ${activeNoteId === note.id ? 'opacity-100' : ''}
                        `}
                                            title="Delete Echo"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                    <p className="text-xs text-neutral-500 truncate mt-1">
                                        {previewText}
                                    </p>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Sidebar Footer */}
                <div className="p-4 border-t border-neutral-800 min-w-[20rem]">
                    <button
                        onClick={() => setShowShortcuts(true)}
                        className="flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-300 transition-colors w-full p-2 rounded-lg hover:bg-neutral-800"
                    >
                        <Keyboard size={16} />
                        <span>Keyboard Shortcuts</span>
                    </button>
                </div>
            </div>

            <ShortcutsModal isOpen={showShortcuts} onClose={() => setShowShortcuts(false)} />
        </>
    );
};

export default Sidebar;
