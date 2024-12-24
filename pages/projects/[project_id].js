import { useEffect, useState } from 'react';
import { supabase } from '../../src/utils/supabase';
import { useRouter } from 'next/router';
import ProjectHeader from '../../src/Components/ComplexComponents/ProjectHeader';
import ChatComponent from '../../src/Components/ComplexComponents/ChatComponent';
import Note from '../../src/Components/ComplexComponents/Note';
import MarkdownEditor from '../../src/Components/ComplexComponents/MarkdownEditor';
import Button from '../../src/Components/BasicComponents/Button';
import React from 'react';
import ProjectName from '@/Components/BasicComponents/ProjectName';

const ProjectDetail = ({ project, studyQuestions, notesWithQuestionTitles: initialNotes }) => {
  const [notes, setNotes] = useState(initialNotes || []); 
  const [activeTab, setActiveTab] = useState('study'); // 기본값은 'study'
  const [checkedNotes, setCheckedNotes] = useState({}); // 각 Note의 체크 상태를 관리
  const [editorContent, setEditorContent] = useState('');
  const router = useRouter();
  const { project_id } = router.query;

  if (!project) {
    return <div>프로젝트를 찾을 수 없습니다.</div>;
  }

  // 노트 체크 상태 업데이트 함수
  const handleNoteCheckChange = (noteId, isChecked) => {
    console.log("선택된 노트",noteId);
    // 'organizing' 탭에서만 체크 상태를 관리하도록
    if (activeTab === 'organizing') {
      setCheckedNotes((prev) => ({
        ...prev,
        [noteId]: isChecked, // 해당 노트의 체크 상태를 업데이트
      }));
    }
  };

  // 버튼 클릭 시 체크된 노트 데이터 서버에서 가져오기
  const fetchDataForCheckedNotes = async () => {
    // 체크된 노트들의 ID 추출
    const checkedNoteIds = Object.keys(checkedNotes).filter((noteId) => checkedNotes[noteId]);

    if (checkedNoteIds.length === 0) {
      alert('체크된 노트가 없습니다!');
      return;
    }

    try {
      // 체크된 노트들의 질문들을 가져오기
      const { data: noteQuestions, error } = await supabase
        .from('note_questions')
        .select('question_id')
        .in('note_id', checkedNoteIds);

      if (error) {
        console.error('note_questions 데이터를 가져오는 데 실패했습니다:', error);
        return;
      }

      const questionIds = noteQuestions.map((noteQuestion) => noteQuestion.question_id);

      // study_questions에서 answer_title과 answer_content 가져오기
      const { data: studyQuestionsData, error: studyQuestionsError } = await supabase
        .from('study_questions')
        .select('answer_title, answer_content')
        .in('id', questionIds);

      if (studyQuestionsError) {
        console.error('study_questions 데이터를 가져오는 데 실패했습니다:', studyQuestionsError);
        return;
      }

      // 노트 내용과 질문을 결합하여 편집기 콘텐츠 만들기
      let combinedContent = '';
      studyQuestionsData.forEach((studyQuestion) => {
        combinedContent += `### ${studyQuestion.answer_title}\n\n${studyQuestion.answer_content}\n\n`;
      });

      // 상태 업데이트하여 에디터에 콘텐츠 설정
      setEditorContent(combinedContent); // 에디터 콘텐츠 상태 업데이트
    } catch (error) {
      console.error('데이터 가져오기 실패:', error);
    }
  };

  // 저장하기 버튼 클릭 시 서버로 데이터를 보내는 함수
  const handleSaveButtonClick = async () => {
    // 체크된 노트들을 위한 데이터를 서버에서 가져오고 에디터에 설정
    await fetchDataForCheckedNotes();
  };

  const handleMakeBlogClick = async () => {
    if (!editorContent.trim()) {
      alert('콘텐츠가 비어있습니다. 내용을 작성해주세요.');
      return;
    }

    try {
      // Supabase posts 테이블에 데이터 삽입
      const { data, error } = await supabase
        .from('posts') // posts 테이블
        .insert([
          {
            title: project.name, // 제목
            content: editorContent, // 에디터 내용
          },
        ]);

      if (error) {
        console.error('블로그 발행 중 오류 발생:', error);
        alert('블로그 발행 중 오류가 발생했습니다.');
        return;
      }

      alert('블로그 발행이 성공적으로 완료되었습니다!');
      console.log('발행된 데이터:', data);
    } catch (err) {
      console.error('블로그 발행 실패:', err);
      alert('블로그 발행 중 예기치 못한 오류가 발생했습니다.');
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    // 실시간 노트 변경 구독 (조건문 밖에서 실행)
    const notesChannel = supabase.channel('notes_channel')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'notes' }, async (payload) => {
        console.log('Notes 삽입:', payload);
        const { data: updatedNote } = await supabase
          .from('notes')
          .select('*')
          .eq('id', payload.new.id)
          .single();
  
        if (updatedNote) {
          // 추가된 노트에 해당하는 note_questions 가져오기
          const { data: noteQuestions, error: noteQuestionsError } = await supabase
            .from('note_questions')
            .select('*')
            .eq('note_id', updatedNote.id);
  
          if (noteQuestionsError) {
            console.error('note_questions 데이터를 가져오는 데 실패했습니다:', noteQuestionsError);
            return;
          }
  
          // note_questions에서 question_id를 기반으로 study_questions의 관련 데이터를 가져오기
          const noteQuestionsWithTitles = await Promise.all(
            noteQuestions.map(async (noteQuestion) => {
              const { data: questionData, error: questionError } = await supabase
                .from('study_questions')
                .select('id, answer_title')
                .eq('id', noteQuestion.question_id)
                .single();
  
              if (questionError) {
                console.error('study_questions 데이터를 가져오는 데 실패했습니다:', questionError);
                return null;
              }
  
              return {
                ...noteQuestion,
                question_title: questionData?.answer_title || '질문을 가져오지 못했습니다.',
              };
            })
          );
  
          // note_questions와 관련된 질문들을 포함한 노트 업데이트
          const noteWithQuestions = {
            ...updatedNote,
            note_questions: noteQuestionsWithTitles.filter(nq => nq !== null), // null 필터링
          };
  
          // 중복된 노트를 추가하지 않도록 체크
          setNotes((prevNotes) => {
            if (!prevNotes.some(note => note.id === noteWithQuestions.id)) {
              return [...prevNotes, noteWithQuestions];
            }
            return prevNotes; // 중복된 노트는 추가하지 않음
          });
        }
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'notes' }, async (payload) => {
        console.log('Notes 업데이트:', payload);
        const { data: updatedNote } = await supabase
          .from('notes')
          .select('*')
          .eq('id', payload.new.id)
          .single();
  
        if (updatedNote) {
          // 해당 노트의 note_questions를 가져오기
          const { data: noteQuestions, error: noteQuestionsError } = await supabase
            .from('note_questions')
            .select('*')
            .eq('note_id', updatedNote.id);
  
          if (noteQuestionsError) {
            console.error('note_questions 데이터를 가져오는 데 실패했습니다:', noteQuestionsError);
            return;
          }
  
          // note_questions에서 question_id를 기반으로 study_questions의 관련 데이터를 가져오기
          const noteQuestionsWithTitles = await Promise.all(
            noteQuestions.map(async (noteQuestion) => {
              const { data: questionData, error: questionError } = await supabase
                .from('study_questions')
                .select('id, answer_title')
                .eq('id', noteQuestion.question_id)
                .single();
  
              if (questionError) {
                console.error('study_questions 데이터를 가져오는 데 실패했습니다:', questionError);
                return null;
              }
  
              return {
                ...noteQuestion,
                question_title: questionData?.answer_title || '질문을 가져오지 못했습니다.',
              };
            })
          );
  
          // note_questions와 관련된 질문들을 포함한 노트 업데이트
          const noteWithQuestions = {
            ...updatedNote,
            note_questions: noteQuestionsWithTitles.filter(nq => nq !== null), // null 필터링
          };
  
          setNotes((prevNotes) => {
            const otherNotes = prevNotes.filter((note) => note.id !== noteWithQuestions.id);
            return [...otherNotes, noteWithQuestions];
          });
        }
      })
      .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'notes' }, (payload) => {
        console.log('Notes 삭제:', payload);
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== payload.old.id));
      })
      .subscribe();
  
    // Cleanup 구독
    return () => {
      notesChannel.unsubscribe();
    };
  }, []); // 빈 배열로 설정하여 최초 1회만 실행


  return (
    <div style={{display: 'flex', flexDirection: 'row', width: '100%', height: '100%', alignItems: 'flex-start', gap: '32px'}}>
      <div style={{width: '100%', display: 'flex', flexDirection: 'row', overflow: 'hidden', height: '100vh',gap:'32px',overflow:'hidden'
      }}>
        <div style={{width: '20%',display:'flex',flexDirection:'column',gap:'12px'}}>
          <ProjectHeader activeTab={activeTab} onTabChange={handleTabChange}/>
          {activeTab === 'organizing' && 
          <div style={{display:'flex',flexDirection:'column',gap:'4px'}}>
            <Button title="정리하기"  onClick={handleSaveButtonClick}/>
            <Button title="블로그로 발행하기"  onClick={handleMakeBlogClick} style={{backgroundColor:'black'}}/>
          </div>
          
          }
          <div style={{backgroundColor:'#F5F5F5',padding:'16px',borderRadius:'4px'}}>
            <ProjectName  title={project.name}/>
            {/* 챕터 표시 */}
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', marginBottom: '4px' ,gap:'24px'}}>
            {/* notes가 배열인지 확인하고 map() 호출 */}
            {Array.isArray(notes) && notes.length > 0 ? (
              notes.map((note) => {
                const noteQuestions = note.note_questions || [];
                const isChecked = checkedNotes[note.id] || false; // 해당 노트의 체크 상태 확인
                return (
                  <Note
                    id={note.id}
                    title={note.title}
                    contentArray={noteQuestions.length > 0 ? noteQuestions.map(nq => nq.question_title) : ['내용 없음']}
                    // 'organizing' 탭일 때만 체크박스를 관리할 수 있도록
                    isChecked={activeTab === 'organizing' ? (checkedNotes[note.id] || false) : false} // 체크 상태
                    // 'organizing' 탭일 때만 체크박스가 보이도록
                    isVisible={activeTab === 'organizing'} // 체크박스의 visible 상태
                    onCheckChange={(id, isChecked) => handleNoteCheckChange(id, isChecked)} // 체크 상태 변경 함수
                  />

                );
              })
            ) : (
              <div>노트가 없습니다.</div>
            )}
          </div>

          </div>
        </div>
        {/* 조건부 렌더링 */}
        <div style={{ width: '80%', display: 'flex', flexDirection: 'row', gap: '20px', height: '100vh',top:'20px', position: 'relative' }}>
          {activeTab === 'study' && 
            <ChatComponent projectID={project.id} studyQuestions={studyQuestions} />}
          
          {activeTab === 'organizing' && 
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <MarkdownEditor initialContent={editorContent}  />
            </div>
          }
        </div>
      </div>
    </div>
  );
};


