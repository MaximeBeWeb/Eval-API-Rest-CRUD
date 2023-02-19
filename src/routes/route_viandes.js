const express = require("express");

const router =express.Router()
const viandes_controller = require("../controller/controller_viandes")


//Appel de toutes les routes avec les methodes POST , DELETE , ETC...

//1ere methode GET
router.get("/viandes", viandes_controller.getData);


//2eme methode GET BY ID
router.get("/viandes/:id", viandes_controller.getDataById)


//3eme methode GET BY NAME
router.get("/viandes/find/:name", viandes_controller.getDataByName)

//4eme methode POST
router.post("/viandes", viandes_controller.post)


//5eme methode UPDATE
router.put("/viandes/:id", viandes_controller.modif)


//6eme methode DELETE
router.delete("/viandes/:id", viandes_controller.deleteDataById)



// On exporte le router
module.exports = router;