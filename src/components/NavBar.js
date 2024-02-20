import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="bg-color">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-10">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex space-x-4">
              <Link className="nav-link" to="/browsing-history">
                Browsing History
              </Link>
              <Link className="nav-link" to="/Men">
                Men
              </Link>
              <Link className="nav-link" to="/Women">
                Women
              </Link>
              <Link className="nav-link" to="/deals">
                Today's Deals
              </Link>
              <Link className="nav-link" to="/Books">
                Books
              </Link>
              <Link className="nav-link" to="/contact"> {/* Updated to "/contact" */}
                Customer Service
              </Link>
              <Link className="nav-link" to="/GiftIdeas">
                Gift Ideas
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
