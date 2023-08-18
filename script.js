document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.getElementById("search-button");
    const searchInput = document.getElementById("search-input");

    searchButton.addEventListener("click", function () {
        const searchTerm = searchInput.value.trim();
        if (searchTerm !== "") {
            window.location.href = `search-results.html?search=${encodeURIComponent(searchTerm)}`;
        }
    });
});
