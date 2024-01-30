import { describe, expect, it } from "vitest"
import { DOMWrapper, mount } from "@vue/test-utils"
import RegisterForm from "../components/forms/Register.vue"
describe("Register test", () => {
    it("Form works", async () => {
        const wrapper = mount(RegisterForm)
        const email = wrapper.find("#email") as DOMWrapper<HTMLInputElement>
        const name = wrapper.find("#name") as DOMWrapper<HTMLInputElement>
        const lastname = wrapper.find("#lastname") as DOMWrapper<HTMLInputElement>
        const password = wrapper.find("#password") as DOMWrapper<HTMLInputElement>
        const repeatpassword = wrapper.find("#repeatpassword") as DOMWrapper<HTMLInputElement>
        const form = wrapper.find("form")
        email.element.value = "mail@mail.com"
        name.element.value = "Antonio"
        lastname.element.value = "Martín Soler"
        password.element.value = "MurciaMurcia"
        repeatpassword.element.value = "MurciaMurcia"
        
        expect(email.element.value).toBe("mail@mail.com")
        expect(name.element.value).toBe("Antonio")
        expect(lastname.element.value).toBe("Martín Soler")
        expect(password.element.value).toBe("MurciaMurcia")
        expect(repeatpassword.element.value).toBe("MurciaMurcia")

        expect(form.findAll("button").length).toBe(2)
    })
})