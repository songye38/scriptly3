import React from 'react';
import { Switch } from 'antd';
import 'antd/dist/reset.css';

const Toggle = ({ checked, onChange }) => {
  return (
    <div style={{ margin: '8px' }}>
      <style>
        {`
          /* 기본 Switch 스타일 */
          .ant-switch-checked {
            background-color: #3150EE;  /* 원하는 색상으로 변경 */
          }
          .ant-switch {
            border-color: #3150EE;  /* 원한다면 테두리 색상도 변경 */
          }

          /* Hover 상태 스타일 */
          .ant-switch-checked:hover {
            background-color: #3150EE; /* Hover 시 체크된 Switch의 배경색 */
          }
          .ant-switch:hover {
            border-color: #3150EE; /* Hover 시 Switch의 테두리 색상 */
          }
        `}
      </style>
      <Switch checked={checked} onChange={onChange} />
    </div>
  );
};

export default Toggle;
