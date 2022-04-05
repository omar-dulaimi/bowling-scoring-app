import { useState, useEffect, FC } from "react";
import {
  Divider,
  Row,
  Col,
  Card,
  Collapse,
  Statistic,
  Badge,
  Form,
  Button,
} from "antd";
import { createArrayFromRange } from "../../utils";
import { FrameType, GameDataType, ThrowType } from "../../types";
import { INITIAL_GAME_DATA } from "../../constants/initial-game-state";
import "./Game.css";
import {
  calculateFrameScore,
  checkIfGameIsComplete,
  getCardPointerEventsValue,
  getNumbersRange,
  getRenderChecksForBadge,
} from "./helpers";
import ResultsModal from "./ResultsModal/Results-modal";

const { Panel } = Collapse;

interface GameProps {
  loadedGameData: GameDataType;
}

const Game: FC<GameProps> = (props) => {
  const { loadedGameData } = props;
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [gameData, setGameData] = useState<GameDataType>({
    ...(loadedGameData ?? INITIAL_GAME_DATA),
  });
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    let totalGameScore = 0;
    const framesToScore = gameData.frames.map((frame, index) => {
      const frameScore = calculateFrameScore(frame, index, gameData);
      totalGameScore += frameScore;
      return {
        ...frame,
        frameScore,
      };
    });
    gameData.frames = framesToScore;
    gameData.totalGameScore = totalGameScore;
    setGameData(gameData);
  }, [gameData, currentFrameIndex]);

  useEffect(() => {
    let newFrameIndex = -1;
    for (let i = 0; i < gameData.frames.length; i += 1) {
      const frame = gameData.frames[i];
      if (
        frame.isStrike ||
        (frame.firstThrowScore !== null &&
          frame.secondThrowScore !== null &&
          Number(frame.firstThrowScore) >= 0 &&
          Number(frame.secondThrowScore) >= 0)
      ) {
        continue;
      }
      newFrameIndex = i;
      break;
    }
    setCurrentFrameIndex(newFrameIndex);
    if (checkIfGameIsComplete(newFrameIndex, gameData)) {
      setShowResults(true);
    }
  }, [gameData]);

  const getFrameThrowButtons = (
    frame: FrameType,
    index: number,
    forThrow: ThrowType
  ) => {
    switch (forThrow) {
      case "1st":
        return createArrayFromRange(getNumbersRange(frame, "1st")).map(
          (value) => (
            <Button
              key={value}
              disabled={value === frame.firstThrowScore}
              onClick={() => {
                const frameToUpdate = {
                  ...gameData.frames[index],
                };
                frameToUpdate.firstThrowScore = value;
                if (value === 10) {
                  frameToUpdate.isStrike = true;
                }
                const frameScore = calculateFrameScore(
                  frameToUpdate,
                  index,
                  gameData
                );
                frameToUpdate.frameScore = frameScore;
                gameData.frames[index] = frameToUpdate;
                setGameData({
                  ...gameData,
                });
              }}
            >
              {value}
            </Button>
          )
        );

      case "2nd": {
        return (
          (!frame.isStrike || frame.canHaveThirdThrow) &&
          createArrayFromRange(getNumbersRange(frame, "2nd")).map((value) => (
            <Button
              key={value}
              disabled={value === frame.secondThrowScore}
              onClick={() => {
                const frameToUpdate = {
                  ...gameData.frames[index],
                };
                frameToUpdate.secondThrowScore = value;
                if (value === 10) {
                  frameToUpdate.isStrike = true;
                }

                if (value + Number(frameToUpdate.firstThrowScore) === 10) {
                  frameToUpdate.isSpare = true;
                }
                const frameScore = calculateFrameScore(
                  frameToUpdate,
                  index,
                  gameData
                );
                frameToUpdate.frameScore = frameScore;
                gameData.frames[index] = frameToUpdate;
                setGameData({
                  ...gameData,
                });

                setCurrentFrameIndex(index + 1);
              }}
            >
              {value}
            </Button>
          ))
        );
      }

      case "3rd":
        return (
          (!frame.isStrike || frame.canHaveThirdThrow) &&
          createArrayFromRange(getNumbersRange(frame, "3rd")).map((value) => (
            <Button
              key={value}
              disabled={value === frame.thirdThrowSCore}
              onClick={() => {
                const frameToUpdate = {
                  ...gameData.frames[index],
                };
                frameToUpdate.thirdThrowSCore = value;
                if (value === 10) {
                  frameToUpdate.isStrike = true;
                }
                const frameScore = calculateFrameScore(
                  frameToUpdate,
                  index,
                  gameData
                );
                frameToUpdate.frameScore = frameScore;
                gameData.frames[index] = frameToUpdate;
                setGameData({
                  ...gameData,
                });
              }}
            >
              {value}
            </Button>
          ))
        );
    }
  };

  return (
    <div className="Game">
      <Row>
        {gameData?.frames?.map((frame, index) => (
          <Col key={index} xs={24} sm={12} md={10} lg={8} xl={6}>
            <Badge.Ribbon
              text={getRenderChecksForBadge(frame, "1st", "text")}
              color={getRenderChecksForBadge(frame, "1st", "color")}
              placement="start"
              style={{
                display: getRenderChecksForBadge(frame, "1st", "display"),
              }}
            >
              <Badge.Ribbon
                text={getRenderChecksForBadge(frame, "2nd", "text")}
                color={getRenderChecksForBadge(frame, "2nd", "color")}
                placement="start"
                style={{
                  top: "36px",
                  display: getRenderChecksForBadge(frame, "2nd", "display"),
                }}
              >
                <Badge.Ribbon
                  text={getRenderChecksForBadge(frame, "3rd", "text")}
                  color={getRenderChecksForBadge(frame, "3rd", "color")}
                  placement="start"
                  style={{
                    top: "64px",
                    display: getRenderChecksForBadge(frame, "3rd", "display"),
                  }}
                >
                  <Card
                    style={{
                      width: "90%",
                      marginTop: 12,
                      textAlign: "center",
                      ...(index === currentFrameIndex && {
                        borderColor: "darkblue",
                      }),
                      pointerEvents: getCardPointerEventsValue(
                        frame,
                        index,
                        currentFrameIndex
                      ),
                    }}
                    hoverable
                    title={frame.name}
                  >
                    <Collapse bordered={false}>
                      <Panel
                        header={`First throw => ${Number(
                          frame.firstThrowScore
                        )}`}
                        key="1"
                      >
                        <Form
                          layout={"inline"}
                          initialValues={{ layout: "vertical" }}
                        >
                          <Col xs={24} style={{ width: "100%" }}>
                            {getFrameThrowButtons(frame, index, "1st")}
                          </Col>
                        </Form>
                      </Panel>
                      <Panel
                        header={`Second throw => ${Number(
                          frame.secondThrowScore
                        )}`}
                        key="2"
                      >
                        <Form
                          layout={"inline"}
                          initialValues={{ layout: "inline" }}
                        >
                          <Col xs={24} style={{ width: "100%" }}>
                            {getFrameThrowButtons(frame, index, "2nd")}
                          </Col>
                        </Form>
                      </Panel>
                      {frame.canHaveThirdThrow && (
                        <Panel
                          header={`Third throw => ${Number(
                            frame.thirdThrowSCore
                          )}`}
                          key="3"
                        >
                          <Form
                            layout={"inline"}
                            initialValues={{ layout: "inline" }}
                          >
                            <Col xs={24} style={{ width: "100%" }}>
                              {getFrameThrowButtons(frame, index, "3rd")}
                            </Col>
                          </Form>
                        </Panel>
                      )}
                    </Collapse>

                    <Divider orientation="left" plain>
                      Score
                    </Divider>

                    <Statistic title="" value={Number(frame.frameScore)} />
                  </Card>
                </Badge.Ribbon>
              </Badge.Ribbon>
            </Badge.Ribbon>
          </Col>
        ))}
      </Row>
      <ResultsModal
        showResults={showResults}
        setShowResults={setShowResults}
        gameData={gameData}
      />
    </div>
  );
};

export default Game;
