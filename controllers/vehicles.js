const vehicleList = require('../data/vehicles')
let counter = vehicleList.length +1

//get all vehicles:
exports.getAllVehicles = (req, res) => {
    res.json(vehicleList)
  }

//Get Specific Vehicle:
exports.getSpecifiedVehicle = (req, res) => {
    //Create a variable to determing if a userID is found.
    const found = vehicleList.some(product => product._id === parseInt(req.params.productId));
    //Create an if statement to return the user info if the ID is found, and an error if the ID is not found.
    if(found) {
      res.json(vehicleList.filter(product => product._id === parseInt(req.params.productId)));
    } else {
      res.status(400).json({msg: `Vehicle ${req.params.productId} was not found.`})
    }
  }

  //Post New Vehicle:
  exports.postNewVehicle = (req, res) => {
    const newVehicle = {
      _id: counter,
      imgUrl: req.body.imgUrl,
      year: req.body.year,
      make: req.body.make,
      model: req.body.model,
      price: req.body.price,
      km: req.body.km,
      miles: req.body.miles,
      fuel: req.body.fuel,
      city: req.body.city,
      isNew: req.body.city
    }
    vehicleList.push(newVehicle)
    res.json(vehicleList)
    counter = counter + 1
}

//Update existing vehicle:
exports.putVehicle = (req, res) => {
    const found = vehicleList.some(product =>product._id === parseInt(req.params.productId))
  
    if(found) {
      const upProduct = req.body
      vehicleList.forEach(product => {
          if(product._id === parseInt(req.params.productId)){
              product._id = upProduct._id ? upProduct._id : product._id
              product.imgUrl = upProduct.imgUrl ? upProduct.imgUrl : product.imgUrl
              product.year = upProduct.year ? upProduct.year : product.year
              product.make = upProduct.make ? upProduct.make : product.make
              product.model = upProduct.model ? upProduct.model : product.model
              product.price = upProduct.price ? upProduct.price : product.price
              product.km = upProduct.km ? upProduct.km : product.km
              product.miles = upProduct.miles ? upProduct.miles : product.miles
              product.fuel = upProduct.fuel ? upProduct.fuel : product.fuel
              product.city = upProduct.city ? upProduct.city : product.city
              product.isNew = upProduct.isNew ? upProduct.isNew : product.isNew
  
            res.json ({msg: `The vehicle ${req.params.productId} was updated.`})
          }
        }) 
    }else{
      res.status(400).json({msg: `No vehicle with an id of ${req.params.productId} found.`})}
  }

//Delete Vehicle:
exports.deleteVehicle = (req, res) => {
    //Create a variable to determing if a userID is found.
    const found = vehicleList.some(product => product._id === parseInt(req.params.productId));
    productIndex = parseInt(req.params.productId);
    deletedProductIndex = productIndex -1;
  
    //Create an if statement to return the user info if the ID is found, and an error if the ID is not found.
    if(found) {
      vehicleList[deletedProductIndex]["isActive"] = "false"
      res.send(`Vehicle ${productIndex} was successfully deleted`)
  
    //  res.json({ msg: `User ${req.params.id} deleted`, users: users.filter(user => user._id !== parseInt(req.params.id))});res.send("deleted")
    } else {
      res.status(400).json({msg: `Vehicle ${req.params.productId} not found`})
    }
   }
