import React from "react";

const ExpandButton = ({onClick}) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        padding: 2.5,
        justifyContent: "center",
        alignItems: "center",
        display: "inline-flex",
      }}
    >
        <img 
        style={{ width: '20px', height: '20px', borderRadius: '9999px',cursor: 'pointer' }} 
        src="/images/ExpandBtn.svg" 
        alt="Expand Btn" 
        onClick={onClick}
      />
    </div>
  );
};

export default ExpandButton;
