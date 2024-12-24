import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';

export const useProjectData = (projectId) => {
  const [project, setProject] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // 프로젝트 데이터 가져오기
        const { data: project, error: projectError } = await supabase
          .from('projects')
          .select('*')
          .eq('id', projectId)
          .single();
        if (projectError) throw projectError;

        setProject(project);

        // 관련 포스트 가져오기
        const { data: posts, error: postsError } = await supabase
          .from('posts')
          .select('*')
          .eq('project_id', projectId);
        if (postsError) throw postsError;

        setPosts(posts || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [projectId]);

  return { project, posts, loading, error };
};
