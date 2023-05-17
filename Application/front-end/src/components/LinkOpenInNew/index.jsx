import React from 'react';

const LinkOpenInNew = ({ url, children }) => {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
};

export default LinkOpenInNew;
