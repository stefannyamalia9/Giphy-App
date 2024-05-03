import React from "react";
import "@assets/styles/App.scss";
import TrendingGifs from "@components/TrendingGifs";

function App() {
  return (
    <React.Fragment>
      <div className="container">
        <TrendingGifs />
      </div>
    </React.Fragment>
  );
}

export default App;
