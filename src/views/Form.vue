<template>
  <div>
    <v-card class="mx-auto" max-width="400" style="margin-top:10px;margin-bottom:10px;">
      <v-card-title>对于晚上睡觉，下面哪个同学最接近你入学后可能的状态？</v-card-title>
      <v-radio-group v-model="radioGroup" style="margin-left:10px;">
        <v-radio v-for="n in 6" :key="n" :label="radioData[n]" :value="n"></v-radio>
      </v-radio-group>
      <v-card-actions>
        <v-btn color="green" text>保存</v-btn>
        <v-btn color="blue" text>下一题</v-btn>
      </v-card-actions>
    </v-card>
    <v-card class="mx-auto" max-width="400" style="margin-top:10px;margin-bottom:10px;">
      <v-card-title>下列同学最接近你的是：</v-card-title>
      <v-radio-group v-model="radioGroup" style="margin-left:10px;">
        <v-radio v-for="n in 4" :key="n" :label="radioData1[n]" :value="n"></v-radio>
      </v-radio-group>
      <v-card-actions>
        <v-btn color="green" text>保存</v-btn>
        <v-btn color="blue" text>下一题</v-btn>
      </v-card-actions>
    </v-card>
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
export default class Form extends Vue {
  student = "";
  radioData = [
    "",
    "常常睡得很晚，深夜时精力充沛，十分亢奋，喜欢和朋友一起开黑，每天都玩到尽兴。",
    "希望早睡，但他有时会因为 ddl 或其他任务而不得不晚睡，但他依然有熬夜的底线，并且不会打扰他人。",
    "睡觉时间不规律，他夜里喜欢自娱自乐（追番或者自己玩玩游戏等等）。",
    "同学习惯于晚睡，他每天不论忙碌与否，总是到凌晨睡觉。",
    "同学作息规律，十分健康。他喜欢早睡早起，不论学业忙碌还是空闲，都能按时睡觉，按时起床。",
    "我夜里喜欢去串门离开寝室到别处玩，很晚才回到宿舍。",
  ];
  radioData1 = [
    "",
    "每天午睡，且要关灯拉窗帘，最好舍友还不要讲话",
    "躺床上睡就行，舍友能保持安静就好",
    "午休不太重要，有时休息一下",
    "午睡是老年人的行为，年轻人从不午睡",
  ];
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
    // this.getStudent();
  }
}
</script>