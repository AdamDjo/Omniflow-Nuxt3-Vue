<template>
  <div class="review-wrapper">
    <h1 class="titlePage">
      {{ $t('HOME.WELCOME') }}
    </h1>
    <div class="subTextPage">
      {{ $t('HOME.DESCRIPTION') }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@UI/assets/scss/variable';

.titlePage {
  color: $colorTitle;
  font-family: $sfBold;
  @media only screen and (max-width: 767px) {
    font-size: 22px;
  }
  @media only screen and (min-width: 768px) {
    font-size: 40px;
  }

  font-stretch: normal;
  font-style: normal;
  font-weight: bold;
  letter-spacing: normal;
  text-align: left;
}

.subTextPage {
  margin-bottom: 40px;
  color: $blackColor;
  font-family: $sfRegular;
  @media only screen and (max-width: 767px) {
    margin-top: -10px;
    font-size: 14px;
  }
  @media only screen and (min-width: 768px) {
    margin-top: -20px;
    font-size: 20px;
  }

  font-stretch: normal;
  font-style: normal;
  font-weight: 500;
  letter-spacing: normal;
  text-align: left;
}
</style>
