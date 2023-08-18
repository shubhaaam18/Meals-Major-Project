document.addEventListener("DOMContentLoaded", function () {
    const mealDetailsContainer = document.getElementById("meal-details");

    const urlParams = new URLSearchParams(window.location.search);
    const mealId = urlParams.get("id");

    if (mealId) {
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
            .then(response => response.json())
            .then(data => {
                const meal = data.meals[0];
                if (meal) {
                    const mealDetailsHtml = `
                        <div class="meal-details-item">
                            <h2>${meal.strMeal}</h2>
                            <p>${meal.strCategory}</p>
                            <p>${meal.strArea}</p>
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                            <p>${meal.strInstructions}</p>
                        </div>
                    `;

                    mealDetailsContainer.innerHTML = mealDetailsHtml;
                } else {
                    mealDetailsContainer.innerHTML = "<p>Meal details not found.</p>";
                }
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                mealDetailsContainer.innerHTML = "<p>Error fetching data.</p>";
            });
    }
});
