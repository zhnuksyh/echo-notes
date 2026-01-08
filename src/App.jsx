import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, PanelLeft } from 'lucide-react';
import Sidebar from './components/layout/Sidebar';
import EmptyState from './components/layout/EmptyState';
import EditorToolbar from './components/editor/EditorToolbar';
import { useEditor } from './components/editor/useEditor';
import CommandMenu from './components/editor/CommandMenu';

// --- Main App Logic ---

export default function App() {
    // --- State Management ---

    // Notes State: Initialized from localStorage if available, otherwise uses default data
    const [notes, setNotes] = useState(() => {
        const saved = localStorage.getItem('simple-notes-app-html-v2');
        if (saved) {
            return JSON.parse(saved);
        }
        return [
            {
                id: '1',
                title: 'Welcome to Echo',
                // Default content demonstrating HTML structure
                content: `<h1>Welcome to Echo</h1><div class="callout">💡 <b>Tip:</b> This is a Notion-style callout block.</div><p>This is a simple, lightweight echo app with a dark theme.</p><h2>Features</h2><ul><li><font color="#3b82f6">Colored text support</font></li><li><details><summary>Toggle Lists (Click me)</summary><p style="margin-top: 0.5em; padding-left: 1em; color: #9ca3af;">Hidden content revealed!</p></details></li><li><b>Bold</b>, <i>Italic</i>, and <code>Code</code> styling</li></ul><div class="callout">👋 Supports Images too!</div><hr/><p>Start typing to see the magic.</p>`,
                updatedAt: Date.now()
            }
        ];
    });

    const [activeNoteId, setActiveNoteId] = useState(null); // ID of currently open note
    const [searchQuery, setSearchQuery] = useState(''); // Search filter text
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Toggles sidebar visibility (Desktop & Mobile)

    // Slash Command Menu State
    const [commandMenu, setCommandMenu] = useState({
        isOpen: false,
        position: { x: 0, y: 0 },
        filter: ''
    });

    const editorRef = useRef(null); // Reference to the ContentEditable div

    // Use the custom editor hook
    const { handleFormat } = useEditor(editorRef);

    // --- Effects ---

    // Auto-save: Whenever 'notes' state changes, save to localStorage
    useEffect(() => {
        localStorage.setItem('simple-notes-app-html-v2', JSON.stringify(notes));
    }, [notes]);

    // Sync Editor: When switching notes, update the ContentEditable div's innerHTML.
    useEffect(() => {
        if (activeNoteId && editorRef.current) {
            const note = notes.find(n => n.id === activeNoteId);
            // Only update if content is different to prevent cursor jumping or loops
            if (note && editorRef.current.innerHTML !== note.content) {
                editorRef.current.innerHTML = note.content;
            }
        }
    }, [activeNoteId]);

    // --- Derived Data ---

    const activeNote = notes.find(n => n.id === activeNoteId);

    // Filter notes based on search query (searching both title and content)
    const filteredNotes = notes
        .filter(n => {
            // Create temp element to strip HTML tags for text-only search
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = n.content;
            const textContent = tempDiv.textContent || tempDiv.innerText || "";
            return n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                textContent.toLowerCase().includes(searchQuery.toLowerCase());
        })
        .sort((a, b) => b.updatedAt - a.updatedAt); // Sort by newest first

    // --- Event Handlers ---

    // Helper to get cursor coordinates for the menu
    const getCaretCoordinates = () => {
        let x = 0, y = 0;
        const selection = window.getSelection();
        if (selection.rangeCount) {
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();
            // Fallback for empty lines
            if (rect.height === 0 && rect.width === 0) {
                const parentRect = range.startContainer.parentElement?.getBoundingClientRect();
                if (parentRect) {
                    x = parentRect.left;
                    y = parentRect.top;
                }
            } else {
                x = rect.left;
                y = rect.top;
            }
        }
        return { x, y };
    };

    const closeMenu = () => setCommandMenu(prev => ({ ...prev, isOpen: false, filter: '' }));

    const handleCreateNote = () => {
        const newNote = {
            id: Date.now().toString(),
            title: '',
            content: '', // Empty content to show placeholder
            updatedAt: Date.now()
        };
        setNotes([newNote, ...notes]);
        setActiveNoteId(newNote.id);
        if (window.innerWidth < 768) {
            setIsSidebarOpen(false);
        }
    };

    const handleUpdateNote = (key, value) => {
        const updatedNotes = notes.map(note => {
            if (note.id === activeNoteId) {
                return { ...note, [key]: value, updatedAt: Date.now() };
            }
            return note;
        });
        setNotes(updatedNotes);
    };

    // Handle Keyboard Navigation for Menu
    const handleKeyDown = (e) => {
        if (commandMenu.isOpen) {
            if (['ArrowUp', 'ArrowDown', 'Enter', 'Escape'].includes(e.key)) {
                // Let the CommandMenu component listen to these via document events,
                // but prevent default here to stop editor cursor movement.
                // Actually, our CommandMenu uses document listener, so we just need to prevent default behavior in editor.
                if (e.key === 'Enter') e.preventDefault();
                if (e.key === 'ArrowUp') e.preventDefault();
                if (e.key === 'ArrowDown') e.preventDefault();
                if (e.key === 'Escape') {
                    e.preventDefault();
                    closeMenu();
                }
                return;
            }
        }

        if (e.key === '/') {
            const coords = getCaretCoordinates();
            setCommandMenu({
                isOpen: true,
                position: coords,
                filter: ''
            });
        }
    };

    const handleContentInput = (e) => {
        const content = e.currentTarget.innerHTML;
        const noteIndex = notes.findIndex(n => n.id === activeNoteId);
        if (noteIndex > -1) {
            const newNotes = [...notes];
            newNotes[noteIndex] = { ...newNotes[noteIndex], content, updatedAt: Date.now() };
            setNotes(newNotes);
        }

        // Handle Slash Command Filtering
        if (commandMenu.isOpen) {
            const selection = window.getSelection();
            if (selection.rangeCount) {
                const range = selection.getRangeAt(0);
                const textNode = range.startContainer;

                if (textNode.nodeType === Node.TEXT_NODE) {
                    const text = textNode.textContent;
                    const caretPos = range.startOffset;
                    const lastSlash = text.lastIndexOf('/', caretPos - 1);

                    if (lastSlash !== -1) {
                        const filterText = text.substring(lastSlash + 1, caretPos);
                        if (filterText.includes(' ')) {
                            closeMenu();
                        } else {
                            setCommandMenu(prev => ({ ...prev, filter: filterText }));
                        }
                    } else {
                        closeMenu();
                    }
                } else {
                    closeMenu();
                }
            }
        }
    };

    const handleCommandSelect = (command) => {
        // Remove the slash + filter text before applying command
        const selection = window.getSelection();
        if (selection.rangeCount) {
            const range = selection.getRangeAt(0);
            const textNode = range.startContainer;
            if (textNode.nodeType === Node.TEXT_NODE) {
                const text = textNode.textContent;
                const caretPos = range.startOffset;
                const lastSlash = text.lastIndexOf('/', caretPos - 1);
                if (lastSlash !== -1) {
                    // Delete the slash command text
                    range.setStart(textNode, lastSlash);
                    range.setEnd(textNode, caretPos);
                    range.deleteContents();
                }
            }
        }

        handleFormat(command);
        closeMenu();
    };

    const handleDeleteNote = (e, id) => {
        if (e) e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this echo?')) {
            const newNotes = notes.filter(n => n.id !== id);
            setNotes(newNotes);
            if (activeNoteId === id) {
                setActiveNoteId(null);
                if (window.innerWidth < 768) setIsSidebarOpen(true);
            }
        }
    };

    const formatDate = (timestamp) => {
        return new Date(timestamp).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="flex h-screen w-full bg-black font-poppins text-neutral-100 overflow-hidden">

            <Sidebar
                isSidebarOpen={isSidebarOpen}
                handleCreateNote={handleCreateNote}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                filteredNotes={filteredNotes}
                activeNoteId={activeNoteId}
                setActiveNoteId={setActiveNoteId}
                setIsSidebarOpen={setIsSidebarOpen}
                handleDeleteNote={handleDeleteNote}
                formatDate={formatDate}
            />

            {/* --- Main Editor Area --- */}
            <div className="flex-1 flex flex-col bg-black h-full relative transition-all duration-300">

                {/* Editor View */}
                {activeNote ? (
                    <div className="flex-1 flex flex-col h-full animate-fade-in relative">

                        {/* Top Bar: Toggle & Breadcrumbs/Meta */}
                        <div className="flex items-center gap-3 px-6 py-4 border-b border-neutral-900">
                            <button
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                className="p-2 text-neutral-500 hover:bg-neutral-800 rounded-lg hover:text-white transition-colors"
                                title={isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
                            >
                                {isSidebarOpen ? <ChevronLeft size={20} /> : <PanelLeft size={20} />}
                            </button>
                            <span className="text-xs text-neutral-600">
                                Last edited {formatDate(activeNote.updatedAt)}
                            </span>
                        </div>

                        {/* Note Title Input */}
                        <div className="px-10 pt-8 pb-4">
                            <input
                                type="text"
                                value={activeNote.title}
                                onChange={(e) => handleUpdateNote('title', e.target.value)}
                                placeholder="Untitled Echo"
                                className="w-full text-4xl font-bold text-white placeholder-neutral-700 border-none focus:outline-none focus:ring-0 bg-transparent"
                            />
                        </div>

                        {/* Toolbar Component */}
                        <EditorToolbar onFormat={handleFormat} />

                        {/* ContentEditable Editor */}
                        <div className="relative flex-1 w-full max-w-none">
                            <div
                                ref={editorRef}
                                contentEditable
                                onInput={handleContentInput}
                                onKeyDown={handleKeyDown}
                                placeholder="Type '/' for commands..."
                                className="w-full h-full px-12 py-6 focus:outline-none text-neutral-300 leading-relaxed text-lg prose prose-invert prose-lg max-w-none overflow-y-auto"
                                style={{ minHeight: '200px' }}
                            />
                            {commandMenu.isOpen && (
                                <CommandMenu
                                    position={commandMenu.position}
                                    filter={commandMenu.filter}
                                    onSelect={handleCommandSelect}
                                    onClose={closeMenu}
                                />
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="h-full flex flex-col">
                        {/* Show Toggle even in Empty State so user can open sidebar if they closed it */}
                        {!isSidebarOpen && (
                            <div className="p-4">
                                <button
                                    onClick={() => setIsSidebarOpen(true)}
                                    className="p-2 text-neutral-400 hover:bg-neutral-800 rounded-lg"
                                >
                                    <PanelLeft size={24} />
                                </button>
                            </div>
                        )}
                        <EmptyState onCreate={handleCreateNote} />
                    </div>
                )}
            </div>
        </div>
    );
}