import React, { useState } from 'react';
import {
  Block,
  Button,
  Dialog,
  DialogButton,
  Link,
  List,
  Navbar,
  Sheet,
  Toolbar,
} from 'konsta/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

import { useAppSelector } from 'store/hooks';
import { selectCount } from 'store/counter/counterSlice';

import Item from 'components/Item';

import bueno from 'images/bueno.jpg';
import costaLatte from 'images/costa-latte.jpg';
import mars from 'images/mars.jpg';

import 'components/Header/style.css';

const basketMock = [
  {
    name: 'Bueno',
    image: bueno,
    stockRemaining: 10,
    cost: 50,
  },
  {
    name: 'Costa Latte',
    image: costaLatte,
    stockRemaining: 10,
    cost: 140,
  },
  {
    name: 'Mars',
    image: mars,
    stockRemaining: 30,
    cost: 50,
  },
];

function Header() {
  const quantitySelected = useAppSelector(selectCount);

  const [basketOpened, setBasketOpened] = useState(false);
  const [checkoutOpened, setCheckoutOpened] = useState(false);

  return (
    <>
      <Navbar
        title={process.env.REACT_APP_TITLE}
        right={
          <Link
            navbar
            className="space-x-2"
            onClick={() => setBasketOpened(true)}
          >
            <FontAwesomeIcon icon={faCartShopping} />
            <span>{basketMock.length}</span>
          </Link>
        }
      />

      <Sheet
        className="pb-safe w-screen"
        opened={basketOpened}
        onBackdropClick={() => setBasketOpened(false)}
      >
        <Toolbar top>
          <div className="left" />
          <div className="right">
            <Link toolbar onClick={() => setBasketOpened(false)}>
              Done
            </Link>
          </div>
        </Toolbar>
        <Block>
          <List>
            {basketMock.map((item) => (
              <Item {...item} key={item.name} inBasket />
            ))}
          </List>
          <Button onClick={() => setCheckoutOpened(true)}>Check out</Button>
        </Block>
      </Sheet>

      <Dialog
        opened={checkoutOpened}
        buttons={
          <>
            <DialogButton onClick={() => setCheckoutOpened(false)}>
              Cancel
            </DialogButton>
            <DialogButton
              onClick={() => {
                setCheckoutOpened(false);
                setBasketOpened(false);
              }}
            >
              Confirm
            </DialogButton>
          </>
        }
      >
        Checking out will add £
        {(
          Math.round(
            basketMock
              .map((item) => item.cost * quantitySelected)
              .reduce((accumulator, current) => accumulator + current),
          ) / 100
        ).toFixed(2)}{' '}
        to your debt
      </Dialog>
    </>
  );
}

export default Header;
