<script></script>

<template>
  <!-- Root app wrapper with Nuxt UI integration -->
  <UApp class="font-sans">
    <!-- Accessibility: announces route changes to screen readers -->
    <NuxtRouteAnnouncer />
    <!-- Layout system: provides consistent structure across pages -->
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
