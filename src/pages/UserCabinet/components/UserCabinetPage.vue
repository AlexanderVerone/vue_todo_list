<template>
  <div class="mt-5">
    <UserCabinet />
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import { UserCabinet } from '@/modules/UserCabinet/';

export default defineComponent({
  components: {UserCabinet}
})
</script>