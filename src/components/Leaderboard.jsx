import { connect } from "react-redux";
import PropTypes from "prop-types";

const Leaderboard = ({ users }) => {
  console.log(users);
  return (
    <table>
      <thead>
        <tr>
          <th>Users</th>
          <th>Answered</th>
          <th>Created</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={index}>
            <td>{user.name}</td>
            <td>{Object.keys(user.answers).length}</td>
            <td>{user.questions.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const mapStateToProps = ({ users }) => {
  const sortedUsers = Object.values(users).sort(
    (a, b) =>
      b.questions.length +
      Object.keys(b.answers).length -
      (a.questions.length + Object.keys(a.answers).length)
  );
  return {
    users: sortedUsers,
  };
};

Leaderboard.propTypes = {
  users: PropTypes.array,
};

const connectedLeaderboard = connect(mapStateToProps)(Leaderboard);

export default connectedLeaderboard;
