import React from 'react';

const NoteContent = ({ content }) => {
  return (
    <div
      style={{
        color: '#4C4B4B',
        fontSize: 13,
        fontFamily: 'Pretendard',
        fontWeight: '400',
        wordWrap: 'break-word',
        paddingTop:'4px',
      }}
    >
      {content}
    </div>
  );
};

export default NoteContent;
