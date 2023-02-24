import React from 'react';
import { App, Page, Navbar, Block } from 'konsta/react';

function Main() {
  return (
    <App theme="ios">
      <Page>
        <Navbar title="My App" />

        <Block strong>Hello world!</Block>
      </Page>
    </App>
  );
};

export default Main;
