const ERROR = {
  EMPTY: 'Required',
  INVALID_FORMAT: 'Invalid format',
  INCORRECT_CONFIRMATION: 'Confirmation don\'t match',
};

const NAME = {
  LOGIN: 'login',
  REGISTRATION: 'registration',
  PROFILE: 'profile',
};

const REGEXP = {
  EMAIL: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
};

export default { NAME, ERROR, REGEXP };