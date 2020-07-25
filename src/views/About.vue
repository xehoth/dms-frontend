<template>
  <div class="about" style="margin-left:12px;margin-right:12px;margin-top:6px;">
    <vue-markdown v-if="data.content">{{data.content}}</vue-markdown>
  </div>
</template>


<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import VueMarkdown from "vue-markdown";

@Component({
  components: {
    VueMarkdown
  }
})
export default class About extends Vue {
  data: any = {};

  async fetch() {
    const res = await this.$http.get("items/about");
    this.data = res.data;
  }

  created() {
    this.fetch();
  }
}
</script>