import { NavLink } from "react-router-dom"; // nav link is used to create a link to the different pages in the application

const Navbar = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/create">Create</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
