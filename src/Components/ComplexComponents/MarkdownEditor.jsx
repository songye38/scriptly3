import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { useEffect } from "react";

const MarkdownEditor = ({ initialContent }) => {
  const [value, setValue] = useState(initialContent);

  const handleEditorChange = (newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    setValue(initialContent);
  }, [initialContent]); // editorContent가 변경될 때마다 호출

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
          color : 'black',
        }}
      />
      

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
