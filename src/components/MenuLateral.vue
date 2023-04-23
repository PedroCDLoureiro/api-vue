<template>
    <div class="menu-lateral" v-bind:class="{ active: recolherMenu }">
        <div class="topo">
            <div class="logo">
                <LogoBranca />
            </div>            
            <router-link to="#">
                <div class="menu">
                    <IconeCandidatos />
                    <span>Candidatos</span>
                    <div class="icone-triangulo"></div>
                </div>
        </router-link>
        </div>
        <div class="rodape" @click="recolherMenu = !recolherMenu">
            <div v-if="recolherMenu == false" class="recolher">
                <FontAwesomeIcon icon="circle-chevron-left" />
                <span>Recolher Menu</span>
            </div>
            <div v-else class="menu-r">
                <FontAwesomeIcon icon="bars" />
            </div>
        </div>
    </div>
</template>

<script>
    import LogoBranca from '@/components/icons/LogoBranca.vue'
    import IconeCandidatos from '@/components/icons/IconeCandidatos.vue'
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    export default {
        name: 'MenuLateral',
        components: {
            LogoBranca,
            IconeCandidatos,
            FontAwesomeIcon
        },
        data(){
            return{
                recolherMenu: false
            }
        }
    }
</script>

<style lang="scss">

    .menu-lateral{
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        justify-content: space-between;
        background-color: #0067A5;
        width: 15vw;
        transition: all ease .3s;
        .topo{
            width: 100%;
            .logo{
                display: flex;
                justify-content: center;
                padding: 55px 0;
            }
            .menu{
                position: relative;
                background: #005C94;
                border-top: 1px solid rgba(255, 255, 255, 0.2);
                border-bottom: 1px solid rgba(255, 255, 255, 0.2);
                padding: 12px 20px;
                span{
                    color: #fff;
                }
            }
            .icone-triangulo{
                position: absolute;
                right: 0;
                top: 50%;
                transform: translateY(-50%);
                border-top: 8px solid transparent;
                border-bottom: 8px solid transparent; 
                border-right: 8px solid #FFF; 
            }
            .menu{
                svg{
                    margin-right: 10px;
                }
                a{
                    font-size: 15px;
                    line-height: 20px;
                    letter-spacing: 0em;
                    text-align: left;
                    color: #FFF;
                }
            }
        }
        .rodape{
            border-top: 1px solid rgba(255, 255, 255, 0.2);
            color: rgba(255, 255, 255, 0.2);
            padding: 15px 10px;
            justify-content: center;
            cursor: pointer;
            transition: all ease .3s;
            svg{
                margin-right: 6.25px;
            }
            .menu-r{
                svg{
                    margin-right: 0;
                }
            }
        }
        &.active{
            width: 5vh;
            .logo{
                padding: 5px;
            }
            .menu{
                overflow: hidden;
                opacity: 0;
            }
        }
    }
    @media (max-width: 1400px){
        .menu-lateral .topo .menu a, .rodape{
            font-size: 14px;
        }
        .menu-lateral .topo .menu svg{
            width: 14px;
        }
    }
    @media (max-width: 768px){
        .logo{
            svg{
                width: 75%;
            }
        }
        .menu{
            span{
                display: none;
            }
        }
        .rodape{
            span{
                display: none;
            }
        }
    }
</style>