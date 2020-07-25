<template>
  <div>{{student}}</div>
</template>


<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import VueMarkdown from "vue-markdown";

@Component({})
export default class Ques extends Vue {
  student = "";

  obj = {
    _id: "",
    uuid: "",
  };

  getStudent() {
    // this.student = localStorage.getItem("student") || "";
    // this.obj = JSON.parse(this.student);
  }

  created() {
    this.getStudent();
  }
}
</script>