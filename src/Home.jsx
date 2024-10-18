import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
  <>

  <Link to={'/maze'}>
  <button type={'submit'}> MAZE </button>
  </Link>
  <Link to={'/map'}>
    <button type={'submit'}> MAP </button>
  </Link>

  </>
  );
}

export default Home;