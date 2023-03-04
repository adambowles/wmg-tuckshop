import React, { useEffect, useState } from 'react';
import {
  App as KonstaApp,
  Page,
  Navbar,
  BlockTitle,
  List,
  ListItem,
  Link,
} from 'konsta/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCartShopping,
  faStar,
  faCoffee,
  faCookieBite,
  faPerson,
  faCircleNotch,
} from '@fortawesome/free-solid-svg-icons';

import platformDetector from 'utils/platform-detector';
import fanta from 'images/fanta.jpg';
import bueno from 'images/bueno.jpg';
import costaLatte from 'images/costa-latte.jpg';
import costaCaramelLatte from 'images/costa-caramel-latte.jpg';
import mars from 'images/mars.jpg';

import Item from 'components/Item';

import { User } from './types';

import './style.css';

const stockExample = {
  favourites: [
    {
      name: 'Fanta',
      image: fanta,
      stockRemaining: 10,
      cost: 100,
    },
    {
      name: 'Bueno',
      image: bueno,
      stockRemaining: 10,
      cost: 50,
    },
  ],
  coffee: [
    {
      name: 'Costa Latte',
      image: costaLatte,
      stockRemaining: 20,
      cost: 140,
    },
    {
      name: 'Costa Caramel Latte',
      image: costaCaramelLatte,
      stockRemaining: 10,
      cost: 140,
    },
  ],
  chocolate: [
    {
      name: 'Mars',
      image: mars,
      stockRemaining: 30,
      cost: 50,
    },
    {
      name: 'Bueno',
      image: bueno,
      stockRemaining: 10,
      cost: 50,
    },
  ],
};

const App = ({ stock = stockExample }) => {
  const [users, setUsers] = useState([] as User[]);
  const [theme] = useState(platformDetector());

  useEffect(() => {
    //TODO put this in a redux store
    fetch(`${process.env.REACT_APP_API_URL}/users`).then((response) => {
      response.json().then((response) => {
        const data = response.data as any[];

        let users = data
          .map((user) => {
            return {
              name: user.name,
              rank: user.rank,
              number: user.number,
            };
          })
          .sort((a: User, b: User) => {
            if (!isNaN(Number(a.number)) && !isNaN(Number(b.number))) {
              return Number(a.number) - Number(b.number);
            }

            return 0;
          });

        setUsers(users);
      });
    });
  }, []);

  return (
    <KonstaApp safeAreas theme={theme}>
      <Page className="pb-10">
        <Navbar
          title={process.env.REACT_APP_TITLE}
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
          {!users.length && (
            <ListItem text={<FontAwesomeIcon icon={faCircleNotch} spin />} />
          )}
          {users.map((user) => (
            <ListItem link title={user.name} key={user.number} />
          ))}
        </List>

        <BlockTitle>
          <span className="space-x-2">
            <FontAwesomeIcon icon={faStar} />
            <span>Favourites</span>
          </span>
        </BlockTitle>

        <List>
          {stock.favourites.map((item) => (
            <Item {...item} key={item.name} />
          ))}
        </List>

        <BlockTitle>
          <span className="space-x-2">
            <FontAwesomeIcon icon={faCoffee} />
            <span>Coffee</span>
          </span>
        </BlockTitle>

        <List>
          {stock.coffee.map((item) => (
            <Item {...item} key={item.name} />
          ))}
        </List>

        <BlockTitle>
          <span className="space-x-2">
            <FontAwesomeIcon icon={faCookieBite} />
            <span>Chocolate</span>
          </span>
        </BlockTitle>

        <List>
          {stock.chocolate.map((item) => (
            <Item {...item} key={item.name} />
          ))}
        </List>

        <BlockTitle>
          <span className="space-x-2">
            <FontAwesomeIcon icon={faCartShopping} />
            <span>Cart</span>
          </span>
        </BlockTitle>

        <List>
          <Item
            name="Mars"
            image={mars}
            cost={50}
            stockRemaining={1}
            inBasket
          />
          <Item
            name="Bueno"
            image={bueno}
            cost={50}
            stockRemaining={10}
            inBasket
          />
        </List>
      </Page>
    </KonstaApp>
  );
};

export default App;
