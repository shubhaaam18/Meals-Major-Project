document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search-input");
    const searchSuggestions = document.getElementById("search-suggestions");

    searchInput.addEventListener("input", function () {
        const searchTerm = searchInput.value.trim();
        if (searchTerm !== "") {
            fetchSuggestions(searchTerm);
        } else {
            clearSuggestions();
        }
    });

    function fetchSuggestions(searchTerm) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
            .then(response => response.json())
            .then(data => {
                if (data.meals) {
                    displaySuggestions(data.meals);
                } else {
                    clearSuggestions();
                }
            })
            .catch(error => {
                console.error("Error fetching suggestions:", error);
                clearSuggestions();
            });
    }

    function displaySuggestions(suggestions) {
        const suggestionHtml = suggestions.map(meal => `
            <div class="suggestion">
                ${meal.strMeal}
            </div>
        `).join("");
        searchSuggestions.innerHTML = suggestionHtml;
    }

    function clearSuggestions() {
        searchSuggestions.innerHTML = "";
    }
});
