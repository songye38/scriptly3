import React from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/utils/supabase';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; // 마크다운 확장 지원
//import rehypeHighlight from 'rehype-highlight'; // 코드 하이라이팅 지원

const BlogPost = ({ post }) => {
  const router = useRouter();

  // 로딩 상태 처리
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  // 포스트가 없을 때 처리
  if (!post) {
    return <div>해당 블로그 포스트를 찾을 수 없습니다.</div>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
      {/* 제목 */}
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '20px' }}>
        {post.title}
      </h1>

      {/* 작성 날짜 */}
      <p style={{ color: '#666', marginBottom: '40px' }}>
        작성일: {new Date(post.created_at).toLocaleDateString()}
      </p>

      {/* 마크다운 콘텐츠 */}
      <div style={{ lineHeight: '1.8', fontSize: '1.2rem' }}>
        <ReactMarkdown
          children={post.content}
          remarkPlugins={[remarkGfm]} // GFM 지원 (테이블, 체크박스 등)
          //ehypePlugins={[rehypeHighlight]} // 코드 하이라이팅
        />
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { post_id } = context.params;

  try {
    // Supabase에서 post_id로 데이터 가져오기
    const { data: post, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', post_id)
      .single();

    if (error || !post) {
      console.error('포스트 데이터를 가져오는 데 실패했습니다:', error);
      return { notFound: true }; // 포스트가 없으면 404 페이지 표시
    }

    return {
      props: {
        post,
      },
    };
  } catch (err) {
    console.error('데이터를 가져오는 중 오류가 발생했습니다:', err);
    return { notFound: true };
  }
}

export default BlogPost;
