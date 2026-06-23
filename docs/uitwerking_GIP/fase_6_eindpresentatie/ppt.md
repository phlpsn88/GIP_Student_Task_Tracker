# GIP VERDEDIGING – R&A TASKS (SPREEKSCRIPT)

---

# DIA 1 – TITELPAGINA (RAF)

## Wat tonen?

* Titelpagina
* Naam project
* Jullie namen

## Wat zeggen?

Goedemiddag iedereen.

Wij zijn Amine Raf en [naam klasgenoot].

Vandaag stellen wij onze GIP voor.

Ons project heet **R&A Tasks**, ook wel **Student Tracker** genoemd.

Het doel van onze applicatie is om studenten te helpen bij het beheren van hun taken en deadlines.

Veel studenten verliezen het overzicht over hun opdrachten waardoor ze deadlines missen of extra stress ervaren.

Daarom hebben wij een gebruiksvriendelijke webapplicatie ontwikkeld waarmee gebruikers hun taken eenvoudig kunnen plannen, beheren en opvolgen.

Tijdens deze presentatie leggen we uit hoe we dit project hebben ontwikkeld, welke technologieën we gebruikt hebben en welke functionaliteiten aanwezig zijn.

---

# DIA 2 – INLEIDING (RAF)

## Wat tonen?

* Inhoudsopgave

## Wat zeggen?

Voordat we de website demonstreren geven we eerst een overzicht van wat we vandaag zullen bespreken.

Als eerste bekijken we de probleemstelling.

Daar leggen we uit welk probleem we hebben gekregen en hoe we hiervoor een oplossing hebben ontwikkeld.

Daarna bekijken we onze timeline.

Hier tonen we hoe het project stap voor stap is opgebouwd vanaf de analysefase tot de uiteindelijke oplevering.

Vervolgens bespreken we de backend.

Daar leggen we uit hoe onze databank werkt, welke relaties er bestaan tussen de tabellen en hoe de server communiceert met de databank.

Daarna bekijken we de verschillende functies van de website.

Tot slot geven we een demonstratie van de applicatie waarbij we alle functionaliteiten live tonen.

---

# DIA 3 – PROBLEEMSTELLING (AMINE)

## Wat tonen?

* Stress
* Taken
* Overzicht
* Deadlines

## Wat zeggen?

De probleemstelling die wij kregen was dat veel studenten moeite hebben met het organiseren van hun schooltaken.

Studenten hebben vaak meerdere opdrachten tegelijkertijd lopen.

Daardoor verliezen ze soms het overzicht over wat nog gemaakt moet worden.

Wanneer deadlines dichterbij komen zorgt dit vaak voor extra stress.

Ook worden taken soms vergeten waardoor opdrachten te laat worden ingediend.

Om dit probleem op te lossen hebben wij een taskmanager ontwikkeld.

In onze applicatie kunnen gebruikers al hun taken centraal beheren.

Elke taak bevat een titel, beschrijving, deadline en status.

Daardoor krijgt de gebruiker een duidelijk overzicht van alle openstaande taken.

Dit vermindert stress en maakt het makkelijker om deadlines op tijd te halen.

---

# DIA 4 – TIMELINE (AMINE)

## Wat tonen?

Timeline

## Wat zeggen?

Nu gaan we kijken naar de planning van ons project.

In november zijn we gestart met de analyse- en ontwerpfase.

Tijdens deze fase hebben we de probleemstelling onderzocht, requirements verzameld, wireframes gemaakt en een databankontwerp opgesteld.

In december zijn we begonnen met het ontwerpen van de databank.

We hebben de tabellen users en tasks ontwikkeld en de relaties tussen beide tabellen vastgelegd.

Van december tot april hebben we gewerkt aan de frontend.

We hebben de homepagina, loginpagina, registratiepagina, informatiepagina en taskmanager ontwikkeld.

Ook hebben we verschillende pop-upvensters toegevoegd voor het beheren van taken.

In april stond testing en debugging gepland.

Door de stageperiode en vakantie hebben we deze fase deels moeten uitstellen.

In mei hebben we de backend gebouwd.

Daar hebben we de koppeling gemaakt tussen de website en de MySQL-databank.

Ook hebben we alle API-routes ontwikkeld.

In juni hebben we het project verder afgewerkt.

We hebben bugs opgelost, de gebruikerservaring verbeterd en de documentatie afgerond.

Het eindresultaat is een volledig werkende taskmanager-webapplicatie.

---

# DIA 5 – BACKEND (RAF)

## Wat tonen?

* MySQL Workbench
* Users tabel
* Tasks tabel

## Wat zeggen?

Nu gaan we kijken naar de technische kant van het project.

Onze databank bestaat uit twee hoofdtabellen.

De eerste tabel is de users tabel.

Hier bewaren we alle gebruikersgegevens.

Deze tabel bevat onder andere:

* id
* naam
* e-mailadres
* wachtwoord
* rol

De tweede tabel is de tasks tabel.

Hier worden alle taken opgeslagen.

Deze bevat:

