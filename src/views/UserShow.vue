<template>
  <div>
    <div>
      <swiper>
        <swiperSlide v-for="photo in currentUser.photos" :key="photo.url">
          <img :src="photo.url" >
        </swiperSlide>
      </swiper>
 
      <div class="columns is-mobile is-gapless is-centered action-buttons" v-if="isLoggedUser">
        <div class="column is-12">
          <router-link to="/profile/edit" class="button is-pulled-left is-info" >
            <i class="fas fa-edit"></i>
          </router-link>
        </div>
      </div>
 
      <div class="columns is-mobile is-gapless is-centered action-buttons" v-else>
        <div class="column is-12">
          <button class="button is-pulled-right" @click="backToPreviousPage()">
            <i class="fas fa-reply"></i>
          </button>
        </div>
      </div>
 
      <div class="columns is-mobile is-gapless is-multiline user-info">
        <div class="column is-8">
          <h5 class="is-size-3"><strong>{{ currentUser.name }}</strong></h5>
          <h5 class="is-size-5 has-text-grey">
            <strong><i class="fas fa-building"></i></strong>
            {{ currentUser.company }}
          </h5>
          <h5 class="is-size-5 has-text-grey">
            <strong><i class="fas fa-university"></i></strong>
            {{ currentUser.college }}
          </h5>
        </div>
        <div class="column is-4 distance" v-if="currentUser.distance">
          <h4 class="has-text-right is-size-6">
            <strong class="has-text-danger">{{ currentUser.distance }}km </strong>
            <i class="fas fa-map-marker-alt has-text-grey"></i>
          </h4>
        </div>
        <div class="column is-12 has-text-centered">
          <h5 class="is-size-6 has-text-grey description" v-if="currentUser.description">
            "{{ currentUser.description }}"
          </h5>
        </div>
      </div>
    </div>
  </div>
</template>
 
<style lang="scss" scoped>
  div.columns {
    padding-left: 1rem;
    padding-right: 1rem;
  }
 
  div.action-buttons {
    margin-top: -2rem;
    position: absolute;
    z-index: 999999;
    width: 100%;
 
    button, a {
      border-radius: 9999px;
      height: 3.5rem;
      width: 3.5rem;
    }
  }
 
  div.user-info {
    margin-top: 2rem;
  }
 
  div.distance {
    h4 {
      margin-top: 0.5rem;
    }
  }
 
  h5.description {
    margin-top: 2em;
  }
</style>
 
 
<script>
  import "swiper/dist/css/swiper.css";
  import { swiper, swiperSlide } from 'vue-awesome-swiper';
  import { mapState } from 'vuex';
  import router from '../router';
  import UserService from '../services/user_service';
 
  export default {
    components: {
      swiper,
      swiperSlide
    },
 
    props: ['user'],
 
    data() {
      return {
        currentUser: {},
        isLoggedUser: false
      }
    },
 
    computed: {
      ...mapState({
        account: state => state.Account.account
      })
    },
  
    mounted() {
      if(!this.user) { 
        this.loadLoggedUser();
      } else {
        this.currentUser = this.user;
      }
    },
    watch:{
      $route (){
        if(!this.user) { 
          this.loadLoggedUser();
        } else {
          this.currentUser = this.user;
        }
      }
    },
    methods: {
      loadLoggedUser() {
        UserService.load(this.account.id).then(user => {
          this.currentUser = user;
          this.isLoggedUser = true;
        });
      },
 
      backToPreviousPage() {
        router.go(-1);
      }
    }
  }
</script>