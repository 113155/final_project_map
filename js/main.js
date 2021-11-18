/**
 * main.js
 */
"use strict";

import { newBook, displayListOfBooks } from "./services/booksService.js";

(function () {
    // declare variables for page-contents
    let HOME_PAGE_CONTENT;
    let CATALOG_PAGE_INITIAL_CONTENT;
    let NEW_BOOK_CONTENT;

    const initializePageContents = function () {
        HOME_PAGE_CONTENT = `
            <h2 class="my-4 text-center">Welcome to City Books Rental Services<sup>&reg;</sup></h2>
            <hr>
            <img id="banner" src="./images/banner_gold.jpeg" alt="CityBooks Photo">
            <div class="mt-3"><p>
            We are a top flight, fully-digital Rental Store. Find out more about us and learn how we can
            serve you with a widest variety of books and lots of other digital content, all for your education
            as well as your entertainment. You can also browse our <a>Catalog</a>, of books and be amazed at
            all that we have in stock for you, your family and friends!!!!!
            </p></div>
        `;
        CATALOG_PAGE_INITIAL_CONTENT = `
        <div class="row my-4">
        <div class="col-md-6">
            <span style="font-size: 1.7em;">Books in our Collection</span>
        </div>
        <div class="col-md-6">
            <span id="addBookSpan" style="float: right;">
                <a data-target="newbook" id="addBook" class="btn btn-outline-warning btn-lg" href="#">Add New Book</a>
            </span>
        </div>
        </div>
            <table class="table table-striped">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">ISBN</th>
                    <th scope="col">Book Title</th>
                    <th scope="col">Overdue</th>
                    <th scope="col">Publisher</th>
                    <th scope="col">Date Published</th>
                </tr>
                </thead>
                <tbody id="tbodyBooks">
                </tbody>
            </table>
            `;
        NEW_BOOK_CONTENT = `
        <div class="container">
        <!-- Add form here-->
        <div>
            <span style="font-size: 1.7em;">
                New Book Form
            </span>
        </div>
        <div>
            <span>
               <b>Note:</b> Form fields with asterisk (*) are required.
            </span>
        </div>
        <form id="formNewBook">
            <fieldset>
                <div class="row my-3">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label for="title">*Book Title:</label>
                            <input class="form-control" type="text" name="title" id="title" value="" required="">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="isbn">*ISBN:</label>
                            <input class="form-control" type="text" name="isbn" id="isbn" value="" required="">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="overdueFee">*Overdue Fee:</label>
                            <input class="form-control" type="number" step=".01" min="0" name="overdueFee" id="overdueFee" value="0.00" required="">
                        </div>
                    </div>
                </div>
                <div class="row my-3">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="publisher">*Publisher:</label>
                            <input class="form-control" type="text" name="publisher" id="publisher" value="" required="">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="datePublished">*Date Published:</label>
                            <input class="form-control" type="date" name="datePublished" id="datePublished" value="" required="">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <button data-target="submitform" id="btnSubmit" type="submit" class="btn btn-outline-warning">Save Book</button>
                </div>
            </fieldset>
        </form>
    </div>
        `
    };
    initializePageContents();

    const displayHomePage = function () {
        document.getElementById("bodyContainer").innerHTML = HOME_PAGE_CONTENT;
    };

    const displayCatalogPage = function () {
        document.getElementById("bodyContainer").innerHTML = CATALOG_PAGE_INITIAL_CONTENT;
        // add event listener to the btnAddNewBook
        document.getElementById("addBook").addEventListener("click", (event) => {
            event.preventDefault();
            //navigate to the AddNewBook form page content, n maintain history state
            displayNewBookPage();
            history.pushState({}, "newbook", "#newbook");
        });
        displayListOfBooks();
    };

    const displayNewBookPage = function () {
        document.getElementById("bodyContainer").innerHTML = NEW_BOOK_CONTENT;
        document.getElementById("title").focus();
        newBook();
    };

    // Setup App Nav logic
    const appNav = {
        pages: ["home", "catalog", "newbook"],
        init: function () {
            document.querySelectorAll(".nav-link").forEach(navLink => {
                navLink.addEventListener("click", appNav.nav);
            });
            document.querySelectorAll(".navbar-brand").forEach(navBarBrand => {
                navBarBrand.addEventListener("click", appNav.nav);
            });
            // refresh current page if button to that page is clicked while on page
            let pagename = location.hash.replace("#", "");
            if (pagename === "catalog") {
                history.replaceState({}, "Catalog", "#catalog");
            } else if (pagename === "addnewbook") {
                history.replaceState({}, "AddNewBook", "#addnewbook");
            } else {
                history.replaceState({}, "Home", "#home");
            }

            window.addEventListener("popstate", appNav.popState);

            if (pagename === "home") {
                displayHomePage();
            } else if (pagename === "catalog") {
                displayCatalogPage();
            } else if (pagename === "addnewbook") {
                displayAddNewBookFormPage();
            } else {
                displayHomePage();
            }
        },
        nav: function (event) {
            event.preventDefault();
            let currPage = event.target.getAttribute("data-target");
            history.pushState({}, currPage, `#${currPage}`);
            if (currPage === "home") {
                displayHomePage();
            } else if (currPage === "catalog") {
                displayCatalogPage();
            }
        },
        popState: function (event) {
            let pagename = location.hash.replace("#", "");
            if (pagename === "home") {
                displayHomePage();
            } else if (pagename === "catalog") {
                displayCatalogPage();
            } else if (pagename === "newbook") {
                displayNewBookPage();
            }
        }
    };

    // Load/Init the application
    document.addEventListener("DOMContentLoaded", appNav.init);
})();