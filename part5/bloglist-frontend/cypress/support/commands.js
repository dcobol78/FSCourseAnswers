// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("login", ({ username, password }) => {
  cy.request("POST", "http://localhost:3000/api/login", {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem("loggedBlogUser", JSON.stringify(body));
  });
});

Cypress.Commands.add("manuelLogin", ({ username, password }) => {
  cy.get("#Login").click();
  cy.get("#username").type(username);
  cy.get("#password").type(password);
  cy.get("#submit-login-button").click();
  cy.contains(
    `${username.charAt(0).toUpperCase() + username.slice(1)} logged in`
  );
});

Cypress.Commands.add("addBlog", ({ title, author, url }) => {
  cy.contains("Create Blog").click();
  cy.get("#titleInput").type(title);
  cy.get("#authorInput").type(author);
  cy.get("#urlInput").type(url);
  cy.get("#create-button").click();
});

Cypress.Commands.add("addFakeBlog", () => {
  cy.addBlog({
    title: "fake-title",
    author: "fake-author",
    url: "fake-url",
  });
});

Cypress.Commands.add("createUser", ({ username, password, name }) => {
  const user = {
    username: username,
    password: password,
    name: name,
  };
  cy.request("POST", "http://localhost:3000/api/users", user);
});

Cypress.Commands.add("deleteEverything", () => {
  cy.request("POST", "http://localhost:3000/api/reset");
});
