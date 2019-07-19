import * as React from 'react';
import Anchor from './Anchor';

interface INavbarProps {
  links: string[];
  className?: string;
}

const Navbar = (props: INavbarProps) => {
  const { links, className } = props;
  const clName = `${className} navbar navbar-expand-lg navbar-dark bg-primary`;

  const anchorElms = links.map((link, index) => {
    return (
      <li className="nav-item">
        <Anchor key={index} content={link} href={link} />
      </li>
    );
  });

  return (
    <div>
      <nav className={clName}>
        <Anchor className="navbar-brand" content="React Playground" href="#" />
        <button
          className="navbar-toggler collapsed"
          type="button"
          data-toggle="collapse"
          data-target="#navbarColor02"
          aria-controls="navbarColor02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarColor02">
          <div className="navbar-nav">
            <ul className="navbar-nav mr-auto">{anchorElms}</ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
