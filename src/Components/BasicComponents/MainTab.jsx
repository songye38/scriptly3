import React, { useState,useEffect } from 'react';
import { useRouter } from 'next/router';
import InputModal from './InputModal';
import { supabase } from '@/utils/supabase';

const MainTab = ({ posts, projects }) => {
  const [projectName, setProjectName] = useState('');

  // 상태 관리: 기본 탭은 블로그로 설정
  const [activeTab, setActiveTab] = useState('blog'); // 'blog' 또는 'study'로 상태 관리
    // activeTab이 변경될 때마다 콘솔 찍기

  const handleTabClick = (tab) => {
    console.log("Changing tab to:", tab); // 탭 전환 시 로그 확인
    setActiveTab(tab);
  };
  const router = useRouter();

  const handleProjectClick = (projectId) => {
    router.push(`/projects/${projectId}`); // 클릭 시 해당 프로젝트 페이지로 이동
  };

 const createProject = async (name) => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([{ name, description: '새 프로젝트' }])
        .select();

      if (error) {
        console.error('Error:', error);
        throw new Error(error.message);
      }

      const project = data[0];
      router.push(`/projects/${project.id}`);
    } catch (error) {
      console.error('프로젝트 생성 실패:', error.message);
    }
  };

  const handleCreateProject = (name) => {
    setProjectName(name);
    createProject(name);
  };



  return (
    <div style={{heigh:'100%'}}>
      {/* 탭 메뉴 */}
      <div style={{ display: 'flex', gap: '0px' ,marginBottom:'12px'}}>
        <div
          style={{
            fontSize:'16px',
            padding: '10px',
            cursor: 'pointer',
            fontWeight: activeTab === 'blog' ? '500' : '300',
            color: activeTab === 'blog' ? 'black' : '#BFBFBF',
            borderBottom: activeTab === 'blog' ? '2px solid black' : 'none',
          }}
          onClick={() => handleTabClick('blog')}
        >
          블로그
        </div>
        <div
          style={{
            fontSize:'16px',
            padding: '10px',
            cursor: 'pointer',
            fontWeight: activeTab === 'study' ? '500' : '300',
            color: activeTab === 'study' ? 'black' : '#BFBFBF',
            borderBottom: activeTab === 'study' ? '2px solid black' : 'none',
          }}
          onClick={() => handleTabClick('study')}
        >
          공부
        </div>
      </div>
      <div style={{height:'100vh',overflowY:'auto'}}>
        {activeTab === 'blog' && (
    <div style={{
      display: 'grid', 
      gridTemplateColumns: 'repeat(3, 1fr)', // 한 줄에 3개의 카드 배치
      gap: '20px',
      marginTop: '20px',
    }}>
      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            background: 'linear-gradient(135deg, #E0E4FF, #B5C6FF)',
            borderRadius: '12px',
            boxShadow: '0 6px 18px rgba(0, 0, 0, 0.15)',
            padding: '20px',
            transition: 'transform 0.4s ease, box-shadow 0.4s ease',
            transformStyle: 'preserve-3d',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05) rotateX(3deg)';
            e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1) rotateX(0)';
            e.currentTarget.style.boxShadow = '0 6px 18px rgba(0, 0, 0, 0.15)';
          }}
        >
          <h3 style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#2E3A59',
            marginBottom: '14px',
            lineHeight: '1.5',
          }}>
            {post.title}
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#525F7F',
            lineHeight: '1.8',
            wordWrap: 'break-word',
            maxHeight: '100px',
            overflow: 'hidden', // 내용이 너무 길 경우 잘라냄
          }}>
            {post.content}
          </p>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '16px',
          }}>
            <div style={{
              fontSize: '12px',
              color: '#7888A4',
              background: '#F0F4FF',
              padding: '4px 8px',
              borderRadius: '16px',
              textTransform: 'uppercase',
              fontWeight: '500',
            }}>
              {post.tag || 'General'} {/* 예: 태그를 표시 */}
            </div>
            <button
              onClick={() => handlePostClick(post.id)} // 클릭 시 블로그 포스트 상세 페이지로 이동
              style={{
                padding: '8px 16px',
                backgroundColor: '#5670F1',
                color: '#fff',
                border: 'none',
                borderRadius: '20px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                transition: 'background-color 0.3s, transform 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#435BB2';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#5670F1';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Read More
            </button>
          </div>
        </div>
      ))}
    </div>
        )}
        {activeTab === 'study' && (
          <div style={{height:'100%',overflow:'scroll'}}>
              <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)', // 4개의 카드 배치
              gap: '20px', // 카드 간 간격
              marginTop: '20px', // 상단 여백
            }}
          >
            {/* 첫 번째 카드: 버튼 */}
            <InputModal setProjectName={handleCreateProject} />
            

            {/* 나머지 카드 */}
            {projects.map((project, index) => {
              // 이미지 배열
              const images = [
                '/images/thumb1.png',
                '/images/thumb2.png',
                '/images/thumb3.png',
                '/images/thumb4.png',
                '/images/thumb5.png',
                '/images/thumb6.png',
                '/images/thumb7.png',
                '/images/thumb8.png',
              ];

              // 이미지 매핑
              const image = images[(index + 1) % images.length]; // 첫 번째는 버튼, 이후는 기존 순서 유지

              return (
                <div
                  key={project.id}
                  style={{
                    cursor: 'pointer',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    position: 'relative',
                    backgroundColor: '#ffffff',
                    border: '1px solid #e6e6e6',
                    boxShadow: '0 1px 1px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    height: '200px',
                  }}
                  onClick={() => handleProjectClick(project.id)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow =
                      '0 12px 24px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow =
                      '0 8px 16px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  {/* 이미지 섹션 */}
                  <div
                    style={{
                      height: '100%',
                      width: '100%',
                      backgroundImage: `url(${image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  ></div>
                  {/* 텍스트 섹션 */}
                  <div
                    style={{
                      width: '100%',
                      position: 'absolute',
                      bottom: '0px',
                      color: 'black',
                      backgroundColor: 'white',
                      padding: '14px 16px',
                      borderRadius: '4px',
                      fontSize: '14px',
                      fontWeight: '500',
                      textAlign: 'center',
                    }}
                  >
                    {project.name}
                  </div>
                </div>
              );
            })}
          </div>
          </div>

        )}
      </div>
    </div>
  );
};

export default MainTab;

