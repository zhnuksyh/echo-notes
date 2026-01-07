import React, { useState, useEffect } from 'react';
import {
    Type, Heading1, Heading2, Heading3,
    List, ListOrdered, CheckSquare, ChevronRight,
    Quote, MessageSquare, TerminalSquare, Minus
} from 'lucide-react';

const MENU_ITEMS = [
    { id: 'p', label: 'Text', icon: Type, description: 'Just start writing with plain text.' },
    { id: 'h1', label: 'Heading 1', icon: Heading1, description: 'Big section heading.' },
    { id: 'h2', label: 'Heading 2', icon: Heading2, description: 'Medium section heading.' },
    { id: 'h3', label: 'Heading 3', icon: Heading3, description: 'Small section heading.' },
    { id: 'ul', label: 'Bullet List', icon: List, description: 'Create a simple bulleted list.' },
    { id: 'ol', label: 'Numbered List', icon: ListOrdered, description: 'Create a list with numbering.' },
    { id: 'checkbox', label: 'To-do List', icon: CheckSquare, description: 'Track tasks with a to-do list.' },
    { id: 'toggle', label: 'Toggle List', icon: ChevronRight, description: 'Toggles can hide and show content.' },
    { id: 'quote', label: 'Quote', icon: Quote, description: 'Capture a quote.' },
    { id: 'callout', label: 'Callout', icon: MessageSquare, description: 'Make writing stand out.' },
    { id: 'pre', label: 'Code', icon: TerminalSquare, description: 'Capture a code snippet.' },
    { id: 'hr', label: 'Divider', icon: Minus, description: 'Visually divide blocks.' },
];

const CommandMenu = ({ position, filter, onSelect, onClose }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const filteredItems = MENU_ITEMS.filter(item =>
        item.label.toLowerCase().includes(filter.toLowerCase())
    );

    useEffect(() => {
        setSelectedIndex(0);
    }, [filter]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex(prev => (prev + 1) % filteredItems.length);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (filteredItems[selectedIndex]) {
                    onSelect(filteredItems[selectedIndex].id);
                }
            } else if (e.key === 'Escape') {
                e.preventDefault();
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [filteredItems, selectedIndex, onSelect, onClose]);

    if (filteredItems.length === 0) return null;

    return (
        <div
            className="fixed z-50 bg-neutral-900 border border-neutral-800 rounded-lg shadow-2xl overflow-hidden w-72 max-h-80 overflow-y-auto flex flex-col"
            style={{
                top: position.y + 24, // Offset slightly below cursor
                left: position.x
            }}
        >
            <div className="p-2 text-xs text-neutral-500 font-medium uppercase tracking-wider px-3 bg-neutral-900/50 backdrop-blur sticky top-0">
                Basic Blocks
            </div>
            <div className="flex flex-col p-1">
                {filteredItems.map((item, index) => (
                    <button
                        key={item.id}
                        onClick={() => onSelect(item.id)}
                        className={`
                            flex items-center gap-3 p-2 rounded-md text-left transition-colors
                            ${index === selectedIndex ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:bg-neutral-800/50 hover:text-neutral-200'}
                        `}
                    >
                        <div className="p-1 border border-neutral-700 rounded bg-neutral-800">
                            <item.icon size={16} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-medium">{item.label}</span>
                            <span className="text-[10px] text-neutral-500">{item.description}</span>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CommandMenu;
