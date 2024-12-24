import React, { useState } from "react";
import Checkbox from "antd/es/checkbox";
import 'antd/dist/reset.css';

const CheckBox = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = (e) => {
    setChecked(e.target.checked);
    console.log(`Checkbox is now: ${e.target.checked}`);
  };

  return (
    <div style={{ margin: "4px" }}>
      <style>
        {`
          .ant-checkbox-checked .ant-checkbox-inner {
            background-color: #3150EE; /* 체크된 상태의 색상 */
            border-color: #3150EE; /* 체크된 상태의 테두리 */
          }
          .ant-checkbox:hover .ant-checkbox-inner {
            border-color: #4A63F3; /* Hover 시 테두리 색상 */
          }
        `}
      </style>
      <Checkbox checked={checked} onChange={handleChange}></Checkbox>
    </div>
  );
};

export default CheckBox;
