import React from 'react';
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

import { Props, State, User } from './types';

import './style.css';

import Item from 'components/Item';

import platformDetector from 'utils/platform-detector';

import fanta from 'images/fanta.jpg';
import bueno from 'images/bueno.jpg';
import costaLatte from 'images/costa-latte.jpg';
import costaCaramelLatte from 'images/costa-caramel-latte.jpg';
import mars from 'images/mars.jpg';

class App extends React.Component<Props, State> {
  state: State = {
    users: [],
    theme: platformDetector(),
  };

  componentDidMount() {
    //TODO put this in a redux store
    fetch(`${process.env.REACT_APP_API_URL}/users`).then((response) => {
      response.json().then((response) => {
        const data = response.data as Array<User>;

        // console.log(JSON.stringify(data, undefined, 2));

        let users = data
          .map((user) => {
            return {
              name: user.name,
              rank: user.rank,
              number: user.number,
            };
          })
          .sort((a: User, b: User) => {
            return Number(a.number) - Number(b.number);
          });

        this.setState({
          users: users,
        });
      });
    });
  }

  render() {
    return (
      <KonstaApp safeAreas theme={this.state.theme}>
        <Page className="pb-10">
          <Navbar
            title="3 AAC WMG Tuckshop"
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
            {!this.state.users.length && (
              <ListItem text={<FontAwesomeIcon icon={faCircleNotch} spin />} />
            )}
            {/* {!this.state.users.length && (
              <FontAwesomeIcon icon={faCircle} spin />
            )} */}
            {this.state.users.map((user) => (
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
            <Item
              name="Fanta"
              category="drinks"
              image={fanta}
              cost={50}
              stockRemaining={3}
            />
            <Item
              name="Bueno"
              category="chocolate"
              image={bueno}
              cost={50}
              stockRemaining={3}
            />
          </List>

          <BlockTitle>
            <span className="space-x-2">
              <FontAwesomeIcon icon={faCoffee} />
              <span>Coffee</span>
            </span>
          </BlockTitle>

          <List>
            <Item
              name="Costa Latte"
              category="coffee"
              image={costaLatte}
              cost={100}
              stockRemaining={3}
            />
            <Item
              name="Costa Caramel Latte"
              category="coffee"
              image={costaCaramelLatte}
              cost={100}
              stockRemaining={5}
            />
          </List>

          <BlockTitle>
            <span className="space-x-2">
              <FontAwesomeIcon icon={faCookieBite} />
              <span>Chocolate</span>
            </span>
          </BlockTitle>

          <List>
            <Item
              name="Mars"
              category="chocolate"
              image={mars}
              cost={50}
              stockRemaining={6}
            />
            <Item
              name="Bueno"
              category="chocolate"
              image={bueno}
              cost={50}
              stockRemaining={1}
            />
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
              category="chocolate"
              image={mars}
              cost={50}
              stockRemaining={1}
              inBasket
            />
            <Item
              name="Bueno"
              category="chocolate"
              image={bueno}
              cost={50}
              stockRemaining={10}
              inBasket
            />
          </List>
        </Page>
      </KonstaApp>
    );
  }
}

export default App;
