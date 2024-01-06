// demo.js
import { scaleNutrition } from '../scaleNutrition.mjs';

const standardNutrition = { calories: 200, fat: 10, protein: 20 }; // Example values
const standardServingSize = 100; // grams
const requestedServingSize = 150; // grams

const scaledNutrition = scaleNutrition(standardNutrition, standardServingSize, requestedServingSize);
console.log(scaledNutrition);
