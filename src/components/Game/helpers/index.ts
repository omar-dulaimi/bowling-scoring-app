import { FrameType, GameDataType, ThrowType } from "../../../types";

export const calculateFrameScore = (
  frame: FrameType,
  index: number,
  gameData: GameDataType
) => {
  const nextFrame = gameData.frames?.[index + 1];
  const thenFrame = gameData.frames?.[index + 2];
  let result = 0;
  const isLastFrame = index === 9;

  if (isLastFrame) {
    if (frame.isStrike && frame.isSpare) {
      result += 20;
    } else if (frame.isSpare && !frame.isStrike) {
      result += 10 + Number(frame.thirdThrowSCore);
    } else if (frame.isStrike && !frame.isSpare) {
      result +=
        Number(frame.firstThrowScore) +
        Number(frame.secondThrowScore) +
        Number(frame.thirdThrowSCore);
    }
  } else {
    if (frame.isStrike) {
      result += 10;
      if (nextFrame?.isStrike) {
        if (nextFrame?.canHaveThirdThrow) {
          if (nextFrame?.firstThrowScore === 10) {
            result += 10;
            if (
              Number(nextFrame?.secondThrowScore) +
                Number(nextFrame?.thirdThrowSCore) ===
              10
            ) {
              result += 10;
            } else {
              result += Number(nextFrame?.secondThrowScore);
            }
          } else {
            if (
              Number(nextFrame?.firstThrowScore) +
                Number(nextFrame?.secondThrowScore) ===
              10
            ) {
              result += 10;
              result += Number(nextFrame?.thirdThrowSCore);
            } else {
              result +=
                Number(nextFrame?.firstThrowScore) +
                Number(nextFrame?.secondThrowScore);
            }
          }
        } else {
          result += 10;
          if (thenFrame?.isStrike) {
            result += 10;
          } else {
            result += Number(thenFrame?.firstThrowScore);
          }
        }
      } else {
        result +=
          Number(nextFrame?.firstThrowScore) +
          Number(nextFrame?.secondThrowScore);
      }
    } else if (frame.isSpare) {
      result += 10;
      if (nextFrame?.isStrike) {
        result += 10;
      } else {
        result += Number(nextFrame?.firstThrowScore);
      }
    } else {
      result += Number(frame.firstThrowScore) + Number(frame.secondThrowScore);
    }
  }
  return result;
};

export const getCardPointerEventsValue = (
  frame: FrameType,
  index: number,
  currentFrameIndex: number
) => {
  if (frame.canHaveThirdThrow) {
    if (!frame.isStrike && !frame.isSpare) {
      if (frame.firstThrowScore !== null && frame.secondThrowScore !== null) {
        return "none";
      }
    } else if (frame.isStrike || frame.isSpare) {
      if (
        frame.firstThrowScore !== null &&
        frame.secondThrowScore !== null &&
        frame.thirdThrowSCore !== null
      ) {
        return "none";
      }
    }
  } else {
    return frame.isStrike || index !== currentFrameIndex ? "none" : "auto";
  }
};

export const getNumbersRange = (frame: FrameType, forThrow: ThrowType) => {
  if (forThrow === "1st") {
    return [0, 10];
  }

  if (forThrow === "2nd") {
    if (frame.canHaveThirdThrow) {
      if (frame.firstThrowScore === 10) {
        return [0, 10];
      } else {
        return [0, 10 - Number(frame.firstThrowScore)];
      }
    } else {
      return [0, 10 - Number(frame.firstThrowScore)];
    }
  }

  if (forThrow === "3rd") {
    if (frame.canHaveThirdThrow) {
      if (
        frame.secondThrowScore === 10 ||
        (frame.firstThrowScore !== null &&
          frame.secondThrowScore !== null &&
          Number(frame.firstThrowScore) + Number(frame.secondThrowScore) === 10)
      ) {
        return [0, 10];
      } else {
        return [0, 10 - Number(frame.secondThrowScore)];
      }
    }
  }
  return [0, 10];
};

