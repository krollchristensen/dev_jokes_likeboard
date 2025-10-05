// frontend/app.js
const listEl = document.getElementById('list');

async function loadJokes() {
    const res = await fetch('/api/jokes');
    const items = await res.json();
    render(items);
}

function render(items) {
    listEl.innerHTML = '';
    for (const it of items) {
        const li = document.createElement('li');
        li.className = 'joke';

        const text = document.createElement('span');
        text.className = 'grow';
        text.textContent = it.text;

        const likes = document.createElement('span');
        likes.className = 'likes';
        likes.textContent = it.likes;

        const btn = document.createElement('button');
        btn.textContent = '👍 Like';
        btn.addEventListener('click', () => like(it.id));

        li.appendChild(text);
        const right = document.createElement('div');
        right.className = 'actions';
        right.appendChild(likes);
        right.appendChild(btn);
        li.appendChild(right);

        listEl.appendChild(li);
    }
}

async function like(id) {
    const res = await fetch(`/api/jokes/${id}/like`, { method: 'PUT' });
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert('Kunne ikke like: ' + (err.error || res.status));
        return;
    }
    await loadJokes();
}

loadJokes();
