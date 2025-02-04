function submitSurvey() {
    // Get selected values
    let lazy = document.querySelector('input[name="lazy"]:checked');
    let thorough = document.querySelector('input[name="thorough"]:checked');

    // Check if both questions are answered
    if (!lazy || !thorough) {
        alert("Please answer all questions before submitting.");
        return;
    }

    // Get values
    let lazyValue = lazy.value;
    let thoroughValue = thorough.value;

    // Display results
    let resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = `
        <p>You rated "I am lazy" as: <strong>${lazyValue}</strong></p>
        <p>You rated "I am thorough" as: <strong>${thoroughValue}</strong></p>
    `;
}
