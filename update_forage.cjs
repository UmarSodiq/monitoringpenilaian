const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const keysToPrefix = [
    "targetWorkbookBase64",
    "targetWorkbookName",
    "tolakViolations",
    "pajakViolations",
    "kasTunaiViolations"
];

for (let key of keysToPrefix) {
    const setRegex = new RegExp(`localforage\\.setItem\\(\\s*(["'])${key}(["'])`, "g");
    code = code.replace(setRegex, `localforage.setItem((window.currentWorkspaceId || "main_workbook") + "_${key}"`);
    
    const getRegex = new RegExp(`localforage\\.getItem\\(\\s*(["'])${key}(["'])`, "g");
    code = code.replace(getRegex, `localforage.getItem((window.currentWorkspaceId || "main_workbook") + "_${key}"`);
}

fs.writeFileSync('index.html', code);
console.log("localforage keys updated.");
