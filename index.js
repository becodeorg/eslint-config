/* becode/eslint-config
 *
 * /.eslintrc.js - ESLint configuration
 *
 * coded by leny@BeCode
 * started at 25/02/2019
 */

const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
    env: {
        node: true,
        es6: true,
    },
    parserOptions: {
        ecmaVersion: 2019,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
        },
    },
    rules: {},
};
