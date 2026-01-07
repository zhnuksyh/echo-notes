import React from 'react';
import {
    Bold, Italic, Strikethrough, Code, Link as LinkIcon,
    Heading1, Heading2, Heading3, Quote, TerminalSquare, Minus,
    List, ListOrdered, CheckSquare, Indent, ChevronRight,
    Image as ImageIcon, Type, MessageSquare
} from 'lucide-react';
import Button from '../ui/Button';
import ColorPicker from '../ui/ColorPicker';

// Simple visual divider for the toolbar
const ToolbarDivider = () => <div className="w-px h-4 bg-neutral-800 mx-1" />;

/**
 * EditorToolbar Component
 * Renders the row of buttons above the text editor.
 * Passes the 'command' string back to the parent to execute.
 */
const EditorToolbar = ({ onFormat }) => (
    <div className="flex flex-wrap items-center gap-2 p-3 border-b border-neutral-800 bg-black/50 backdrop-blur sticky top-0 z-10 mx-6 mt-2 rounded-lg border border-neutral-800/50 select-none">

        {/* Block Types */}
        <Button variant="toolbar" icon={Type} onClick={() => onFormat('p')} title="Normal Text" />
        <Button variant="toolbar" icon={Heading1} onClick={() => onFormat('h1')} title="Heading 1" />
        <Button variant="toolbar" icon={Heading2} onClick={() => onFormat('h2')} title="Heading 2" />
        <Button variant="toolbar" icon={Heading3} onClick={() => onFormat('h3')} title="Heading 3" />
        <ToolbarDivider />

        {/* Inline Styles */}
        <Button variant="toolbar" icon={Bold} onClick={() => onFormat('bold')} title="Bold" />
        <Button variant="toolbar" icon={Italic} onClick={() => onFormat('italic')} title="Italic" />
        <Button variant="toolbar" icon={Strikethrough} onClick={() => onFormat('strike')} title="Strikethrough" />
        <Button variant="toolbar" icon={Code} onClick={() => onFormat('code')} title="Inline Code" />
        <ColorPicker onSelect={(color) => onFormat('color', color)} />
        <Button variant="toolbar" icon={LinkIcon} onClick={() => onFormat('link')} title="Link" />
        <ToolbarDivider />

        {/* Lists & Checks */}
        <Button variant="toolbar" icon={List} onClick={() => onFormat('ul')} title="Bullet List" />
        <Button variant="toolbar" icon={ListOrdered} onClick={() => onFormat('ol')} title="Numbered List" />
        <Button variant="toolbar" icon={CheckSquare} onClick={() => onFormat('checkbox')} title="Checkbox" />
        <Button variant="toolbar" icon={ChevronRight} onClick={() => onFormat('toggle')} title="Toggle List" />
        <ToolbarDivider />

        {/* Advanced Blocks */}
        <Button variant="toolbar" icon={Quote} onClick={() => onFormat('quote')} title="Quote" />
        <Button variant="toolbar" icon={MessageSquare} onClick={() => onFormat('callout')} title="Callout" />
        <Button variant="toolbar" icon={TerminalSquare} onClick={() => onFormat('pre')} title="Code Block" />
        <Button variant="toolbar" icon={ImageIcon} onClick={() => onFormat('image')} title="Image" />
        <Button variant="toolbar" icon={Minus} onClick={() => onFormat('hr')} title="Divider" />
        <Button variant="toolbar" icon={Indent} onClick={() => onFormat('indent')} title="Indent" />
    </div>
);

export default EditorToolbar;
