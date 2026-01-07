import React from 'react';

/**
 * Button Component
 * A flexible button component that handles different variants (styles) and icons.
 * Uses 'onMouseDown' for toolbar buttons to prevent the editor from losing focus.
 */
const Button = ({ children, onClick, variant = 'primary', className = '', icon: Icon, title, active }) => {
    const baseStyle = "flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 active:scale-95";

    // Visual variants for different contexts
    const variants = {
        primary: "bg-neutral-100 hover:bg-white text-black shadow-lg shadow-white/10",
        secondary: "bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 shadow-sm",
        danger: "bg-red-900/20 hover:bg-red-900/40 text-red-400 border border-red-900/30",
        ghost: "hover:bg-neutral-900 text-neutral-400 hover:text-neutral-200",
        // Toolbar buttons need to be compact
        toolbar: `p-2 h-9 w-9 rounded transition-colors ${active ? 'bg-neutral-800 text-white' : 'hover:bg-neutral-800 text-neutral-400 hover:text-white'}`
    };

    // Prevent focus loss on toolbar clicks so text selection remains active
    const handleMouseDown = (e) => {
        if (variant === 'toolbar') {
            e.preventDefault();
            onClick(e);
        }
    };

    return (
        <button
            onClick={variant !== 'toolbar' ? onClick : undefined}
            onMouseDown={handleMouseDown}
            className={`${variant === 'toolbar' ? '' : baseStyle} ${variants[variant]} ${className}`}
            title={title}
        >
            {Icon && <Icon size={variant === 'toolbar' ? 16 : 18} />}
            {children}
        </button>
    );
};

export default Button;
