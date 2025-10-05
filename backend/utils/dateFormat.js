// backend/utils/dateFormat.js
function pad2(n) { return String(n).padStart(2, '0'); }

function formatLocal(dt = new Date()) {
    const Y = dt.getFullYear();
    const M = pad2(dt.getMonth() + 1);
    const D = pad2(dt.getDate());
    const h = pad2(dt.getHours());
    const m = pad2(dt.getMinutes());
    const s = pad2(dt.getSeconds());
    return `${Y}-${M}-${D} ${h}:${m}:${s}`;
}

module.exports = { formatLocal };
