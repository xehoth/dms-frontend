<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class App extends Vue {
  mounted() {
    window.onbeforeunload = function(e: any) {
      const storage = window.localStorage;
      storage.clear();
    };
  }
}
</script>

<style>
body {
  margin: 0;
}
</style>
