// On déclare une constante qui contiendra l'export du module express
const express = require("express");
// On déclare une constante qui lance une fonction express() qui crée une application express
const app = express();
// On déclare une constante qui contiendra l'export du module body-parser
const bodyParser = require("body-parser");
// Je vais dire à Express d'utiliser bodyParser pour lire le contenu du body en json
app.use(bodyParser.json());
//on declare la constante pour l'export du module fs
const fs = require('fs');
//on declare la constante pour l'export du module cors
const cors = require("cors")
//on exporte la constante cors pour utiliser le module
app.use(cors());

app.get("/", (requete, response) => {
    // On utilise la response du middleware d'Express pour envoyez sur le port quand cette route est trigger la chaine caractères
    response.send("Bienvenue sur ma liste de courses!");
  });


// //on stocke dans une constante les chemin du fichier où sera définie la route par laquelle sera envoyée la data
const fromagesRoute = require("./src/routes/route_fromages");
const viandesRoute = require("./src/routes/route_viandes");


// // On export les constantes pour les rendre utilisable dans d'autres parties du code
app.use(fromagesRoute);
app.use(viandesRoute);


// On export la constante app pour la rendre utilisable dans d'autres parties du code
module.exports = app;

