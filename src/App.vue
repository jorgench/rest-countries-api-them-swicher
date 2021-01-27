<template>
  <div
    id="app"
    class="flow | bg-secondary cl-base"
    :data-mode="darkMode ? 'dark' : ''"
  >
    <top-bar />
    <router-view />
  </div>
</template>

<script>
import TopBar from '@/components/TopBar';

export default {
  name: 'App',
  components: {
    TopBar,
  },
  computed: {
    darkMode() {
      return this.$store.state.darkMode;
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';
</style>
