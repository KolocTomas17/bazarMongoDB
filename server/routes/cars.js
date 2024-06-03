var express = require('express');
var router = express.Router();


const carsController = require("../controllers/cars");

router.get('/', carsController.getAllCars);

// : ocekavame parametr, za ktery se dosazuje, muze se menit
router.get('/:id', carsController.getCarById);

router.delete('/:id', carsController.deleteCar);

router.put('/:id', carsController.updateCar);

router.post('/', carsController.createCar);



module.exports = router;
