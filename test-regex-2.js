let str = "VLOOKUP(C8;'JAN'!C:G;5;0)";
let targetSheetName = "JAN";
let ptrn = new RegExp(`VLOOKUP\\s*\\(\\s*[^;,]+[;,]\\s*'?(${targetSheetName})'?\\!\\$?([A-Z]+)\\$?\\d*\\s*:\\s*\\$?([A-Z]+)\\$?\\d*\\s*[;,]\\s*(\\d+)`, 'i');
let mMatch = str.match(ptrn);
console.log(mMatch);
