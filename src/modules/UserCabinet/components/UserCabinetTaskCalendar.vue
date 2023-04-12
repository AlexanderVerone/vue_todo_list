<template>
  <v-sheet
    rounded
  >
    <VDatePicker
      is-dark
      expanded
      transparent
      borderless
      :attributes="calendarAttributes"
    />
  </v-sheet>
</template>

<script setup lang="ts">
import {computed, PropType} from 'vue';
import {Todo} from '@/modules/UserCabinet/interfaces/todos.interface';

const props = defineProps({
  todos: {
    type: Array as PropType<Todo[]>,
    required: true
  }
})

const calendarAttributes = computed(() => [
  ...props.todos.map(todo => ({
    dates: new Date(todo.deadline*1000),
    dot: {
      color: todo.isDone? 'green' : 'purple',
      class: todo.isDone ? 'opacity-75': ''
    },
    popover: {
      label: todo.description
    }
  }))
])
</script>