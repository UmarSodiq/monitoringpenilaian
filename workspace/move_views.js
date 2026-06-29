const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const tolakStart = html.indexOf('        <!-- TOLAK View -->');
const kasTunaiEnd = html.indexOf('        <!-- Loading Overlay -->');

let cut = html.substring(tolakStart, kasTunaiEnd);
html = html.substring(0, tolakStart) + html.substring(kasTunaiEnd);

const insertTarget = '              <!-- PAJAK View -->';
const pajakStart = html.indexOf(insertTarget);

// Find the end of view-pajak which is before the `</div>` closing preview-section
// view-pajak has this structure:
//               <!-- PAJAK View -->
//               <div id="view-pajak" ...>
//                 ...
//               </div>

let pajakEnd = html.indexOf('            </div>\n          </div>\n        </div>\n\n        <!-- Result Section -->', pajakStart);

if (pajakEnd !== -1) {
    html = html.substring(0, pajakEnd) + cut + html.substring(pajakEnd);
}

fs.writeFileSync('index.html', html);
console.log('Moved views successfully.');
