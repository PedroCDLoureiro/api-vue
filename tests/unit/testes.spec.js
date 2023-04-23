import { shallowMount } from '@vue/test-utils'
import MenuLateral from '@/components/MenuLateral.vue'
import LoginView from '@/views/LoginView.vue'

describe('MenuLateral.vue', () => {
  it('teste MenuLateral', () => {
    const wrapper = shallowMount(MenuLateral, {
      props: ''
    })
    expect(wrapper.vm).toBeDefined
  })
})

describe('LoginView.vue', () => {
  it('teste LoginView', () => {
    const wrapper = shallowMount(LoginView, {
      props: ''
    })
    expect(wrapper.vm).toBeDefined
  })
})
