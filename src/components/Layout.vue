<template>
  <v-app>
    <v-theme-provider theme="dark" with-background>
      <v-main>
        <v-container>
          <slot />
        </v-container>
      </v-main>
    </v-theme-provider>
  </v-app>
</template>