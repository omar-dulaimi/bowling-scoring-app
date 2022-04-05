import React, { lazy, Suspense } from 'react';

const LazyGame = lazy(() => import('./Game'));

const Game = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyGame {...props} />
  </Suspense>
);

export default Game;
