import React from 'react';
import { Stepper, ListItem, Button } from 'konsta/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { Props, State } from './types';

import './style.css';

class Item extends React.Component<Props, State> {
  state: State = {
    quantitySelected: 1,
  };

  incrementQuantitySelected = () => {
    if (this.state.quantitySelected < this.props.stockRemaining) {
      this.setState({ quantitySelected: this.state.quantitySelected + 1 });
    }
  };

  decrementQuantitySelected = () => {
    if (this.state.quantitySelected === 1) {
      // remove from basket
    } else {
      this.setState({ quantitySelected: this.state.quantitySelected - 1 });
    }
  };

  render() {
    const {
      cost = 100,
      inBasket = false,
      stockRemaining = 1,
      image,
      name,
    } = this.props;

    return (
      !!stockRemaining && (
        <ListItem
          link={!inBasket}
          chevron={false}
          title={name}
          subtitle={`£${(
            Math.round(cost * this.state.quantitySelected) / 100
          ).toFixed(2)}`}
          text={`${stockRemaining} left in stock`}
          after={
            inBasket ? (
              <Stepper
                value={this.state.quantitySelected}
                onPlus={this.incrementQuantitySelected}
                onMinus={this.decrementQuantitySelected}
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
      )
    );
  }
}

export default Item;
