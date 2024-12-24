import React from 'react';
import Logo from '../BasicComponents/Logo';
import Button from '../BasicComponents/Button';
import ProjectName from '../BasicComponents/ProjectName';

const ProjectHeader = ({ activeTab, onTabChange,title }) => {
  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' ,margin:'8px 20px'}}>
      <div style={{}}>
        <ProjectName title={title} />
      </div>
      <div style={{ width: 'auto', height: '100%', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex' }}>
        {/* Study Tab */}
        <div
          style={{
            paddingLeft: 8,
            paddingRight: 8,
            paddingTop: 6,
            paddingBottom: 6,
            borderBottom: activeTab === 'study' ? '1px solid black' : 'none', // 활성화된 탭에 밑줄 추가
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
            display: 'flex',
            cursor: 'pointer',
            backgroundColor: activeTab === 'study' ? 'transparent' : 'transparent', // 활성화된 탭 배경색
          }}
          onClick={() => onTabChange('study')} // 'study' 탭 클릭 시 상태 변경
        >
          <div
            style={{
              color: activeTab === 'study' ? 'black' : '#999999', // 활성화된 탭은 검정, 나머지는 회색
              fontSize: '14px',
              fontFamily: 'Pretendard',
              fontWeight: '500',
              lineHeight: '23px',
              wordWrap: 'break-word',
            }}
          >
            학습
          </div>
        </div>

        {/* Organizing Tab */}
        <div
          style={{
            paddingLeft: 8,
            paddingRight: 8,
            paddingTop: 6,
            paddingBottom: 6,
            borderBottom: activeTab === 'organizing' ? '1px solid black' : 'none', // 활성화된 탭에 밑줄 추가
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            cursor: 'pointer',
            backgroundColor: activeTab === 'organizing' ? 'transparent' : 'transparent', // 활성화된 탭 배경색
          }}
          onClick={() => onTabChange('organizing')} // 'organizing' 탭 클릭 시 상태 변경
        >
          <div
            style={{
              color: activeTab === 'organizing' ? 'black' : '#999999', // 활성화된 탭은 검정, 나머지는 회색
              fontSize: '14px',
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

      {/* Logo는 항상 보이고, Button은 'organizing' 탭에서만 보임 */}
      <div style={{ display: 'flex', flexDirection: 'row', gap: '4px', alignItems: 'center' }}>
        {activeTab === 'organizing' && <Button title="블로그로 발행하기" />}
        <Logo />
      </div>
    </div>
  );
};

export default ProjectHeader;
