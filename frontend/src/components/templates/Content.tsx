import React from 'react';
import '../../styles/Content.css'

const Content = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="content">
      <main>{children}</main>
    </div>
    ) 
};

export default Content;
