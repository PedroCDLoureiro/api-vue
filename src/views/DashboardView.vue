<template>
    <!-- Dashboard -->
    <div class="dashboard">
        <div class="topo-dashboard">
            <div class="infos">
                <div class="pagina">
                    <h1>Candidatos</h1>
                    <h2> » Listagem dos candidatos </h2>
                </div>
                <div class="user">
                    Karen
                    <FontAwesomeIcon class="b-down" icon="chevron-down" @click="menuLogout = !menuLogout"/>
                    <IconeUsuario />
                    <div v-if="menuLogout" class="logout" @click="logout">
                        Sair
                    </div>
                </div>
            </div>
            <div class="adicionar">
                <button @click="abrirModal('Adicionar')">
                    <FontAwesomeIcon class="b-plus" icon="circle-plus" />
                    Adicionar
                </button>
            </div>
        </div>
        <div class="container">
            <div v-if="this.candidatos != ''" class="content">
                <table class="table-list">
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Ações</th>
                    </tr>
                    <tr v-for="candidato of candidatos" :key="candidato.id">
                        <td>{{ candidato.id }}</td>
                        <td><img :src="candidato.avatar">{{ candidato.first_name }} {{ candidato.last_name }}</td>
                        <td>{{ candidato.email }}</td>
                        <td>
                            <FontAwesomeIcon class="b-edit" icon="pen-to-square" @click="getCandidato(candidato.id)"/>
                            <FontAwesomeIcon class="b-delete" icon="trash-can" @click="form.id = candidato.id, showModalExclusao = true"/>
                        </td>
                    </tr>
                </table>
                <nav class="pagination" role="navigation" aria-label="pagination">
                    <span>Página {{ current_page }} de {{ pages != '' ? pages : '1'}}</span>
                    <ul class="pagination-list">
                        <li v-for="(page, index) in pages" :key="index">
                            <a class="pagination-link" @click="navigate(page)"
                                :class="{ 'is-current': page === current_page }">{{ page }}</a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div v-else class="no-content">
                <FontAwesomeIcon icon="inbox" />
                <p>Você não possui nenhum candidato adicionado, clique no botão <span>Adicionar</span> para começar.</p>
            </div>
        </div>
        <!-- Modal Form -->
        <transition name="modal">
            <div v-if="showModal" id="modal-template">
                <div class="modal-mask">
                    <div class="modal-wrapper">
                        <div class="modal-container">
                            <div class="modal-header">
                                <slot name="header">
                                    {{ messageModal }} Candidato
                                </slot>
                                <FontAwesomeIcon icon="xmark" @click="showModal= false"/>
                            </div>
    
                            <div class="modal-body">
                                <form action="">
                                    <label>Nome <span>*</span></label>
                                    <input type="text" name="nome" id="nome" v-model="form.nome" placeholder="Informe nome" required>
                                    <label>Vaga <span>*</span></label>
                                    <input type="text" name="vaga" id="vaga" v-model="form.vaga" placeholder="Informe vaga" required>
                                </form>
                            </div>
    
                            <div class="modal-footer">
                                <button class="secondary-button" @click="showModal= false">
                                    Voltar
                                </button>
                                <button v-if="this.messageModal == 'Adicionar'" class="primary-button" @click="adicionarCandidato">
                                    Adicionar
                                </button>
                                <button v-else class="primary-button" @click="editarCandidato(form.id)">
                                    Salvar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- Fim Modal Form -->
        <!-- Modal Exlusão -->
        <transition name="modal">
            <div v-if="showModalExclusao" id="modal-confirm">
                <div class="modal-mask">
                    <div class="modal-wrapper">
                        <div class="modal-container">
                            <div class="modal-header exclusao">
                                <slot name="header">
                                    Deseja excluir o candidato?
                                </slot>
                                <FontAwesomeIcon icon="xmark" @click="showModalExclusao= false"/>
                            </div>
    
                            <div class="modal-footer">
                                <button class="secondary-button" @click="showModalExclusao= false">
                                    Não
                                </button>
                                <button class="delete-button" @click="deletarCandidato(form.id)">
                                    Sim
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- Fim Modal Exclusão -->
        <!-- Notificação -->
        <transition name="modal">
            <div v-if="Notificacao" class="notificacao" @click="Notificacao = false">
                <span>{{ MensagemNotificacao }}</span>
                <FontAwesomeIcon icon="xmark" @click="Notificacao = false"/>
            </div>
        </transition>
        <!-- Fim Notificação -->
        <!-- Rodapé -->
        <div class="rodape-dashboard">
            <span>Copyright © 2023</span>
            <span>v 1.0.0</span>
        </div>
        <!-- Fim Rodapé -->
    </div>
    <!-- Fim Dashboard -->
