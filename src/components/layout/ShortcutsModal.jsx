import React from 'react';
import { X, Command, Type, List, Image, Code, Quote, Minus, Bold, Italic, Strikethrough, CheckSquare, ChevronRight, MessageSquare } from 'lucide-react';

const ShortcutRow = ({ command, description, icon: Icon }) => (
    <div className="flex items-center justify-between py-2 border-b border-neutral-800 last:border-0">
        <div className="flex items-center gap-3 text-neutral-300">
            {Icon && <Icon size={16} className="text-neutral-500" />}
            <span>{description}</span>
        </div>
        <code className="px-2 py-1 bg-neutral-800 text-neutral-400 rounded text-xs font-mono">
            {command}
        </code>
    </div>
);

const SectionHeader = ({ title }) => (
    <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mt-6 mb-3">
        {title}
    </h3>
);

const ShortcutsModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl w-full max-w-lg max-h-[80vh] flex flex-col animate-fade-in">

                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-neutral-800">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        <Command size={20} />
                        Keyboard Shortcuts
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-neutral-800 rounded-lg text-neutral-400 hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Scrollable List */}
                <div className="overflow-y-auto p-4 flex-1">

                    <p className="text-sm text-neutral-400 mb-4">
                        Type <code className="px-1.5 py-0.5 bg-neutral-800 rounded text-xs">/</code> to open the command menu anywhere.
                    </p>

                    <SectionHeader title="Text Formatting" />
                    <ShortcutRow command="/h1" description="Heading 1" icon={Type} />
                    <ShortcutRow command="/h2" description="Heading 2" icon={Type} />
                    <ShortcutRow command="/h3" description="Heading 3" icon={Type} />
                    <ShortcutRow command="/bold" description="Bold Text" icon={Bold} />
                    <ShortcutRow command="/italic" description="Italic Text" icon={Italic} />
                    <ShortcutRow command="/strike" description="Strikethrough" icon={Strikethrough} />
                    <ShortcutRow command="/code" description="Inline Code" icon={Code} />

                    <SectionHeader title="Lists" />
                    <ShortcutRow command="/ul" description="Bullet List" icon={List} />
                    <ShortcutRow command="/ol" description="Numbered List" icon={List} />
                    <ShortcutRow command="/check" description="Check List" icon={CheckSquare} />
                    <ShortcutRow command="/toggle" description="Toggle List" icon={ChevronRight} />

                    <SectionHeader title="Blocks" />
                    <ShortcutRow command="/quote" description="Quote Block" icon={Quote} />
                    <ShortcutRow command="/callout" description="Callout Box" icon={MessageSquare} />
                    <ShortcutRow command="/codeblock" description="Code Block" icon={Code} />
                    <ShortcutRow command="/hr" description="Divider" icon={Minus} />

                    <SectionHeader title="Media" />
                    <ShortcutRow command="/image" description="Upload Image" icon={Image} />

                    <div className="h-4" /> {/* Spacer */}
                </div>
            </div>
        </div>
    );
};

export default ShortcutsModal;
