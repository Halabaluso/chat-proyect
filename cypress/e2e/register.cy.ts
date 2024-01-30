describe("Register form work", () => {
    it("Empty inputs msg", () => {
        cy.visit("http://localhost:3000/")
        cy.contains("Registro").click()
        cy.get("#registerform").submit()
        cy.contains("Complete bien todos los campos")
    })

    it("Incorrects inputs msg", () => {
        cy.visit("http://localhost:3000/")
        cy.contains("Registro").click()
        cy.contains("Registro en Chatstore")
        cy.get("#registeremail").type("holaholahola")
        cy.get("#registername").type("holaholahola")
        cy.get("#registerlastname").type("holaholahola")
        cy.get("#registerpassword").type("holaholahola")
        cy.get("#registerrepeatpassword").type("holaholahola")
        cy.get("#registerform").submit()
        cy.contains("Complete bien todos los campos")
    })

    it("Back buttom work", () => {
        cy.visit("http://localhost:3000/")
        cy.contains("Registro").click()
        cy.contains("Atrás").click()
    })

    it("Header not visible", () => {
        cy.visit("http://localhost:3000/")
        cy.get("#header").should("not.be.visible")
    })
})