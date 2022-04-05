import React, { lazy, Suspense } from "react";
import { GameDataType } from "../../types";

const LazyGame = lazy(() => import("./Game"));

const Game = (
  props: JSX.IntrinsicAttributes & { children?: React.ReactNode } & {
    loadedGameData?: GameDataType;
  }
) => (
  <Suspense fallback={null}>
    <LazyGame {...props} />
  </Suspense>
);

export default Game;
