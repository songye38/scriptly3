import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

const InputModal = ({ setProjectName }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  // 모달 열기
  const handleOpen = () => {
    setIsModalVisible(true);
  };

  // 모달 닫기
  const handleClose = () => {
    setIsModalVisible(false);
  };

  // 입력 값 저장
  const handleSave = () => {
    if (inputValue.trim() !== '') {
      setProjectName(inputValue); // ✅ 함수 호출로 상태 변경
      setIsModalVisible(false);
      setInputValue(''); // 입력 필드 초기화
    }
  };

  return (
    <>

<button
      onClick={handleOpen}
      onMouseEnter={() => setIsHovered(true)} // Hover 시작
      onMouseLeave={() => setIsHovered(false)} // Hover 종료
      style={{
        width: '100%', // 버튼이 카드와 같은 너비를 차지
        height: 'auto', // 버튼의 높이를 자동 조정
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex', // Flexbox로 정렬
        flexDirection: 'column', // 수직 배치
        borderRadius: '8px', // 둥근 모서리
        background: '#EAEEFD',
        cursor: 'pointer',
        border: `1.8px solid ${isHovered ? '#5670F1' : '#EAEEFD'}`,
        fontSize: '16px',
        fontWeight: '500',
        color: '#3150EE',
        transition: 'all 0.3s ease', // 전환 애니메이션
        position: 'relative', // 이미지 애니메이션을 위해 position 설정
        padding: '16px',
      }}
    >
      {/* 이미지: Hover 시에만 표시 */}
      <img
        src="/images/add.svg"
        alt="Add Icon"
        style={{
          color : '#5670F1',
          width: '24px',
          height: '24px',
          transform: isHovered ? 'rotate(90deg)' : 'rotate(0deg)', // 회전 애니메이션
          transition: 'transform 0.5s ease', // 회전 전환 애니메이션
          opacity: isHovered ? 1 : 0, // Hover 시 투명도 변경
        }}
      />
      {/* 텍스트 */}
      <span style={{ marginTop: '8px' }}>새 프로젝트 추가</span>
    </button>
      <Dialog open={isModalVisible} onClose={handleClose}>
        <DialogTitle>프로젝트 이름 입력</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="프로젝트 이름"
            type="text"
            fullWidth
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)} // 입력 값 업데이트
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            취소
          </Button>
          <Button onClick={handleSave} color="primary">
            저장
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default InputModal;
