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
import {sync as spawnSync} from "cross-spawn";

const writeFile = promisify(fs.writeFile);

const ESLINTRC = ".eslintrc.js";
const PRETTIERRC = ".prettierrc";
const PACKAGE_JSON = "package.json";

const {peerDependencies} = require("../package.json");

(async () => {
    const withHook =
        process.argv.includes("--with-hook") ||
        process.argv.includes("--with-hooks");
    const withScripts =
        process.argv.includes("--with-script") ||
        process.argv.includes("--with-scripts");

    const adds = [];

    withHook && adds.push(`a ${chalk.yellow("pre-commit")} hook`);
    withScripts && adds.push(`a couple of ${chalk.yellow("npm scripts")}`);

    const ok = await confirm({
        name: "ok",
        message: [
            `This will create the files ${chalk.cyan(
                ".eslintrc.js",
            )} and ${chalk.cyan(
                ".prettierrc",
            )} here and install the needed dependencies.`,
            adds.length ? `It will also setup ${adds.join(" and ")}.` : "",
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

        // eslint-disable-next-line global-require
        const packageProps = require(packagePath);

        if (withScripts) {
            if (packageProps.scripts && packageProps.scripts.lint) {
                console.log(
                    "🤔",
                    `You already have a ${chalk.cyan(
                        "lint",
                    )} script in your ${chalk.yellow("package.json")}. Skip.`,
                );
            } else {
                !packageProps.scripts && (packageProps.scripts = {});

                packageProps.scripts.lint = "npx eslint --fix --cache src";

                console.log(
                    "🖐",

                    `There's now a ${chalk.cyan(
                        "lint",
                    )} script in your ${chalk.yellow(
                        "package.json",
                    )}. This script assumes your files are in the ${chalk.cyan(
                        "src",
                    )} folder. Correct the path in your package.json if needed.`,
                );
            }
        }

        await writeFile(
            packagePath,
            JSON.stringify(
                {
                    ...packageProps,
                    "lint-staged": {
                        "*.json": ["npx prettier --write"],
                        "*.js": ["npx eslint --fix --cache"],
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
