#!/usr/local/bin/node
const fs = require("fs");
const yargs = require("yargs");
const path = require("path");
const inquirer = require('inquirer');

const options = yargs
	.usage("Usage: -fw <path>")
	.option("fw", { 
        alias: "findWord", 
        describe: "Searching word", 
        type: "string", 
        demandOption: false 
    }).argv;
console.log(options);
function creatPathTree(fullPath, searchSring) {

    let executionDir;
    if (fullPath) {
        executionDir = fullPath;
    } else {
        executionDir = process.cwd();
    }
    const list = fs.readdirSync(executionDir);
    inquirer.prompt([
        {
            name: 'fileName',
            type: 'list',
            message: 'Choose a file to read',
            choices: list,
        },
    ])
        .then(({ fileName }) => {
            const fullPath = path.join(executionDir, fileName);
            const isFile = fs.statSync(fullPath).isFile()
            if (isFile) {
                fs.readFile(fullPath, 'utf-8', (err, data) => {
                    if (err) console.log(err);
                    else {
                        console.log(data);
                        if (data.includes(searchSring)) {
                            console.log("Совпадение найдено");
                        } else {
                            console.log("Совпадений НЕТ");
                        }
                    }
                });
            } else {
                creatPathTree(fullPath);
            }
    });
};

creatPathTree(process.cwd(), options.p);
