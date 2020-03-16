<template>
  <div :class="{ 'column': true, 'has-text-centered': true, 'is-one-third': true, 'is-active': isCurrentPath}">
    <router-link :to="path">
      <span class="icon is-medium">
        <i :class="['fas', 'fa-lg', `fa-${icon}`]"></i>
      </span>
    </router-link>
  </div>
</template>
 
<style lang="scss" scoped>
  div.column {
    padding-top: 1.4em;
    
    span i {
      color: white;
    }
 
    &.is-active {
      border-bottom: 2px #666666 solid;
      
      span i {
        color: yellow;
      } 
    }
  }
</style>
 
 
<script>
  export default {
    props: ['path', 'icon'],
    computed: {
      isCurrentPath: function (){
        return this.$route.path == this.path;
      }
    }
  }
</script>