import React from 'react';

function ProjectTab({ activeTab, onTabChange }) {
  return (
    <div>
      {/* Study 탭 클릭 시 'study' 전달 */}
      <button onClick={() => onTabChange('study')} style={{ backgroundColor: activeTab === 'study' ? 'green' : 'white' }}>
        학습
      </button>
      
      {/* Organizing 탭 클릭 시 'organizing' 전달 */}
      <button onClick={() => onTabChange('organizing')} style={{ backgroundColor: activeTab === 'organizing' ? 'green' : 'white' }}>
        정리
      </button>
    </div>
  );
}

export default ProjectTab;
