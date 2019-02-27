# BeCode: ESLint Config

> ⚙️ ESLint default configuration for BeCode projects

* * *

## About

Many of us like to use [ESLint](https://eslint.org) for our projects.

This module contains the common ESLint rules configuration for BeCode project, in a simpler, *without-pain* configuration.

## Usage

To use our rules, you simply need to configure your `.eslintrc.js` to look like this:

```javascript
module.exports = {
	extends: "@becode"
};
```

> cf. the official ESLint documentation [page about shareable configs](https://eslint.org/docs/developer-guide/shareable-configs#using-a-shareable-config).

### Automatic method

You can also use the following command in your project:

	npx @becode/eslint-config
	
That will create the eslint config file *and* install the needed dependencies.  
Simple and easy.

* * *

February 2019, [leny](https://github.com/leny) for [BeCode](https://becode.org).