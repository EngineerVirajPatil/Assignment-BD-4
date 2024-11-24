const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');
const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

let db;


(async () => {
  db = await sqlite.open({ filename: './BD4_Assignment1/database.sqlite', driver: sqlite3.Database });
  console.log('Connected to SQLite database.');
})();

async function fetchAllRestaurants(){
 let query='SELECT * FROM restaurants';
 let response= await db.all(query,[]);
 return {restaurants: response};
}

async function fetchAllRestaurantsById(id){
  let query='SELECT * FROM restaurants WHERE id=?';
  let response= await db.all(query,[id]);
  return {restaurants: response};
 }
 
 async function fetchAllRestaurantsByCuisine(cuisine){
  let query='SELECT * FROM restaurants WHERE cuisine=?';
  let response= await db.all(query,[cuisine]);
  return {restaurants: response};
 }

async function  fetchAllRestaurantsByIsVegHasOutdoorSeatingisLuxury(isVeg, hasOutdoorSeating, isLuxury){
  let query='SELECT * FROM restaurants WHERE isVeg=? AND hasOutdoorSeating=? AND isLuxury=?';
  let response= await db.all(query,[isVeg,hasOutdoorSeating,isLuxury]);
  return {restaurants: response};
}

async function fetchRestaurantsByDescendingSortedRating(){
  let query='SELECT * FROM restaurants ORDER BY rating DESC ';
  let response= await db.all(query,[]);
  return {restaurants: response};
}

async function fetchAllDishes(){
  let query='SELECT * FROM dishes';
  let response= await db.all(query,[]);
  return {dishes: response};
}

async function fetchAllDishesById(id){
  let query='SELECT * FROM dishes WHERE id=?';
  let response= await db.all(query,[id]);
  return {dishes: response};
}

async function fetchAllDishesByVeg(isVeg){
  let query='SELECT * FROM dishes WHERE isVeg=?';
  let response= await db.all(query,[isVeg]);
  return {dishes: response};
}

async function fetchDishesByPriceInAscending(){
  let query='SELECT * FROM dishes ORDER BY price ASC ';
  let response= await db.all(query,[]);
  return {dishes: response};
}
// /restaurants
app.get('/restaurants',async(req, res)=>{
  try{
    let result= await fetchAllRestaurants();
    if(result.restaurants.length===0){
      res.status(404).json({message:'No restaurant found '});
    }
    else{
      res.status(200).json(result);
    }
  }
catch(error){
 res.status(500).json({message:error.message});
}
})

// /restaurants/details/1
app.get('/restaurants/details/:id',async(req, res)=>{
  try{
    let id=req.params.id;
    let result= await fetchAllRestaurantsById(id);
    if(result.restaurants.length===0){
      res.status(404).json({message:'No restaurant found with id: '+id});
    }
    else{
      res.status(200).json(result);
    }
  }
catch(error){
 res.status(500).json({message:error.message});
}
})

// /restaurants/cuisine/Indian
app.get('/restaurants/cuisine/:cuisine',async(req, res)=>{
  try{
    let cuisine=req.params.cuisine;
    let result= await fetchAllRestaurantsByCuisine(cuisine);
    if(result.restaurants.length===0){
      res.status(404).json({message:'No restaurant found with cuisine:  '+cuisine});
    }
    else{
      res.status(200).json(result);
    }
  }
catch(error){
 res.status(500).json({message:error.message});
}
})

// /restaurants/filter?isVeg=true&hasOutdoorSeating=true&isLuxury=false
app.get('/restaurants/filter',async(req, res)=>{
  try{
    let isVeg=req.query.isVeg;
    let hasOutdoorSeating=req.query.hasOutdoorSeating;
    let isLuxury=req.query.isLuxury;
    let result= await fetchAllRestaurantsByIsVegHasOutdoorSeatingisLuxury(isVeg, hasOutdoorSeating, isLuxury);
    if(result.restaurants.length===0){
      res.status(404).json({message:'No restaurant found with Veg: '+isVeg+' AND with Outdoor Seating: '+hasOutdoorSeating+' AND with Luxury: '+isLuxury});
    }
    else{
      res.status(200).json(result);
    }
  }
catch(error){
 res.status(500).json({message:error.message});
}
})

// /restaurants/sort-by-rating
app.get('/restaurants/sort-by-rating',async(req, res)=>{
  try{
    let result= await fetchRestaurantsByDescendingSortedRating();
    if(result.restaurants.length===0){
      res.status(404).json({message:'No restaurant found '});
    }
    else{
      res.status(200).json(result);
    }
  }
catch(error){
 res.status(500).json({message:error.message});
}
})

// /dishes
app.get('/dishes',async(req, res)=>{
  try{
    let result= await fetchAllDishes();
    if(result.dishes.length===0){
      res.status(404).json({message:'No Dishes found '});
    }
    else{
      res.status(200).json(result);
    }
  }
catch(error){
 res.status(500).json({message:error.message});
}
})

// /dishes/details/1
app.get('/dishes/details/:id',async(req, res)=>{
  try{
    let id=req.params.id;
    let result= await fetchAllDishesById(id);
    if(result.dishes.length===0){
      res.status(404).json({message:'No Dishes found with id: '+id});
    }
    else{
      res.status(200).json(result);
    }
  }
catch(error){
 res.status(500).json({message:error.message});
}
})

// /dishes/filter?isVeg=true
app.get('/dishes/filter',async(req, res)=>{
  try{
    let isVeg=req.query.isVeg;
    let result= await fetchAllDishesByVeg(isVeg);
    if(result.dishes.length===0){
      res.status(404).json({message:'No Dishes found with Veg: '+isVeg});
    }
    else{
      res.status(200).json(result);
    }
  }
catch(error){
 res.status(500).json({message:error.message});
}
})

// /dishes/sort-by-price
app.get('/dishes/sort-by-price',async(req, res)=>{
  try{
    let result= await fetchDishesByPriceInAscending();
    if(result.dishes.length===0){
      res.status(404).json({message:'No Dishes found '});
    }
    else{
      res.status(200).json(result);
    }
  }
catch(error){
 res.status(500).json({message:error.message});
}
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
