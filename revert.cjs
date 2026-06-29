const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

// 1. Revert fbSync
code = code.replace(/const workspaceId = window\.currentWorkspaceId \|\| "main_workbook";\s*const path = `users\/\$\{auth\.currentUser\.uid\}\/data\/workspaces\/\$\{workspaceId\}`;/g, "const path = `users/${auth.currentUser.uid}/data/current`;");

// 2. Revert Header UI
code = code.replace(/<!-- Workspace Dropdown -->[\s\S]*?id="header-auth-container"/, 'id="header-auth-container"');

// 3. Revert workspace variables
code = code.replace(/\/\/ Workspace Management[\s\S]*?let targetWorkbook = null;/m, 'let targetWorkbook = null;');

// 4. Revert FirebaseReady
code = code.replace(/window\.addEventListener\("FirebaseReady", async \(\) => \{[\s\S]*?checkAuth\(\);\s*startSyncing\(\);\s*\}\);/m, `window.addEventListener("FirebaseReady", () => {
          console.log("Firebase is ready, updating authentication status...");
          checkAuth();
          startSyncing();
        });`);

code = code.replace(/if \(window\.FirebaseApp\) \{[\s\S]*?checkAuth\(\);\s*startSyncing\(\);\s*\} else \{/m, `if (window.FirebaseApp) {
        checkAuth();
        startSyncing();
      } else {`);

// 5. Revert main_workbook
code = code.replace(/window\.currentWorkspaceId \|\| "main_workbook"/g, '"main_workbook"');

// 6. Revert localforage keys
const keysToRevert = [
    "targetWorkbookBase64",
    "targetWorkbookName",
    "tolakViolations",
    "pajakViolations",
    "kasTunaiViolations"
];

for (let key of keysToRevert) {
    const setRegex = new RegExp(`localforage\\.setItem\\("main_workbook" \\+ "_${key}"`, "g");
    code = code.replace(setRegex, `localforage.setItem("${key}"`);
    
    const getRegex = new RegExp(`localforage\\.getItem\\("main_workbook" \\+ "_${key}"`, "g");
    code = code.replace(getRegex, `localforage.getItem("${key}"`);
}

fs.writeFileSync('index.html', code);
console.log("Revert complete.");
