/**
 * booksService.js
 */

"use strict"

import { submitNewBook, getBooks } from "../datasource/booksDAO.js";

export async function newBook() {
    let title = document.getElementById("title");
    let isbn = document.getElementById("isbn");
    let overdueFee = document.getElementById("overdueFee");
    let publisher = document.getElementById("publisher");
    let datePublished = document.getElementById("datePublished");
    document.getElementById("formNewBook").addEventListener("submit", async function (event) {
        event.preventDefault();
        const strTitle = title.value;
        const strISBN = isbn.value;
        const strOverdueFee = overdueFee.value;
        const strPublisher = publisher.value;
        const strDatePublished = datePublished.value;
        const newBookObj = {
            "isbn": strISBN,
            "title": strTitle,
            "overdueFee": strOverdueFee,
            "publisher": strPublisher,
            "datePublished": strDatePublished
        };
        const addedBook = await submitNewBook(newBookObj);
        title.value = "";
        isbn.value = "";
        overdueFee.value = "0.00";
        publisher.value = "";
        datePublished.value = "";
        title.focus();
    });
    title.focus();

}

export async function displayListOfBooks() {
    let books = await getBooks();
    let trowsOfBook = "";
    books.forEach((book, i) => {
        trowsOfBook += `<tr>
            <th scope="row">${i + 1}.</th>
            <td>${book.isbn}</td>
            <td>${book.title}</td>
            <td>${book.overdueFee}</td>
            <td>${book.publisher}</td>
            <td>${book.datePublished}</td>
        </tr>`;
    });
    const tbodyBooks = document.getElementById("tbodyBooks");
    tbodyBooks.innerHTML = trowsOfBook;
}
