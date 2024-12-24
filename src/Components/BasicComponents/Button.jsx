import { useState } from 'react';
import React from 'react';

const Button = ({ onClick, title, disabled = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  // 기본 상태일 때 스타일 정의
  const buttonStyle = {
    width: 'auto', // 텍스트 길이에 맞게 너비가 자동으로 조정
    height: '40px', // 텍스트 크기와 패딩을 반영하여 적당한 높이 설정
    padding: '6px 12px', // padding 설정
    background: disabled ? '#F0F0F0' : isHovered ? '#EAEEFD' : '#EAEEFD', // 기본 상태 배경색
    borderRadius: '4px',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0px',
    display: 'inline-flex', // inline-flex로 설정하여 가로 배치
    border: `1px ${isHovered ? '#5670F1' : 'transparent'} solid`, // hover 시 border 색상만 적용
    cursor: disabled ? 'not-allowed' : 'pointer', // disabled일 때 cursor 스타일 변경
    whiteSpace: 'nowrap', // 텍스트가 자동으로 줄 바꿈되지 않도록 설정
    opacity: disabled ? 0.6 : 1, // disabled 상태일 때 투명도 설정
  };

  const textStyle = {
    color: disabled ? '#A9A9A9' : '#5670F1', // disabled일 때 텍스트 색상 변경
    fontSize: '14px',
    fontFamily: 'Pretendard',
    fontWeight: '500',
    lineHeight: '1',
    wordWrap: 'break-word',
  };

  return (
    <div
      style={buttonStyle}
      onMouseEnter={() => setIsHovered(true)}  // hover 시 isHovered 상태 변경
      onMouseLeave={() => setIsHovered(false)}  // hover 종료 시 isHovered 상태 변경
      onClick={disabled ? null : onClick}  // disabled일 때 클릭 이벤트 비활성화
    >
      <div style={textStyle}>
        {title}
      </div>
    </div>
  );
};

export default Button;
