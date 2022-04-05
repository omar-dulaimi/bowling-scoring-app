import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Divider, Layout, PageHeader } from "antd";
import "./App.css";
import Game from "./components/Game/Game.lazy";

const { Header, Footer, Content } = Layout;

function App() {
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
                element={<div>Welcome to Bowling Scoring App!</div>}
              />
              <Route path="/game" element={<Game />} />
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
