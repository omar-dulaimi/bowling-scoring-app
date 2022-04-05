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
  getCardPointerEventsValue,
  getNumbersRange,
} from "./helpers";

const { Panel } = Collapse;

interface GameProps {}

const Game: FC<GameProps> = () => {
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [gameData, setGameData] = useState<GameDataType>({
    ...INITIAL_GAME_DATA,
  });

  useEffect(() => {
    const framesToScore = gameData.frames.map((frame, index) => {
      return {
        ...frame,
        frameScore: calculateFrameScore(frame, index, gameData),
      };
    });
    gameData.frames = framesToScore;
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
              text="Strike"
              color="red"
              placement="start"
              style={{ display: frame.isStrike ? "unset" : "none" }}
            >
              <Badge.Ribbon
                text="Spare"
                color="blue"
                placement="start"
                style={{
                  top: "36px",
                  display: frame.isSpare ? "unset" : "none",
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
                      header={`First throw => ${Number(frame.firstThrowScore)}`}
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
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Game;
