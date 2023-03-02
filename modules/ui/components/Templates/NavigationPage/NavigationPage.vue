<template>
  <div>
    <UiNavigationBackButton
      v-if="backUrl != ''"
      :url="backUrl"
    />
    <div class="page-title title-module">
      {{ title }}
    </div>
    <div class="description-page">
      {{ description }}
    </div>
    <a-row
      type="flex"
      :gutter="[30, { xs: 15, sm: 15, md: 30, lg: 30 }]"
    >
      <template v-for="(card, index) in dataCards">
        <a-col
          v-if="card.show == false ? card.show : true"
          :key="index"
          :disabled="card.disabled ? card.disabled : false"
          :span="24"
          :md="12"
          :lg="8"
        >
          <LazyUiCardsCardLink
            :id="card.id ? card.id : ''"
            :url="card.url ? card.url : ''"
            :title="card.title ? card.title : ''"
            :description="card.description ? card.description : ''"
            :tag="card.tag ? card.tag : false"
          />
        </a-col>
      </template>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  dataCards: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  backUrl: {
    type: String,
    required: true,
  },
});
</script>
