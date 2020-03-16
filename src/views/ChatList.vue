<template>
  <div class="columns">
    <div class="column is-full">
      <h1 class="subtitle has-text-centered">Chats</h1>
      <swiper :options="swiperOptions" v-if="chats.length > 0">
        <swiperSlide v-for="chat in chats" :key="chat.id">
          <img :src="chat.matchee_photo_url" @click="openMenu(chat, 'chats')" />
        </swiperSlide>    
 
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
 
      <p class="has-text-centered" v-else>Não há nenhum Chat iniciado</p>
    </div>
 
    <br /><br />
 
    <div class="column is-full">
      <h1 class="subtitle has-text-centered">Matches</h1>
      <swiper :options="swiperOptions" v-if="matches.length > 0">
        <swiperSlide v-for="match in matches" :key="match.id">
          <img :src="match.matchee_photo_url" @click="openMenu(match, 'matches')" />
        </swiperSlide>    
 
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
 
      <p class="has-text-centered" v-else>Não há nenhum Match</p>
    </div>
 
    <b-modal :active="isMenuActive" :width="640" scroll="keep" @close="closeMenu()">
      <div class="card">
        <div class="card-content">
          <div class="content">
            <div v-if="currentItem.type == 'matches'">
              <a @click="startChat()">Iniciar chat</a>
              <hr />
            </div>
            <div v-if="currentItem.type == 'chats'">
              <a @click="startChat()">Ir para Chat</a>
              <hr />
            </div>
            <a @click="unmatch()">Desfazer Match</a>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>
 
<style lang="scss">
  div.rounded-item {
    width: 40%;
    margin: 5%;
    display: inline-block;
    text-align: center;
    
    img {
      width: 80%;
      height: 5rem;
      border-radius: 50%;
    }
  }
 
  .slide {
    padding-left: 3rem;
    padding-right: 3rem;
 
    &:before {
      left: 0;
      top: 0;
      width: 100%;
    }
  }
</style>
 
 
<script>
 
  import { swiper, swiperSlide } from 'vue-awesome-swiper';
  import MatchService from '../services/match_service';
  import ChatService from '../services/chat_service';
 
  export default {
    components: {
      swiper,
      swiperSlide
    },
 
    data() {
      return {
        chats: [],
        matches: [],
        isMenuActive: false,
        currentItem: {},
        swiperOptions: {
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        }
      }
    },
 
    mounted() {
      this.loadMatches();
      this.loadChats();
    },
 
    methods: {
      openMenu(item, type) {
        this.isMenuActive = true;
        this.currentItem = item;
        this.currentItem.type = type;
      },
 
      closeMenu() {
        this.isMenuActive = false
      },
 
      loadMatches() {
        MatchService.loadMyMatches().then(matches => {
          this.matches = matches;
        })
      },
 
      loadChats() {
        ChatService.load().then(chats => {
          this.chats = chats;
        })
      },
      unmatch() {
        MatchService.unmatch(this.currentItem).then(() => {
          let type = this.currentItem.type
          let indexToRemove = this[type].indexOf(this.currentItem);
          this[type].splice(indexToRemove, 1);
          this.closeMenu();
        });
      }
    }
  }
</script>