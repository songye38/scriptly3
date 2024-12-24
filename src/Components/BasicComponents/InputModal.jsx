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
      <Button variant="contained" color="primary" onClick={handleOpen} 
      onMouseEnter={() => setIsHovered(true)} // Hover 시작
      onMouseLeave={() => setIsHovered(false)} // Hover 종료
      style={{
        width: '100%', // 버튼이 카드와 같은 너비를 차지하도록 설정
        height: 'auto', // 다른 카드와 동일한 높이로 맞춤
        justifyContent: 'center', // 텍스트 가운데 정렬
        alignItems: 'center',
        display: 'flex', // 가운데 정렬을 위한 flexbox
        borderRadius: '8px', // 카드와 동일한 둥근 모서리
        background:'#CED5FB',
        cursor: 'pointer',
        border: isHovered ? '#3150EE' : 'red', // Hover 시 테두리 색상 변경
        fontSize: '16px',
        fontWeight: '500',
        color: '#3150EE',
      }}>
        새 프로젝트 추가
      </Button>
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
