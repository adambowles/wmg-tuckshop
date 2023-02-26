import React from "react";
import { App, Page, Navbar, Block } from "konsta/react";

import "./App.css";

import asd from "./utils/platform-detector";

function Main() {
  console.log(asd());

  return (
    <App theme={asd()}>
      <Page>
        <Navbar title="WMG Tuckshop" />

        <Block strong>Bowles</Block>
      </Page>
    </App>
  );
}

export default Main;
