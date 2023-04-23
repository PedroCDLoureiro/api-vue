<template>
    <div class="wrapper">
        <div class="login">
            <div class="info-az">
                <LogoCinza />
                <span>Tecnologia em Gestão</span>
            </div>
            <div class="div-login">
                <form>
                    <label for="">Usuário</label>
                    <input 
                        type="text" 
                        name="usuario" 
                        id="usuario" 
                        v-model="form.usuario" 
                        placeholder="Informe usuário">
                    <label for="">Senha</label>
                    <input 
                        type="password" 
                        name="senha" 
                        id="senha" 
                        v-model="form.senha" 
                        placeholder="Informe senha">
                    <div class="botao">
                        <button class="primary-button" @click="submit">Entrar</button>
                    </div>
                </form>
            </div>
        </div>
        <div class="rodape-login">
            <span>Copyright © 2023</span>
            <span>v 1.0.0</span>
        </div>
        <!-- Notificação -->
        <transition name="modal">
            <div v-if="Notificacao" class="notificacao-login" @click="Notificacao = false">
                <span>Login inválido!</span>
                <FontAwesomeIcon icon="xmark" @click="Notificacao = false"/>
            </div>
        </transition>
        <!-- Fim Notificação -->
    </div>
</template>

<script>
    import LogoCinza from '@/components/icons/LogoCinza.vue'
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

    export default {
        name: 'LoginView',
        components: {
            LogoCinza,
            FontAwesomeIcon
        },
        data : () => ({
            Notificacao: false,
            form: {
                usuario: '',
                senha: ''
            }
        }),
        methods: {
            submit(){
                if(this.form.usuario == 'admin' && this.form.senha == 'admin'){
                    localStorage.setItem(
                        'auth', 'abcde12345'
                    )
                    this.$router.push('/home')
                }else{
                    this.Notificacao = true
                }
            },
        }
    }
</script>

<style lang="scss">
    body{
        background: #E5E5E5;
    }
    .wrapper{
        position: relative;
        height: 100vh;
    }
    .login{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: calc(100% - 50px);
        .info-az{
            display: flex;
            align-items: center;
            margin-bottom: 30px;
            padding: 0 15px;
            span{
                color: #8E8E8E;
                font-size: 22px;
                font-weight: bold;
                margin-left: 15px;
            }
        }
        .div-login{
            padding: 15px;
            form{
                background: #FFFFFF;
                box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
                border-radius: 6px;
                padding: 80px 60px;
                color: #626262;
                input{
                    width: 300px;
                }
                .botao{
                    width: 100%;
                    text-align: center;
                }
            }
        }
    }
    .rodape-login{
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #F7F8FA;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
        font-size: 14px;
        color: rgba(98, 98, 98, 0.8);
        padding: 10px 25px;
        height: 29px;
    }
    .notificacao-login{
        background-color: var(--error-color);
        width: max-content;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        position: absolute;
        z-index: 9999;
        top: 20%;
        right: 0;
        color: #fff;
        svg{
            color: #fff;
            margin-left: 20px;
            cursor: pointer;
        }
    }
    @media (max-width: 768px){
        .login{
            .div-login{
                form{
                    padding: 30px 15px;
                }
            }
        }
    }
</style>