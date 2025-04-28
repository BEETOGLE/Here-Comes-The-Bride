import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="mr-2">
        {/* SVG Bride Silhouette - this is a minimalist outline of a bride */}
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-primary"
        >
          <path
            d="M16 3C15.2 3 14.5 3.2 14 3.6C13.5 4 13.1 4.5 13 5.1C12.9 5.7 13 6.3 13.4 6.9C13.8 7.5 14.4 7.9 15 8.1C15.3 8.2 15.7 8.2 16 8.2C16.3 8.2 16.7 8.2 17 8.1C17.6 7.9 18.2 7.5 18.6 6.9C19 6.3 19.1 5.7 19 5.1C18.9 4.5 18.5 4 18 3.6C17.5 3.2 16.8 3 16 3Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20 9C19.1 10.1 18.1 11 16 11C13.9 11 12.9 10.1 12 9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11 9.7C10.4 10.8 10 12.3 10 14.1V23.8C10 24.5 10.2 25.2 10.7 25.7C11.2 26.2 11.8 26.5 12.5 26.5H19.5C20.2 26.5 20.8 26.2 21.3 25.7C21.8 25.2 22 24.5 22 23.8V14.1C22 12.3 21.6 10.8 21 9.7"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 26.5V29"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18 26.5V29"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13 14C13.5 15 14.5 16 16 16C17.5 16 18.5 15 19 14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="font-serif italic text-lg text-primary">Here Comes The Bride</div>
    </div>
  );
};

export default Logo; 