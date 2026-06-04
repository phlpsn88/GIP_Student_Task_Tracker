# 🚀 TaskManager – Installatiehandleiding

Welkom bij **TaskManager**! Volg onderstaande stappen om het project correct te installeren en op te starten.

---

# 📋 Vereisten

Voor je begint, zorg ervoor dat je volgende software hebt geïnstalleerd:

* ✅ Node.js (LTS-versie)
* ✅ MySQL Server
* ✅ MySQL Workbench
* ✅ Visual Studio Code (aanbevolen)

---

# 1️⃣ Node.js Installeren

## 📥 Download

Download de nieuwste **LTS-versie** van Node.js via:

**🌐 https://nodejs.org/en/download**

## ⚙️ Installatie

1. Open de website.
2. Download de **LTS-versie**.
3. Kies jouw besturingssysteem (Windows of macOS).
4. Open het gedownloade bestand.
5. Doorloop de installatie en klik telkens op **Next**.
6. Controleer na installatie of Node.js correct werkt:

```bash
node -v
npm -v
```

Wanneer beide versienummers worden weergegeven, is de installatie geslaagd.

---

# 2️⃣ Project Initialiseren

Open een terminal in de map **Server**.

```bash
cd Server
npm init -y
```

Dit maakt automatisch een `package.json` bestand aan waarin alle projectinstellingen worden opgeslagen.

---

# 3️⃣ Vereiste Packages Installeren

Voer volgend commando uit:

```bash
npm install express mysql2 bcrypt express-session
```

## 📦 Overzicht van de packages

| Package         | Beschrijving                     |
| --------------- | -------------------------------- |
| Express         | Webserver en routing             |
| MySQL2          | Verbinding met de MySQL-database |
| Bcrypt          | Veilige opslag van wachtwoorden  |
| Express Session | Beheer van gebruikerssessies     |

---

# 4️⃣ Server Opstarten

Start de applicatie vanuit de map **Server**.

### Ontwikkelingsmodus

```bash
npm run dev
```

### Productiemodus

```bash
npm start
```

Na het opstarten zou de server zonder fouten moeten starten.

---

# 5️⃣ Applicatie Testen

Open je browser en ga naar:

```text
http://localhost:3000
```

Wanneer de website wordt geladen, werkt de server correct.

---

# 6️⃣ MySQL Database Opzetten

## 📂 Database aanmaken

Maak een nieuwe database aan met de naam:

```sql
CREATE DATABASE taskmanager;
```

## 📥 Database Script Importeren

1. Open MySQL Workbench.
2. Maak verbinding met je MySQL-server.
3. Selecteer de database `taskmanager`.
4. Open het bestand:

```text
Server/database.sql
```

5. Voer het script uit.

Na uitvoering worden alle tabellen automatisch aangemaakt.

---

# 7️⃣ Admin Account Aanmaken

Om toegang te krijgen tot alle beheerdersfuncties moet een gebruiker de rol **admin** krijgen.

## 🔐 Bcrypt Hash Genereren

Open een terminal in de map **Server** en voer uit:

```bash
node -e "import('bcrypt').then(b => b.default.hash('<jouw_wachtwoord>', 10).then(h => console.log(h)))"
```



Kopieer vervolgens de gegenereerde hash.

---

## 👤 Adminrechten Toekennen

Open MySQL Workbench en voer onderstaande query uit:

```sql
UPDATE users
SET
    wachtwoord = 'GEKOPIEERDE_HASH_HIER',
    rol = 'admin'
WHERE email = 'admin@taskmanager.be';
```

### Voorbeeld

```sql
UPDATE users
SET
    wachtwoord = '$2b$10$XXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    rol = 'admin'
WHERE email = 'admin@taskmanager.be';
```

Na het uitvoeren van deze query beschikt het account over administratorrechten.

---

# ✅ Installatie Voltooid

Wanneer alle bovenstaande stappen succesvol zijn uitgevoerd:

* ✅ Node.js is geïnstalleerd
* ✅ De database is aangemaakt
* ✅ De server draait correct
* ✅ De applicatie is bereikbaar via localhost
* ✅ Het adminaccount is geconfigureerd

Je bent nu klaar om TaskManager te gebruiken en verder te ontwikkelen.

---

## 📞 Problemen?

Controleer eerst:

* Draait MySQL?
* Bestaat de database `taskmanager`?
* Zijn alle npm-packages geïnstalleerd?
* Staat de databaseconfiguratie correct ingesteld?

Bekijk eventuele foutmeldingen in de terminal voor meer informatie.