</template>

<script>
    import IconeUsuario from '@/components/icons/IconeUsuario.vue'
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
    import axios from 'axios'

export default {
    name: 'DashboardView',
    components: {
        IconeUsuario,
        FontAwesomeIcon,
    },
    data() {
        return {
            messageModal: "",
            menuLogout: false,
            showModal: false,
            showModalExclusao: false,
            Notificacao: false,
            MensagemNotificacao: "",
            data: [],
            candidatos: [],
            pages: [],
            form: {
                id: "",
                nome: "",
                vaga: ""
            },
            current_page: 1,
        }
    },
    methods:{
        abrirModal(funcao){
            this.messageModal = funcao
            if(funcao == "Adicionar"){
                this.showModal= true
                this.form.id = ''
                this.form.nome = ''
                this.form.vaga = ''
            }
        },
        adicionarCandidato(){
            let cand_id = this.candidatos != '' ? this.candidatos[this.candidatos.length - 1].id : 0
            let dados = {
                id: cand_id + 1,
                first_name: this.form.nome,
                vaga: this.form.vaga,
            }
            this.data.total ++
            this.candidatos.push(dados)
            this.showModal= false
            this.MensagemNotificacao = "Cadastro realizado com sucesso!"
            this.Notificacao = true
        },
        getCandidato(candidato_id){
            let dados = this.candidatos
            if(candidato_id !== undefined){
                let candidato = dados.find((user) => user.id === candidato_id);
                this.form.id = candidato_id
                this.form.nome = candidato.first_name + (candidato.last_name ? ' ' + candidato.last_name : '')
                this.form.vaga = candidato.vaga ? candidato.vaga : ""
                this.messageModal = "Editar"
                this.showModal = true
            }
        },
        editarCandidato(candidato_id){
            let index_candidato = this.candidatos.findIndex((user) => user.id === candidato_id);
            this.candidatos[index_candidato].first_name = ""
            this.candidatos[index_candidato].last_name = ""
            this.candidatos[index_candidato].first_name = this.form.nome
            this.candidatos[index_candidato].vaga = this.form.vaga
            this.showModal = false
            this.MensagemNotificacao = "Edição realizada com sucesso!"
            this.Notificacao = true
        },
        deletarCandidato(candidato_id){
            let index_candidato = this.candidatos.findIndex((user) => user.id === candidato_id);
            this.data.total--
            this.candidatos.splice(index_candidato, 1)
            this.showModalExclusao = false
            this.MensagemNotificacao = "Exclusão realizada com sucesso!"
            this.Notificacao = true
        },
        pagination() {
            this.pages = Math.ceil(this.data.total / this.data.per_page)
        },
        ajax(page) {
            axios
            .get('https://reqres.in/api/users?page=' + page)
            .then(response => {
                this.data = response.data;
                this.candidatos = response.data.data;
                this.pagination();
            })
            .catch(error => {
                console.log(error);
            })
        },
        navigate(page) {
            this.ajax(page);
            this.current_page = page
        },
        logout(){
            localStorage.setItem('auth', '')
            this.$router.push('login')
        }
    },
    mounted(){
        axios
        .get('https://reqres.in/api/users')
        .then(response => {
            this.data = response.data;
            this.candidatos = response.data.data;
            this.pagination();
        })
        .catch(error => {
            console.log(error);
        })
    }
}
</script>

