import React, { useState } from 'react';
import { Palette } from 'lucide-react';
import Button from './Button';

/**
 * ColorPicker Component
 * Dropdown menu for selecting text colors.
 * Uses document.execCommand('foreColor') under the hood.
 */
const ColorPicker = ({ onSelect }) => {
    const colors = [
        { name: 'Default', value: 'inherit' },
        { name: 'Gray', value: '#9ca3af' },
        { name: 'Brown', value: '#d97706' },
        { name: 'Orange', value: '#f97316' },
        { name: 'Yellow', value: '#eab308' },
        { name: 'Green', value: '#22c55e' },
        { name: 'Blue', value: '#3b82f6' },
        { name: 'Purple', value: '#a855f7' },
        { name: 'Pink', value: '#ec4899' },
        { name: 'Red', value: '#ef4444' },
    ];

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <Button
                variant="toolbar"
                icon={Palette}
                onClick={() => setIsOpen(!isOpen)}
                title="Text Color"
                active={isOpen}
            />
            {isOpen && (
                <div className="absolute top-full left-0 mt-1 p-2 bg-neutral-900 border border-neutral-800 rounded-lg shadow-xl grid grid-cols-5 gap-1 z-50 w-48">
                    {colors.map((c) => (
                        <button
                            key={c.name}
                            onMouseDown={(e) => {
                                e.preventDefault(); // Keep focus in editor
                                onSelect(c.value);
                                setIsOpen(false);
                            }}
                            className="w-8 h-8 rounded hover:scale-110 transition-transform flex items-center justify-center border border-neutral-800"
                            style={{ backgroundColor: c.value === 'inherit' ? '#ffffff' : c.value }}
                            title={c.name}
                        >
                            {c.value === 'inherit' && <span className="text-black text-xs">A</span>}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ColorPicker;
