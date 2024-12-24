import React from 'react';
import { Switch } from '@mui/material';

const Toggle = ({ checked, onChange }) => {
  return (
    <div style={{ margin: '8px' }}>
      <Switch
        checked={checked}
        onChange={onChange}  // event 객체를 전달할 수 있도록 onChange 수정
        sx={{
          '&.Mui-checked': {
            color: '#3150EE',
          },
          '&.Mui-checked + .MuiSwitch-track': {
            backgroundColor: '#3150EE',
          },
          '&:hover': {
            backgroundColor: 'rgba(49, 80, 238, 0.1)',
          },
        }}
      />
    </div>
  );
};


export default Toggle;
