const USER_INFO = "user_info";

export const saveUser = (user) => {
  localStorage.setItem(USER_INFO, JSON.stringify(user));
};
export const getUser = () => {
  return JSON.parse(localStorage.getItem(USER_INFO) || "{}");
};
export const removeUser = () => {
  localStorage.removeItem(USER_INFO);
};
