import React, { FC } from "react";
import { Link } from "react-router-dom";
import { Card, Space } from "antd";
import "./Home.css";

interface HomeProps {}

const Home: FC<HomeProps> = () => {
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
            <p className="main-option" tabIndex={1}>
              New Game
            </p>
          </Link>

          <p className="main-option" tabIndex={2}>
            Load
          </p>
          <p className="main-option" tabIndex={3}>
            About
          </p>
        </Card>
      </Space>
    </div>
  );
};

export default Home;
