<template>
  <v-app>
    <v-theme-provider class="h-full" theme="dark" with-background>
      <v-main class="h-full">
        <v-container fluid class="h-full flex flex-col">
          <slot />
        </v-container>
      </v-main>
    </v-theme-provider>
  </v-app>
</template>