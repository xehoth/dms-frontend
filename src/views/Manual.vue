<template>
  <div style="margin-top:10px;margin-left:10px;margin-right:10px;">
    <vue-markdown>{{mainText}}</vue-markdown>
    <center>
      <v-img src="construct.bmp" style="margin-top:20px;" max-width="1200"></v-img>
    </center>
  </div>
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
    // console.log(localStorage.getItem("student"));
  }

  mainText = `# 新生宿舍生活指南
- 大学生活与高中生活的区别
- 如何过好大学宿舍生活?
- 大学舍友关系中常见的问题
- 为什么沟通如此重要
- 怎样与你的室友进行相互协商，解决问题
- 遇到不可调和的问题该怎么办
- 学长学姐的宿舍故事
`;
}
</script>