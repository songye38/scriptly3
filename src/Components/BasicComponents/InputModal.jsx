import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

const InputModal = ({ setProjectName }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    console.log('입력한 값:', inputValue);
    setProjectName(inputValue);  // 부모에게 값을 전달
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={showModal}>
        새로운 프로젝트 만들기
      </Button>

      <Dialog open={isModalVisible} onClose={handleCancel}>
        <DialogTitle>프로젝트 이름을 적어주세요</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="프로젝트명"
            type="text"
            fullWidth
            variant="outlined"
            value={inputValue}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="secondary">
            취소
          </Button>
          <Button onClick={handleOk} color="primary">
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default InputModal;
