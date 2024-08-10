<template>
  <div class="container">
    <div class="tab-content">
      <component :is="tabs[activeTab].component" />
    </div>
    <div class="tabs">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        :class="{ active: activeTab === index }"
        @click="activeTab = index"
      >
        {{ tab.name }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tabs: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      activeTab: 0,
    };
  },
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.tab-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.tabs {
  display: flex;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #f1f1f1;
  border-top: 1px solid #ccc;
  z-index: 1000;
}

.tabs button {
  flex: 1;
  padding: 10px 20px;
  cursor: pointer;
  border: none;
  background: #f1f1f1;
  border-right: 1px solid #ccc;
  outline: none;
}

.tabs button:last-child {
  border-right: none;
}

.tabs button.active {
  background: #ccc;
}
</style>
