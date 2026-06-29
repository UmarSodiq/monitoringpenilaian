const fs = require("fs");
const file = "index.html";
let content = fs.readFileSync(file, "utf8");
let start = content.indexOf("function renderPivotPenaltiTable");
let end = content.indexOf("window.resetPajakTab = function");
if (start !== -1 && end !== -1) {
  let repl = `function renderPivotPenaltiTable(containerId, violationsArray, emptyMsg) {
  const container = document.getElementById(containerId);
  if (!container) return;
  if (!violationsArray || violationsArray.length === 0) {
    container.innerHTML = \`<div class="px-4 py-8 text-center text-textMuted text-sm">\${emptyMsg || "Tidak ada data yang ditemukan."}</div>\`;
    return;
  }
  const months = ["JAN", "FEB", "MAR", "APR", "MEI", "JUN", "JUL", "AGU", "SEP", "OKT", "NOV", "DES"];
  let groups = {};
  if (window.parsedData && window.parsedData.length > 0) {
      window.parsedData.forEach(d => {
          let key = String(d.satker).trim();
          groups[key] = { no: d.id, ba: d.ba || "-", satker: key, namaSatker: d.nama_satker || "-", total: 0, details: {}, order: d.id };
      });
  }
  let customOrder = 99999;
  violationsArray.forEach(v => {
      let key = String(v.satker).trim();
      if (!groups[key]) groups[key] = { no: "-", ba: v.ba || "-", satker: key, namaSatker: v.namaSatker || "-", total: 0, details: {}, order: customOrder++ };
      let pMatch = v.periode.trim().toUpperCase().substring(0, 3);
      let p = months.includes(pMatch) ? pMatch : "JAN";
      if (!groups[key].details[p]) groups[key].details[p] = { jumlah: 0, alasan: [] };
      groups[key].details[p].jumlah += v.jumlah;
      if (v.keterangan && v.keterangan !== "-") groups[key].details[p].alasan.push(v.keterangan);
      groups[key].total += v.jumlah;
  });
  let html = \`<table class="w-full text-left text-sm whitespace-nowrap">\`;
  html += \`<thead class="bg-bg text-textMuted uppercase text-[0.65rem] tracking-wider"><tr>\`;
  html += \`<th class="px-4 py-3 font-semibold border-b border-border sticky top-0 bg-bg opacity-100 left-0 z-20">NO</th>\`;
  html += \`<th class="px-4 py-3 font-semibold border-b border-border sticky top-0 bg-bg opacity-100 left-[40px] z-20">BA</th>\`;
  html += \`<th class="px-4 py-3 font-semibold border-b border-border sticky top-0 bg-bg opacity-100 left-[100px] z-20">KODE SATKER</th>\`;
  html += \`<th class="px-4 py-3 font-semibold border-b border-border sticky top-0 bg-bg opacity-100 z-10">NAMA SATKER</th>\`;
  months.forEach(m => {
      html += \`<th class="px-4 py-3 font-semibold border-b border-border sticky top-0 bg-bg opacity-100 text-center z-10">\${m}</th>\`;
      html += \`<th class="px-4 py-3 font-semibold border-b border-border sticky top-0 bg-bg opacity-100 z-10">ALASAN</th>\`;
  });
  html += \`<th class="px-4 py-3 font-semibold border-b border-border sticky top-0 bg-slate-50 opacity-100 text-right z-10">JUMLAH</th></tr></thead>\`;
  html += \`<tbody class="divide-y divide-border bg-bgCard">\`;
  let sortedGroups = Object.values(groups).sort((a,b) => a.order - b.order);
  sortedGroups.forEach(g => {
      html += \`<tr class="hover:bg-bgHover transition-colors group cursor-pointer">\`;
      html += \`<td class="px-4 py-3 border-b border-border sticky left-0 z-10 bg-bgCard group-hover:bg-bgHover">\${g.no}</td>\`;
      html += \`<td class="px-4 py-3 border-b border-border sticky left-[40px] z-10 bg-bgCard group-hover:bg-bgHover">\${g.ba}</td>\`;
      html += \`<td class="px-4 py-3 border-b border-border font-mono font-medium sticky left-[100px] z-10 bg-bgCard text-primary group-hover:bg-bgHover">\${g.satker}</td>\`;
      html += \`<td class="px-4 py-3 border-b border-border"><div class="truncate max-w-[200px]" title="\${g.namaSatker}">\${g.namaSatker}</div></td>\`;
      months.forEach(m => {
          let d = g.details[m];
          if (d && d.jumlah > 0) {
              html += \`<td class="px-4 py-3 border-b border-border text-center font-semibold text-rose-600">\${d.jumlah.toLocaleString("id-ID")}</td>\`;
              let uniqueAlasan = [...new Set(d.alasan)].join(" | ");
              html += \`<td class="px-4 py-3 border-b border-border text-xs"><div class="truncate max-w-[200px]" title="\${uniqueAlasan}">\${uniqueAlasan}</div></td>\`;
          } else {
              html += \`<td class="px-4 py-3 border-b border-border text-center text-textMuted/40">-</td><td class="px-4 py-3 border-b border-border text-textMuted/40">-</td>\`;
          }
      });
      html += \`<td class="px-4 py-3 border-b border-border bg-slate-50/50 group-hover:bg-slate-100 font-bold text-right \${g.total > 0 ? "text-rose-600" : "text-slate-700"}">\${g.total.toLocaleString("id-ID")}</td></tr>\`;
  });
  html += \`</tbody></table>\`;
  container.innerHTML = html;
}

      `;
  content = content.substring(0, start) + repl + content.substring(end);
  fs.writeFileSync(file, content);
  console.log("Success");
} else {
  console.log("Indices not found");
}
