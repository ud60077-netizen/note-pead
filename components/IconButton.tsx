
import React from 'react';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  ariaLabel: string;
}

const IconButton: React.FC<IconButtonProps> = ({ children, ariaLabel, className, ...props }) => {
  return (
    <button
      {...props}
      aria-label={ariaLabel}
      className={`p-2 rounded-full hover:bg-slate-700/50 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors duration-200 ${className}`}
    >
      {children}
    </button>
  );
};

export default IconButton;
