import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  const baseUrl = process.env.PUBLIC_URL || '';
  
  return (
    <div className={`flex items-center ${className}`}>
      <div className="mr-2">
        <img 
          src={`${baseUrl}/logo.png`}
          alt="Here Comes The Bride Logo" 
          className="w-8 h-8 object-contain"
        />
      </div>
      <div className="font-serif italic text-lg text-primary">Here Comes The Bride</div>
    </div>
  );
};

export default Logo; 