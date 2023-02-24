import React from 'react';
import { App, Page, Navbar, Block } from 'konsta/react';

function Main() {
  return (
    <App theme="ios">
      <Page>
        <Navbar title="WMG Tuckshop" />

        <Block strong>Bowles</Block>
      </Page>
    </App>
  );
};

export default Main;
