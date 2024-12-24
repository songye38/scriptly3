import React from 'react';
import NoteTitle from '../BasicComponents/NoteTitle';
import NoteContent from '../BasicComponents/NoteContent';

const Note = ({ id, title, contentArray, isChecked, onCheckChange }) => {
  // 체크박스 상태가 변경될 때 호출되는 함수
  const handleCheckboxChange = (event) => {
    onCheckChange(id, event.target.checked); // 체크된 상태를 상위 컴포넌트로 전달
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
      {/* 제목 */}
      <NoteTitle title={title} isChecked={isChecked} onChange={handleCheckboxChange} />

      {/* NoteContent들을 감싸는 div */}
      <div style={{ display: 'flex', flexDirection: 'column',gap:'20x' }}>
        {/* NoteContent들 */}
        {contentArray.map((content, index) => (
          <NoteContent
            key={index}
            content={content}
          />
        ))}
      </div>
    </div>
  );
};

export default Note;
