const XLSX = require('xlsx');

// Mock `_normSatker`
function _normSatker(raw) {
  let s = String(raw == null ? "" : raw)
    .trim()
    .replace(/[^\d]/g, "");
  return s.length >= 4 && s.length <= 6 ? s.padStart(6, "0") : null;
}

const ws_data = [
  ["", "", "", "TOLAK LPJ", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
  ["NO", "BA", "KODE SATKER", "URAIAN", "JAN", "alasan", "FEB", "alasan", "MAR", "alasan", "APR", "alasan", "MEI", "alasan", "JUN", "JUMLAH"],
  [42, "006", "005400", "KEJAKSAAN NEGERI TEMANGGUNG", "", "", "", "", "", "", "", "", "", "", "", 0],
  [43, "006", "5498", "KEJAKSAAN NEGERI KOTA MAGELANG", 1, "Uang tunai di brankas...", 0, "", 0, "", "", "", "", "", "", 1],
  [44, "054", "019035", "BADAN PUSAT STATISTIK KOTA MAGELANG", 0, "", 0, "", 0, "", "", "", "", "", "", 0]
];

const wb = XLSX.utils.book_new();
const ws = XLSX.utils.aoa_to_sheet(ws_data);
XLSX.utils.book_append_sheet(wb, ws, "PENOLAKAN");

const rawJson = XLSX.utils.sheet_to_json(ws, {
  header: 1,
  raw: true,
  defval: "",
});
const months = ["JAN", "FEB", "MAR", "APR", "MEI", "JUN", "JUL", "AGU", "SEP", "OKT", "NOV", "DES"];

let headerRowIdx = -1;
for (let i = 0; i < Math.min(rawJson.length, 20); i++) {
  const row = rawJson[i];
  if (!row || !row.length) continue;
  let upRow = row.map(c => String(c).trim().toUpperCase());
  if (upRow.includes("SATKER") || upRow.includes("KODE SATKER")) {
    headerRowIdx = i;
    break;
  }
}

console.log("headerRowIdx:", headerRowIdx); // returns 1

let headerRow = rawJson[headerRowIdx].map(c => String(c).trim().toUpperCase());
let colMap = {
   no: headerRow.indexOf("NO") !== -1 ? headerRow.indexOf("NO") : headerRow.indexOf("NO."),
   ba: headerRow.indexOf("BA") !== -1 ? headerRow.indexOf("BA") : headerRow.indexOf("KODE BA"),
   satker: headerRow.indexOf("SATKER") !== -1 ? headerRow.indexOf("SATKER") : headerRow.indexOf("KODE SATKER"),
   uraian: headerRow.indexOf("URAIAN") !== -1 ? headerRow.indexOf("URAIAN") : (headerRow.indexOf("NAMA SATKER") !== -1 ? headerRow.indexOf("NAMA SATKER") : -1),
   jumlah: headerRow.indexOf("JUMLAH") !== -1 ? headerRow.indexOf("JUMLAH") : headerRow.indexOf("TOTAL"),
   months: {}
};
console.log("satker", colMap.satker);
console.log("uraian", colMap.uraian);
console.log("jumlah", colMap.jumlah);

months.forEach(m => {
  let mIdx = headerRow.indexOf(m);
  if (mIdx !== -1) {
    let alasanIdx = -1;
    for (let j = mIdx + 1; j < headerRow.length; j++) {
        if (headerRow[j] === "ALASAN" || headerRow[j] === "KETERANGAN") {
            alasanIdx = j;
            break;
        } else if (months.includes(headerRow[j])) {
            break;
        }
    }
    colMap.months[m] = { valIdx: mIdx, alasanIdx: alasanIdx };
  }
});
console.log("colMap months:", colMap.months);


let violations = [];
for (let i = headerRowIdx + 1; i < rawJson.length; i++) {
  const row = rawJson[i];
  if (!row || !row.length) continue;

  let rawSatker = colMap.satker !== -1 ? row[colMap.satker] : "";
  let fmtSatker = _normSatker(rawSatker);
  if (!fmtSatker) continue;

  let totalJumlah = 0;
  let monthData = {};

  months.forEach(m => {
    let valRaw = 0;
    let alasan = "";
    if (colMap.months[m]) {
       valRaw = row[colMap.months[m].valIdx];
       if (colMap.months[m].alasanIdx !== -1) {
           alasan = String(row[colMap.months[m].alasanIdx] || "").trim();
       }
    }
    let num = Number(valRaw) || 0;
    monthData[m] = { val: num, alasan: alasan };
    totalJumlah += num;
  });

  if (totalJumlah > 0) {
    violations.push({
      id: colMap.no !== -1 ? row[colMap.no] : "-",
      ba: colMap.ba !== -1 ? row[colMap.ba] : "-",
      satker: fmtSatker,
      nama_satker: colMap.uraian !== -1 ? row[colMap.uraian] : (fmtSatker),
      jumlah: totalJumlah,
      monthData: monthData
    });
  }
}

console.log(violations);
