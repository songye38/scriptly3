import React from 'react';
import ReactMarkdown from "react-markdown";

const ResultBasic = ({ question }) => {

  return (
    <div style={{ width: '100%', height: '100%', padding: 10, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'inline-flex' }}>
      <div style={{ alignSelf: 'stretch', height: 'auto', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex' }}>
        <div style={{ alignSelf: 'stretch', height: 'auto', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 14, display: 'flex' }}>
          <div style={{ alignSelf: 'stretch', color: 'black', fontSize: '20px', fontFamily: 'Pretendard', fontWeight: '600', lineHeight: '23px', wordWrap: 'break-word' }}>
            {question?.answer_title}
          </div>
          {/* 마크다운을 HTML로 렌더링 */}
          <div style={{ alignSelf: 'stretch', color: 'black', fontSize: '16px', fontFamily: 'Pretendard', fontWeight: '400', lineHeight: '29px', wordWrap: 'break-word' }}>
            <ReactMarkdown>{question?.answer_content}</ReactMarkdown>
          </div>
        </div>
        <div style={{ justifyContent: 'flex-start', alignItems: 'center', gap: 4, display: 'inline-flex' }}>
          {/*TODO : 별표 기능
           */}
          <img 
            style={{ width: '20px', height: '20px' }} 
            src="/images/star.svg" 
            alt="Logo img" 
          />
          {/* TODO : 고정 기능
           */}
          <img 
            style={{ width: '20px', height: '20px' }} 
            src="/images/pin.svg" 
            alt="Logo img" 
          />
        </div>
      </div>
    </div>
  );
};

export default ResultBasic;
