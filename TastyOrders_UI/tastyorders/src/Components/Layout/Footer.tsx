import React from 'react';

function Footer() {
  return (
    <div className='footer fixed-bottom text-center p-3 bg-dark text-white'>
      &copy; {new Date().getFullYear()} All Rights Reserved. Built with passion and dedication.
    </div>
  );
}

export default Footer;
