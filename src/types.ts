export type FrameType = {
  name: string;
  frameScore: number | null;
  firstThrowScore: number | null;
  secondThrowScore: number | null;
  thirdThrowSCore: number | null;
  isSpare: boolean;
  isStrike: boolean;
  isDoneScoring: boolean;
  canHaveThirdThrow: boolean;
};

export type GameDataType = {
  frames: FrameType[];
  totalGameScore: number;
};

export type ThrowType = "1st" | "2nd" | "3rd";
