import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Logo = () => {
  return (
    <div style={{ width: 'auto', height: 'auto', padding: '10px' }}>
      <Link href="/" passHref>
        <div style={{ cursor: 'pointer' }}>
          <Image
            src="/images/logo.svg"
            alt="Logo img"
            width={100}
            height={40}
            style={{ borderRadius: '9999px' }}
          />
        </div>
      </Link>
    </div>
  );
};

export default Logo;
