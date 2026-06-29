let str = "VLOOKUP(C8;'JAN'!$C:$G;5;0)";
let m = 'JAN';
let ptrn = new RegExp(`VLOOKUP\\s*\\(\\s*[^;,]+[;,]\\s*'?(${m})'?\\!\\$?([A-Z]+)\\$?\\d*\\s*:\\s*\\$?([A-Z]+)\\$?\\d*\\s*[;,]\\s*(\\d+)`, 'i');
console.log(str.match(ptrn));
