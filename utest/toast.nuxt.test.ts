import { describe, it, expect } from "vitest";
import ToastComponent from "../components/toast/GeneralToast.vue"
import { alert } from "../stores/alert"
import { mount } from "@vue/test-utils";

describe("Toast work fine", () => {
    it("Toast show", async () => {
        const wrapper = mount(ToastComponent)
        const toast = wrapper.find(".toast")
        expect(toast.exists()).toBe(true)
    })
})