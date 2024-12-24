import { useEffect, useState } from 'react';
import { supabase } from '../../src/utils/supabase';
import { useRouter } from 'next/router';
import ProjectName from '../../src/Components/BasicComponents/ProjectName';
import ProjectHeader from '../../src/Components/ComplexComponents/ProjectHeader';
import ChatComponent from '../../src/Components/ComplexComponents/ChatComponent';
import Note from '../../src/Components/ComplexComponents/Note';
import MarkdownEditor from '../../src/Components/ComplexComponents/MarkdownEditor';
import Button from '../../src/Components/BasicComponents/Button';
import React from 'react'; 

const ProjectDetail = ({ project, studyQuestions, notesWithQuestionTitles: initialNotes }) => {
  const [notes, setNotes] = useState(initialNotes || []); 
  const [activeTab, setActiveTab] = useState('study'); // 기본값은 'study'
  const [checkedNotes, setCheckedNotes] = useState({}); // 각 Note의 체크 상태를 관리
  const router = useRouter();
  const { project_id } = router.query;

  if (!project) {
    return <div>프로젝트를 찾을 수 없습니다.</div>;
  }

  console.log("이건 나오나요?...");

  // 노트 체크 상태 업데이트 함수
  const handleNoteCheckChange = (noteId, isChecked) => {
    if (activeTab === 'organizing') {
      // organizing 탭일 때만 체크 상태를 변경하도록
      setCheckedNotes((prev) => ({
        ...prev,
        [noteId]: isChecked,
      }));
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    // 노트의 체크 상태 초기화
    const initialCheckedState = notes.reduce((acc, note) => {
      acc[note.id] = false; // 모든 노트는 처음에 체크되지 않음
      return acc;
    }, {});
    setCheckedNotes(initialCheckedState);

    // 실시간 노트 변경 구독
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
  }, [notes]);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100vh', alignItems: 'flex-start', gap: '20px' }}>
      <div style={{ width: '20%', height: '100vh', display: 'inline-flex', flexDirection: 'column', borderRight: '1px solid #ccc' }}>
        <div style={{ width: '100%', height: 'auto', display: 'flex', flexDirection: 'column', padding: '20px' }}>
          <ProjectName title={project.name} />
          {activeTab === 'organizing' && 
            <Button title="노트 만들기" />}
        </div>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'scroll', marginBottom: '4px' }}>
          {/* notes가 배열인지 확인하고 map() 호출 */}
          {Array.isArray(notes) && notes.length > 0 ? (
            notes.map((note) => {
              const noteQuestions = note.note_questions || [];
              const isChecked = checkedNotes[note.id] || false; // 해당 노트의 체크 상태 확인
              return (
                <Note
                  key={note.id}
                  title={note.title}
                  contentArray={noteQuestions.length > 0 ? noteQuestions.map(nq => nq.question_title) : ['내용 없음']}
                  isChecked={activeTab === 'organizing' ?true : false}  // 'organizing'일 때만 isChecked 전달
                  onCheckChange={activeTab === 'organizing' ? (isChecked) => handleNoteCheckChange(note.id, isChecked) : undefined}  // 'organizing'일 때만 onCheckChange 전달
                />
              );
            })
          ) : (
            <div>노트가 없습니다.</div>
          )}
        </div>
      </div>
      <div style={{ width: '78%', display: 'flex', flexDirection: 'column', overflow: 'hidden', height: '100vh' }}>
        <div style={{ width: '78%', textAlign: 'right', position: 'fixed', top: 0, right: 0, zIndex: 1000, backgroundColor: 'white', padding: '8px' }}>
          <ProjectHeader activeTab={activeTab} onTabChange={handleTabChange} />
        </div>
        {/* 조건부 렌더링 */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'row', gap: '20px', height: '100vh', top: '80px', position: 'relative' }}>
          {activeTab === 'study' && 
            <ChatComponent projectID={project.id} studyQuestions={studyQuestions} />}
          
          {activeTab === 'organizing' && 
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <MarkdownEditor initialContent={'hello world'} onSave={(content) => console.log(content)} />
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
