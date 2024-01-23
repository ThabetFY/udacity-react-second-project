import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import { handleLogout } from "../store/actions/authedUser";

const Nav = ({ dispatch, authedUser, avatar, name }) => {
  const navigate = useNavigate();

  const clickHanlder = () => {
    dispatch(handleLogout()).then(() => {
      navigate("/login");
    });
  };

  return (
    <nav className="nav">
      {authedUser ? (
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/leaderboard">Leaderboard</Link>
          </li>
          <li>
            <Link to="/new">New</Link>
          </li>
          <li>
            <img src={avatar} alt={`Avatar of ${name}`} className="avatar" />
            <button onClick={clickHanlder}>Logout</button>
          </li>
        </ul>
      ) : null}
    </nav>
  );
};

const mapStateToProps = ({ authedUser, users }) => {
  if (!authedUser) {
    return {
      authedUser,
      avatar: "",
      name: "",
    };
  }

  const avatar = users[authedUser].avatarURL;
  const name = users[authedUser].name;
  return {
    authedUser,
    avatar,
    name,
  };
};

Nav.propTypes = {
  dispatch: PropTypes.func.isRequired,
  authedUser: PropTypes.string,
  avatar: PropTypes.string,
  name: PropTypes.string,
};

const connectedNav = connect(mapStateToProps)(Nav);

export default connectedNav;
