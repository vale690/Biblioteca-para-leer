// Espera a que la página cargue
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("book-form");
    const library = document.getElementById("library");
    const reader = document.getElementById("reader");
    const bookFrame = document.getElementById("bookFrame");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Obtiene los valores del formulario
        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const coverUrl = document.getElementById("cover").value;
        const fileUrl = document.getElementById("fileUrl").value;
        const status = document.getElementById("status").value;

        // Crea un contenedor para el libro
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book");

        // Si hay portada
        if (coverUrl) {
            const img = document.createElement("img");
            img.src = coverUrl;
            img.alt = title;
            img.classList.add("cover");
            bookDiv.appendChild(img);
        }

        // Info del libro
        const info = document.createElement("p");
        info.textContent = ${title} - ${author} [${status}];
        bookDiv.appendChild(info);

        // Botón "Leer" si hay archivo
        if (fileUrl) {
            const btnLeer = document.createElement("button");
            btnLeer.textContent = "Leer";
            btnLeer.addEventListener("click", () => {
                bookFrame.src = fileUrl;
                reader.style.display = "block";
            });
            bookDiv.appendChild(btnLeer);
        }

        // Agrega el libro a la biblioteca
        library.appendChild(bookDiv);

        // Limpia el formulario
        form.reset();
    });
});
