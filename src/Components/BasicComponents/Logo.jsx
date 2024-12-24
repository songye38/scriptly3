import React from 'react';
import Link from 'next/link';

const Logo = () => {
  return (
    <div style={{ width: 'auto', height: 'auto', padding: '10px' }}>
      <Link href="/" passHref>
        <img
          style={{ width: '100px', height: '40px', borderRadius: '9999px' }}
          src="/images/logo.svg"
          alt="Logo img"
        />
      </Link>
    </div>
  );
};

export default Logo;