<style lang="scss">
    .dashboard{
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        justify-content: space-between;
        background-color: #E5E5E5;
        width: 100%;
    }
    .infos{
        display: flex;
        justify-content: space-between;
        color: #626262;
        background-color: #fff;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        padding: 10px 20px;
    }
    .infos .pagina, .user{
        display: flex;
        align-items: center;
    }
    h1{
        color: #0067A5;
        font-weight: 700;
        font-size: 22px;
        line-height: 30px;
    }
    h2{
        font-size: 15px;
        margin-left: 5px;
        font-weight: 300;
        text-align: left;
    }
    .user{
        position: relative;
        .b-down{
            display: block;
            font-size: 9px;
            margin: 0 15px 0 5px;
            font-weight: 600;
            cursor: pointer;
        }
        .logout{
            position: absolute;
            top: 50px;
            padding: 10px 20px;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
            cursor: pointer;
        }
    }
    .adicionar{
        display: flex;
        justify-content: flex-start;
        background-color: #F5F8F9;
        padding: 15px 20px;
        button{
            background: transparent;
            border: none;
            color: #0067A5;
            font-size: 20px;
            font-weight: 700;
            line-height: 27px;
            letter-spacing: 0em;
            padding: 0;
            cursor: pointer;
        }
    }
    .container{
        padding: 25px;
        .content{
            background-color: #fff;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
            border-radius: 6px;
            padding: 15px;
            .table-list{
                width: 100%;
                border-collapse: collapse;
                tr{
                    border-bottom: 1px solid #D9D9D9;
                }
                th, td{
                    padding: 10px 0;
                    text-align: left;
                    min-width: 30px;
                }
                tr td:nth-child(2){
                    display: flex;
                    align-items: center;
                }
                th{
                    color: var(--primary-color);
                }
                img{
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    margin-right: 5px;
                }
                svg{
                    color: #878787;
                    cursor: pointer;
                }
                .b-delete{
                    margin-left: 10px;
                }
            }
        }
        .no-content{
            background-color: #fff;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
            border-radius: 6px;
            padding: 30px 15px;
            svg{
                color: rgba(0, 0, 0, 0.15);
                font-size: 60px;
            }
            p{
                margin-bottom: 0;
            }
            span{
                font-weight: bold;
                color: var(--primary-color);
            }
        }
    }
    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
        display: table;
    }
    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }
    .modal-container {
        width: 300px;
        margin: 0px auto;
        background-color: #fff;
        border-radius: 7px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
        font-family: Helvetica, Arial, sans-serif;
    }
    .modal-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: bold;
        padding: 15px;
        background-color: #0067A5;
        border-radius: 6px 6px 0px 0px;
        color: #FFF;
        text-align: left;
        svg{
            cursor: pointer;
        }
        &.exclusao{
            background-color: #b81515;
        }
    }
    .modal-body {
        padding: 20px;
    }
    .modal-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
    }
    .modal-default-button {
        display: block;
        margin-top: 1rem;
    }
    .modal-enter-active,
    .modal-leave-active {
        transition: opacity 0.5s ease;
    }
    .modal-enter-from,
    .modal-leave-to {
        opacity: 0;
    }
    form{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        text-align: left;
        label{
            font-size: 13px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        span{
            color: red;
        }
        input{
            padding: 10px;
            border: none;
            border-bottom: 1px solid rgba(0, 0, 0, 0.25);
            margin-bottom: 20px;
        }
    }
    .notificacao{
        background-color: var(--sucess-color);
        width: max-content;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        position: absolute;
        z-index: 9999;
        right: 0;
        top: 20%;
        color: #fff;
        svg{
            color: #fff;
            margin-left: 20px;
            cursor: pointer;
        }
    }
    .pagination{
        display: flex;
        flex-wrap: nowrap;
        flex-direction: row;
        justify-content: flex-end;
        font-size: 12px;
        color: #949494;
        span{
            display: flex;
            align-items: center;
            padding: 5px;
            margin-right: 5px;
        }
        ul{
            display: flex;
            padding: 0;
            li{
                display: flex;
                align-items: center;
                list-style: none;
                margin: 0 5px;
                cursor: pointer;
                a{
                    padding: 5px 10px;
                    transition: all ease .3s;
                    &.is-current{
                        background-color: var(--primary-color);
                        color: #fff;
                        border-radius: 2px;
                    }
                }
            }
        }
    }
    .rodape-dashboard{
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #F7F8FA;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
        font-size: 14px;
        color: rgba(98, 98, 98, 0.8);
        padding: 10px 25px;
    }
    @media (max-width: 1400px) {
        .dashboard{
            .topo-dashboard{
                .infos{
                    padding: 5px 20px;
                    h1{
                        font-size: 16px;
                    }
                    h2{
                        font-size: 12px;
                    }
                }
                .user{
                    font-size: 12px;
                }
                .adicionar{
                    padding: 10px 20px;
                    button{
                        font-size: 16px;
                    }
                }
            }
            .container{
                padding: 5px;
                .content{
                    padding: 5px 15px;
                    .table-list{
                        td, th{
                            font-size: 14px;
                        }
                    }
                    .pagination{
                        a{
                            padding: 2px 6px;
                        }
                    }
                }
            }
            .rodape-dashboard{
                font-size: 12px;
            }
        }
    }
    @media (max-width: 768px) {
        .dashboard{
            .topo-dashboard{
                .infos{
                    .pagina{
                        justify-content: flex-start;
                        flex-wrap: wrap;
                        flex-direction: column;
                        align-items: flex-start;
                        h1, h2{
                            margin: 2px;
                        }
                    }
                }
                .adicionar{
                    button{
                        font-size: 14px;
                    }
                }
            }
            .container{
                .content{
                    .table-list{
                        th:nth-child(3),td:nth-child(3){
                            display: none;
                        }
                        td, th{
                            font-size: 13px;
                        }
                    }
                }
            }
        }
    }
</style>