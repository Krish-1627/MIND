import * as React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ label, error, icon, className = '', ...props }) => {
    return (
        <div className="w-full space-y-2">
            {label && <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider ml-1">{label}</label>}
            <div className="relative group">
                {icon && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400 transition-colors">
                        {icon}
                    </div>
                )}
                <input
                    className={`
            w-full bg-surface border border-border-light rounded-xl 
            ${icon ? 'pl-11' : 'pl-4'} pr-4 py-4
            text-main placeholder-muted
            focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50
            transition-all duration-300
            ${error ? 'border-red-500/50 focus:border-red-500' : ''}
            ${className}
          `}
                    {...props}
                />
            </div>
            {error && <p className="text-xs text-red-400 ml-1">{error}</p>}
        </div>
    );
};