export const getStaticPaths = async () => {
  // 프로젝트 ID를 Supabase에서 가져오기
  const { data: projects, error } = await supabase
    .from('projects')
    .select('id');

  if (error) {
    console.error('프로젝트 목록을 가져오는 데 실패했습니다:', error);
    return { paths: [], fallback: 'blocking' }; // 에러 발생 시 빈 경로 목록 반환
  }

  // 프로젝트 ID를 기반으로 동적 경로 목록 생성
  const paths = projects.map((project) => ({
    params: { project_id: project.id.toString() },  // 동적 경로 파라미터
  }));

  return {
    paths,  // 렌더링할 경로 목록
    fallback: 'blocking', // 새로운 경로가 들어오면 서버에서 렌더링하고 반환
  };
};

export const getStaticProps = async ({ params }) => {
  const { project_id } = params;

  // Supabase에서 해당 프로젝트의 데이터 가져오기
  const { data: projectWithNotes, error } = await supabase
    .from('projects')
    .select(`
      *,
      study_questions (
        id,
        question,
        answer_title,
        answer_content,
        created_at
      ),
      notes (
        id,
        title,
        note_questions (
          id,
          question_id
        )
      )
    `)
    .eq('id', project_id);

  if (error || !projectWithNotes) {
    return { notFound: true }; // 프로젝트가 없으면 404 페이지로 처리
  }

  // 노트 및 질문 데이터 처리
  const notesWithQuestionTitles = await Promise.all(
    projectWithNotes[0]?.notes?.map(async (note) => {
      const noteQuestionsWithTitles = await Promise.all(
        note.note_questions.map(async (noteQuestion) => {
          const { data: questionData, error: questionError } = await supabase
            .from('study_questions')
            .select('answer_title')
            .eq('id', noteQuestion.question_id)
            .single();

          if (questionError) {
            console.error('질문 데이터를 가져오는 데 실패했습니다:', questionError);
            return null;
          }

          return {
            ...noteQuestion,
            question_title: questionData?.answer_title || '질문을 가져오지 못했습니다.',
          };
        })
      );

      return {
        ...note,
        note_questions: noteQuestionsWithTitles,
      };
    })
  );

  return {
    props: {
      project: projectWithNotes[0] || null,
      studyQuestions: projectWithNotes[0]?.study_questions || [],
      notesWithQuestionTitles: notesWithQuestionTitles || [],
    },
  };
};


export default ProjectDetail;
