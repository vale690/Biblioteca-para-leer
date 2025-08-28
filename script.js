document.addEventListener("DOMContentLoaded", () => {
    const library = document.getElementById("library");
    const addBookBtn = document.getElementById("addBook");
    const searchInput = document.getElementById("buscar");

    // Agregar libro
    addBookBtn.addEventListener("click", () => {
        const title = document.getElementById("title").value.trim();
        const author = document.getElementById("author").value.trim();
        const coverUrl = document.getElementById("cover").value.trim();
        const pdf = document.getElementById("pdf").value.trim();
        const status = document.getElementById("status").value;

        if (!title || !author) {
            alert("Por favor, completa el título y el autor");
            return;
        }

        // Crear contenedor de libro
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book");

        // Portada
        if (coverUrl) {
            const img = document.createElement("img");
            img.src = coverUrl;
            img.alt = title;
            bookDiv.appendChild(img);
        }

        // Info
        const info = document.createElement("p");
        info.textContent = ${title} - ${author} [${status}];
        bookDiv.appendChild(info);

        // Link PDF
        if (pdf) {
            const link = document.createElement("a");
            link.href = pdf;
            link.target = "_blank";
            link.textContent = "📖 Leer libro";
            bookDiv.appendChild(link);
        }

        // Agregar a la biblioteca
        library.appendChild(bookDiv);

        // Limpiar campos
        document.getElementById("title").value = "";
        document.getElementById("author").value = "";
        document.getElementById("cover").value = "";
        document.getElementById("pdf").value = "";
        document.getElementById("status").value = "Pendiente";
    });

    // Buscar libro
    searchInput.addEventListener("input", () => {
        const filter = searchInput.value.toLowerCase();
        const books = library.getElementsByClassName("book");

        for (let book of books) {
            const text = book.innerText.toLowerCase();
            book.style.display = text.includes(filter) ? "block" : "none";
        }
    });
});
