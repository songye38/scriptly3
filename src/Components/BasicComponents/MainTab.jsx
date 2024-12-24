import React, { useState,useEffect } from 'react';
import { useRouter } from 'next/router';

const MainTab = ({ posts, projects }) => {

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

  return (
    <div>
      {/* 탭 메뉴 */}
      <div style={{ display: 'flex', gap: '0px' ,marginBottom:'12px'}}>
        <div
          style={{
            fontSize:'16px',
            padding: '10px',
            cursor: 'pointer',
            fontWeight: activeTab === 'blog' ? '600' : '400',
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
            fontWeight: activeTab === 'study' ? '600' : '400',
            color: activeTab === 'study' ? 'black' : '#BFBFBF',
            borderBottom: activeTab === 'study' ? '2px solid black' : 'none',
          }}
          onClick={() => handleTabClick('study')}
        >
          공부
        </div>
      </div>
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
          backgroundColor: '#fff',
          borderRadius: '10px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
          padding: '20px',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.2)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        }}
      >
        <h3 style={{
          fontSize: '14px',
          fontWeight: '400',
          color: '#333',
          marginBottom: '12px',
          lineHeight: '1.4',
          textTransform: 'capitalize', // 제목을 첫 글자만 대문자로
        }}>
          {post.title}
        </h3>
        <p style={{
          fontSize: '14px',
          color: '#666',
          lineHeight: '1.6',
          wordWrap: 'break-word',
          maxHeight: '120px',
          overflow: 'hidden', // 내용이 너무 길 경우 잘라냄
        }}>
          {post.content}
        </p>
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '12px',
        }}>
          <button
            onClick={() => handlePostClick(post.id)} // 클릭 시 블로그 포스트 상세 페이지로 이동
            style={{
              padding: '6px 12px',
              backgroundColor: '#5670F1',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              transition: 'background-color 0.3s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#435BB2'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#5670F1'}
          >
            Read More
          </button>
        </div>
      </div>
    ))}
  </div>
)}
      {activeTab === 'study' && (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)', // 4개의 카드 배치
          gap: '20px', // 카드 간 간격ㄴ
          marginTop: '20px', // 상단 여백
        }}
      >
        {projects.map((project, index) => {
          // 사용할 이미지 파일 배열
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

          // 현재 프로젝트의 이미지 선택
          const image = images[index % images.length]; // 순차적으로 순회하며 매핑

          return (
            <div
              key={project.id}
              style={{
                cursor: 'pointer',
                borderRadius: '8px', // 둥근 모서리
                overflow: 'hidden', // 내용이 넘칠 경우 숨기기
                position: 'relative', // 텍스트를 이미지 위에 얹기 위해 필요
                backgroundColor: '#ffffff', // 흰색 배경
                border: '1px solid #e6e6e6', // 연한 테두리
                boxShadow: '0 1px 1px rgba(0, 0, 0, 0.1)', // 그림자 효과
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                height: '200px', // 카드의 고정 높이
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
                  height: '100%', // 카드 전체를 이미지로 채움
                  width: '100%',
                  backgroundImage: `url(${image})`, // 순회 이미지 사용
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              ></div>
              {/* 텍스트 섹션 */}
              <div
                style={{
                  width: '100%',
                  position: 'absolute', // 이미지 위에 텍스트 배치
                  bottom: '0px', // 카드의 하단에 텍스트 배치
                  color: 'black', // 텍스트 색상
                  backgroundColor: 'white', // 텍스트 배경색
                  padding: '14px 16px', // 텍스트 주변 여백
                  borderRadius: '4px', // 둥근 모서리
                  fontSize: '14px',
                  fontWeight: '500',
                  textAlign: 'center', // 가운데 정렬
                }}
              >
                {project.name}
              </div>
            </div>
          );
        })}
      </div>
      )}
    </div>
  );
};

export default MainTab;

