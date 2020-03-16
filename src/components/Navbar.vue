<template>
  <div>
    <div class="columns is-mobile" v-if="loggedIn">
      <NavbarItem path="/profile" icon="user" />
      <NavbarItem path="/" icon="fire" />
      <NavbarItem path="/chats" icon="comments" />
    </div>
    <nav class="navbar" role="navigation" aria-label="main navigation" v-else>
      <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io">
          <h1 class="has-text-white title">OnebitTinder</h1>
        </a>
      </div>
    </nav>
  </div>
</template>
 
<style lang="scss" scoped>
  nav, div.columns {
    background-color: #FF6666;
  }
</style>
 
<script>
 
import store from '../store';
import NavbarItem from './NavbarItem';
 
export default {
  components: {
    NavbarItem
  },
 
  computed: {
    loggedIn() {
      return store.getters['isLoggedIn']
    }
  }
}
</script>