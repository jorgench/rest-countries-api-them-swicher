<template>
  <div class="page flow">
    <div class="wrapper field">
      <div class="input-container | has-icon | bg-primary cl-base shadow-lg">
        <s-icon name="search" />
        <input type="text" v-model="queryCountry" placeholder="Search for a country..." />
      </div>

      <div id="dropdown-select">
        <dropdown :options="regions" @change="changeRegion" />
      </div>
    </div>
    <div class="wrapper">
      <div class="grid">
        <template v-if="!loading && countries.length > 0">
          <div
            class="grid__item"
            v-for="(country, i) in countries"
            :key="i"
            role="button"
            aria-hidden="true"
          >
            <country-card
              v-bind="country"
              tabindex="0"
              role="button"
              aria-pressed="false"
              @click="openDetail"
            />
          </div>
        </template>
        <template v-else>
          <div class="grid__item" v-if="loading"></div>
          <div class="grid__item full">No Net</div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import CountryCard from '@/components/CountryCard';
import Dropdown from '@/components/Dropdown';

export default {
  name: 'Home',
  components: {
    CountryCard,
    Dropdown,
  },
  data() {
    return {
      loading: false,
      queryCountry: '',
      queryRegion: '',
      regions: [
        { label: 'Africa', key: 'Africa' },
        { label: 'America', key: 'Americas' },
        { label: 'Asia', key: 'Asia' },
        { label: 'Europe', key: 'Europe' },
        { label: 'Oceania', key: 'Oceana' },
      ],
    };
  },
  computed: {
    countries() {
      return this.$store.getters.getCountries({
        query: this.queryCountry,
        region: this.queryRegion,
      });
    },
  },
  methods: {
    openDetail(a) {
      const nameCountry = a.alpha3Code.toLowerCase();
      this.$router.push({ name: 'Detail', params: { code: nameCountry } });
    },
    changeRegion(a) {
      this.queryRegion = a;
    },
  },
  created() {
    this.$store.dispatch('getCountries');
  },
};
</script>
