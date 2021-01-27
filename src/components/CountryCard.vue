<template>
  <article
    class="card | bg-primary cl-base shadow-lg"
    @click="$emit('click', { name, alpha3Code })"
  >
    <div class="card_image">
      <img :src="flag" :alt="'flag ' + name" />
    </div>

    <div class="card_content inner-flow">
      <h4>{{ name }}</h4>
      <ul>
        <li>
          <strong>Population:</strong>
          {{ population }}
        </li>
        <li>
          <strong>Region:</strong>
          {{ region }}
        </li>
        <li>
          <strong>Capital:</strong>
          {{ capital }}
        </li>
      </ul>
    </div>
  </article>
</template>

<script>
export default {
  name: 'CountryCard',
  props: {
    flag: String,
    name: String,
    population: Number,
    region: String,
    capital: String,
    alpha3Code: String,
  },
};
</script>
