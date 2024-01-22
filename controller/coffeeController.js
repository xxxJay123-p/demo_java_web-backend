import { Coffee } from "../model/coffeeModel.js";

export const addCoffee = async (req, res, next) => {
  try {
    const {
      name,
      description,
      price,
      imageUrl,
      coffeeType,
      size,
      temperature,
    } = req.body;

    // Create a new coffee document using the Coffee model
    const newCoffee = new Coffee({
      name,
      description,
      price,
      imageUrl,
      coffeeType,
      size,
      temperature,
    });

    // Return a success response with the new coffee document
    return res.status(201).json({
      success: true,
      message: "Coffee added successfully",
      data: newCoffee,
    });
  } catch (error) {
    next(error);
  }
};

export const getCoffee = async (req, res, next) => {
  try {
    const { coffeeId } = req.params;

    const coffee = await Coffee.findById(coffeeId);

    if (!coffee) {
      return res.json({ msg: "Coffee not found", status: false });
    }

    return res.json({ status: true, coffee });
  } catch (err) {
    next(err);
  }
};

export const getCoffeesByType = async (req, res, next) => {
  try {
    const { coffeeType } = req.query;

    const coffees = await Coffee.find({ coffeeType });

    if (!coffees.length) {
      return res.json({ msg: "No coffees found for this type", status: false });
    }

    return res.json({ status: true, coffees });
  } catch (err) {
    next(err);
  }
};

export const getCoffeesByName = async (req, res, next) => {
  try {
    const { name } = req.query;

    const coffees = await Coffee.find({
      name: { $regex: new RegExp(name, "i") },
    });

    if (!coffees.length) {
      return res.json({ msg: "No coffees found for this name", status: false });
    }

    return res.json({ status: true, coffees });
  } catch (err) {
    next(err);
  }
};

export const updateCoffee = async (req, res, next) => {
  try {
    const { coffeeId } = req.params;

    const updatedCoffee = await Coffee.findByIdAndUpdate(coffeeId, req.body, {
      new: true,
    });

    if (!updatedCoffee) {
      return res.json({ msg: "Coffee not found", status: false });
    }

    return res.json({ status: true, coffee: updatedCoffee });
  } catch (err) {
    next(err);
  }
};

export const updateCoffeeByName = async (req, res, next) => {
  try {
    const { name } = req.query;

    const updatedCoffees = await Coffee.updateMany({ name }, req.body);

    if (updatedCoffees.modifiedCount === 0) {
      return res.json({ msg: "No coffees found for this name", status: false });
    }

    const coffees = await Coffee.find({ name });

    return res.json({ status: true, coffees });
  } catch (err) {
    next(err);
  }
};

export const deleteCoffee = async (req, res, next) => {
  try {
    const { coffeeId } = req.params;

    const deletedCoffee = await Coffee.findByIdAndDelete(coffeeId);

    if (!deletedCoffee) {
      return res.json({ msg: "Coffee not found", status: false });
    }

    return res.json({ status: true, coffee: deletedCoffee });
  } catch (err) {
    next(err);
  }
};
