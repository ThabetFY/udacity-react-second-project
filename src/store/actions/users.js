export const RECEIVE_USERS = "RECEIVED_USERS";

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}
