import { describe, expect, it } from "vitest"
import { DOMWrapper, mount } from "@vue/test-utils"
import LoginForm from "../components/forms/Login.vue"
describe("Login test", () => {
    it("Form works", async () => {
        const wrapper = mount(LoginForm)
        const email = wrapper.find("#email") as DOMWrapper<HTMLInputElement>
        const password = wrapper.find("#password") as DOMWrapper<HTMLInputElement>
        const form = wrapper.find("form")
        const buttomtrigger = wrapper.find("#trigger")
        email.element.value = "mail@mail.com"
        password.element.value = "MurciaMurcia"
        
        expect(email.element.value).toBe("mail@mail.com")
        expect(password.element.value).toBe("MurciaMurcia")
        expect(form.findAll("button").length).toBe(2)
        form.trigger("submit")
        expect(wrapper.emitted()).toHaveProperty('submit')
    })
})