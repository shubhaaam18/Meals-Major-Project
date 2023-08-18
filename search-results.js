document.addEventListener("DOMContentLoaded", function () {
    const mealContainer = document.getElementById("meal-container");
    const linkContainer = document.querySelector(".link-container-2");
    const searchParams = new URLSearchParams(window.location.search);
    const searchTerm = searchParams.get("search");

    if (searchTerm) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
            .then(response => response.json())
            .then(data => {
                if (data.meals) {
                    // Show the link container
                    linkContainer.style.display = "flex";

                    const mealHtml = data.meals.map(meal => `
                        <div class="meal-item">
                        <div class="meal-details">
                        <a href="meal-details.html?id=${meal.idMeal}">
                            <h3>${meal.strMeal}</h3>
                        </a>
                        <button class="favorite-button" data-meal='${JSON.stringify(meal)}'>Favorite</button>
                            </div>
                        </div>
                    `).join("");

                    mealContainer.innerHTML = mealHtml;

                    // Attach click event listener to favorite buttons
                    const favoriteButtons = document.querySelectorAll(".favorite-button");
                    favoriteButtons.forEach(button => {
                        button.addEventListener("click", handleFavoriteClick);
                    });
                } else {
                    mealContainer.innerHTML = "<p>No results found.</p>";
                    linkContainer.style.display = "none"; // Hide the link container
                }
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                mealContainer.innerHTML = "<p>Error fetching data.</p>";
                linkContainer.style.display = "none"; // Hide the link container
            });
    }
});

function handleFavoriteClick(event) {
    const mealData = JSON.parse(event.target.getAttribute("data-meal"));

    // Load favorite meals from local storage
    const favoriteMeals = JSON.parse(localStorage.getItem("favoriteMeals")) || [];

    // Add the meal to favorites if it's not already in the list
    if (!favoriteMeals.some(meal => meal.idMeal === mealData.idMeal)) {
        favoriteMeals.push(mealData);
        localStorage.setItem("favoriteMeals", JSON.stringify(favoriteMeals));
        alert("Meal added to favorites!");
    } else {
        alert("Meal is already in favorites!");
    }
}
