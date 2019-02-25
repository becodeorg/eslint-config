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
    rules: {
        // Possible Errors
        "for-direction": ERROR,
        "getter-return": ERROR,
        "no-async-promise-executor": ERROR,
        "no-await-in-loop": ERROR,
        "no-compare-neg-zero": ERROR,
        "no-cond-assign": [ERROR, "except-parens"],
        "no-console": [WARNING],
        "no-constant-condition": ERROR,
        "no-control-regex": ERROR,
        "no-debugger": WARNING,
        "no-dupe-args": ERROR,
        "no-dupe-keys": ERROR,
        "no-duplicate-case": ERROR,
        "no-empty": ERROR,
        "no-empty-character-class": ERROR,
        "no-ex-assign": ERROR,
        "no-extra-boolean-cast": ERROR,
        "no-extra-parens": ERROR,
        "no-extra-semi": ERROR,
        "no-func-assign": ERROR,
        "no-inner-declarations": ERROR,
        "no-invalid-regexp": ERROR,
        "no-irregular-whitespace": ERROR,
        "no-misleading-character-class": ERROR,
        "no-obj-calls": ERROR,
        "no-prototype-builtins": ERROR,
        "no-regex-spaces": ERROR,
        "no-sparse-arrays": ERROR,
        "no-template-curly-in-string": ERROR,
        "no-unexpected-multiline": ERROR,
        "no-unreachable": ERROR,
        "no-unsafe-finally": ERROR,
        "no-unsafe-negation": ERROR,
        "require-atomic-updates": ERROR,
        "use-isnan": ERROR,
        "valid-typeof": ERROR,
    },
};
