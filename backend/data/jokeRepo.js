// backend/data/jokeRepo.js
// In-memory "database". I en rigtig app ville dette være en DB eller fil.

let nextId = 1;
const jokes = [
    { id: nextId++, text: "Why do programmers prefer dark mode? Because light attracts bugs.", likes: 3 },
    { id: nextId++, text: "There are 10 types of people: those who understand binary and those who don’t.", likes: 5 },
    { id: nextId++, text: "I would tell you a UDP joke, but you might not get it.", likes: 2 }
];

async function findAll() {
    return jokes.map(j => ({ ...j }));
}

async function findById(id) {
    const it = jokes.find(j => j.id === id);
    return it ? { ...it } : null;
}

async function incrementLikes(id) {
    const idx = jokes.findIndex(j => j.id === id);
    if (idx === -1) return null;
    jokes[idx] = { ...jokes[idx], likes: jokes[idx].likes + 1 };
    return { ...jokes[idx] };
}

module.exports = { findAll, findById, incrementLikes };
