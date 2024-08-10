<template>
  <div>
    <TabContainer :tabs="tabs" />
  </div>
</template>

<script>
import TabContainer from './components/TabContainer.vue';
import TableOne from './components/TableOne.vue';
import TableTwo from './components/TableTwo.vue';

export default {
  components: {
    TabContainer,
    TableOne,
    TableTwo,
  },
  data() {
    return {
      tabs: [
        { name: 'Table 1', component: TableOne },
        { name: 'Table 2', component: TableTwo },
      ],
    };
  },
};
</script>

<style>

</style>
