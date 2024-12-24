import React from 'react';
import { TextField } from '@mui/material';

const MyInput = ({ value, onChange, placeholder, disabled }) => {
  return (
    <TextField
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled} // 비활성화 상태
      multiline // 여러 줄 텍스트 필드
      minRows={1} // 최소 줄 수 (한 줄 크기)
      fullWidth // 전체 너비 사용
      variant="outlined" // 아웃라인 스타일
      InputProps={{
        style: {
          borderRadius: '8px',
          border: '1px solid #BFBFBF',
          padding: '8px 12px',
          fontSize: '14px',
          backgroundColor: disabled ? '#F5F5F5' : 'white', // 비활성화 시 배경색 변경
          cursor: disabled ? 'not-allowed' : 'text', // 비활성화 시 커서 변경
        },
      }}
      onFocus={(e) => !disabled && (e.target.style.borderColor = '#3150EE')} // 포커스 시 테두리 색상 변경
      onBlur={(e) => !disabled && (e.target.style.borderColor = '#BFBFBF')} // 포커스 해제 시 기본 테두리 색상으로 변경
    />
  );
};

export default MyInput;
