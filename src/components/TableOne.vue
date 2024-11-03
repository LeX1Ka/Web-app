<template>
  <div>
    <table>
      <thead>
        <tr>
          <th v-for="header in headers" :key="header">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.name }}</td>
          <td contenteditable="true"
            @keydown="(event) => handleEnterKey(event, item.id, 'costMeNoNDC')"
            @blur="(event) => handleBlur(event, item.id, 'costMeNoNDC')">
            {{ item.costMeNoNDC }}</td>
          <td contenteditable="true"
            @keydown="(event) => handleEnterKey(event, item.id, 'costMeNDC')"
            @blur="(event) => handleBlur(event, item.id, 'costMeNDC')">
            {{ item.costMeNDC }}</td>
          <td contenteditable="true"
            @keydown="(event) => handleEnterKey(event, item.id, 'comission')"
            @blur="(event) => handleBlur(event, item.id, 'comission')">
            {{ item.comission }}%</td>
          <td contenteditable="true"
            @keydown="(event) => handleEnterKey(event, item.id, 'price')"
            @blur="(event) => handleBlur(event, item.id, 'price')">
            {{ item.price }}</td>
          <td contenteditable="true"
            @keydown="(event) => handleEnterKey(event, item.id, 'myCost')"
            @blur="(event) => handleBlur(event, item.id, 'myCost')">
            {{ item.myCost }}</td>
          <td contenteditable="true"
            @keydown="(event) => handleEnterKey(event, item.id, 'ammount')"
            @blur="(event) => handleBlur(event, item.id, 'ammount')">
            {{ item.ammount }}</td>
          <td contenteditable="true"
            @keydown="(event) => handleEnterKey(event, item.id, 'costMeAmmount')"
            @blur="(event) => handleBlur(event, item.id, 'costMeAmmount')">
            {{ item.costMeAmmount }}</td>
          <td contenteditable="true"
            @keydown="(event) => handleEnterKey(event, item.id, 'RRCwithNDS')"
            @blur="(event) => handleBlur(event, item.id, 'RRCwithNDS')">
            {{ item.RRCwithNDS }}</td>
          <td contenteditable="true"
            @keydown="(event) => handleEnterKey(event, item.id, 'costAmmount')"
            @blur="(event) => handleBlur(event, item.id, 'costAmmount')">
            {{ item.costAmmount }}</td>
          <td contenteditable="true"
            @keydown="(event) => handleEnterKey(event, item.id, 'profit')"
            @blur="(event) => handleBlur(event, item.id, 'profit')">
            {{ item.profit }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, defineComponent, onMounted } from 'vue';

export default defineComponent({
  name: 'tableOne',
  setup() {
    const headers = ref([]);
    const items = ref([]);
    const tableName = 'tableOne';

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/data');
        const data = await response.json();
        headers.value = data.tables.headers;
        items.value = data.tables[tableName].items;
      } catch (error) {
        console.error('Fetch ERROR', error);
      }
    };

    onMounted(() => {
      fetchData();
    });

    const handleBlur = (event, id, colName) => {
  updateItem(event, id, colName, 'tableOne');
};

const handleEnterKey = (event, id, colName) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    event.target.blur();
    updateItem(event, id, colName, 'tableOne');
  }
};


const updateItem = async (event, id, colName, tableName) => {
  const newValue = parseFloat(event.target.innerText.trim());

  if (!isNaN(newValue)) {
    const itemToUpdate = items.value.find(item => item.id === id);

    if (itemToUpdate) {
      itemToUpdate[colName] = newValue;

      try {
        const response = await fetch('http://localhost:3000/data', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tableName,
            id,
            [colName]: newValue,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const updatedItem = await response.json();
        console.log('Update successful:', updatedItem);
      } catch (error) {
        console.error('Failed to update item:', error);
      }
    } else {
      console.error(`Item with id ${id} not found`);
    }
  } else {
    console.error(`Invalid value for ${colName}`);
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
