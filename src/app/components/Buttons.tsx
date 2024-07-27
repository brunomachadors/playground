// src/components/Button.tsx

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'gray-100' | 'gray' | 'indigo';
  textColor?: 'gray-800' | 'gray-100';
  borderColor?: 'gray-300' | 'indigo-600';
  hoverColor?: 'gray-100' | 'gray-200' | 'indigo-700';
  focusColor?: 'gray-500' | 'indigo-500';
}

const Button: React.FC<ButtonProps> = ({
  color = 'gray-100',
  textColor = 'gray-800',
  borderColor = 'gray-300',
  hoverColor = 'gray-100',
  focusColor = 'gray-500',
  children,
  ...props
}) => {
  const buttonClasses = `w-1/3 bg-${color} text-${textColor} border border-${borderColor} py-2 px-4 rounded-md shadow-sm hover:bg-${hoverColor} focus:outline-none focus:ring-2 focus:ring-${focusColor} focus:ring-offset-2`;

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
