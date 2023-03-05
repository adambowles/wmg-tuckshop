import React /* useState */ from 'react';
import { Navbar, Link } from 'konsta/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

import './style.css';

function Header() {
  return (
    <Navbar
      title={process.env.REACT_APP_TITLE}
      right={
        <Link navbar className="space-x-2">
          <FontAwesomeIcon icon={faCartShopping} />
          <span>2</span>
        </Link>
      }
    />
  );
}

export default Header;
