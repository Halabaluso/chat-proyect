
describe("Login form", () => {
    it("Show toast when form is empty", () => {
        cy.visit("http://localhost:3000/")
        cy.get("#loginform").submit()
    })
    it("Show correct msg when form is incorrect", () => {
        cy.visit("http://localhost:3000/")
        cy.get("#email").type("hola@hola.com")
        cy.get("#password").type("MurciaMurcia")
        cy.get("#loginform").submit()
        cy.get(".toast").contains("Usuario no encontrado")
    })
    it("Go to the register view", () => {
        cy.visit("http://localhost:3000/")
        cy.contains("Registro").click()
    })
    it("Login with correct user work fine, header is visible and header is invisible if i refresh", () => {
        cy.visit("http://localhost:3000/")
        cy.get("#email").type("pruebamail@pruebamail.com")
        cy.get("#password").type("pruebaprueba")
        cy.get("#loginform").submit()
        cy.url().should("include", "inicio")
        cy.get("#header").should("be.visible")

        cy.visit("http://localhost:3000/")
        cy.get("#header").should("not.be.visible")
    })
})