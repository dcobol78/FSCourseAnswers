describe('Blog App', function () {
  beforeEach(function () {
    cy.deleteEverything();
    cy.createUser({
      username: 'onur123',
      password: 'password123',
      name: 'xdxdxdxd',
    });
    cy.visit('http://localhost:3000');
  });
  it('front page can be opened', function () {
    cy.contains('Login');
  });

  it('if username wrong cannot login', function () {
    cy.get('#Login').click();
    cy.get('#username').type('onur333');
    cy.get('#password').type('password123');
    cy.get('#submit-login-button').click();
    cy.contains('Wrong username or password');
  });

  it('if password wrong cannot login', function () {
    cy.get('#Login').click();
    cy.get('#username').type('onur123');
    cy.get('#password').type('password12333');
    cy.get('#submit-login-button').click();
    cy.contains('Wrong username or password');
  });

  it('can login', function () {
    cy.get('#Login').click();
    cy.get('#username').type('onur123');
    cy.get('#password').type('password123');
    cy.get('#submit-login-button').click();
    cy.contains('Onur123 logged in');
  });

  it('can add blog', function () {
    cy.manuelLogin({ username: 'onur123', password: 'password123' });
    cy.addBlog({
      title: 'title-test',
      author: 'author-test',
      url: 'url-test',
    });
    cy.get('.blog');
  });

  it('user can like a post', function () {
    cy.manuelLogin({ username: 'onur123', password: 'password123' });
    cy.addFakeBlog();
    cy.get('.view-blog').click();
    cy.get('.like-button').click();
    cy.get('.likes').should('to.have.text', 'likes 1 like');
  });

  it('user who created can delete it', function () {
    cy.manuelLogin({ username: 'onur123', password: 'password123' });
    cy.addFakeBlog();
    cy.get('.view-blog').click();
    cy.get('.delete-blog-button').click();
  });

  it("user cannot delete other' blog", function () {
    cy.manuelLogin({ username: 'onur123', password: 'password123' });
    cy.addFakeBlog();
    cy.get('#logout').click();
    cy.createUser({
      username: 'badperson',
      password: 'verybadperson',
      name: 'xdxdxdxd',
    });
    cy.visit('http://localhost:3000');
    cy.manuelLogin({ username: 'badperson', password: 'verybadperson' });
    cy.get('.view-blog').click();
    cy.get('.delete-blog-button').click();
    cy.get('.blog');
  });

  it('sorting by likes should work', function () {
    cy.manuelLogin({ username: 'onur123', password: 'password123' });
    cy.addBlog({
      title: 'title-1',
      author: 'author-1',
      url: 'url-1',
    });
    cy.addBlog({
      title: 'title-2',
      author: 'author-2',
      url: 'url-2',
    });
    cy.contains('title-2 author-2')
      .contains('view')
      .click()
      .get('.like-button')
      .click()
      .get('.like-button')
      .click()
      .get('.like-button')
      .click()
      .get('.hide-blog')
      .click();
    cy.contains('title-1 author-1')
      .contains('view')
      .click()
      .get('.like-button')
      .click()
      .get('.hide-blog')
      .click();
    cy.visit('http://localhost:3000');
    cy.get('.blog').eq(0).contains('title-2 author-2');
    cy.get('.blog').eq(1).contains('title-1 author-1');
  });
});
