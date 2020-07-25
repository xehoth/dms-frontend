<template>
  <div>手册</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import VueMarkdown from "vue-markdown";

@Component({
  components: {
    VueMarkdown,
  },
})
export default class Manual extends Vue {
  created() {
    console.log(localStorage.getItem("student"));
  }
}
</script>