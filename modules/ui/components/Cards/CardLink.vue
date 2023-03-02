<template>
  <div
    class="card-item"
    :class="{ disabled: tag }"
  >
    <nuxt-link
      class="card-link"
      :to="url"
    >
      <div class="card-header">
        <div class="title-card">
          {{ title }} <span
            v-if="tag"
            class="notAvailable"
          >{{ $t('notAvailable') }}</span>
        </div>
        <img
          class="arrow-item"
          src="@UI/assets/img/arrow-right.svg"
        >
      </div>
      <div class="card-text-item">
        {{ description }}
      </div>
    </nuxt-link>
  </div>
</template>
<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    default: () => {
      return '';
    },
  },
  description: {
    type: String,
    default: () => {
      return '';
    },
  },
  url: {
    type: String,
    default: () => {
      return '';
    },
  },
  tag: {
    type: Boolean,
    default: () => {
      return false;
    },
  },
});
</script>
<style lang="scss" scoped>
@import '@UI/assets/scss/variable';

.card-item {
  height: 100%;

  .card-link {
    display: flex;
    overflow: hidden;
    height: 100%;
    flex-direction: column;
    @media only screen and (max-width: 767px) {
      padding: 15px;
    }
    @media only screen and (min-width: 768px) {
      padding: 35px 25px;
    }

    border: none;
    background-color: $bgWhite;

    .card-header {
      display: flex;
      align-items: flex-end;

      .arrow-item {
        @media only screen and (max-width: 767px) {
          width: 15px;
        }
        @media only screen and (min-width: 768px) {
          width: 20px;
        }
      }

      .title-card {
        @media only screen and (max-width: 767px) {
          font-size: 20px;
        }
        @media only screen and (min-width: 768px) {
          font-size: 24px;
        }

        line-height: 1.21;
        text-align: left;
        word-break: break-word;
      }

      img {
        margin-left: auto;
      }
    }

    .card-text-item {
      margin: 10px 25px 0 0;
      color: $greyText;
      font-size: 16px;
      @media only screen and (max-width: 767px) {
        font-size: 14px;
      }
      @media only screen and (min-width: 768px) {
        font-size: 16px;
      }

      line-height: 1.19;
      text-align: left;
    }

    .notAvailable {
      display: inline-block;
      padding: 6px 10px;
      border-radius: 20px;
      margin-top: -4px;
      margin-left: 10px;
      background-color: $errorColor;
      color: $bgWhite;
      font-size: 10px;
      font-stretch: normal;
      font-style: normal;
      font-weight: bold;
      letter-spacing: normal;
      line-height: normal;
      text-align: left;
      text-transform: uppercase;
      vertical-align: middle;
    }
  }

  :hover {
    background-color: $blueLight;
    transition: all 0.3s;
  }

  &.disabled {
    opacity: 0.5;
    pointer-events: none;
  }
}
</style>
