import React from 'react';
import Logo from '../BasicComponents/Logo';
import UserProfile from '../BasicComponents/UserProfile';

const Header = () => {
  return (
    <div style={{ width: '100%', height: '100%', paddingTop: 0, paddingBottom: 32, justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex' }}>
        <Logo />
        <UserProfile />
    </div>
  );
};

export default Header;
