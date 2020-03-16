<template>
  <div>
    <swiper :options="swiperOptions">
      <swiperSlide v-for="photo in photos" :key="photo.id">
        <i class="fas fa-check-square has-text-white default-check" v-if="photo.default"></i>
        <img :src="photo.url" @click="openMenu(photo)" />
      </swiperSlide>    
 
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
 
    <b-field class="file is-centered">
      <b-upload v-model="photoToUpload">
        <a class="button is-primary">
          <b-icon icon="camera" pack="fas" size="is-small"></b-icon>
          <span>Adicionar nova foto</span>
        </a>
      </b-upload>
    </b-field>
 
    <b-modal :active="isMenuActive" :width="640" class="photo-menu" scroll="keep" @close="closeMenu()">
      <div class="card">
        <div class="card-content">
          <div class="content">
            <a @click="setAsDefault()">Marcar como padrão</a>
            <hr />
            <a @click="remove()">Remover</a>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>
 
 
<style lang="scss">
  i.default-check {
    position: absolute;
    font-size: 1.4rem;
    margin-top: 2%;
    margin-left: 2%;
  }
</style>
 
 
 
<script>
 
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import PhotoService from '../services/photo_service';
 
export default {
  components: {
    swiper,
    swiperSlide
  },
 
  data(){
    return {
      photos: [],
      currentPhoto: {},
      isMenuActive: false,
      photoToUpload: null,
      swiperOptions: {
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  },
 
  mounted() {
    PhotoService.load().then(photos => {
      this.photos = photos
    });
  },
  watch: {
    photoToUpload(newValue) {
      if(newValue) {
        PhotoService.add(newValue).then(photo => {
          this.photos.push(photo);
        });
      }
    }
  },
 
  methods: {
    openMenu(photo) {
      this.isMenuActive = true;
      this.currentPhoto = photo;
    },
 
    closeMenu() {
      this.isMenuActive = false
    },
 
    setAsDefault() {
      PhotoService.setAsDefault(this.currentPhoto).then(() => {
        let default_photo = this.photos.find(photo => { return photo.default });
        if(default_photo) default_photo.default = false;
        this.currentPhoto.default = true;
        this.closeMenu();
      });
    },
 
    remove() {
      PhotoService.remove(this.currentPhoto).then(() => {
        let indexToRemove = this.photos.indexOf(this.currentPhoto);
        this.photos.splice(indexToRemove, 1);
        this.closeMenu();
      });
    },
  }
}
</script>