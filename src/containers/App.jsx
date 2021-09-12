import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

import "normalize.css";
import "../styling/style.scss";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />

          {/* Default path if nothing matches */}
          <Route path="/" component={HomePage} />
        </Switch>
      </BrowserRouter>
    </>
  );
}
