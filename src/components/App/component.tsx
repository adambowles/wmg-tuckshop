import React, { useEffect, useState } from 'react';
import {
  App as KonstaApp,
  Page,
  Block,
  // BlockTitle,
  Button,
  List,
  ListInput,
  // ListItem,
  Preloader,
} from 'konsta/react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faStar,
//   faCoffee,
//   faCookieBite,
//   faPerson,
// } from '@fortawesome/free-solid-svg-icons';

import { useAppSelector, useAppDispatch } from 'store/hooks';
// import {
//   fetchUsers,
//   selectUsers,
//   selectUserFetchingStatus,
// } from 'store/users/usersSlice';
import {
  fetchItems,
  selectItems,
  selectItemFetchingStatus,
} from 'store/items/itemsSlice';

import platformDetector from 'utils/platform-detector';

import Item from 'components/Item';
import Header from 'components/Header';

import 'components/App/style.css';

const App = () => {
  const dispatch = useAppDispatch();
  // const users = useAppSelector(selectUsers);
  // const usersFetchingStatus = useAppSelector(selectUserFetchingStatus);
  const items = useAppSelector(selectItems);
  const itemsFetchingStatus = useAppSelector(selectItemFetchingStatus);

  const categories = ['Favourites'].concat(
    Array.from(new Set(items.map((item) => item.category.name))).sort(),
  );

  const [theme] = useState(platformDetector());
  const [activeCategory, setActiveCategory] = useState('Favourites');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // dispatch(fetchUsers());
    dispatch(fetchItems());
  }, [dispatch]);

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
        </List> */}

        <Block className="grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-8 xl:grid-cols-10">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setActiveCategory(category)}
              outline={activeCategory !== category}
            >
              {category}
            </Button>
          ))}
        </Block>

        <List strongIos insetIos>
          <ListInput
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm((e.target as any).value);
            }}
          />
        </List>

        {itemsFetchingStatus === 'loading' && (
          <Block className="text-center">
            <Preloader />
          </Block>
        )}
        <Block className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {items
            .filter((item) => item.category.name === activeCategory)
            .filter((item) =>
              item.name.toLowerCase().includes(searchTerm.toLowerCase()),
            )
            .map((item) => (
              <Item {...item} key={item.name} />
            ))}
        </Block>
      </Page>
    </KonstaApp>
  );
};

export default App;
