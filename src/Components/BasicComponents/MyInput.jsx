// CustomInput.js
import React from 'react';
import { Input } from 'antd';

// FIXME : 버튼을 인풋창 안으로 넣기

const MyInput = ({ value, onChange, placeholder, disabled }) => {
  return (
    <Input.TextArea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={1}
      disabled={disabled} // 추가
      style={{
        borderRadius: '8px',
        border: '1px solid #BFBFBF',
        padding: '8px 12px',
        fontSize: '14px',
        backgroundColor: disabled ? '#F5F5F5' : 'white', // 비활성화 시 배경색 변경
        cursor: disabled ? 'not-allowed' : 'text', // 비활성화 시 커서 변경
      }}
      onFocus={(e) => !disabled && (e.target.style.borderColor = '#3150EE')} // 비활성화 상태에서 포커스 방지
      onBlur={(e) => !disabled && (e.target.style.borderColor = '#BFBFBF')}  // 비활성화 상태에서 기본 상태로
    />
  );
};

export default MyInput;
