# Arkitektur: Hvordan hænger backend og frontend sammen (Dev Jokes Likeboard)

Et  mini-projekt til datamatiker 3. semester, der viser **frontend ↔ backend**-arkitektur i Node/Express (**CommonJS**).  
Frontend (HTML/JS) kalder backendens REST-lignende API og opdaterer DOM. Backend er opdelt i **routes → controllers → services → data (repo)**.  
Eksemplet er bevidst **simpelt** (ingen create/edit), men motiverende: en liste af dev-jokes, som kan **likes**.

## Læringsmål
- Forstå **request/response**-flow fra frontend til backend via **fetch** og JSON.
- Placér kode i passende **lag** (route, controller, service, repo).
- Se hvordan **validering/forretningslogik** naturligt bor i service.
- Lave små ændringer og observere effekten i UI.

## Arkitektur-overblik

