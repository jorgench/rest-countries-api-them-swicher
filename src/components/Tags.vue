<template>
  <div class="group">
    <strong v-if="title">{{ title }}</strong>
    <div
      v-for="(tag, j) in tags"
      :key="j"
      class="tag | bg-primary cl-base shadow-sm"
      @click="select(tag)"
    >
      {{ tag.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tags',
  props: {
    title: {
      type: String,
      default: '',
    },
    tags: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    select(tag) {
      this.$emit('select', tag);
    },
  },
};
</script>

<style></style>
