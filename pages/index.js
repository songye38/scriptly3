// Home.js (컴포넌트 파일)
import { useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../src/utils/supabase';
import Header from '../src/Components/ComplexComponents/Header';
import MainTab from '../src/Components/BasicComponents/MainTab';
import InputModal from '../src/Components/BasicComponents/InputModal';

const Home = ({ posts, projects }) => {
  console.log("메인 화면에 왔다.");
  const [projectName, setProjectName] = useState('');
  const router = useRouter();

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
    <div>
      <Header />
      <div>
        <InputModal setProjectName={handleCreateProject} />
        <MainTab posts={posts} projects={projects} />
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const { data: posts, error: postsError } = await supabase
    .from('posts')
    .select('*');

  const { data: projects, error: projectsError } = await supabase
    .from('projects')
    .select('*');

  if (postsError || projectsError) {
    console.error("Error fetching data:", postsError || projectsError);
    return { props: { posts: [], projects: [] } };
  }
  console.log("불러온 데이터0----------------",posts);
  return { props: { posts, projects } };
};

export default Home;
