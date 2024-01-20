import {
  addCoffee,
  getCoffee,
  getCoffeesByType,
  getCoffeesByName,
  updateCoffee,
  updateCoffeeByName,
  deleteCoffee,
} from "../controller/coffeeController.js";
import express from "express";

const coffeeRouters = express.Router();

// Add a new coffee
coffeeRouters.post("/", addCoffee);

// Get a coffee by ID
coffeeRouters.get("/:coffeeId", getCoffee);

// Get coffees by type
coffeeRouters.get("/type", getCoffeesByType);

// Get coffees by name
coffeeRouters.get("/name", getCoffeesByName);

// Update a coffee by ID
coffeeRouters.put("/:coffeeId", updateCoffee);

// Update coffees by name
coffeeRouters.put("/name", updateCoffeeByName);

// Delete a coffee by ID
coffeeRouters.delete("/:coffeeId", deleteCoffee);

export default coffeeRouters;
