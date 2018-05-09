const ERROR = {
  EMPTY: 'Required',
  INVALID_FORMAT: 'Invalid format',
  INCORRECT_PASSWORD_CONFIRMATION: 'Password and confirmation don\'t match',
};

const NAME = {
  LOGIN: 'login',
  REGISTRATION: 'registration',
};

const REGEXP = {
  EMAIL: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
};

export default { NAME, ERROR, REGEXP };