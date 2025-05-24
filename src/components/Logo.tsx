import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'medium' }) => {
  const baseUrl = process.env.PUBLIC_URL || '';
  
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  };
  
  return (
    <div className={`flex items-center ${className}`}>
      <div className="mr-3">
        <img 
          src={`${baseUrl}/logo.png`}
          alt="Here Comes The Bride Logo" 
          className={`${sizeClasses[size]} object-contain`}
        />
      </div>
      <div className={`font-serif italic ${size === 'large' ? 'text-2xl' : 'text-lg'} text-primary`}>
        Here Comes The Bride
      </div>
    </div>
  );
};

export default Logo; 