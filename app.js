let btnn = document.getElementById("btnn");
let error = document.querySelector(".errormsg");
let gallery = document.getElementById("gallery");
btnn.addEventListener("click", async function() {
    let inputValue = document.getElementById("input").value;
    if (inputValue > 10 || inputValue < 1) {
        error.style.display = "block";
        error.innerHTML = "The number should be between 1 and 10";
        return
    }
    imgs = "";
    try {
        btnn.style.display = "none";
        const loading = `<img src="spinner1.svg"/>`;
        gallery.innerHTML = loading;
        await fetch(`https://api.unsplash.com/photos?per_page=${inputValue}&page=${Math.round(Math.random() * 1000)}&client_id=dWIjX4e6UyFdPOZI26XOQuYs090ZMfhId9OmTJRF4XY`).then((res) => res.json().then((data) => {
            if (data) {
                data.forEach((pic) => {
                    imgs += `
                   <img src=${pic.urls.small} alt="image"/>
                   `;
                    gallery.style.display = "block";
                    gallery.innerHTML = imgs;
                    btnn.style.display = "block";
                    error.style.display = "none";
                })
            }
        }));
    } catch (error) {
        error.style.display = "block";
        error.innerHTML = "An error happened,try again later";
        btnn.style.display = "block";
        gallery.style.display = "none";
    }
});