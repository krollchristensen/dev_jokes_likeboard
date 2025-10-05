#  Dev Jokes Likeboard
### Node.js-arkitektur mellem frontend og backend

Et  mini-projekt til 3. semester datamatikerstuderende.  
Projektet viser, hvordan **frontend (HTML/JS)** og **backend (Express)** arbejder sammen i en simpel arkitektur.  
Frontend henter en liste af jokes og kan “like” dem. Backend håndterer data og svarer i JSON.

---

## Mål
- Forstå hvordan frontend og backend kommunikerer via **HTTP/JSON**.
- Kunne følge et **request/response-flow**.
- Se hvordan lagene i backend hænger sammen:
  ```
  routes → controllers → services → data (repo)
  ```
- Forstå brugen af **async/await** og **statuskoder**.

---

##  Kom i gang
1. Installer afhængigheder:
   ```bash
   npm install
   ```
2. Start serveren:
   ```bash
   npm run dev
   ```
3. Åbn i browser:
   👉 [http://localhost:3000](http://localhost:3000)

---

## Mappestruktur
```
backend/
  controllers/
  data/
  middlewares/
  routes/
  services/
  utils/
frontend/
  index.html
  app.js
  styles.css
```

---

##  Opgave: Analyser arkitekturen i projektet

### Del 1 – Find rundt i koden

1️⃣ Åbn **backend/server.js**
- Hvor serveres frontend fra?  
  `app.use(express.static(path.join(__dirname, '..', 'frontend')));`
- Hvor kobles API’et på?  
  `app.use('/api/jokes', jokeRoutes);`
- Hvor bruges loggeren?  
  `app.use(requestLogger);`

2️⃣ Åbn **backend/routes/jokeRoutes.js**
- Endpoints:
    - `GET /api/jokes`
    - `GET /api/jokes/random`
    - `PUT /api/jokes/:id/like`

3️⃣ Åbn **frontend/app.js**
- fetch-URL: `/api/jokes`
- Metode: `GET`
- Forventer: JSON (`await res.json()`)

---

### Del 2 – Følg et request (👍 Like)

1. Frontend (`app.js`) kalder `PUT /api/jokes/:id/like`
2. Route (`routes/jokeRoutes.js`) sender til `jokeController.likeOne`
3. Controller (`controllers/jokeController.js`)
    - Tjekker om id er tal.
    - Returnerer `400` ved fejl.
    - Kalder `jokeService.like(id)`.
4. Service (`services/jokeService.js`)
    - Kalder `repo.incrementLikes(id)`.
5. Repo (`data/jokeRepo.js`)
    - Finder joke → øger likes → returnerer objekt.
6. Controller svarer: `res.json(updated)`
7. Frontend opdaterer UI ved at kalde `loadJokes()` igen.

**Flow:**
```
frontend/app.js (like)
→ PUT /api/jokes/:id/like
→ routes/jokeRoutes.js
→ controllers/jokeController.likeOne
→ services/jokeService.like
→ data/jokeRepo.incrementLikes
→ res.json(updated)
```

---

### Del 3 – Sandt eller falsk?

| Påstand | Facit | Forklaring |
|----------|--------|------------|
| Routes bør indeholde forretningsregler | :( | Routes binder URL’er til controllere – ingen logik. |
| Controller vælger HTTP-statuskoder | :) | Controller bestemmer svarkode og besked. |
| Service kalder typisk repo-laget | :) | Service indeholder regler og bruger repo. |
| Repo håndterer HTTP-koder | :( | Repo arbejder kun med data. |
| fetch i frontend er asynkron og bruger Promises | :) | fetch returnerer et Promise, derfor bruges await. |
| Ukendt id giver 404 | :) | Se `jokeController.likeOne()` hvor `updated` er null. |

---

### Del 4 – Asynkroni og fejl

- `async/await` bruges fx i controller og frontend for at gøre asynkron kode let at læse.  
  Eksempel:
  ```js
  const res = await fetch('/api/jokes');
  const items = await res.json();
  ```
- `PUT /api/jokes/999/like` → **404 Not Found**  
  Bestemmes i controlleren:
  ```js
  if (!updated) return res.status(404).json({ error: 'Ikke fundet' });
  ```
- Request-logning:
    - Funktion: `requestLogger()` i `middlewares/logger.js`
    - Logger: tidspunkt, metode, URL, status, responstid.

---

### Del 5 – Forudsig output

1️⃣ Hvis id=1 starter med 3 likes og man klikker 3 gange:  
Likes stiger til **6**.  
2️⃣ UI opdateres automatisk, fordi `like()` i frontend kalder `loadJokes()`, som henter ny data og renderer igen – uden reload.

---

### Del 6 – Miniændringer (eksempler på løsninger)

#### 🔸 A) UI-highlights ved ≥ 10 likes
**app.js**
```js
if (it.likes >= 10) li.classList.add('hot');
```
**styles.css**
```css
.joke.hot {
  border-color: #ffb300;
  background: #fff7e0;
}
```

#### 🔸 B) Sortér efter flest likes (server-side)
**services/jokeService.js**
```js
async function list() {
  const items = await repo.findAll();
  return items.sort((a, b) => b.likes - a.likes);
}
```

#### 🔸 C) Random endpoint i UI
**index.html**
```html
<button id="btn-random">Vis random joke</button>
<div id="random"></div>
```
**app.js**
```js
document.getElementById('btn-random').addEventListener('click', async () => {
  const res = await fetch('/api/jokes/random');
  const it = await res.json();
  document.getElementById('random').textContent = it ? it.text : 'Ingen jokes';
});
```

---

##  Vigtige pointer

- **Controller:** vælger HTTP-status og svar.
- **Service:** indeholder regler og kalder repo.
- **Repo:** arbejder kun med data.
- **Frontend:** bruger `fetch` til at kommunikere og opdaterer DOM.
- **Middleware:** logger requests, så man kan se, hvad der sker.

---

##  Hurtig selvtjek
- [x] Jeg kan forklare forskellen på controller, service og repo.
- [x] Jeg kan følge et “like”-request fra frontend til backend.
- [x] Jeg kan finde hvor statuskoder sættes.
- [x] Jeg forstår hvorfor async/await bruges.
- [x] Jeg ved, hvor request-logningen foregår.
- [x] Jeg har ændret noget i projektet og testet effekten.

---

**Når du har gennemgået dette materiale, har du forstået det grundlæggende i Node-arkitektur:**  
Hvordan frontend og backend kommunikerer, hvordan lagdeling virker, og hvordan asynkron kode håndteres i praksis.
