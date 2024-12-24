import React from "react";

const ProjectName = ({title}) => {
  return (
    <div
      style={{
        width: "auto",
        height: "auto",
        // paddingTop: 10,
        paddingBottom: 20,
        // paddingLeft: 10,
        // paddingRight: 10,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: 10,
        display: "inline-flex",
      }}
    >
      <div
        style={{
          alignSelf: "stretch",
          height: 22,
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 16,
          display: "flex",
        }}
      >
        <div
          style={{
            alignSelf: "stretch",
            color: "black",
            fontSize: 18,
            fontFamily: "Pretendard",
            fontWeight: "500",
            wordWrap: "break-word",
          }}
        >
          {title}
        </div>
      </div>
    </div>
  );
};

export default ProjectName;
