const express = require("express");

const router =express.Router()
const fromages_controller = require("../controller/controller_fromages")


//Appel de toutes les routes avec les methodes POST , DELETE , ETC...

//1ere methode GET
router.get("/fromages", fromages_controller.getData);


//2eme methode GET BY ID
router.get("/fromages/:id", fromages_controller.getDataById)


//3eme methode GET BY NAME
router.get("/fromages/find/:name", fromages_controller.getDataByName)

//4eme methode POST
router.post("/fromages", fromages_controller.post)


//5eme methode UPDATE
router.put("/fromages/:id", fromages_controller.modif)


//6eme methode DELETE
router.delete("/fromages/:id", fromages_controller.deleteDataById)



// On exporte le router
module.exports = router;