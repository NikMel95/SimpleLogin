const EMAIL = 'email'
const PASSWORD = 'password'
const REMEMBER = 'remember'
const EMAIL_R = 'email_r'
const PASSWORD_R = 'password_r'

export const getStorageUser = () => {
  if(window.localStorage.getItem(EMAIL) && window.localStorage.getItem(PASSWORD)) {
    return {
      email: window.localStorage.getItem(EMAIL),
      password: window.localStorage.getItem(PASSWORD),
      remember: window.localStorage.getItem(REMEMBER),
    }
  } else {
    return false
  }
};

export const saveUser = (email, password, remember) => {
  window.localStorage.setItem(EMAIL, email);
  window.localStorage.setItem(PASSWORD, password);
  window.localStorage.setItem(REMEMBER, remember);
};

export const destroyUser = () => {
  window.localStorage.removeItem(EMAIL);
  window.localStorage.removeItem(PASSWORD);
  window.localStorage.removeItem(REMEMBER);
};

export const setRemember = (email, password) => {
  window.localStorage.setItem(EMAIL_R, email);
  window.localStorage.setItem(PASSWORD_R, password);
};

export const removeRemember = () => {
  window.localStorage.removeItem(EMAIL_R);
  window.localStorage.removeItem(PASSWORD_R);
};

export const getRemember = () => {
  var remember = {
    email: '',
    password: '',
  }
  if(window.localStorage.getItem(EMAIL_R) && window.localStorage.getItem(PASSWORD_R)) {
    remember = {
      email: window.localStorage.getItem(EMAIL_R),
      password: window.localStorage.getItem(PASSWORD_R),
    }
  }
  return remember
};

export default { getStorageUser, saveUser, destroyUser, setRemember, removeRemember, getRemember };