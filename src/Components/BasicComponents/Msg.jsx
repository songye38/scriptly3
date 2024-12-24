import React from "react";

const UserMsg = ({ msg }) => {
  return (
    <div
      style={{
        width: "336px",
        height: "100%",
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 16,
        paddingBottom: 16,
        background: "#EDEDED",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        display: "inline-flex",
      }}
    >
      <div
        style={{
          width: 296,
          textAlign: "center", // 텍스트를 가운데 정렬
          lineHeight:'24px',
          fontSize: '14px',       // 기본 폰트 크기 설정
          fontFamily: "Pretendard", // Pretendard 폰트 사용
          color: "black",     // 기본 텍스트 색상 설정
          wordWrap: "break-word", // 긴 텍스트 줄바꿈
          textAlign:"left", // 
        }}
      >
        {msg}
      </div>
    </div>
  );
};

export default UserMsg;
