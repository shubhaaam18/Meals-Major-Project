document.addEventListener("DOMContentLoaded", function () {
    const favoriteContainer = document.getElementById("favorite-container");

    // Load favorite meals from local storage and display them
    const favoriteMeals = JSON.parse(localStorage.getItem("favoriteMeals")) || [];

    const favoriteHtml = favoriteMeals.map(meal => `
        <div class="favorite-item">
            <h3>${meal.strMeal}</h3>
            <button class="remove-button" data-meal-id="${meal.idMeal}">Remove</button>
        </div>
    `).join("");

    favoriteContainer.innerHTML = favoriteHtml;

    // Attach click event listener to remove buttons
    const removeButtons = document.querySelectorAll(".remove-button");
    removeButtons.forEach(button => {
        button.addEventListener("click", handleRemoveClick);
    });
});

function handleRemoveClick(event) {
    const mealId = event.target.getAttribute("data-meal-id");

    // Load favorite meals from local storage
    const favoriteMeals = JSON.parse(localStorage.getItem("favoriteMeals")) || [];

    // Remove the meal from favorites
    const updatedFavorites = favoriteMeals.filter(meal => meal.idMeal !== mealId);
    localStorage.setItem("favoriteMeals", JSON.stringify(updatedFavorites));

    // Remove the favorite item from the DOM
    const favoriteItem = event.target.parentElement;
    favoriteItem.remove();
}

