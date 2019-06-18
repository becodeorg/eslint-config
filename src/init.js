#!/usr/bin/env node
/* becodeorg/eslint-config
 *
 * /src/init.js - Init script - Setup ESLint & Prettier
 *
 * coded by leny@BeCode
 * started at 24/10/2018
 */

/* eslint-disable no-console */

import {promisify} from "util";
import path from "path";
import fs from "fs";
import {confirm} from "enquirer";
import chalk from "chalk";
import {spawnSync} from "child_process";

const writeFile = promisify(fs.writeFile);

const ESLINTRC = ".eslintrc.js";
const PRETTIERRC = ".prettierrc";
const PACKAGE_JSON = "package.json";

const {peerDependencies} = require("../package.json");

(async () => {
    const withHook = process.argv.includes("--with-hook");

    const ok = await confirm({
        name: "ok",
        message: [
            `This will create the files ${chalk.cyan(
                ".eslintrc.js",
            )} and ${chalk.cyan(
                ".prettierrc",
            )} here and install the needed dependencies.`,
            withHook
                ? `It will also setup a ${chalk.yellow("pre-commit")} hook.`
                : "",
            "Are you ok?",
        ].join(" "),
        initial: false,
    });

    if (!ok) {
        console.log(chalk.red("Abort."), "Bye.");
        process.exit();
    }

    await writeFile(
        path.resolve(process.cwd(), ESLINTRC),
        `
module.exports = {
    extends: "@becode",
};`,
        "utf8",
    );

    await writeFile(
        path.resolve(process.cwd(), PRETTIERRC),
        `{
    "singleQuote": false,
    "tabWidth": 4,
    "trailingComma": "all",
    "bracketSpacing": false,
    "jsxBracketSameLine": true,
    "overrides": [
        {
            "files": "*.json",
            "options": {
                "tabWidth": 2
            }
        }
    ]
}`,
        "utf8",
    );

    const dependencies = Object.keys(peerDependencies);

    withHook && dependencies.push("husky", "lint-staged");

    spawnSync(
        "npm",
        ["i", "--save-dev", "@becode/eslint-config"].concat(dependencies),
        {stdio: "inherit"},
    );

    if (withHook) {
        const packagePath = path.resolve(process.cwd(), PACKAGE_JSON);

        await writeFile(
            packagePath,
            JSON.stringify(
                {
                    ...require(packagePath), // eslint-disable-line global-require
                    "lint-staged": {
                        "*.js": ["npx eslint --fix --cache", "git add"],
                    },
                    husky: {
                        hooks: {
                            "pre-commit": "npx lint-staged",
                        },
                    },
                },
                null,
                2,
            ),
            "utf8",
        );
    }

    console.log("🎉", chalk.green("Success!"));
})();
