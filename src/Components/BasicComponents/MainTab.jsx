import React, { useState,useEffect } from 'react';
import { useRouter } from 'next/router';
import InputModal from './InputModal';
import { supabase } from '@/utils/supabase';
import Link from 'next/link';
import './MainTab.css';


const MainTab = ({ posts, projects }) => {
  const [projectName, setProjectName] = useState('');

  // 상태 관리: 기본 탭은 블로그로 설정
  const [activeTab, setActiveTab] = useState('blog'); // 'blog' 또는 'study'로 상태 관리

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
    <div className="main-tab-container">
      {/* 탭 메뉴 */}
      <div className="tabs">
        <div
          className={`tab ${activeTab === 'blog' ? 'active' : ''}`}
          onClick={() => handleTabClick('blog')}
        >
          블로그
        </div>
        <div
          className={`tab ${activeTab === 'study' ? 'active' : ''}`}
          onClick={() => handleTabClick('study')}
        >
          공부
        </div>
      </div>
      <div className="content-container">
        {activeTab === 'blog' && (
          <div className="blog-container">
            {posts.map((post) => (
              <Link href={`/posts/${post.id}`} key={post.id}>
                <div className="blog-card">
                  <h3>{post.title}</h3>
                  <p>{post.content}</p>
                  <div className="blog-card-footer">
                    {/* <div className="tag">{post.tag || 'General'}</div> */}
                    <button
                      onClick={() => handlePostClick(post.id)}
                      className="read-more-btn"
                    >
                      Read More
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        {activeTab === 'study' && (
          <div className="study-container">
            <InputModal setProjectName={handleCreateProject} />
            {projects.map((project, index) => {
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

              const image = images[(index + 1) % images.length]; // 첫 번째는 버튼, 이후는 기존 순서 유지

              return (
                <div
                  key={project.id}
                  className="study-card"
                  onClick={() => handleProjectClick(project.id)}
                >
                  <div
                    className="image"
                    style={{ backgroundImage: `url(${image})` }}
                  />
                  <div className="text">{project.name}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MainTab;
