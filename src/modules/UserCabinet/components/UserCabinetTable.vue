<template>
  <v-table
    theme="dark"
    fixed-header
    fixed-footer
  >
    <thead>
      <tr>
        <td />
        <td>Задача</td>
        <td>Срок выполнения</td>
        <td />
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <v-checkbox />
        </td>
        <td>2</td>
        <td>До 15.05.2023</td>
        <td>
          <v-tooltip
            text="Удалить задачу"
            location="end"
            theme="white"
          >
            <template #activator="{props}">
              <v-btn
                v-bind="props"
                density="compact"
                size="large"
                variant="text"
                color="red"
                icon="mdi-delete-outline"
              />
            </template>
          </v-tooltip>
        </td>
      </tr>
    </tbody>
    <tfoot>
      <v-tooltip
        text="Добавить задачу"
        location="bottom"
        theme="white"
      >
        <template #activator="{props}">
          <v-btn
            v-bind="props"
            density="compact"
            size="large"
            variant="text"
            color="green"
            icon="mdi-plus-circle-outline"
          />
        </template>
      </v-tooltip>
    </tfoot>
  </v-table>
</template>

<script lang="ts" setup></script>