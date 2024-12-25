import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { marked } from "marked";
import "easymde/dist/easymde.min.css";
import hljs from "highlight.js"; // highlight.js 임포트
import "highlight.js/styles/github.css"; // 기본 스타일
import './MarkdownEditor.css'

// SimpleMDE를 클라이언트 사이드에서만 로드하도록 설정
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false, // 서버 사이드 렌더링 비활성화
});

const MarkdownEditor = ({ initialContent }) => {
  const [value, setValue] = useState(initialContent || ""); // 초기값 설정

  useEffect(() => {
    setValue(initialContent); // initialContent가 변경될 때 value를 업데이트
  }, [initialContent]);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  // marked 렌더러 설정: 코드 블록을 highlight.js로 처리
  marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function (code, language) {
      const validLang = hljs.getLanguage(language) ? language : "plaintext"; // 유효한 언어만 사용
      return hljs.highlight(code, { language: validLang }).value; // 구문 강조
    },
  });

  return (
    <div style={{display:'flex',flexDirection:'row',gap:'16px'}}>
      <div style={{ height: '100vh', overflow: 'auto' }}>
        <SimpleMDE value={value} onChange={handleChange} />
      </div>
 
      {/* <div style={{ height: '100vh', overflow: 'auto',paddingBottom:'10px' }}> */}
        {/* <h4>결과 미리보기</h4> */}
        {/* <div dangerouslySetInnerHTML={{ __html: marked(value) }} /> 마크다운을 HTML로 변환 */}
      {/* </div>  */}
    </div>
  );
};

export default MarkdownEditor;
