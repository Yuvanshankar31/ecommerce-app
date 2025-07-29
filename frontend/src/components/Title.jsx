import React from 'react';

const Title = ({ text1, text2 }) => {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="flex items-center gap-3">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900">
          {text1} <span className="text-gradient-primary">{text2}</span>
        </h2>
        <div className="w-12 h-1 bg-gradient-primary rounded-full"></div>
      </div>
    </div>
  );
};

export default Title;
