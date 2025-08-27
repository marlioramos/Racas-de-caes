document.addEventListener("DOMContentLoaded", () => {
    const breedSelect = document.getElementById("breedSelect");
    const gallery = document.getElementById("gallery");

    // Carregar raças da API
    fetch("https://dog.ceo/api/breeds/list/all")
        .then(response => response.json())
        .then(data => {
            const breeds = Object.keys(data.message);
            breeds.forEach(breed => {
                const option = document.createElement("option");
                option.value = breed;
                option.textContent = breed.charAt(0).toUpperCase() + breed.slice(1);
                breedSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Erro ao carregar raças:", error);
        });

    // Quando uma raça for selecionada, carregar imagens
    breedSelect.addEventListener("change", () => {
        const breed = breedSelect.value;

        if (breed) {
            fetch(`https://dog.ceo/api/breed/${breed}/images/random/6`)
                .then(response => response.json())
                .then(data => {
                    gallery.innerHTML = ""; // Limpa a galeria
                    data.message.forEach(img => {
                        const imgEl = document.createElement("img");
                        imgEl.src = img;
                        imgEl.alt = breed;
                        imgEl.style.width = "200px";
                        imgEl.style.margin = "10px";
                        imgEl.style.borderRadius = "8px";
                        imgEl.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.2)";
                        gallery.appendChild(imgEl);
                    });
                })
                .catch(error => {
                    console.error("Erro ao carregar imagens:", error);
                });
        } else {
            gallery.innerHTML = "";
        }
    });
});
