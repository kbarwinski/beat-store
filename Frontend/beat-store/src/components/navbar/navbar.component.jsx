import { FiBookmark, FiShoppingCart, FiLogOut, FiLogIn } from "react-icons/fi";
import { MdCreate } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearAuthInfo } from "../../store/auth/auth.slice";
import {
  NavbarContainer,
  LinksContainer,
  LogoContainer,
  LinkContainer,
} from "./navbar.styles";

const Navbar = () => {
  const loginToken = useSelector((state) => state.auth.jwtToken);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearAuthInfo());
  };

  return (
    <div>
      <NavbarContainer>
        <LogoContainer>
          <NavLink
            style={{ textDecoration: "none", color: "inherit" }}
            to="/store"
          >
            Sample Store
          </NavLink>
        </LogoContainer>
        <LinksContainer>
          <LinkContainer>
            <NavLink
              style={{ textDecoration: "none", color: "inherit" }}
              to="/bookmarked"
            >
              <FiBookmark />
            </NavLink>
          </LinkContainer>
          <LinkContainer>
            <NavLink
              style={{ textDecoration: "none", color: "inherit" }}
              to="/checkout"
            >
              <FiShoppingCart />
            </NavLink>
          </LinkContainer>

          {loginToken && (
            <LinkContainer>
              <NavLink
                style={{ textDecoration: "none", color: "inherit" }}
                to="/audiocrud"
              >
                <MdCreate />
              </NavLink>
            </LinkContainer>
          )}
          {loginToken && (
            <LinkContainer onClick={handleLogout}>
              <FiLogOut />
            </LinkContainer>
          )}

          {!loginToken && (
            <LinkContainer>
              <NavLink
                style={{ textDecoration: "none", color: "inherit" }}
                to="/login"
              >
                <FiLogIn />
              </NavLink>
            </LinkContainer>
          )}
        </LinksContainer>
      </NavbarContainer>
    </div>
  );
};

export default Navbar;
