document.addEventListener("DOMContentLoaded", () => {
  // Elementos
  const form = document.getElementById("book-form");
  const titleInput = document.getElementById("title");
  const authorInput = document.getElementById("author");
  const coverInput = document.getElementById("cover");
  const pdfInput = document.getElementById("pdf");
  const statusSelect = document.getElementById("status");
  const library = document.getElementById("library");
  const searchInput = document.getElementById("buscar");
  const reader = document.getElementById("reader");
  const bookFrame = document.getElementById("bookFrame");

  // Cargar libros desde localStorage
  let books = JSON.parse(localStorage.getItem("books")) || [];

  // Guardar libros
  function saveBooks() {
    localStorage.setItem("books", JSON.stringify(books));
  }

  // Renderizar (con filtro opcional)
  function renderBooks(filter = "") {
    library.innerHTML = "";
    const f = filter.toLowerCase().trim();
    const filtered = books.filter(b =>
      b.title.toLowerCase().includes(f) || b.author.toLowerCase().includes(f)
    );

    if (filtered.length === 0) {
      library.innerHTML = <p class="empty-note">No hay libros. Agrega uno desde el formulario.</p>;
      return;
    }

    filtered.forEach((b, i) => {
      const div = document.createElement("div");
      div.className = "book";
      div.dataset.index = i; // índice relativo a filtered array

      // portada
      const portadaSrc = b.cover && b.cover.trim() !== "" ? b.cover : "";
      if (portadaSrc) {
        const img = document.createElement("img");
        img.src = portadaSrc;
        img.alt = b.title;
        div.appendChild(img);
      }

      // info (titulo - autor)
      const info = document.createElement("p");
      info.textContent = ${b.title} — ${b.author};
      div.appendChild(info);

      // estado visual
      const estadoSpan = document.createElement("div");
      estadoSpan.className = "estado " + (b.status === "Leído" ? "leido" : "pendiente");
      estadoSpan.textContent = b.status;
      div.appendChild(estadoSpan);

      // controles: leer, cambiar estado, eliminar
      const controls = document.createElement("div");
      controls.className = "controls";

      // Leer
      if (b.pdf && b.pdf.trim() !== "") {
        const readBtn = document.createElement("button");
        readBtn.className = "read-btn";
        readBtn.textContent = "📖 Leer";
        readBtn.addEventListener("click", () => {
          // poner el archivo en el iframe
          bookFrame.src = b.pdf;
          reader.style.display = "block";
          // desplazarse al lector
          reader.scrollIntoView({ behavior: "smooth" });
        });
        controls.appendChild(readBtn);
      }

      // Cambiar estado
      const stateBtn = document.createElement("button");
      stateBtn.className = "state-btn";
      stateBtn.textContent = b.status === "Leído" ? "Marcar Pendiente" : "Marcar Leído";
      stateBtn.addEventListener("click", () => {
        // encontrar índice real en books (no en filtered)
        const realIndex = books.findIndex(x => x === b);
        if (realIndex >= 0) {
          books[realIndex].status = books[realIndex].status === "Leído" ? "Pendiente" : "Leído";
          saveBooks();
          renderBooks(searchInput.value);
        }
      });
      controls.appendChild(stateBtn);

      // Eliminar
      const delBtn = document.createElement("button");
      delBtn.className = "delete-btn";
      delBtn.textContent = "Eliminar";
      delBtn.addEventListener("click", () => {
        if (!confirm("¿Eliminar este libro?")) return;
        const realIndex = books.findIndex(x => x === b);
        if (realIndex >= 0) {
          books.splice(realIndex, 1);
          saveBooks();
          renderBooks(searchInput.value);
        }
      });
      controls.appendChild(delBtn);

      div.appendChild(controls);
      library.appendChild(div);
    });
  }

  // Agregar libro (enviar formulario)
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = titleInput.value.trim();
    const author = authorInput.value.trim();
    const cover = coverInput.value.trim();
    const pdf = pdfInput.value.trim();
    const status = statusSelect.value;

    if (!title || !author) {
      alert("Por favor completa el título y el autor.");
      return;
    }

    books.push({ title, author, cover, pdf, status });
    saveBooks();
    renderBooks(searchInput.value);
    form.reset();
  });

  // Búsqueda en tiempo real
  searchInput.addEventListener("input", () => {
    renderBooks(searchInput.value);
  });

  // Inicial
  renderBooks();
});
