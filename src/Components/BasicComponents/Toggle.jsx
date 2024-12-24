import React from 'react';
import { Switch } from '@mui/material';

const Toggle = ({ checked, onChange }) => {
  return (
    <div style={{ margin: '8px' }}>
      <Switch
        checked={checked}
        onChange={onChange}
        sx={{
          // 체크된 상태에서의 색상
          '&.Mui-checked': {
            color: '#3150EE',
          },
          // 체크된 상태에서 배경색
          '&.Mui-checked + .MuiSwitch-track': {
            backgroundColor: '#3150EE',
          },
          // Hover 상태에서의 색상
          '&:hover': {
            backgroundColor: 'rgba(49, 80, 238, 0.1)', // Hover시 배경색
          },
        }}
      />
    </div>
  );
};

export default Toggle;
