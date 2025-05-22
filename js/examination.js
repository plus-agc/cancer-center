const API_KEY = 'WLRY2PadAmNm0gB14Q6fF5d6TiF2nEEjwLCR';
const BASE_URL = 'https://oz7k2ubljd.microcms.io/api/v1/';

function insertMiddleBreak(text) {
    const middle = Math.floor(text.length / 2);
    return `${text.slice(0, middle)}<br>${text.slice(middle)}`;
}

async function fetchData(endpoint) {
    const res = await fetch(endpoint, {
        headers: { 'X-API-KEY': API_KEY }
    });
    const data = await res.json();
    return data.contents;
}

function createHeaderRow(data) {
    const row = document.createElement('tr');
    row.innerHTML = `<th class="main-title" colspan="7"></th>${data.map(item => `<th class="examination_title">${insertMiddleBreak(item.title)}</th>`).join('')}`;
    return row;
}

function createBodyRows(data) {
    const geneRow = document.createElement('tr');
    geneRow.innerHTML = `<th colspan="7">遺伝子数</th>${data.map(item => `<td class="examination_gene">${item.gene}</td>`).join('')}`;

    const bloodRow = document.createElement('tr');
    bloodRow.innerHTML = `<th colspan="7">採血</th>${data.map(item => `<td class="examination_select">${item.blood}</td>`).join('')}`;

    return [geneRow, bloodRow];
}

(async () => {
    const tissueData = await fetchData('https://oz7k2ubljd.microcms.io/api/v1/organization_examination');
    const bloodData = await fetchData('https://oz7k2ubljd.microcms.io/api/v1/blood_examination');

    const tissueHeader = document.getElementById('tissue-test-header');
    const bloodHeader = document.getElementById('blood-test-header');
    const tissueBody = document.getElementById('tissue-test-table-body');
    const bloodBody = document.getElementById('blood-test-table-body');

    tissueHeader.replaceWith(createHeaderRow(tissueData));
    for (const row of createBodyRows(tissueData)) {
        tissueBody.appendChild(row);
    }

    bloodHeader.replaceWith(createHeaderRow(bloodData));
    for (const row of createBodyRows(bloodData)) {
        bloodBody.appendChild(row);
    }
})();