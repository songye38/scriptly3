import React from 'react';
import NoteTitle from "../BasicComponents/NoteTitle";
import NoteContent from "../BasicComponents/NoteContent";

const Note = ({ id, title, contentArray, isChecked, onCheckChange, isVisible }) => {
  // 체크박스 상태가 변경될 때 호출되는 함수
  const handleCheckboxChange = (event) => {
    onCheckChange(id, event.target.checked); // 부모 컴포넌트로 체크 상태 전달
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <div style={{display:'flex',flexDirection:'row'}}>

              {/* 제목 */}
          {/* 체크박스 */}
          {isVisible && (
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange} // 체크박스 클릭 시 부모로 상태 변경
          style={{width:'auto'}}
        />
      )}


      <NoteTitle title={title} isChecked={isChecked} onChange={handleCheckboxChange} />

      </div>


      {/* NoteContent들을 감싸는 div */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
        {/* NoteContent들 */}
        {contentArray.map((content, index) => (
          <NoteContent key={index} content={content} />
        ))}
      </div>

    </div>
  );
};

export default Note;
