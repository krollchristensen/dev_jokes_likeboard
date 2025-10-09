# Dev Jokes Likeboard

Et mini-projekt til 3. semester datamatikerstuderende.  
Projektet viser, hvordan frontend (HTML/JS) og backend (Express) arbejder sammen i en simpel arkitektur.  
Frontend henter en liste af jokes og kan “like” dem. Backend håndterer data og svarer i JSON.

---

## Formål
- Forstå hvordan frontend og backend kommunikerer via HTTP og JSON.
- Følge et request/response-flow.
- Se hvordan lagene i backend hænger sammen:
  ```
  routes → controllers → services → data (repo)
  ```
- Forstå brugen af async/await og statuskoder.

---

## Arkitektur

Projektet følger en enkel **MVC-struktur**:

- **Model (data/)**: håndterer jokes i hukommelsen (mock-database)
- **Controller (controllers/)**: modtager requests og sender svar
- **Service (services/)**: indeholder logik for likes og random jokes
- **Routes (routes/)**: definerer API-endpoints
- **Frontend (frontend/)**: statiske filer (HTML, CSS, JS)
- **Middlewares (middlewares/)**: fx logger til requests
- **Utils (utils/)**: små hjælpefunktioner, fx datoformat
- **server.js**: opsætter Express-serveren og forbinder lagene

---

## Sekvensdiagrammer

Disse viser, hvordan frontend og backend hænger sammen:
- [SD.svg](https://github.com/krollchristensen/dev_jokes_likeboard/blob/master/SDsvg.svg)
- [SD.png](https://github.com/krollchristensen/dev_jokes_likeboard/blob/master/SD.png)

---

## Kom i gang

1. Installer afhængigheder:
   ```bash
   npm install
   ```
2. Start serveren:
   ```bash
   npm run dev
   ```
3. Åbn i browser:
   ```
   http://localhost:3000
   ```
4. Du bør se en liste af jokes med Like-knapper.

---

## Test API’et med Postman

Brug følgende endpoints til at teste backend:

| Metode | URL | Funktion |
|--------|-----|-----------|
| GET | http://localhost:3000/api/jokes | Hent alle jokes |
| PUT | http://localhost:3000/api/jokes/1/like | Like en joke |
| GET | http://localhost:3000/api/jokes/random | Hent en tilfældig joke |

Hvis alt virker, ser du også request-logs i terminalen (fra `middlewares/logger.js`).

---

## Asynkronitet

Frontend anvender `fetch()` med Promises, og backend bruger `async/await`.  
Dette gør, at koden ikke blokerer – serveren kan håndtere flere requests på samme tid.

---

## Typisk flow for et Like

Frontend PUT /api/jokes/:id/like  
→ route  
→ controller  
→ service  
→ repo  
→ svar (JSON)  
→ frontend opdaterer DOM uden reload.

---

## Facit / Hint

Her er korte svar og pejlemærker til opgaven "Analyser arkitekturen i Dev Jokes Likeboard":

1. **server.js**
   - Statisk frontend serves med `app.use(express.static('frontend'))`.
   - API-ruter mountes med `app.use('/api/jokes', jokeRoutes)`.
   - Logger tilføjes med `app.use(loggerMiddleware)`.

2. **routes/jokeRoutes.js**
   - Endpoints:
     - `GET /api/jokes`
     - `PUT /api/jokes/:id/like`
     - `GET /api/jokes/random`

3. **frontend/app.js**
   - `fetch('/api/jokes')` og `fetch('/api/jokes/:id/like')` anvendes.
   - `fetch` returnerer Promises og forventer JSON.

4. **controllers/jokeController.js**
   - Returnerer 400 hvis `id` ikke er et tal.
   - Returnerer 404 hvis id ikke findes.
   - Kalder `jokeService.likeJoke()` ved success.

5. **services/jokeService.js**
   - Formålet er at holde forretningslogik ude af controlleren.
   - Kalder `jokeRepo.updateLikes()`.

6. **data/jokeRepo.js**
   - Finder en joke med det givne id og øger dens likes.
   - Returnerer den opdaterede joke.

7. **Middleware**
   - `middlewares/logger.js` logger metode, path, status og svartid i ms.

8. **Asynkron kode**
   - `await` bruges i controllers, så koden venter på data før svar sendes.
   - Dette gør koden mere læsbar end `.then()`-kæder.

9. **Når PUT /api/jokes/999/like kaldes**
   - Controller svarer med 404 Not Found.
   - Beslutningen tages i `jokeController.js` efter kald til service/repo.

10. **Frontend**
   - UI opdateres automatisk, fordi DOM opdateres i `render()`-funktionen efter `fetch`-responsen.

---

## Ekstra øvelse

Prøv at ændre projektet:

- Sortér jokes efter flest likes i `frontend/app.js` eller `services/jokeService.js`.
- Tilføj en CSS-klasse i `render()` hvis likes ≥ 10.
- Tilføj en knap i HTML, der henter en tilfældig joke via `/api/jokes/random`.

---

## Krav og opsummering

- Node.js + Express
- CommonJS-moduler (`require`, `module.exports`)
- Ingen database – data ligger i `backend/data/jokeRepo.js`
- Logning, statuskoder og async/await skal forstås i helheden.

---

## Kilde

Opgaven og kodebasen findes her:  
https://github.com/krollchristensen/dev_jokes_likeboard.git
