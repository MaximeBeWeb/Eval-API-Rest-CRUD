//on declare la constante pour l'export du module fs
const fs = require('fs');
//on definit le chemin vers le fichier json
const road = "./src/model/liste.json";


//on definit la methode Get pour ercuperer un tableau dans le fichier menu.json

exports.getData = (request, response) => {
    fs.readFile(road, (err, data) => {
        if (err) {
            response.status(500).json({
                message: "il y a une erreur de lecture",
                error: err
            })
        } else {
            response.status(200).json(JSON.parse(data).viandes)
        }
    }
    );
};




//on definir la methode GET BY ID pour recuperer une data par son ID

exports.getDataById = (request, response) => {
    //on utilise la methode readfFile du module fs pour lire le fichier
    fs.readFile(road, (err, data) => {
        //si erreur on renvoie le statut 500 et un message d'erreur
        if (err) {
            response.status(500).json({
                message: "Il y a une erreur de lecture"
            });
        } else {
            //Sinon
            //transformer la data en json manipulable
            const manipData = JSON.parse(data)
            //recherche dans le fichier si l'id est présente dans le fichier
            const dataById = manipData.viandes.find(
                (obj) => obj.id === parseInt(request.params.id)
            );
            //si on trouve cet id
            if (dataById) {
                //renvoie la reponse avec statut 200 et l'objet
                response.status(200).json(dataById)
            } else {
                response.status(404).json({
                    message: "je n'ai pas trouvé d'objet avec cet id",
                    error: err
                });
            }
        }
    });
};



//on definir la methode GET BY NAME pour recuperer une data par son nom

exports.getDataByName = (request, response) => {
    //on utilise la methode readfFile du module fs pour lire le fichier
    fs.readFile(road, (err, data) => {
        //si erreur on renvoie le statut 500 et un message d'erreur
        if (err) {
            response.status(500).json({
                message: "Il y a une erreur de lecture"
            });
        } else {
            //Sinon
            //transformer la data en json manipulable
            const manipData = JSON.parse(data)
            //recherche si le nom est présente dans le fichier
            const dataByName = manipData.viandes.find(
                (obj) => obj.name === request.params.name
            );
            //si on trouve ce nom
            if (dataByName) {
                //renvoie la reponse avec statut 200 et l'objet
                response.status(200).json(dataByName)
            } else {
                response.status(404).json({
                    message: "je n'ai pas trouvé d'objet correspondant à ce nom",
                    error: err
                });
            }
        }
    });
};




//On définit la methode POST pour ajouter une data avec son ID

exports.post = (request, response) => {
    //on lit la data
    fs.readFile(road, (err, data) => {
        //on renvoie un message d'erreur si on arrive pas à lire
        if (err) {
            response.status(500).json({
                message: "erreur lecture impossible",
                error: err
            })
        } else {
            //on stocke la donnée en Json manipulable
            const existingData = JSON.parse(data)
            //on définit la longueur du tableau
            const arrayLength = existingData.viandes.length;
            // Si le tableau n'est pas vide               
            if (arrayLength > 1) {
                // Récupère le dernier objet du tableau viandes               
                const lastObject = existingData.viandes[arrayLength - 1];
                // Créer et insérer la new data avec l'id = à celle du dernier objet +1       
                existingData.viandes.push({
                    "id": lastObject.id + 1,
                    "name": request.body.name,
                    "price": request.body.price
                });
                // Sinon vu que le tableau est vide                
            } else {
                // Créer et insérer la new data avec l'id = 1         
                existingData.viandes.push({
                    "id": 1,
                    "name": request.body.name,
                    "price": request.body.price
                });
            }

            //réécrit le fichier stringify
            //on écrit la donnée sur le fichier et on écrase l'ancien
            fs.writeFile(road, JSON.stringify(existingData), (writeErr) => {
                //si on arrive pas
                if (writeErr) {
                    //erreur statut 500
                    response.status(500).json({
                        message: "Erreur lors de l'ecriture",
                        error: err
                    })
                    //sinon
                } else {
                    response.status(200).json({
                        message: "la data a été rajouté avec succès."
                    });
                }
            });
        }
    });

}


// C'est une route qui permet de mettre à jour une donnée en se basant sur son ID

exports.modif = (request, response) => {
    //lecture du fichier
    fs.readFile(road, (err, data) => {
        if (err) {
            response.status(500).json({
                message: "il y a une erreur de lecture",
                error: err,
            })
            //Sinon
        } else {
            //stocker les données existantes
            const existing_data = JSON.parse(data);
            //rechercher via l'id si parametre existant
            const data_id = existing_data.viandes.find(
                (obj) => obj.id === parseInt(request.params.id)
            );
            //condition si on trouve pas l'objet par l'id
            if (!data_id) {
                //statut 404 si on ne le trouve pas 
                response.status(404).json({
                    //message d'erreur de recherche
                    message: "Aucun objet avec cet id!",
                    error: err,
                })
                //sinon on trouve l'objet donc
            } else {
                //la nouvelle donnée sera la requete executée dans le body thunder
                data_id.name = request.body.name;
                fs.writeFile(road, JSON.stringify(existing_data), (writeErr) => {
                    if (writeErr) {
                        response.status(500).json({
                            message: "Une erreur est survenue lors de la réécriture des données",
                        })
                    } else {
                        response.status(200).json({
                            message: "les données ont été mises à jour avec succès"
                        });
                    }
                });
            }
        }
    });
};



//On définit la methode pour supprimer une data par son ID
exports.deleteDataById = (request, response) => {
    // On vas lire le fichier
    fs.readFile(road, (err, data) => {
        // si une erreur sur la lecture du fichier
        if (err) {
            response.status(500).json({
                message: "Une erreur est survenue lors de la lecture des données",
            });
        } else {
            // stocker les données existante
            const existingData = JSON.parse(data);
            // Je vais cherchez dans ce fichier si l'id correspondants en paramètres existe dans le contenue
            const dataById = existingData.viandes.find(
                (obj) => obj.id === parseInt(request.params.id)
            );
            // Si on ne trouve pas un objet avec cet id
            if (!dataById) {
                // On renvoie une réponse avec un status 404 avec un message d'erreur
                response.status(404).json({
                    message: "Aucun objet trouvé avec cet id",
                });
            } else {
                //sinon
                //on recupere l'objet avec l'id définit et on réécrit la variable sans cet objet (d'où le filter)
                existingData.viandes = existingData.viandes.filter(
                    (obj) => obj.id != parseInt(request.params.id));
                fs.writeFile(road, JSON.stringify(existingData), (writeErr) => {
                    // si il ya une erreur au moment de l'écriture
                    if (writeErr) {
                        response.status(500).json({
                            message:
                                "Une erreur est survenue lors de l'écriture des données",
                        });
                    } else {
                        response.status(200).json({
                            message: "Les données ont été mise à jour avec succès",
                        });
                    }
                }
                );
            }
        }
    }
    );
}


