import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Divider, Layout, PageHeader } from "antd";
import "./App.css";
import Game from "./components/Game/Game.lazy";
import Home from "./components/Home/Home.lazy";
import { GameDataType } from "./types";

const { Header, Footer, Content } = Layout;

function App() {
  const [loadedGameData, setLoadedGameData] = useState<GameDataType | null>(
    null
  );
  return (
    <div className="App">
      <Layout>
        <Header>
          <PageHeader title="Bowling Scoring" className="site-page-header" />
          <Divider plain />
        </Header>
        <Content>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={<Home setLoadedGameData={setLoadedGameData} />}
              />
              <Route
                path="/game"
                element={
                  <Game loadedGameData={loadedGameData as GameDataType} />
                }
              />
            </Routes>
          </BrowserRouter>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          <Divider plain />
          Made by Omar Dulaimi
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
