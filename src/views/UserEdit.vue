<template>
  <div>
    <UserPhoto />
    <div class="columns is-mobile is-multiline">
      <div class="column is-12">
        <form @submit.prevent="update()">
          <b-field label="Nome">
            <b-input v-model="account.name" />  
          </b-field>    
        
          <b-field label="Educação">
            <b-input v-model="account.college" />  
          </b-field>
 
          <b-field label="Empresa">
            <b-input v-model="account.company" />  
          </b-field>
 
          <b-field label="Descrição">
            <b-input type="textarea" v-model="account.description" />  
          </b-field>
 
          <input type="submit" class="button is-fullwidth has-text-white" value="Atualizar">
        </form>
      </div>
    </div>
  </div>
</template>
 
<style lang="scss" scoped>
  div.columns {
    padding-left: 1rem;
    padding-right: 1rem;
  }
 
  input[type="submit"] {
    background-color: #FF6666;
  }
</style>
 
 
<script>
  import { mapState } from 'vuex';
  import store from '../store';
  import router from '../router';
  import UserPhoto from '../components/UserPhoto';
  
  export default {
    components: {
      UserPhoto
    },
 
    computed: {
      ...mapState({
        account: state => state.Account.account
      })
    },
 
    watch: {
      account() {
        router.push("/profile");
      }
    },
 
    methods: {
      update() {
        store.dispatch("updateAccount", { name: this.account.name, college: this.account.college, 
                                          company: this.account.company, description: this.account.description })
      }
    }
  }
</script>