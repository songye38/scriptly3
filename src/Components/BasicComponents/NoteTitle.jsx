import React from 'react';
import CheckBox from './CheckBox';

const NoteTitle = ({ title, isChecked, onChange }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', width: '100%',gap:'20px',marginBottom:'px'}}>
      {/* isChecked가 false일 때 체크박스를 숨김 */}
      {/* {isChecked && (
        // <CheckBox 
        //   checked={isChecked} // 부모에서 받은 상태 사용
        //   onChange={onChange}  // 부모에서 전달된 상태 변경 함수 사용
        // />
      )} */}
      <div style={{fontSize:'14px',fontWeight:'600'}}>{title}</div>
      {/* <strong>{title}</strong> */}
    </div>
  );
};

export default NoteTitle;