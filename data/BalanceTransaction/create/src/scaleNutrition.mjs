// scaleNutrition.js
export function scaleNutrition(standardNutrition, standardServingSize, requestedServingSize) {
	let scaledNutrition = {};
	const scaleRatio = requestedServingSize / standardServingSize;

	for (const key in standardNutrition) {
		scaledNutrition[key] = standardNutrition[key] * scaleRatio;
	}

	return scaledNutrition;
}
