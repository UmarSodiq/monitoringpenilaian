let str = "VLOOKUP(C8;'JAN'!$C:$G;5;0)";
console.log(str);
let vlookupMatch = str.match(/VLOOKUP\s*\(\s*[^;,]*?\$?([A-Z]+)\$?(\d+)[^;,]*?[;,]\s*'?([^'!]+)'?\!/i);
console.log(vlookupMatch);
