let x = document.getElementById("x");

x.addEventListener("click", function() {
    let y = document.getElementById("y");
    if (y.style.display === "none") {
        y.style.display = "block";
    } else {
        y.style.display = "none";
    }
} );