# 📋 Taskmanager – Volledig Stappenplan

# 🟢 Node.js Downloaden

## 📥 Download Node.js

Ga naar de officiële website om Node.js te downloaden:

👉 [https://nodejs.org](https://nodejs.org/en/download)

---

## ⚙️ Wat moet je doen?

1. Open de link hierboven
2. Klik op de **LTS versie (aanbevolen)**
3. Download het bestand voor jouw besturingssysteem (Windows of Mac)
4. Open het gedownloade bestand
5. Volg de installatie stappen en klik telkens op **Next / Continue**

---

## ⚙️ 1. Project aanmaken

### 📦 npm initialiseren
**Bash — Terminal**
```bash
cd Server
npm init -y
```

---

## 📦 2. Packages installeren
**Bash — Terminal**
```bash
npm install express mysql2 bcrypt express-session
```

### 💡 Waarom?
| Package | Functie |
|--------|--------|
| express | Server & routes |
| mysql2 | Database connectie |
| bcrypt | Wachtwoorden beveiligen |
| express-session | Login sessies |

---

## 🚫 3. .gitignore instellen

Maak bestand: `Server/.gitignore`
node_modules/ dit moet in .gitignore staan
```bash
node_modules/
```

---

## ▶️ 4. Server starten
**Bash — Terminal van de map server**
```bash
npm run dev
# of
npm start
```

---

## 🔍 5. Testen

- http://localhost:3000  

---

## 🗄️ 6. Database opzetten (MySQL)

- Maak database `taskmanager`
- Voer [Database script](../GIP_Student_Task_Tracker/Server/database.sql) uit in MySQL Workbench

---

## 👤 7. Admin account aanmaken

### Hash genereren
**Bash — Terminal**
```bash
node -e "import('bcrypt').then(b => b.default.hash('Admin1234\!', 10).then(h => console.log(h)))"
```

### SQL uitvoeren
```sql
UPDATE users
SET wachtwoord = 'GEKOPIEERDE_HASH_HIER',
    rol = 'admin'
WHERE email = 'admin@taskmanager.be';
```

---

## 🔐 8. Inloggen als admin

Ga naar: http://localhost:3000  
Klik op **Inloggen**

Log in met:

- **Email:** admin@taskmanager.be  
- **Wachtwoord:** het wachtwoord dat je hebt gebruikt bij het genereren van de bcrypt-hash(Admin1234!)

---
