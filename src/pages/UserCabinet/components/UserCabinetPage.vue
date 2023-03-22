<template>
  <v-container>
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