import Util from './util.class';

class Auth {
    /**
   * Authenticate a user. Save a token string in Local Storage
   *
   * @param {string} token
   */
    static authenticateUser(token) {
        Util.setDataToSessionStorage('token', token);
    }

    /**
   * Check if a user is authenticated - check if a token is saved in Local Storage
   *
   * @returns {boolean}
   */
    static isUserAuthenticated() {
        return Util.getDataFromSessionStorage('token', 'string') !== null;
    }

    /**
   * Deauthenticate a user. Remove a token from Local Storage.
   *
   */
    static deauthenticateUser() {
        Util.removeFromSessionStorage('token');
        Util.removeFromSessionStorage('currentUser');
    }

    /**
   * Get a token value.
   *
   * @returns {string}
   */

    static getToken() {
        return Util.getDataFromSessionStorage('token', 'string');
    }

    /**
   * Get a user details.
   *
   * @returns {object}
   */
    static getUser() {
        return Util.getDataFromSessionStorage('currentUser');
    }

    /**
   * Save user details in Local Storage
   *
   * @param {object} data
   */
    static setUser(data) {
        Util.setDataToSessionStorage('currentUser', data);
    }

    /**
   * Save writer details in Local Storage
   *
   * @param {object} data
   */
    static setWriter(data) {
        Util.setDataToSessionStorage('currentWriter', data);
    }

    /**
   * Deauthenticate a user. Remove a token from Local Storage.
   *
   */
    static deauthenticateWriter() {
        Util.removeFromSessionStorage('writerToken');
        Util.removeFromSessionStorage('currentWriter');
    }
    /**
   * Get a writer details.
   *
   * @returns {object}
   */
    static getWriter() {
        return Util.getDataFromSessionStorage('currentWriter');
    }
    /**
   * Authenticate a writer. Save a token string in Local Storage
   *
   * @param {string} token
   */
    static authenticateWriter(token) {
        Util.setDataToSessionStorage('writerToken', token);
    }

    /**
   * Check if a user is authenticated - check if a token is saved in Local Storage
   *
   * @returns {boolean}
   */
    static isWriterAuthenticated() {
        return Util.getDataFromSessionStorage('writerToken', 'string') !== null;
    }
    /**
   * Get a token value.
   *
   * @returns {string}
   */

    static getWriterToken() {
        return Util.getDataFromSessionStorage('writerToken', 'string');
    }
}

export default Auth;
