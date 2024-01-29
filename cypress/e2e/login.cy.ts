describe("Login form", () => {
    it("Show correct msg when form is incorrect", () => {
        cy.visit("http://localhost:3000/")
        cy.get("#email").type("hola@hola.com")
        cy.get("#password").type("MurciaMurcia")
        cy.get("#loginform").submit()
        cy.get(".toast")
    })
    it("Go to the register view", () => {
        cy.visit("http://localhost:3000/")
        cy.contains("Registro").click()
    })
})