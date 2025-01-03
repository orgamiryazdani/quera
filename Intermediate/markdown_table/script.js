const convertBtn = document.querySelector('#convert');
const markdownInput = document.querySelector('#markdown');
const tableOutput = document.querySelector('#table');

convertBtn.addEventListener('click', convertToHtml);

function convertToHtml() {
    const markdown = markdownInput.value;
    const lines = markdown.split('\n').filter(line => line.trim());

    if (lines.length < 2) return;

    let html = '<table>\n    <tbody>\n';

    const separatorLines = new Set();
    lines.forEach((line, index) => {
        if (line.includes('---')) {
            separatorLines.add(index);
        }
    });

    lines.forEach((line, index) => {
        if (separatorLines.has(index)) return;

        const cells = line
            .trim()
            .replace(/^\||\|$/g, '')
            .split('|')
            .map(cell => cell.trim());

        const isHeader = separatorLines.has(index + 1);

        html += '        <tr>\n';

        cells.forEach(cell => {
            const tag = isHeader ? 'th' : 'td';
            html += `            <${tag}>${cell}</${tag}>\n`;
        });

        html += '        </tr>\n';
    });

    html += '    </tbody>\n</table>';

    tableOutput.innerHTML = html;
}