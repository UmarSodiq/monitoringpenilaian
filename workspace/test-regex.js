let str = "VLOOKUP($A6;'JAN'!$C:$G;5;0)";
console.log(str.match(/VLOOKUP\s*\(\s*\$?([A-Z]+)\$?(\d+)\s*[;,]\s*'?([^'!]+)'?\!/i));
