<template>
  <div class="mt-5">
    <UserCabinetMain />
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import UserCabinetMain from '@/modules/UserCabinet/components/UserCabinetMain.vue';

export default defineComponent({
  components: {UserCabinetMain}
})
</script>