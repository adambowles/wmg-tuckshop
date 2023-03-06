import React from 'react';
import { Button, Card, ListItem, Stepper } from 'konsta/react';

import { useAppSelector, useAppDispatch } from 'store/hooks';
import { decrement, increment, selectCount } from 'store/counter/counterSlice';
import formatCost from 'utils/format-cost';

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

    if (!inBasket) {
      return (
        <Card
          outline
          header={
            <div className="flex justify-between items-center">
              <div>{name}</div>
              <div>{formatCost(cost)}</div>
            </div>
          }
          footer={
            <div className="flex justify-between items-center">
              <div className="text-gray-500">
                {`${stockRemaining} left in stock`}
              </div>
            </div>
          }
        >
          <div
            className="ios:-m-4 material:-my-4 p-3 h-48 flex items-end justify-end bg-cover bg-center material:rounded-xl text-[16px] text-blue"
            style={{
              backgroundImage: `url(${image})`,
            }}
          >
            <Button inline largeIos roundedMaterial raised>
              Add
            </Button>
          </div>
        </Card>
      );
    }

    return (
      <ListItem
        chevron={false}
        title={name}
        subtitle={formatCost(displayCost)}
        text={`${stockRemaining} left in stock`}
        after={
          <Stepper
            value={quantitySelected}
            onPlus={incrementQuantitySelected}
            onMinus={decrementQuantitySelected}
          />
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
