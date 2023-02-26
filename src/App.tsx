import React from 'react';
import { App, Page, Navbar, Block } from 'konsta/react';

import './App.css';

import platformDetector from './utils/platform-detector';

function Main() {
  const theme = platformDetector();

  return (
    <App theme={theme}>
      <Page>
        <Navbar title="WMG Tuckshop" />

        <Block strong>Bowles</Block>
      </Page>
    </App>
  );
}

export default Main;
