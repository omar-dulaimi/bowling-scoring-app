import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Divider, Layout, PageHeader, Row, Col, Card } from "antd";
import "./App.css";

const { Header, Footer, Content } = Layout;

function App() {
  const [gameData, setGameData] = useState({
    frames: [
      {
        name: "Frame 1",
        score: 0,
        isSpare: false,
        isStrike: false,
        isDoneScoring: false,
      },
      {
        name: "Frame 2",
        score: 0,
        isSpare: false,
        isStrike: false,
        isDoneScoring: false,
      },
      {
        name: "Frame 3",
        score: 0,
        isSpare: false,
        isStrike: false,
        isDoneScoring: false,
      },
      {
        name: "Frame 4",
        score: 0,
        isSpare: false,
        isStrike: false,
        isDoneScoring: false,
      },
      {
        name: "Frame 5",
        score: 0,
        isSpare: false,
        isStrike: false,
        isDoneScoring: false,
      },
      {
        name: "Frame 6",
        score: 0,
        isSpare: false,
        isStrike: false,
        isDoneScoring: false,
      },
      {
        name: "Frame 7",
        score: 0,
        isSpare: false,
        isStrike: false,
        isDoneScoring: false,
      },
      {
        name: "Frame 8",
        score: 0,
        isSpare: false,
        isStrike: false,
        isDoneScoring: false,
      },
      {
        name: "Frame 9",
        score: 0,
        isSpare: false,
        isStrike: false,
        isDoneScoring: false,
      },
      {
        name: "Frame 10",
        score: 0,
        isSpare: false,
        isStrike: false,
        isDoneScoring: false,
      },
    ],
  });
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
                element={
                  <Row>
                    {gameData?.frames?.map((frame, index) => (
                      <Col key={index} xs={24} sm={12} md={10} lg={8} xl={6}>
                        <Card
                          style={{ width: "90%", marginTop: 12, textAlign: "center" }}
                          title={frame.name}
                        >
                          Card content
                        </Card>
                      </Col>
                    ))}
                  </Row>
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
