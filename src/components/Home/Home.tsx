import { Dispatch, FC, SetStateAction } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Space, Upload } from "antd";
import "./Home.css";
import { GameDataType } from "../../types";

interface HomeProps {
  setLoadedGameData: Dispatch<SetStateAction<GameDataType | null>>;
}

const Home: FC<HomeProps> = (props) => {
  const navigate = useNavigate();
  const { setLoadedGameData } = props;
  return (
    <div className="Home">
      <Space
        className="centered-space"
        direction="vertical"
        size="middle"
        style={{ display: "flex" }}
        align="center"
      >
        <Card className="main-card" bordered={false}>
          <Link to={"/game"}>
            <p
              className="main-option"
              tabIndex={1}
              onClick={() => {
                setLoadedGameData(null);
              }}
            >
              New Game
            </p>
          </Link>

          <Upload
            itemRender={() => null}
            beforeUpload={(file) => {
              const reader = new FileReader();
              reader.onload = (e) => {
                setLoadedGameData(JSON.parse(e?.target?.result as string));
                navigate("/game");
              };
              reader.readAsText(file);
              return false;
            }}
          >
            <p className="main-option" tabIndex={2}>
              Load
            </p>
          </Upload>
        </Card>
      </Space>
    </div>
  );
};

export default Home;
