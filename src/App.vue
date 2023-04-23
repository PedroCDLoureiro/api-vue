<template>
    <div v-if="auth && notIsLoginPage" class="div-home">
        <MenuLateral />
        <DashboardView />
    </div>
    <div v-else class="page-login">
      <LoginView />
    </div>
</template>

<script>
    import MenuLateral from './components/MenuLateral.vue'
    import DashboardView from './views/DashboardView.vue'
    import LoginView from './views/LoginView.vue'

    export default {
        name: 'App',
        components: {
            MenuLateral,
            DashboardView,
            LoginView
        },
        computed: {
          auth(){
            if(localStorage.getItem('auth') == 'abcde12345'){
              return true
            }
            else{
              return false
            }
          },
          notIsLoginPage(){
            return this.$route.name !== "login"
          }
        }
    }
</script>

<style lang="scss">
body{
  margin: 0;
}
*{
  font-family: "Open sans";
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
a {
  text-decoration: none;
}
.div-home{
  display: flex;
  height: 100vh;
}
</style>
