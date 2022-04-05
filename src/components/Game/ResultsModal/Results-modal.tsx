import React, { Dispatch, FC, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { Modal, Button, Statistic } from "antd";
import "./ResultsModal.css";
import { GameDataType } from "../../../types";

interface ResultsModalProps {
  showResults: boolean;
  setShowResults: Dispatch<SetStateAction<boolean>>;
  gameData: GameDataType;
}

const ResultsModal: FC<ResultsModalProps> = (props) => {
  const { showResults, setShowResults, gameData } = props;

  const handleOk = async () => {
    console.log(gameData);
    setShowResults(false);
  };

  const handleCancel = () => {
    setShowResults(false);
  };

  const exportGameData = () => {
    setShowResults(false);
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(gameData)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "bowling-game-data.json";
    link.click();
  };

  return (
    <div className="ResultsModal">
      <Modal
        visible={showResults}
        title="Game Results"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back-game" onClick={handleCancel}>
            Return
          </Button>,
          <Link key="back-main-link" to={"/"}>
            <Button key="back-main">Return to Main Screen</Button>
          </Link>,
          <Button key="export" type="primary" onClick={exportGameData}>
            Export Game
          </Button>,
        ]}
      >
        <Statistic title="Total Score" value={gameData.totalGameScore} />
      </Modal>
    </div>
  );
};

export default ResultsModal;
