<template>
  <div class="page flow">
    <div class="wrapper">
      <button class="button | has-icon border | bg-primary cl-base shadow-sm" @click="backView">
        <s-icon name="arrow-right" />
        <span>Back</span>
      </button>
    </div>

    <div class="wrapper">
      <div class="detail">
        <div class="detail_image">
          <img :src="detail.flag" :alt="'flag of ' + detail.name" />
        </div>

        <div class="detail_content | variant-flow">
          <h3 class="title">{{ detail.name }}</h3>

          <div class="text">
            <div>
              <p>
                <strong>Native Name:</strong>
                {{ detail.nativeName }}
              </p>
              <p>
                <strong>Population:</strong>
                {{ detail.population }}
              </p>
              <p>
                <strong>Region:</strong>
                {{ detail.region }}
              </p>
              <p>
                <strong>Sub Region:</strong>
                {{ detail.subregion }}
              </p>
              <p>
                <strong>Capital:</strong>
                {{ detail.capital }}
              </p>
            </div>
            <div>
              <p v-if="detail.topLevelDomain.length > 0">
                <strong>Top Level Domain:</strong>
                {{ detail.topLevelDomain[0] }}
              </p>
              <p v-if="detail.currencies.length > 0">
                <strong>Currencies:</strong>
                {{ detail.currencies[0].name }}
              </p>

              <p v-if="detail.languages.length > 0">
                <strong>Languages:</strong>
                {{ detail.languages.map(a => a.name).join() }}
              </p>
            </div>
          </div>

          <div class="footer" v-if="detail.borders.length">
            <tags title="Border Countries:" :tags="detail.borders" @select="changeDetail" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tags from '@/components/Tags';

export default {
  name: 'Detail',
  components: {
    Tags,
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    detail() {
      return this.$store.getters.getDetail(this.$route.params.code);
    },
  },
  methods: {
    backView() {
      this.$router.go(-1);
    },
    changeDetail(a) {
      const nameCountry = a.alpha3Code.toLowerCase();
      this.$router.push({ name: 'Detail', params: { code: nameCountry } });
    },
  },
  mounted() {
    this.$store.dispatch('getCountries');
  },
};
</script>
