// backend/controllers/jokeController.js
// Controller: håndterer HTTP-koder, let parsing, kalder service.

const jokeService = require('../services/jokeService');

function parseId(p) {
    const id = Number(p);
    return Number.isFinite(id) ? id : null;
}

async function getAll(req, res) {
    const items = await jokeService.list();
    res.json(items);
}

async function getRandom(req, res) {
    const item = await jokeService.random();
    res.json(item);
}

async function likeOne(req, res) {
    const id = parseId(req.params.id);
    if (id === null) return res.status(400).json({ error: 'Ugyldigt id' });

    const updated = await jokeService.like(id);
    if (!updated) return res.status(404).json({ error: 'Ikke fundet' });
    res.json(updated);
}

module.exports = { getAll, getRandom, likeOne };
