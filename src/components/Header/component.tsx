import React, { useRef, useState } from 'react';
import {
  Block,
  Button,
  Dialog,
  DialogButton,
  Fab,
  Link,
  List,
  ListItem,
  Navbar,
  Popover,
  Popup,
} from 'konsta/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCartShopping } from '@fortawesome/free-solid-svg-icons';

import { useAppSelector } from 'store/hooks';
import { selectCount } from 'store/counter/counterSlice';
import formatPrice from 'utils/format-price';

import Item from 'components/Item';

import 'components/Header/style.css';

const basketMock = [
  {
    _id: 'bueno',
    name: 'Bueno',
    category: {
      id: 'chocolates',
      name: 'Chocolates',
    },
    price: 50, // in pence
    stockRemaining: 15,
    imageURL: 'images/bueno.jpg',
  },
  {
    _id: 'fanta',
    name: 'Fanta',
    category: {
      id: 'drinks',
      name: 'Drinks',
    },
    price: 50, // in pence
    stockRemaining: 15,
    imageURL: 'images/fanta.jpg',
  },
  {
    _id: 'yorkie',
    name: 'Yorkie',
    category: {
      id: 'chocolates',
      name: 'Chocolates',
    },
    price: 60, // in pence
    stockRemaining: 15,
    imageURL: 'images/yorkie.jpg',
  },
];

function Header() {
  const quantitySelected = useAppSelector(selectCount);

  const [basketOpened, setBasketOpened] = useState(false);
  const [checkoutOpened, setCheckoutOpened] = useState(false);
  const [popoverOpened, setPopoverOpened] = useState(false);
  const popoverTargetRef = useRef(null);

  // TODO What type is this
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
              <Item {...item} key={item._id} inBasket />
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
        {formatPrice(
          Math.round(
            basketMock
              .map((item) => item.price * quantitySelected)
              .reduce((accumulator, current) => accumulator + current),
          ),
        )}{' '}
        to your debt
      </Dialog>

      <Fab
        className="fixed right-4-safe bottom-4-safe z-20"
        onClick={() => setBasketOpened(true)}
        text={<FontAwesomeIcon icon={faCartShopping} size="lg" />}
      />
    </>
  );
}

export default Header;
