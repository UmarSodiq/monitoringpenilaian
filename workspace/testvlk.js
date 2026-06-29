let str = "VLOOKUP($C8, 'PAJAK'!$C$5:$F$100, 4, FALSE)";
let reg = /VLOOKUP\s*\(\s*([^;,]+)\s*[;,]\s*'?([^'!]+)'?\!\$?([A-Z]+)[$\d]*\s*:\s*\$?([A-Z]+)[$\d]*\s*[;,]\s*(\d+)/i;
console.log(str.match(reg));
