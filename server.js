//constante app qui provient du fichier "app.js"
const app = require('./app')
//constante qui définit sur quel port on est
const port = 3000

// On demande à Express d'exposer tout le contenu enregistré sur le port 3000 du serveur qui acceuil l'application
app.listen(port, ()=>{
    console.log("l'application tourne sur le port " + port)
})

