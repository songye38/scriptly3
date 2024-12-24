import React, { useState, useEffect, useRef } from "react";
import MyInput from "../BasicComponents/MyInput";
import Button from "../BasicComponents/Button";
import { supabase } from "../../utils/supabase";
import UserMsg from "../BasicComponents/\bUserMsg";
import ResultBasic from "./ResultBasic";
import ResultSummary from "./ResultSummary";
import Toggle from "../BasicComponents/Toggle";
import PromptOption from "../BasicComponents/\bPromptOption";
import prompts from "../../utils/prompts";

const ChatComponent = ({ projectID, studyQuestions }) => {
  const [selectedOption, setSelectedOption] = useState('option1');  // 선택된 옵션을 저장할 상태
  const [inputValue, setInputValue] = useState(""); // 사용자 입력 값
  const [conversation, setConversation] = useState([]); // 사용자 및 AI 메시지 순서 저장
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [isDetailedView, setIsDetailedView] = useState(true); // 토글 상태
  const messageContainerRef = useRef(null); // 메시지와 답변을 감싸는 div에 대한 ref
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const selectedPrompt = prompts[selectedOption];



  const handleOptionClick = (optionId) => {
    setSelectedOption(optionId);  // 클릭된 옵션의 ID를 상태에 저장
};

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleToggleChange = (checked) => {
    setIsDetailedView(checked);
  };

  // 체크박스 상태 변경 핸들러
  const handleCheckboxChange = (question) => {
    setSelectedQuestions((prev) => {
      const isAlreadySelected = prev.some((q) => q.id === question.id); // question 객체의 id로 비교
  
      if (isAlreadySelected) {
        return prev.filter((q) => q.id !== question.id); // 이미 선택된 경우 해당 question 객체 제거
      } else {
        return [...prev, question]; // 선택되지 않은 경우 question 객체 추가
      }
    });
  };
  
  

useEffect(() => {
  console.log("현재 선택된 질문들:", selectedQuestions);
}, [selectedQuestions]);

  const extractTitleAndContent = (markdown) => {
    const titleMatch = markdown.match(/^#\s*(.*)/m);
    const contentMatch = markdown.slice(titleMatch ? titleMatch[0].length : 0);

    const title = titleMatch ? titleMatch[1].trim() : "No title";
    const content = contentMatch.trim();

    return { title, content };
  };

  const handleMakeChapter = async () => {
    
    if (!inputValue) {
      alert("프로젝트 제목을 입력하세요.");
      return;
    }
  
    if (selectedQuestions.length === 0) {
      alert("저장할 질문을 선택하세요.");
      return;
    }
  
    try {
      // Step 1: notes 테이블에 새 note 생성
      const { data: noteData, error: noteError } = await supabase
        .from("notes")
        .insert([{ 
          title: inputValue, 
          project_id : projectID, 
        }])
        .select();
  
      if (noteError) {
        console.error("Error creating note:", noteError);
        alert("노트 생성에 실패했습니다.");
        return;
      }
  
      const noteId = noteData[0].id;
  
      // Step 2: note_questions 테이블에 다대다 관계 삽입
      const noteQuestionsData = selectedQuestions.map((q) => ({
        note_id: noteId,
        question_id: q.id,
      }));
  
      const { error: linkError } = await supabase
        .from("note_questions")
        .insert(noteQuestionsData);
  
      if (linkError) {
        console.error("Error linking notes and questions:", linkError);
        alert("질문 연결에 실패했습니다.");
        return;
      }
  
      alert("프로젝트와 관련 질문이 성공적으로 저장되었습니다.");

    } catch (err) {
      console.error("Unexpected error:", err);
      alert("오류가 발생했습니다.");
    }
  };
  

  const handleAskQuestion = async () => {
    if (!inputValue) return;
  
    // 사용자 메시지 추가
    const userMessage = { role: "user", content: inputValue };
    setConversation((prevConversation) => [...prevConversation, userMessage]);
  
    setLoading(true);
  
    try {
      const res = await fetch("/api/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: inputValue,
          messages: [
            {
              role: "system",
              content: selectedPrompt.content,
            },
          ],
        }),
      });
  
      const data = await res.json();
  
      // OpenAI의 답변 추가
      const assistantMessage = { role: "assistant", content: data.answer };
      setConversation((prevConversation) => [...prevConversation, assistantMessage]);
  
      const { title, content } = extractTitleAndContent(data.answer);
  
      const { error } = await supabase.from("study_questions").insert([
        {
          project_id: projectID,
          question: inputValue,
          answer_title: title,
          answer_content: content,
        },
      ]);
  
      if (error) console.error("Error saving to Supabase:", error);
    } catch (error) {
      console.error("Error with OpenAI API:", error);
    } finally {
      setLoading(false);
      setInputValue(""); // 입력 필드 초기화
    }
  };
  
  useEffect(() => {
  console.log("Updated conversation:", conversation);
}, [conversation]);

  useEffect(() => {
    setTimeout(() => {
      if (messageContainerRef.current) {
        const rect = messageContainerRef.current.getBoundingClientRect();
        const offset = 100; // 헤더 높이
        window.scrollBy({
          top: rect.top - offset,
          behavior: "smooth",
        });
      }
    }, 0);
  }, [conversation]);
  
  // 대화모드 on일 때 노출
  const renderDetailedView = () => (
    <div style={{ display: "flex", flexDirection: "row", gap: "20px", height: "100%" }}>
      {/* 질문과 답변 섹션 */}
      <div style={{ flex: 3, overflowY: "auto", maxHeight: "100vh" }}>
        {/* 기존 질문 목록 렌더링 */}
        {studyQuestions.map((question, idx) => (
          <div key={idx} style={{ marginBottom: "40px" }}>
            <div style={{ textAlign: "right" }}>
              <UserMsg msg={question.question} />
            </div>
            <div style={{ textAlign: "left" }}>
              <ResultBasic question={question} />
            </div>
          </div>
        ))}
  
        {/* 대화 메시지 렌더링 */}
        <div ref={messageContainerRef}>
          {conversation.map((msg, idx) => (
            <div
              key={idx}
              style={{
                textAlign: msg.role === "user" ? "right" : "left",
                marginBottom: "20px",
              }}
            >
              {msg.role === "user" ? (
                <UserMsg msg={msg.content} />
              ) : (
                <ResultBasic
                  question={{
                    answer_title: extractTitleAndContent(msg.content).title,
                    answer_content: extractTitleAndContent(msg.content).content,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
  
      {/* PromptOption 섹션 */}
      <div
        style={{
          flex: 1,
          paddingLeft: "20px",
          paddingBottom: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          overflowY: "auto",
          // borderLeft: "1px solid #ccc",
          maxHeight: "100vh",
        }}
      >
        <PromptOption 
          title="Zero-Shot Prompting" 
          description="간단하고 빠른 답변이 필요할 때" 
          selected={selectedOption === 'option1'} // selected는 선택된 ID와 비교해서 결정
          onClick={() => handleOptionClick('option1')} // 클릭 시 selectedOption 상태 변경
        />
        <PromptOption 
          title="Few-Shot Prompting" 
          description="특정 문제를 반복적으로 해결할 때" 
          selected={selectedOption === 'option2'} // selected는 선택된 ID와 비교해서 결정
          onClick={() => handleOptionClick('option2')} // 클릭 시 selectedOption 상태 변경
        />
        <PromptOption 
          title="Generated Knowledge Prompt" 
          description="새로운 개념이나 지식에 대한 설명이 필요할 때" 
          selected={selectedOption === 'option3'} // selected는 선택된 ID와 비교해서 결정
          onClick={() => handleOptionClick('option3')} // 클릭 시 selectedOption 상태 변경
        />
        <PromptOption 
          title="Directional Stimulus Prompting" 
          description="특정 조건이나 방향을 제시하며 답변을 이끌어낼 때"
          selected={selectedOption === 'option4'} // selected는 선택된 ID와 비교해서 결정
          onClick={() => handleOptionClick('option4')} // 클릭 시 selectedOption 상태 변경 
        />
        <PromptOption 
          title="Chain-of-Thought Prompting" 
          description="문제를 해결하는 과정이 중요한 경우" 
          selected={selectedOption === 'option5'} // selected는 선택된 ID와 비교해서 결정
          onClick={() => handleOptionClick('option5')} // 클릭 시 selectedOption 상태 변경
        />
        <PromptOption 
          title="Self-Consistency" 
          description="여러 해결책 중 가장 적합한 방법을 선택할 때" 
          selected={selectedOption === 'option6'} // selected는 선택된 ID와 비교해서 결정
          onClick={() => handleOptionClick('option6')} // 클릭 시 selectedOption 상태 변경
        />
        <PromptOption 
          title="Tree of Thoughts" 
          description="문제를 단계별로 분해하여 해결해야 할 때" 
          selected={selectedOption === 'option7'} // selected는 선택된 ID와 비교해서 결정
          onClick={() => handleOptionClick('option7')} // 클릭 시 selectedOption 상태 변경
        />
        <PromptOption 
          title="Active-Prompt" 
          description="상호작용을 통해 점진적으로 답을 보완하고 싶을 때" 
          selected={selectedOption === 'option8'} // selected는 선택된 ID와 비교해서 결정
          onClick={() => handleOptionClick('option8')} // 클릭 시 selectedOption 상태 변경
        />
      </div>
    </div>
  );
  
  // 대화모드 off일 때
  const renderSummaryView = () => (
    <div
      style={{
        width:'70%',
        //margin: "0 auto",       // 중앙 정렬
        padding: "20px",        // 내부 여백
        boxSizing: "border-box" // 패딩 포함 박스 모델
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "6px",
          marginBottom: "20px",
        }}
      >
        <MyInput value={inputValue} onChange={handleInputChange} placeholder="제목을 입력해주세요." />
        <Button onClick={handleMakeChapter} title={"OK"} type="primary" disabled={loading || !isDetailedView} />
      </div>
      {/* Study Questions */}
      {studyQuestions.map((question, idx) => (
        <div key={idx} style={{ textAlign: "left", marginBottom: "20px" }}>
          <ResultSummary
            key={question.id}
            question={question}
            onCheckboxChange={handleCheckboxChange}
            isChecked={selectedQuestions.some((q) => q.id === question.id)} 
          />
        </div>
      ))}
  
      {/* OpenAI 답변 */}
      {conversation
        .filter((msg) => msg.role === "assistant")
        .map((msg, idx) => (
          <div key={idx} style={{ textAlign: "left", marginBottom: "20px" }}>
            <ResultSummary                   
            question={{
                    answer_title: extractTitleAndContent(msg.content).title,
                    answer_content: extractTitleAndContent(msg.content).content,
                  }} />
          </div>
        ))}
    </div>
  );
  

  return (

    <div style={{ height: "80vh", overflow: "hidden", width: "100%" }}>
      <div style={{ overflow: "auto", height: isDetailedView ? "85%" : "90%", width: "100%" }}>
        {isDetailedView ? renderDetailedView() : renderSummaryView()}
      </div>


      {/* 입력 필드와 버튼 */}
      <div
        style={{
          width: '55%',
          position: "fixed", // 화면 하단에 고정
          bottom: "20px",    // 화면 하단에서 20px 위
          left: "50%",       // 화면 중앙에 위치
          transform: "translateX(-50%)", // 정확히 중앙 정렬
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          backgroundColor: "white",
          padding: "20px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // 약간의 그림자 추가
          borderRadius: "8px", // 둥근 모서리
        }}
      >
        {isDetailedView && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              bottom:'20px',
              gap: "8px",
              marginBottom: "20px",
            }}
          >
            <MyInput value={inputValue} onChange={handleInputChange} placeholder="Ask a question..." />
            <Button
              onClick={handleAskQuestion}
              title={loading ? "생성중✨" : "Ask"}
              type="primary"
              disabled={loading || !isDetailedView}
            />
          </div>
        )}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div>대화모드</div>
          <Toggle checked={isDetailedView} onChange={handleToggleChange} />
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
