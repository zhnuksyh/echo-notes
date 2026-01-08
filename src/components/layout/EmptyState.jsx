import React from 'react';
import { Waypoints, Plus } from 'lucide-react';
import Button from '../ui/Button';

/**
 * EmptyState Component
 * Shown when no note is selected.
 */
const EmptyState = ({ onCreate }) => (
    <div className="h-full flex flex-col items-center justify-center text-neutral-500 p-8 text-center animate-fade-in font-poppins">
        <div className="w-24 h-24 bg-neutral-900 rounded-full flex items-center justify-center mb-6 border border-neutral-800">
            <Waypoints size={48} className="text-neutral-600" />
        </div>
        <h2 className="text-xl font-semibold text-neutral-200 mb-2">Select an echo to view</h2>
        <p className="max-w-xs mb-8 text-neutral-400">Choose an echo from the sidebar or create a new one to get started.</p>
        <Button onClick={onCreate} icon={Plus}>Create New Echo</Button>
    </div>
);

export default EmptyState;
