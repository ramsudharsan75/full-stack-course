describe('Blog App', () => {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Test User',
      username: 'test',
      password: 'test'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('login fails with wrong password', function () {
    cy.contains('login').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()
    cy.get('.error').contains('Invalid Credentials')
    cy.get('html').should('not.contain', 'Test User has logged in')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({
        username: 'test',
        password: 'test'
      })
    })

    it('a new blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('input:first').type('a blog created by cypress')
      cy.get('input:last').type('cypress url')
      cy.contains('Save').click()
      cy.contains('a blog created by cypress')
    })

    it('user can like a blog', function () {
      cy.createBlog({
        title: 'a blog created by cypress',
        url: 'a blog created by cypress'
      })
      cy.contains('a blog created by cypress').as('testBlog').get('#like-button').click()
      cy.get('@testBlog').get('#likes').contains('1')

    })

    it('user can delete a blog', function () {
      cy.createBlog({
        title: 'a blog created by cypress',
        url: 'a blog created by cypress'
      })
      cy.contains('a blog created by cypress').as('testBlog').get('#delete-button').click()
      cy.get('@testBlog').should('not.exist')
    })

    it('most liked blogs are on top', function () {
      cy.createBlog({
        title: 'a blog created by cypress',
        url: 'a blog created by cypress'
      })
      cy.createBlog({
        title: 'a blog created by cypress 2',
        url: 'a blog created by cypress'
      })

      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.get('.blog').eq(1).find('#like-button').click().wait(1000)
      cy.get('.blog').eq(0).should('contain', 'a blog created by cypress 2')
    })
  })
})