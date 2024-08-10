<template>
  <div>
    <table>
      <thead>
        <tr>
          <th v-for="header in headers" :key="header">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="item.id">
          <td>{{ item.name }}</td>
          <td contenteditable="true"
            @keydown="(event) => handleEnterKey(event, index, 'costMeNoNDC')"
            @blur="(event) => handleBlur(event, index, 'costMeNoNDC')">
            {{ item.costMeNoNDC }}</td>
          <td contenteditable="true"
            @keydown="(event) => handleEnterKey(event, index, 'costMeNDC')"
            @blur="(event) => handleBlur(event, index, 'costMeNDC')">
            {{ item.costMeNDC }}</td>

          <td contenteditable="true"
            @keydown="(event) => handleEnterKey(event, index, 'comission')"
            @blur="(event) => handleBlur(event, index, 'comission')">
            {{ item.comission }}%</td>

          <td contenteditable="true"
            @keydown="(event) => handleEnterKey(event, index, 'price')"
            @blur="(event) => handleBlur(event, index, 'price')">
            {{ item.price }}</td>

          <td contenteditable="true"
            @keydown="(event) => handleEnterKey(event, index, 'myCost')"
            @blur="(event) => handleBlur(event, index, 'myCost')">
            {{ item.myCost }}</td>

          <td contenteditable="true"
            @keydown="(event) => handleEnterKey(event, index, 'ammount')"
            @blur="(event) => handleBlur(event, index, 'ammount')">{{ item.ammount }}</td>

          <td contenteditable="true"
            @keydown="(event) => handleEnterKey(event, index, 'costMeAmmount')"
            @blur="(event) => handleBlur(event, index, 'costMeAmmount')">
            {{ item.costMeAmmount }}</td>

          <td contenteditable="true"
            @keydown="(event) => handleEnterKey(event, index, 'RRCwithNDS')"
            @blur="(event) => handleBlur(event, index, 'RRCwithNDS')">
            {{ item.RRCwithNDS }}</td>

          <td contenteditable="true"
            @keydown="(event) => handleEnterKey(event, index, 'costAmmount')"
            @blur="(event) => handleBlur(event, index, 'costAmmount')">
            {{ item.costAmmount }}</td>
          <td contenteditable="true"
            @keydown="(event) => handleEnterKey(event, index, 'profit')"
            @blur="(event) => handleBlur(event, index, 'profit')">
            {{ item.profit }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, defineComponent, onMounted } from 'vue';

export default defineComponent({
  name: 'TableOne',
  setup() {
    const headers = ref([]);
    const items = ref([]);

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/data');
        const data = await response.json();
        headers.value = data.tables.headers;
        items.value = data.tables.tableOne.items;
      } catch (error) {
        console.error('Fetch ERROR', error);
      }
    };

    onMounted(() => {
      fetchData();
    });

    const handleBlur = (event, index, field) => {
      updateItem(event, index, field);
    };

    const handleEnterKey = (event, index, field) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        event.target.blur();
        updateItem(event, index, field);
      }
    };

    const updateItem = async (event, index, field) => {
      const target = event.target;
      const newValue = parseFloat(target.innerText.trim());

      if (!isNaN(newValue)) {
        items.value[index][field] = newValue;

        try {
          const itemToUpdate = {
            id: items.value[index].id,
            [field]: newValue,
          };
          await fetch('http://localhost:3000/data', {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(itemToUpdate),
          });
        } catch (error) {
          console.error('Failed to update item:', error);
        }
      } else {
        console.error(`Invalid value for ${field}`);
      }
    };
    return {
      headers,
      items,
      updateItem,
      handleEnterKey,
      handleBlur,
    };
  },
});
</script>

<style>
  table {
    border: solid 1px;
    border-collapse: collapse;
  }
  
  td,
  th {
    border: solid 1px rgb(184, 183, 183);
    border-collapse: collapse;
    padding: 8px;
  }
  
  td:nth-child(n+2) {
    text-align: center;
  }
  
  td:nth-child(n+1) {
    white-space: nowrap;
  }
  </style>