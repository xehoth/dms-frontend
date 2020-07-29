<template>
  <v-dialog v-model="dialog.open" max-width="280" v-click-outside="dialogFunc">
    <v-card>
      <v-card-title class="headline">{{dialog.title}}</v-card-title>

      <v-card-text>{{dialog.text}}</v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" text @click="dialogFunc">确定</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
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
  dialog = {
    open: false,
    title: "",
    text: "",
  };
  obj = {
    _id: "",
    uuid: "",
  };
  showDialog(dialog: any, title: string, text: string) {
    dialog.open = true;
    dialog.title = title;
    dialog.text = text;
  }
  getStudent() {
    this.student = localStorage.getItem("student") || "";
    if (this.student == "") {
      this.$router.push("/login");
      return false;
    }
    this.obj = JSON.parse(this.student);
    return true;
  }
  dialogFunc() {
    this.dialog.open = false;
    this.$router.push("/");
  }

  created() {
    if (this.getStudent()) {
      this.showDialog(
        this.dialog,
        "提示",
        "请先完成问卷的填写或请等待宿舍的统一分配！"
      );
    }
  }
}
</script>