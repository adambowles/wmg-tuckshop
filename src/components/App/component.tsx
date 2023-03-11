import React, { useEffect, useState } from 'react';
import {
  App as KonstaApp,
  Page,
  Block,
  BlockTitle,
  Button,
  List,
  ListItem,
  Preloader,
} from 'konsta/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faCoffee,
  faCookieBite,
  faPerson,
} from '@fortawesome/free-solid-svg-icons';

import { useAppSelector, useAppDispatch } from 'store/hooks';
import {
  fetchUsers,
  selectUsers,
  selectUserFetchingStatus,
} from 'store/users/usersSlice';

import platformDetector from 'utils/platform-detector';
import fanta from 'images/fanta.jpg';
import bueno from 'images/bueno.jpg';
import costaLatte from 'images/costa-latte.jpg';
import costaCaramelLatte from 'images/costa-caramel-latte.jpg';
import mars from 'images/mars.jpg';

import Item from 'components/Item';
import Header from 'components/Header';

import 'components/App/style.css';

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
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);
  const usersFetchingStatus = useAppSelector(selectUserFetchingStatus);

  const [theme] = useState(platformDetector());
  const [activeCategory, setActiveCategory] = useState(categoriesMock[0].id);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <KonstaApp safeAreas theme={theme}>
      <Page className="pb-safe">
        <Header />

        <BlockTitle>
          <span className="space-x-2">
            <FontAwesomeIcon icon={faPerson} />
            <span>Users</span>
          </span>
        </BlockTitle>

        <List>
          {usersFetchingStatus === 'loading' && (
            <Block className="text-center">
              <Preloader />
            </Block>
          )}
          {usersFetchingStatus === 'failed' && (
            <ListItem title="Failed fetching user list" />
          )}
          {usersFetchingStatus === 'idle' &&
            users.map((user) => (
              <ListItem
                link
                title={`${user.rank} ${user.name}`}
                key={user.number}
              />
            ))}
        </List>

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

            <Block className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {stock.favourites.map((item) => (
                <Item {...item} key={item.name} />
              ))}
            </Block>
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

            <Block className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {stock.coffee.map((item) => (
                <Item {...item} key={item.name} />
              ))}
            </Block>
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

            <Block className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {stock.chocolate.map((item) => (
                <Item {...item} key={item.name} />
              ))}
            </Block>
          </>
        )}
      </Page>
    </KonstaApp>
  );
};

export default App;
