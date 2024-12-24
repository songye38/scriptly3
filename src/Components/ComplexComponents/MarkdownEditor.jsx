import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";

const MarkdownEditor = ({ initialContent, onSave }) => {
  const [value, setValue] = useState(initialContent);

  const handleEditorChange = (newValue) => {
    setValue(newValue);
  };

  const handleSave = () => {
    if (onSave) {
      onSave(value); // 저장된 마크다운 내용 처리
    }
  };

  return (
    <div style={{ width: '75vw', height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>
      <MDEditor
        value={value}
        onChange={handleEditorChange}
        style={{
          flexGrow: 1,
          marginBottom: '20px',
          height: '100%',
          backgroundColor: 'white',
        }}
      />
      
      {/* 저장 버튼 */}
      <button
        onClick={handleSave}
        style={{
          padding: '10px 20px',
          margin: '10px',
          alignSelf: 'center',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        저장
      </button>

      {/* MDEditor 아이콘 크기 조정 */}
      <style jsx>{`
        .w-md-editor-toolbar button svg {
          width: 24px;   /* 아이콘의 크기를 키우는 부분 */
          height: 24px;  /* 아이콘의 높이를 키우는 부분 */
        }
      `}</style>
    </div>
  );
};

export default MarkdownEditor;
