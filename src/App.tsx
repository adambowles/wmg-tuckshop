import React from 'react';
import {
  App as KonstaApp,
  Page,
  Navbar,
  Block,
  BlockTitle,
  List,
  ListItem,
  Link,
  Stepper,
} from 'konsta/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCartShopping,
  faTrash,
  faStar,
  faCoffee,
  faCookieBite,
  faPerson,
} from '@fortawesome/free-solid-svg-icons';

import './App.css';

import platformDetector from './utils/platform-detector';

import fanta from './images/fanta.jpg';
import bueno from './images/bueno.jpg';
import costaLatte from './images/costa-latte.jpg';
import costaCaramelLatte from './images/costa-caramel-latte.jpg';
import mars from './images/mars.jpg';

function App() {
  const theme = platformDetector();

  return (
    <KonstaApp safeAreas theme={theme}>
      <Page>
        <Navbar
          title="WMG Tuckshop"
          right={
            <Link navbar className="space-x-2">
              <FontAwesomeIcon icon={faCartShopping} />
              <span>2</span>
            </Link>
          }
        />

        <BlockTitle>
          <span className="space-x-2">
            <FontAwesomeIcon icon={faPerson} />
            <span>Users</span>
          </span>
        </BlockTitle>

        <List>
          <ListItem link title="Nunn" />
          <ListItem link title="Henson" />
          <ListItem link title="Bowles" />
          <ListItem link title="Hughes" />
        </List>

        <BlockTitle>
          <span className="space-x-2">
            <FontAwesomeIcon icon={faStar} />
            <span>Favourites</span>
          </span>
        </BlockTitle>

        <List>
          <ListItem
            link
            chevron={false}
            title="Fanta"
            after="£0.50"
            media={
              <img
                className="ios:rounded-lg material:rounded-lg"
                src={fanta}
                width="80"
                alt="Fanta"
              />
            }
          />

          <ListItem
            link
            chevron={false}
            title="Bueno"
            after="£0.50"
            media={
              <img
                className="ios:rounded-lg material:rounded-lg"
                src={bueno}
                width="80"
                alt="Bueno"
              />
            }
          />
        </List>

        <BlockTitle>
          <span className="space-x-2">
            <FontAwesomeIcon icon={faCoffee} />
            <span>Coffees</span>
          </span>
        </BlockTitle>

        <List>
          <ListItem
            link
            chevron={false}
            title="Costa Latte"
            after="£1.00"
            media={
              <img
                className="ios:rounded-lg material:rounded-lg"
                src={costaLatte}
                width="80"
                alt="Costa Latte"
              />
            }
          />

          <ListItem
            link
            chevron={false}
            title="Costa Caramel Latte"
            after="£1.00"
            media={
              <img
                className="ios:rounded-lg material:rounded-lg"
                src={costaCaramelLatte}
                width="80"
                alt="Costa Caramel Latte"
              />
            }
          />
        </List>

        <BlockTitle>
          <span className="space-x-2">
            <FontAwesomeIcon icon={faCookieBite} />
            <span>Chocolate</span>
          </span>
        </BlockTitle>

        <List>
          <ListItem
            link
            chevron={false}
            title="Mars"
            after="£0.50"
            media={
              <img
                className="ios:rounded-lg material:rounded-lg"
                src={mars}
                width="80"
                alt="Mars"
              />
            }
          />

          <ListItem
            link
            chevron={false}
            title="Bueno"
            after="£0.50"
            media={
              <img
                className="ios:rounded-lg material:rounded-lg"
                src={bueno}
                width="80"
                alt="Bueno"
              />
            }
          />
        </List>

        <BlockTitle>
          <span className="space-x-2">
            <FontAwesomeIcon icon={faCartShopping} />
            <span>Cart</span>
          </span>
        </BlockTitle>

        <List>
          <ListItem
            chevron={false}
            title="Mars"
            after="£1.50"
            text={
              <span>
                <FontAwesomeIcon icon={faTrash} color="red" size="xl" />
                <Stepper value={3} />
              </span>
            }
            media={
              <img
                className="ios:rounded-lg material:rounded-lg"
                src={mars}
                width="80"
                alt="Mars"
              />
            }
          />

          <ListItem
            link
            chevron={false}
            title="Bueno"
            after={
              <span>
                <FontAwesomeIcon icon={faTrash} color="red" size="xl" />{' '}
                <Stepper small value={2} /> £1.00
              </span>
            }
            media={
              <img
                className="ios:rounded-lg material:rounded-lg"
                src={bueno}
                width="80"
                alt="Bueno"
              />
            }
          />
        </List>
      </Page>
    </KonstaApp>
  );
}

export default App;
