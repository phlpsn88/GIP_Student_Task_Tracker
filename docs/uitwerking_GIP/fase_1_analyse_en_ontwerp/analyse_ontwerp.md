# 🧭 Fase 1 – Analyse & Ontwerp

## Periode: November

### 🎯 Doel

Een duidelijk beeld krijgen van wat je gaat bouwen, voor wie en waarom. De Student Task Planner helpt studenten overzicht te houden over hun taken en deadlines.

---

### 1️⃣ Probleemstelling en doel van het project

**Probleemstelling:**
Studenten hebben vaak veel taken en deadlines tegelijk. Het is moeilijk om overzicht te houden, waardoor taken vergeten of te laat ingeleverd worden.

**Doel van de applicatie:**
Een webapplicatie bouwen waarmee studenten hun taken kunnen **toevoegen, bekijken, aanpassen en verwijderen**, zodat ze beter overzicht en planning hebben.

**Voor wie:**

* Studenten van middelbare school, hogeschool of universiteit.
* Eventueel leraren of begeleiders (optioneel in latere fases).

---

### 2️⃣ Functionele analyse

**Gewenste functies:**

1. **Taken beheren:**

   * Taken toevoegen, bewerken en verwijderen.
   * Deadlines instellen.
   * Prioriteit instellen (hoog/midden/laag).
2. **Overzicht:**

   * Takenlijst per dag, week of maand.
   * Filteren op status (voltooid/niet voltooid).

3. **Gebruikersbeheer:** (optioneel)

   * Account aanmaken en inloggen.
---

### 3️⃣ Datamodel (ERD)

**Tabellen:**

1. **users**

   * `id` (PK)
   * `naam`
   * `email`
   * `wachtwoord`

2. **Taak**

   * `id` (PK)
   * `titel`
   * `beschrijving`
   * `deadline`
   * `status` (voltooid/niet voltooid)
   * `user_id` (FK → Student)

**Relatie:**

* Een **student** kan meerdere **taken** hebben (1:N).

---

### 4️⃣ Ontwerp (Wireframes)

**Schets van schermen:**


1. **homepagina:**

    * navigatie: login, logo(R&A tasks), home, profiel
    * front-pagina: uitleg, foto's, voorbeeld planner, FAQ
    * footer: otnwikkelaars, logo(ons, instagram, facebook...)

2. **more-info pagina**

   * navigatie
   * footer
   * FAQ 
      - Hoe voeg ik bijlagen, comments of labels toe aan een taak?
      - Welke tool is gratis of goedkoop?
      - Hoe krijg ik support of community-hulp?
      - Hoe maak ik een nieuwe taak?
      - Hoe zet ik een deadline?
      - Kan ik het ook op mijn telefoon gebruiken?
      - Waar zie ik al mijn werk?

   * Uitleg over taak manager
   


3. **Login/Aanmeldingspagina:**

   * Velden: e-mail, wachtwoord
   * Knoppen: Inloggen / Aanmelden

4. **Dashboard / Overzichtspagina:**

   * Lijst van alle taken
   * Knoppen: Nieuwe taak toevoegen,
    *tabel: data taken, Taak bewerken, Taak verwijderen

5. **Taak toevoegen / bewerken:**

   * Velden: titel, beschrijving, deadline, status
   * Knoppen: Opslaan / Annuleren

6. **Detailscherm (optioneel):**

   * Toon alle informatie van een taak
   * Knoppen: Bewerken, Verwijderen, Voltooien

---

### 5️⃣ Planning (Taken en Timing)

ERD maken

| Week   | Taken                                                    |
| ------ | -------------------------------------------------------- |
| Week 1 | Probleemstelling en doel opstellen, gebruikersanalyse    |
| Week 2 | Functionele analyse en lijst van gewenste functies maken |
| Week 3 | Datamodel / ERD opstellen                                |
| Week 4 | Wireframes ontwerpen en planning afronden                |

---
