<template>
  <span class="icon">
    <svg class="svg-icon" preserverRatio="true">
      <use :xlink:href="iconName"></use>
    </svg>
  </span>
</template>

<script>
export default {
  name: 'SIcon',
  props: {
    name: {
      type: String,
      default: '',
    },
  },
  computed: {
    iconName() {
      return '/extra/sprites.svg#svg-' + this.name.toLowerCase();
    },
  },
};
</script>
