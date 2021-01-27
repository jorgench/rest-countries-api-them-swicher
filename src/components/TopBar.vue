<template>
  <section class="bg-primary cl-base shadow-sm">
    <div class="topbar | wrapper">
      <header class="topbar_header">
        <h4 class="title">Where in the world?</h4>
      </header>
      <button
        class="button | has-icon | cl-base bg-primary"
        @click="changeState"
      >
        <s-icon :name="moonstate" />
        <span>Dark Mode</span>
      </button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'TopBar',

  computed: {
    moonstate() {
      return this.$store.state.darkMode ? 'moon-on' : 'moon-off';
    },
  },

  methods: {
    changeState() {
      this.$store.commit('changeMode');
    },
  },
};
</script>
