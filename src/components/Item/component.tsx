import React from 'react';
import { Stepper, ListItem, Button } from 'konsta/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { useAppSelector, useAppDispatch } from 'store/hooks';
import { decrement, increment, selectCount } from 'store/counter/counterSlice';

import 'components/Item/style.css';

function Item({
  cost = 100,
  inBasket = false,
  stockRemaining = 1,
  image = '',
  name = '',
}) {
  const quantitySelected = useAppSelector(selectCount);
  const dispatch = useAppDispatch();

  const incrementQuantitySelected = () => {
    if (quantitySelected < stockRemaining) {
      return dispatch(increment());
    }
  };

  const decrementQuantitySelected = () => {
    if (quantitySelected === 1) {
      //TODO remove from basket
    } else {
      return dispatch(decrement());
    }
  };

  if (stockRemaining) {
    let displayCost: number;
    if (inBasket) {
      displayCost = cost * quantitySelected;
    } else {
      displayCost = cost;
    }

    return (
      <ListItem
        link={!inBasket}
        chevron={false}
        title={name}
        subtitle={`£${(Math.round(displayCost) / 100).toFixed(2)}`}
        text={`${stockRemaining} left in stock`}
        after={
          inBasket ? (
            <Stepper
              value={quantitySelected}
              onPlus={incrementQuantitySelected}
              onMinus={decrementQuantitySelected}
            />
          ) : (
            <Button touchRipple={false}>
              <FontAwesomeIcon icon={faPlus} size="xl" />
            </Button>
          )
        }
        media={
          <img
            className="ios:rounded-lg material:rounded-lg"
            src={image}
            width="64"
            alt={name}
          />
        }
      />
    );
  }

  return <></>;
}

export default Item;