* id
* user_id
* title
* beschrijving
* datum
* status

Tussen beide tabellen bestaat een relatie via user_id.

Hierdoor weten we exact welke taak bij welke gebruiker hoort.

Een gebruiker kan meerdere taken hebben, maar een taak behoort altijd tot één gebruiker.

---

## SQL DEMO

Voer uit:

```sql
SELECT
u.naam,
t.title,
t.status,
t.datum
FROM tasks t
JOIN users u
ON u.id = t.user_id
ORDER BY t.datum;
```

## Wat zeggen?

Met deze query tonen we de relatie tussen beide tabellen.

De JOIN koppelt de taken aan de gebruikers.

Daardoor kunnen we zien welke gebruiker eigenaar is van welke taak.

---

# SERVER.JS

## Wat zeggen?

Voor de backend gebruiken we Node.js en Express.

Express laat ons toe om API-routes aan te maken.

Voorbeelden hiervan zijn:

GET routes voor gegevens ophalen.

POST routes voor nieuwe gegevens toevoegen.

PUT routes voor bestaande gegevens aanpassen.

DELETE routes voor gegevens verwijderen.

Onze backend ondersteunt dus volledig CRUD.

CRUD staat voor:

Create

Read

Update

Delete

---

# LOGIN & BEVEILIGING

## Wat zeggen?

Voor het inloggen maken we gebruik van sessies.

Wanneer een gebruiker succesvol inlogt wordt zijn gebruikers-ID opgeslagen in een sessie.

Daardoor weet de server welke gebruiker actief is.

Daarnaast gebruiken we bcrypt.

Bcrypt zorgt ervoor dat wachtwoorden gehasht worden voordat ze in de databank worden opgeslagen.

Daardoor kunnen wachtwoorden niet zomaar gelezen worden wanneer iemand toegang krijgt tot de databank.

---

# JAVASCRIPT

## Wat zeggen?

JavaScript zorgt voor alle interactie op de website.

Met JavaScript halen we taken op uit de databank.

We sturen formulieren naar de backend.

We tonen foutmeldingen.

We openen en sluiten pop-ups.

We laden gegevens dynamisch in zonder de pagina te herladen.

Ook de validatie van formulieren gebeurt grotendeels met JavaScript.

---

# DIA 6 – FUNCTIES (AMINE)

## Wat tonen?

Functies-dia

## Wat zeggen?

Nu bekijken we de belangrijkste functies van onze website.

Gebruikers kunnen zich registreren.

Tijdens de registratie controleren we of alle velden correct zijn ingevuld.

Daarna kunnen gebruikers inloggen.

Na het inloggen krijgt de gebruiker toegang tot zijn persoonlijke taken.

Gebruikers kunnen nieuwe taken toevoegen.

Ze kunnen bestaande taken bewerken.

Ze kunnen taken verwijderen.

Ook kunnen ze de status van een taak wijzigen.

Hiermee kunnen ze aangeven of een taak:

* Niet gestart
* Bezig
* Afgewerkt

is.

Daarnaast hebben we adminfunctionaliteiten toegevoegd.

Een administrator kan alle taken bekijken ongeacht welke gebruiker ze heeft aangemaakt.

Extra functies zijn:

* Formuliervalidatie
* Foutmeldingen
* Sessiebeheer
* Responsief design
* Beveiligde pagina's
* Gebruikersrechten

---

# DIA 7 – DEMONSTRATIE (RAF)

## Eerst tonen

Homepagina

## Wat zeggen?

We starten op de homepagina.

Hier krijgt de gebruiker uitleg over de website.

---

## Daarna tonen

Registratiepagina

## Wat zeggen?

Hier kan een gebruiker een account aanmaken.

We tonen dat lege velden niet worden toegelaten.

We tonen ook dat een wachtwoord minstens acht tekens moet bevatten.

---

## Daarna tonen

Loginpagina

## Wat zeggen?

Nu loggen we in.

Wanneer de gebruiker succesvol inlogt wordt een sessie aangemaakt.

Daardoor weet de server welke gebruiker actief is.

---

## Daarna tonen

Taskmanager

## Wat zeggen?

Nu bevinden we ons in de taskmanager.

Hier zien we alle taken van de ingelogde gebruiker.

We tonen eerst hoe een taak wordt toegevoegd.

Daarna tonen we hoe een taak wordt aangepast.

Vervolgens wijzigen we de status.

Daarna verwijderen we een taak.

---

## Extra functies tonen

* Verplichte velden
* Foutmeldingen
* Status wijzigen
* Taak bewerken
* Taak verwijderen
* Responsiviteit

---

## Responsiviteit tonen

Laptop

Tablet

Smartphone

## Wat zeggen?

De website is volledig responsief.

De layout past zich automatisch aan aan verschillende schermgroottes.

Daardoor blijft de website gebruiksvriendelijk op desktop, tablet en smartphone.

---

# DIA 8 – EINDE (RAF)

## Wat zeggen?

Bedankt voor jullie aandacht.

Zijn er nog vragen?
