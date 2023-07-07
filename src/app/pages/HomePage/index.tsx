import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

export function HomePage() {
  useEffect(() => {}, []);

  return (
    <>
      <Helmet>
        <title>Home Page</title>
      </Helmet>
    </>
  );
}
