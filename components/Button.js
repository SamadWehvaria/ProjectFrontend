import React from 'react';
import { ClipLoader } from 'react-spinners';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  className = '',
  disabled = false,
  title = '',
  isLoading = false
}) => {
  const baseStyles = 'rounded-md font-medium transition-all duration-200 flex items-center justify-center';
  
  const variants = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white disabled:bg-blue-300',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 disabled:bg-gray-100',
    danger: 'bg-red-500 hover:bg-red-600 text-white disabled:bg-red-300',
    accent: 'bg-green-500 hover:bg-green-600 text-white disabled:bg-green-300',
  };

  const sizes = {
    sm: 'text-sm px-2 py-1',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      title={isLoading ? "Loading..." : title}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {isLoading ? (
        <div className="w-6 flex justify-center items-center">
          <ClipLoader size={16} color="#ffffff" />
        </div>
      ) : children}
    </button>
  );
};

export default Button; 