<template>
  <div class="dropdown | bg-primary shadow-lg" :data-active="state">
    <div
      class="dropdown_trigger"
      @click="openDropdown"
      role="button"
      aria-pressed="false"
      ref="trigger"
    >
      <span>{{ messageComputed }}</span>
      <s-icon name="arrow-down" />
    </div>

    <div class="dropdown_content" ref="dropdown">
      <div class="card | bg-primary cl-base shadow-sm">
        <div class="card_list">
          <ul>
            <li
              v-for="(option, j) in optionsComputed"
              role="button"
              aria-pressed="false"
              @click.prevent="openItem(option)"
              :key="j"
            >{{ option[labelKey] }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dropdown',
  props: {
    placeholder: {
      type: String,
      default: 'Filter By Region',
    },
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    labelKey: {
      type: String,
      default: 'label',
    },
    valueKey: {
      type: String,
      default: 'key',
    },
  },
  data() {
    return {
      message: this.placeholder,
      finalValue: {},
      state: false,
    };
  },

  computed: {
    evalue() {
      return Object.entries(this.finalValue).length > 0;
    },

    optionsComputed() {
      if (this.evalue) {
        let otherItems = this.options.filter(a => {
          return a[this.valueKey] != this.finalValue[this.valueKey];
        });

        otherItems.unshift({});

        otherItems[0][this.valueKey] = '';
        otherItems[0][this.labelKey] = 'All';

        return otherItems;
      } else {
        return this.options;
      }
    },
    messageComputed() {
      return this.evalue ? this.finalValue[this.labelKey] : this.message;
    },
  },

  methods: {
    openDropdown() {
      this.state = !this.state;
    },
    openItem(item) {
      this.$emit('change', item[this.valueKey]);
      this.finalValue = item[this.valueKey] ? item : {};
      this.state = false;
    },
    clickedOutside(event) {
      if (!this.isElementInside(event.target)) this.state = false;
    },
    closeDropdown(event) {
      if (event.key === 'Escape' && this.state) {
        this.state = false;
      }
    },
    isElementInside(el) {
      if (el === this.$refs.trigger) return true;
      if (el.classList.contains('dropdown-item')) return false;

      if (this.$refs.dropdown !== undefined) {
        const children = this.$refs.dropdown.querySelectorAll('*');
        for (const child of children) {
          if (el === child) {
            return true;
          }
        }
      }

      if (this.$refs.trigger !== undefined) {
        const children = this.$refs.trigger.querySelectorAll('*');
        for (const child of children) {
          if (el === child) {
            return true;
          }
        }
      }
      return false;
    },
  },
  mounted() {
    if (typeof window !== 'undefined') {
      let clickHandler =
        'ontouchstart' in document.documentElement ? 'touchstart' : 'click';
      document.addEventListener(clickHandler, this.clickedOutside);
      document.addEventListener('keydown', this.closeDropdown);
    }
  },
  beforeDestroy() {
    if (typeof window !== 'undefined') {
      let clickHandler =
        'ontouchstart' in document.documentElement ? 'touchstart' : 'click';

      document.removeEventListener(clickHandler, this.clickedOutside);
      document.removeEventListener('keydown', this.closeDropdown);
    }
  },
};
</script>
