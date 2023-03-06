import React, { useRef, useState } from 'react';
import {
  Block,
  Button,
  Dialog,
  DialogButton,
  Link,
  List,
  ListItem,
  Navbar,
  Popover,
  Popup,
} from 'konsta/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import { useAppSelector } from 'store/hooks';
import { selectCount } from 'store/counter/counterSlice';
import formatCost from 'utils/format-cost';
import bueno from 'images/bueno.jpg';
import costaLatte from 'images/costa-latte.jpg';
import mars from 'images/mars.jpg';

import Item from 'components/Item';

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
  const [popoverOpened, setPopoverOpened] = useState(false);
  const popoverTargetRef = useRef(null);

  // What type is this
  const openPopover = (targetRef: any) => {
    popoverTargetRef.current = targetRef;
    setPopoverOpened(true);
  };

  return (
    <>
      <Navbar
        title={process.env.REACT_APP_TITLE}
        right={
          <Link navbar className="bars" onClick={() => openPopover('.bars')}>
            <FontAwesomeIcon icon={faBars} size="xl" />
          </Link>
        }
      />

      <Popover
        opened={popoverOpened}
        target={popoverTargetRef.current}
        onBackdropClick={() => setPopoverOpened(false)}
      >
        <List nested>
          <ListItem
            title="Basket (3)"
            link
            onClick={() => {
              setPopoverOpened(false);
              setBasketOpened(true);
            }}
          />
          <ListItem
            title="Brew fund"
            link
            onClick={() => setPopoverOpened(false)}
          />
          <ListItem
            title="Log out"
            link
            onClick={() => setPopoverOpened(false)}
          />
        </List>
      </Popover>

      <Popup
        className="pb-safe w-screen"
        opened={basketOpened}
        onBackdropClick={() => setBasketOpened(false)}
      >
        <Navbar
          title="Basket"
          right={
            <Link navbar onClick={() => setBasketOpened(false)}>
              Close
            </Link>
          }
        ></Navbar>
        <Block>
          <List>
            {basketMock.map((item) => (
              <Item {...item} key={item.name} inBasket />
            ))}
          </List>
          <Button onClick={() => setCheckoutOpened(true)} large>
            Check out
          </Button>
        </Block>
      </Popup>

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
        Checking out will add{' '}
        {formatCost(
          Math.round(
            basketMock
              .map((item) => item.cost * quantitySelected)
              .reduce((accumulator, current) => accumulator + current),
          ),
        )}{' '}
        to your debt
      </Dialog>
    </>
  );
}

export default Header;
