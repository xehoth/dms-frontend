<template>
  <div>我的宿舍</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import VueMarkdown from "vue-markdown";

@Component({
  components: {
    VueMarkdown,
  },
})
export default class Dorm extends Vue {
  student = "";

  obj = {
    _id: "",
    uuid: "",
  };

  getStudent() {
    this.student = localStorage.getItem("student") || "";
    if (this.student == "") this.$router.push("/login");
    this.obj = JSON.parse(this.student);
  }

  created() {
    this.getStudent();
  }
}
</script>