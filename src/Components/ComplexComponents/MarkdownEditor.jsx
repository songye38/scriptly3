'use client';

import React, { useState, useEffect, useRef } from 'react';
import InitializedMDXEditor from '../BasicComponents/InitializedMDXEditor';

const MarkdownEditor = ({ initialContent }) => {
  const [value, setValue] = useState(initialContent || ''); // 초기값 설정
  const ref = useRef(null); // MDXEditor에 대한 ref 설정

  // initialContent가 변경되면 editor의 내용을 업데이트
  useEffect(() => {
    setValue(initialContent); // 상태값을 업데이트
    if (ref.current) {
      ref.current.setMarkdown(initialContent); // ref를 통해 setMarkdown 호출
    }
  }, [initialContent]); // initialContent가 변경될 때마다 실행

  // editor에서 값이 변경될 때 상태를 업데이트
  const handleEditorChange = (newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    // value가 변경될 때마다 ref에서 최종값을 출력
    if (ref.current) {
      console.log("최종 red");
      console.log(ref.current.getMarkdown()); // 최종 값 출력
    }
  }, [value]);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
      }}
    >
      <InitializedMDXEditor
        ref={ref} // MDXEditor에 ref 전달
        markdown={value} // markdown 상태 전달
        //onChange={alert(initialContent)} // markdown이 변경될 때 호출되는 함수
      />
    </div>
  );
};

export default MarkdownEditor;
