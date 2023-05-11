<template>
  <v-container class="authorization">
    <Authorization />
  </v-container>
</template>

<script>
import {defineComponent} from 'vue';
import {Authorization} from '@/modules/Authorization';

export default defineComponent({
  components: {Authorization}
})
</script>

<style scoped>
.authorization {
    width: 500px;
    height: 70vh;
    display: flex;
    place-items: center;
}
</style>