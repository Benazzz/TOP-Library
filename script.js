const myLibrary = [];

function Book(title, author, pages, completed, id)
{
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = completed;
    this.id = id;
}

Book.prototype.toggleCompleted = function() {
    this.read = true;
}

function addBookToLibrary()
{
    const button = document.querySelector(".new-book");
    const dialog = document.querySelector("dialog");
    const form = document.querySelector("form");
    const cancel = document.querySelector("#cancel");

    button.addEventListener("click", () => {
        dialog.showModal();
    });

    cancel.addEventListener("click", () => {
        form.reset();
        dialog.close();
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const title = formData.get("title");
        const author = formData.get("author");
        const pages = parseInt(formData.get("pages"));
        const completed = false;

        myLibrary.push(new Book(title, author, pages, completed, crypto.randomUUID()));
        displayBooks();
        dialog.close();
        form.reset();
    });
}

function removeBook()
{
    const buttons = document.querySelectorAll(".remove");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const id = button.parentElement.dataset.id;
            const index = myLibrary.findIndex(b => b.id === id);
            if(index !== -1) myLibrary.splice(index, 1);
            displayBooks();
        });
    });   
}

function displayBooks()
{
    const container = document.querySelector(".container");
    container.innerHTML = "";
    myLibrary.forEach(element => {
        const item = document.createElement("div");
        item.classList.add("item");
        item.dataset.id = element.id;

        const title = document.createElement("p");
        title.classList.add("title");
        title.textContent = `${element.title}`;

        const author = document.createElement("p");
        author.classList.add("author");
        author.textContent = `${element.author}`;

        const pages = document.createElement("p");
        pages.classList.add("pages");
        pages.textContent = `${element.pages} pages`;

        const status = document.createElement("button");
        if (element.read)
        {
            status.classList.add("completed");
            status.textContent = "Completed";
        }
        else
        {
            status.classList.add("read");
            status.textContent = "Read?";
            status.addEventListener("click", () => {
               element.toggleCompleted();
               displayBooks(); 
            });
        }

        const remove = document.createElement("button");
        remove.classList.add("remove");
        remove.textContent = "Remove";

        item.appendChild(title);
        item.appendChild(author);
        item.appendChild(pages);
        item.appendChild(status);
        item.appendChild(remove);

        container.appendChild(item);
    });

    removeBook();
}

addBookToLibrary();
displayBooks();