import React from 'react';
import Logo from '../BasicComponents/Logo';
import Button from '../BasicComponents/Button';
import ProjectName from '../BasicComponents/ProjectName';

const ProjectHeader = ({ activeTab, onTabChange }) => {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection:'column',
        // padding: '8px 20px',
      }}
    >

      {/* Logo는 항상 보이고, Button은 'organizing' 탭에서만 보임 */}
      <div style={{ display: 'flex', flexDirection: 'row', gap: '4px', alignItems: 'center' }}>
        <Logo />
      </div>
      {/* xo */}
      <div style={{height: '100%', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex' }}>
  {/* Study Tab */}
  <div
    style={{
      width : '100%',
      height: 31,
      padding: 4,
      background: activeTab === 'study' ? '#3150EE' : '#F5F5F5', // activeTab에 따라 배경색 변경
      borderRadius: 4,
      border: activeTab === 'study' ? '1px #3150EE solid' : 'none', // activeTab에 따라 테두리 색상 변경
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
      display: 'flex',
      cursor: 'pointer',
    }}
    onClick={() => onTabChange('study')}
  >
    <div
      style={{
        color: activeTab === 'study' ? 'white' : '#8C8C8C', // activeTab에 따라 텍스트 색상 변경
        fontSize: 14,
        fontFamily: 'Pretendard',
        fontWeight: '500',
        lineHeight: 23,
        wordWrap: 'break-word',
      }}
    >
      학습
    </div>
  </div>

  {/* Organizing Tab */}
  <div
    style={{
      width : '100%',
      height: 31,
      padding: 4,
      background: activeTab === 'organizing' ? '#3150EE' : '#F5F5F5', // activeTab에 따라 배경색 변경
      borderRadius: 4,
      border: activeTab === 'organizing' ? '1px #3150EE solid' : 'none', // activeTab에 따라 테두리 색상 변경
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
      display: 'flex',
      cursor: 'pointer',
    }}
    onClick={() => onTabChange('organizing')}
  >
    <div
      style={{
        color: activeTab === 'organizing' ? 'white' : '#8C8C8C', // activeTab에 따라 텍스트 색상 변경
        fontSize: 14,
        fontFamily: 'Pretendard',
        fontWeight: '500',
        lineHeight: 23,
        wordWrap: 'break-word',
      }}
    >
      정리
    </div>
  </div>
</div>

      {/* <div>
        <ProjectName title ={title}/>
      </div> */}

    </div>
  );
};

export default ProjectHeader;
