#!/usr/bin/env node
/* becodeorg/cli
 *
 * /src/index.js - Main entry point
 *
 * coded by leny@BeCode
 * started at 24/10/2018
 */

import path from "path";
import fs from "fs";
import {confirm} from "enquirer";
import chalk from "chalk";
import {spawnSync} from "child_process";

const ESLINTRC = ".eslintrc.js";

const {peerDependencies} = require("../package.json");

(async () => {
    const ok = await confirm({
        name: "ok",
        message: `This will create an ${chalk.cyan(
            ".eslintrc.js",
        )} file here and install the needed dependencies. Are you ok?`,
        initial: false,
    });

    if (!ok) {
        console.log(chalk.red("Abort."), "Bye.");
        process.exit();
    }

    fs.writeFileSync(
        path.resolve(process.cwd(), ESLINTRC),
        `
module.exports = {
    extends: "@becode",
};
        `,
        "utf8",
    );

    spawnSync(
        "npm",
        ["i", "--save-dev"].concat(Object.keys(peerDependencies)),
        {stdio: "inherit"},
    );

    console.log("🎉", chalk.green("Success!"));
})();
