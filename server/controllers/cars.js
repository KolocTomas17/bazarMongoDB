const Car = require("../models/cars");


/*This function retrieves all cats from the database. 
It uses the Cat.find() method to fetch all cat documents. 
If cats are found, it returns a HTTP status code of 200 with a message "Cats found!" and the cat data in the response payload. 
If no cats are found, it returns a HTTP status code of 404 with a message "Cats not found".
*/
exports.getAllCars = async (req, res) => {
  try {
      const result = await Car.find();
      if (result && result.length !== 0) {
        return res.status(200).send({
          msg: "Cars found!",
          payload: result,
        });
      }
      res.status(404).send({ msg: "Cars not found"});
  } catch (error) {
    res.status(500).send(error);
  }
  };
 

  /* 
  This function retrieves a single cat by its ID. 
  It uses the Cat.findById() method to fetch the cat document. 
  If the cat is found, it returns a HTTP status code of 200 with a message "Cat found!" and the cat data in the response payload. 
  If the cat is not found, it returns a HTTP status code of 404 with a message "Cat not found"
  */
  exports.getCarById = async (req, res) => {
    try {
      const result = await Car.findById(req.params.id);
      if (result) {
        return res.status(200).send({
          msg: "Car found!",
          payload: result,
        });
      }
      res.status(404).send({ msg: "Car not found"});
    } catch (error) {
      res.status(500).send(error);
    }
  };
  

/* 
This function deletes a cat by its ID. 
It uses the Cat.findByIdAndDelete() method to delete the cat document. 
If the cat is found and deleted, it returns a HTTP status code of 200 with a message 
"Cat deleted!". If something goes wrong, it returns a HTTP status code of 500 with a message "Something went wrong :(".
*/
  exports.deleteCar = async (req, res) => {
    try {
      const result = await Car.findByIdAndDelete(req.params.id);
      if (result) {
        return res.status(200).send({
          msg: "Car deleted!",
        });
      }
      res.status(500).send("Something went wrong :(");
    } catch (error) {
      res.status(500).send(error);
    }
  };


  /* 
  This function updates a cat's details by its ID. 
  It uses the Cat.findByIdAndUpdate() method to update the cat document. 
  The updated data is passed in the request body. 
  If the cat is found and updated, it returns a HTTP status code of 200 with a message "Cat updated" and the updated cat data in the response payload. 
  If the cat is not found, it returns a HTTP status code of 500 with a message "Cat was not updated".
  
  */
  exports.updateCar = async (req, res) => {
    try {
      const data = ({
        name: req.body.name,
        color: req.body.color,
        type: req.body.type,
        hp: req.body.hp,
        price: req.body.price,
        img: req.body.img,
        
      });

      const result = await Car.findByIdAndUpdate(req.params.id, data);
      if (result) {
        return res.status(200).send({
          msg: "Car updated",
          payload: result
        });
      }
      res.status(500).send({
        msg: "Car was not updated"
      });
    } catch (error) {
      res.status(500).send(error);
    }
  };



  /* 
  This function creates a new cat. 
  It uses the new Cat() constructor to create a new cat document with the data passed in the request body. 
  It then uses the save() method to save the new cat to the database. 
  If the cat is created, it returns a HTTP status code of 201 with a message "Cat created" and the new cat data in the response payload. 
  If the cat is not created, it returns a HTTP status code of 500 with a message "Cat was not created".
  */
  exports.createCar = async (req, res) => {
    try {
      const data = new Car({
        name: req.body.name,
        color: req.body.color,
        type: req.body.type,
        hp: req.body.hp,
        price: req.body.price,
        img: req.body.img,
      });
      //await - dokavad se to neprovede
      const result = await data.save();
      if (result) {
        return res.status(201).send({
          msg: "Car created",
          payload: result
        });
      }
      res.status(500).send({
        msg: "Car was not created"
      });
    } catch (error) {
      res.status(500).send(error);
    }
  };
