import React, { Dispatch, lazy, SetStateAction, Suspense } from "react";
import { GameDataType } from "../../types";

const LazyHome = lazy(() => import("./Home"));

const Home = (
  props: JSX.IntrinsicAttributes & { children?: React.ReactNode } & {
    setLoadedGameData: Dispatch<SetStateAction<GameDataType | null>>;
  }
) => (
  <Suspense fallback={null}>
    <LazyHome {...props} />
  </Suspense>
);

export default Home;
