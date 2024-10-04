import express from 'express';
import mongoose from 'mongoose';
import { RecipeModel } from "../models/Recipes.js";
import { UserModel } from '../models/Users.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const response = await RecipeModel.find({});
        res.json(response);
    } catch (error) {
        res.json(error);
    }
});

router.post('/', async (req, res) => {
    const recipe = new RecipeModel(req.body);
    try {
        const response = await recipe.save();
        res.json(response);
    } catch (error) {
        res.json(error);
    }
});

router.put('/', async (req, res) => {
    try {
        const recipe = await RecipeModel.findById(req.body.recipeID);
        const user = await UserModel.findById(req.body.userID);
        user.saveRecipes.push(recipe);
        await user.save();
        res.json({ saveRecipes: user.saveRecipes });
    } catch (error) {
        res.json(error);
    }
});

router.get('/saveRecipes/ids/:userID', async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID);
        res.json({ saveRecipes: user?.saveRecipes });
    } catch (error) {
        res.json(error);
    }
});

router.get('/saveRecipes/:userID', async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID);
        const saveRecipes = await RecipeModel.find({ _id: { $in: user.saveRecipes } });
        res.json({ savedRecipes: saveRecipes });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch saved recipes." });
    }
});

export {router as recipesRouter};
