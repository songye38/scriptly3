import React from 'react';

function ProjectTab({ activeTab, onTabChange }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        display: 'inline-flex',
        gap: 10, // 탭 간 간격 설정
      }}
    >
      {/* 학습 탭 */}
      <div
        onClick={() => onTabChange('study')}
        style={{
          height: 31,
          padding: 4,
          background: activeTab === 'study' ? '#CED5FB' : '#F5F5F5',
          borderRadius: 4,
          border: activeTab === 'study' ? '1px #3150EE solid' : 'none',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10,
          display: 'flex',
          cursor: 'pointer',
        }}
      >
        <div
          style={{
            color: activeTab === 'study' ? '#3150EE' : '#8C8C8C',
            fontSize: 14,
            fontFamily: 'Pretendard',
            fontWeight: '500',
            lineHeight: '23px',
            wordWrap: 'break-word',
          }}
        >
          학습
        </div>
      </div>

      {/* 정리 탭 */}
      <div
        onClick={() => onTabChange('organizing')}
        style={{
          height: 31,
          padding: 4,
          background: activeTab === 'organizing' ? '#CED5FB' : '#F5F5F5',
          borderRadius: 4,
          border: activeTab === 'organizing' ? '1px #3150EE solid' : 'none',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10,
          display: 'flex',
          cursor: 'pointer',
        }}
      >
        <div
          style={{
            color: activeTab === 'organizing' ? '#3150EE' : '#8C8C8C',
            fontSize: 14,
            fontFamily: 'Pretendard',
            fontWeight: '500',
            lineHeight: '23px',
            wordWrap: 'break-word',
          }}
        >
          정리
        </div>
      </div>
    </div>
  );
}

export default ProjectTab;
