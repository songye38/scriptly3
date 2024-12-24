import React, { useState } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";

const CheckBox = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = (e) => {
    setChecked(e.target.checked);
    console.log(`Checkbox is now: ${e.target.checked}`);
  };

  return (
    <div style={{ margin: "4px" }}>
      {/* MUI Checkbox는 기본적으로 스타일이 잘 되어있지만, 추가적인 커스터마이징이 가능합니다 */}
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={handleChange}
            sx={{
              color: "#3150EE", // 체크되지 않은 상태의 색상
              "&.Mui-checked": {
                color: "#3150EE", // 체크된 상태의 색상
              },
              "&:hover": {
                backgroundColor: "rgba(49, 80, 238, 0.04)", // hover 상태의 배경 색상
              },
            }}
          />
        }
      />
    </div>
  );
};

export default CheckBox;
