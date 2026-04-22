import * as React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    fullWidth?: boolean;
    isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    fullWidth = false,
    isLoading = false,
    className = '',
    ...props
}) => {
    const baseStyles = "relative inline-flex items-center justify-center px-6 py-3 font-medium transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0a0a0a] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-sm tracking-wide";

    const variants = {
        primary: "bg-primary text-white shadow-glow hover:scale-[1.02]",
        secondary: "bg-surface text-main border border-border-light hover:bg-core backdrop-blur-md",
        outline: "bg-transparent border border-border-light text-main hover:border-dim",
        ghost: "bg-transparent text-muted hover:text-main"
    };

    const widthClass = fullWidth ? 'w-full' : '';

    return (
        <motion.button
            whileTap={{ scale: 0.98 }}
            className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
            disabled={isLoading || props.disabled}
            {...(props as any)}
        >
            {isLoading ? (
                <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                </span>
            ) : children}
        </motion.button>
    );
};
