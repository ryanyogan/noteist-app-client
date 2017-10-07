import { CognitoUserPool } from 'amazon-cognito-identity-js';
import config from '../config';

export const authUser = async () => {
  const currentUser = _getCurrentUser();

  if (currentUser === null) {
    return false;
  }

  await _getUserToken(currentUser);

  return true;
};

const _getUserToken = currentUser => {
  return new Promise((resolve, reject) => {
    currentUser.getSession((err, session) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(session.getIdToken().getJwtToken());
    });
  });
};

const _getCurrentUser = () => {
  const userPool = new CognitoUserPool({
    UserPoolId: config.cognito.USER_POOL_ID,
    ClientId: config.cognito.APP_CLIENT_ID,
  });
  return userPool.getCurrentUser();
};
