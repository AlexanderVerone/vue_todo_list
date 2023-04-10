<template>
  <v-container class="userCabinet">
    <UserCabinetMain />
  </v-container>
</template>

<script>
import {defineComponent} from 'vue';
import UserCabinetMain from '@/modules/UserCabinet/components/UserCabinetMain.vue';

export default defineComponent({
  components: {UserCabinetMain}
})
</script>

<style scoped>
.userCabinet {
  width: 100%;
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>