export const getRenderChecksForBadge = (
  frame: FrameType,
  forThrow: ThrowType,
  checkType: "text" | "color" | "display"
) => {
  if (forThrow === "1st") {
    if (checkType === "text") return "Strike";
    if (checkType === "color") return "red";
    if (checkType === "display")
      return frame?.firstThrowScore === 10 ? "unset" : "none";
  }

  if (forThrow === "2nd") {
    if (checkType === "text") {
      return frame?.secondThrowScore === 10
        ? "Strike"
        : Number(frame?.firstThrowScore) + Number(frame?.secondThrowScore) ===
            10 &&
          Number(frame?.firstThrowScore) !== 0 &&
          Number(frame?.secondThrowScore) !== 0
        ? "Spare"
        : "";
    }
    if (checkType === "color") {
      return frame?.secondThrowScore === 10
        ? "red"
        : Number(frame?.firstThrowScore) + Number(frame?.secondThrowScore) ===
            10 &&
          Number(frame?.firstThrowScore) !== 0 &&
          Number(frame?.secondThrowScore) !== 0
        ? "blue"
        : "";
    }
    if (checkType === "display") {
      return frame?.secondThrowScore === 10 ||
        (Number(frame?.firstThrowScore) + Number(frame?.secondThrowScore) ===
          10 &&
          Number(frame?.firstThrowScore) !== 0 &&
          Number(frame.secondThrowScore) !== 0)
        ? "unset"
        : "none";
    }
  }

  if (forThrow === "3rd") {
    if (checkType === "text") {
      return frame?.thirdThrowSCore === 10
        ? "Strike"
        : Number(frame?.secondThrowScore) + Number(frame?.thirdThrowSCore) ===
            10 &&
          Number(frame?.secondThrowScore) !== 0 &&
          Number(frame?.thirdThrowSCore) !== 0
        ? "Spare"
        : "";
    }
    if (checkType === "color") {
      return frame?.thirdThrowSCore === 10
        ? "red"
        : Number(frame?.secondThrowScore) + Number(frame?.thirdThrowSCore) ===
            10 &&
          Number(frame?.secondThrowScore) !== 0 &&
          Number(frame?.thirdThrowSCore) !== 0
        ? "blue"
        : "";
    }
    if (checkType === "display") {
      return frame?.thirdThrowSCore === 10 ||
        (Number(frame?.secondThrowScore) + Number(frame?.thirdThrowSCore) ===
          10 &&
          Number(frame?.secondThrowScore) !== 0 &&
          Number(frame?.thirdThrowSCore) !== 0)
        ? "unset"
        : "none";
    }
  }
};

export const checkIfGameIsComplete = (
  newFrameIndex: number,
  gameData: GameDataType
) => {
  if (newFrameIndex === -1) {
    const currentFrame = gameData.frames[9];
    if (currentFrame?.canHaveThirdThrow) {
      if (
        !currentFrame?.isStrike &&
        !currentFrame?.isSpare &&
        currentFrame?.firstThrowScore !== null &&
        currentFrame?.secondThrowScore !== null &&
        Number(currentFrame?.firstThrowScore) >= 0 &&
        Number(currentFrame?.secondThrowScore) >= 0
      ) {
        return true;
      }

      if (
        (currentFrame?.isStrike || currentFrame?.isSpare) &&
        currentFrame?.firstThrowScore !== null &&
        currentFrame?.secondThrowScore !== null &&
        currentFrame?.thirdThrowSCore !== null &&
        Number(currentFrame?.firstThrowScore) >= 0 &&
        Number(currentFrame?.secondThrowScore) >= 0 &&
        Number(currentFrame?.thirdThrowSCore) >= 0
      ) {
        return true;
      }
    }
  }
  return false;
};
