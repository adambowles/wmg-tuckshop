import React, { useEffect, useState } from 'react';
import {
  App as KonstaApp,
  Page,
  Block,
  BlockTitle,
  Button,
  List,
  ListItem,
  Segmented,
  SegmentedButton,
  Preloader,
} from 'konsta/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faCoffee,
  faCookieBite,
  faPerson,
} from '@fortawesome/free-solid-svg-icons';

import platformDetector from 'utils/platform-detector';
import fanta from 'images/fanta.jpg';
import bueno from 'images/bueno.jpg';
import costaLatte from 'images/costa-latte.jpg';
import costaCaramelLatte from 'images/costa-caramel-latte.jpg';
import mars from 'images/mars.jpg';

import Item from 'components/Item';
import Header from 'components/Header';

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

const categoriesMock = [
  {
    id: 'favourites',
    icon: faStar,
    name: 'Favourites',
  },
  {
    id: 'coffee',
    icon: faCoffee,
    name: 'Coffee',
  },
  {
    id: 'chocolate',
    icon: faStar,
    name: 'Chocolate',
  },
  {
    id: 'drinks',
    icon: faStar,
    name: 'Drinks',
  },
  {
    id: 'crisps',
    icon: faStar,
    name: 'Crisps',
  },
  {
    id: 'pot-noodle',
    icon: faStar,
    name: 'Pot Noodle',
  },
  {
    id: 'sweets',
    icon: faStar,
    name: 'Sweets',
  },
  {
    id: 'bars-and-biscuits',
    icon: faStar,
    name: 'Biscuits',
  },
  {
    id: 'porridge',
    icon: faStar,
    name: 'Porridge',
  },
];

const App = ({ stock = stockExample }) => {
  const [users, setUsers] = useState([] as User[]);
  const [theme] = useState(platformDetector());
  const [activeCategory, setActiveCategory] = useState(categoriesMock[0].id);

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
      <Page className="pb-safe">
        <Header />

        {/* <BlockTitle>
          <span className="space-x-2">
            <FontAwesomeIcon icon={faPerson} />
            <span>Users</span>
          </span>
        </BlockTitle>

        <List>
          {!users.length && (
            <Block className="text-center">
              <Preloader />
            </Block>
          )}
          {users.map((user) => (
            <ListItem link title={user.name} key={user.number} />
          ))}
        </List> */}

        <Block className="grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-8 xl:grid-cols-10">
          {categoriesMock.map((category) => (
            <Button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              outline={activeCategory !== category.id}
            >
              {category.name}
            </Button>
          ))}
        </Block>

        {activeCategory === 'favourites' && (
          <>
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
          </>
        )}

        {activeCategory === 'coffee' && (
          <>
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
          </>
        )}

        {activeCategory === 'chocolate' && (
          <>
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
          </>
        )}
      </Page>
    </KonstaApp>
  );
};

export default App;
