// backend/services/jokeService.js
// Service: forretningslogik/regler. Kalder repo for data.

const repo = require('../data/jokeRepo');

async function list() {
    // Eksempelregel: returnér en kopi sorteret efter id (stabil visning)
    const items = await repo.findAll();
    return items.sort((a, b) => a.id - b.id);
}

async function random() {
    const items = await repo.findAll();
    if (items.length === 0) return null;
    return items[Math.floor(Math.random() * items.length)];
}

async function like(id) {
    // Regel: man må like alle jokes; repo håndterer om id findes
    return repo.incrementLikes(id);
}

module.exports = { list, random, like };
