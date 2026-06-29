let str = "VLOOKUP(C8;'JAN'!C:G;5;0)";
let str2 = "VLOOKUP($C$8,'JAN'!$C$1:$G$100,5,FALSE)";
let regex = /VLOOKUP\s*\(\s*[^;,]*?\$?([A-Z]+)\$?(\d+)[^;,]*?[;,]\s*'?([^'!]+)'?\!/i;
console.log(1, str.match(regex));
console.log(2, str2.match(regex));
