<template>
  <div style="margin-left:10px;margin-right:10px;margin-top:10px;margin-bottom:10px;">
    <!-- <v-card class="mx-auto" style="margin-top:10px;margin-bottom:10px;">
      <v-card-title>请按实际情况认真作答，答案会自动保存（若遇问题可手动点击保存按钮）</v-card-title>
    </v-card>-->
    <v-card class="mx-auto" style="margin-top:10px;margin-bottom:10px;">
      <v-card-title style="margin-bottom:20px;">对于晚上睡觉，下面哪个同学最接近你入学后可能的状态？（最多选择 2 项）</v-card-title>
      <!-- <v-radio-group v-model="radioGroup[1]" style="margin-left:10px;">
        <v-radio v-for="n in 6" :key="n" :label="radioData[1][n]" :value="n"></v-radio>
      </v-radio-group>-->
      <v-checkbox
        v-model="raidoSelected1"
        v-for="n in 6"
        :key="n"
        :label="radioData[1][n]"
        :value="n"
        style="margin-top:-10px;margin-left:10px;"
        @change="checkRadio1"
      ></v-checkbox>
      <v-card-actions>
        <!-- <v-btn color="green" @click="save" text>保存</v-btn> -->
        <v-btn color="blue" @click="$vuetify.goTo('#preproblem2')" text>下一题</v-btn>
      </v-card-actions>
    </v-card>
    <v-card class="mx-auto" style="margin-top:10px;margin-bottom:10px;" id="preproblem2">
      <v-card-title>下列同学最接近你的是：</v-card-title>
      <v-radio-group v-model="radioGroup[2]" style="margin-left:10px;">
        <v-radio v-for="n in 4" :key="'r' + n" :label="radioData[2][n]" :value="n"></v-radio>
      </v-radio-group>
      <v-card-actions>
        <!-- <v-btn color="green" @click="save" text>保存</v-btn> -->
        <v-btn color="blue" @click="$vuetify.goTo('#problem0')" text>下一题</v-btn>
      </v-card-actions>
    </v-card>
    <v-card
      v-for="(items, index) in oceanData"
      class="mx-auto"
      style="margin-top:10px;margin-bottom:10px;"
      :key="'problem'+index"
      :id="'problem'+index"
    >
      <v-card-title>{{ items.title }}</v-card-title>
      <v-radio-group v-model="items.res" style="margin-left:10px;">
        <v-radio
          v-for="n in items.data.length"
          :key="index.toString() + 'pr' + (n - 1).toString()"
          :label="items.data[n - 1]"
          :value="n"
        ></v-radio>
      </v-radio-group>
      <v-card-actions>
        <!-- <v-btn color="green" @click="save" text>保存</v-btn> -->
        <v-btn
          v-show="index != oceanData.length - 1"
          color="blue"
          @click="$vuetify.goTo('#problem' + (index + 1).toString())"
          text
        >下一题</v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="dialog.open" max-width="280">
      <v-card>
        <v-card-title class="headline">{{dialog.title}}</v-card-title>

        <v-card-text>{{dialog.text}}</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" @click="dialog.open = false" text>确定</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="submitDialog.open"
      max-width="280"
      v-click-outside="outside = submitDialog.open"
    >
      <v-card>
        <v-card-title class="headline">{{submitDialog.title}}</v-card-title>

        <v-card-text>{{submitDialog.text}}</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="submitDialogFunc">确定</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row style="margin-top:10px;">
      <v-spacer></v-spacer>
      <v-btn color="success" @click="submit" style="margin-right:5px;">提交</v-btn>
      <v-btn color="error" @click="reset" style="margin-left:5px;">重置</v-btn>
      <v-spacer></v-spacer>
    </v-row>
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
  raidoSelected1 = [];
  radioData = [
    [],
    [
      "",
      "我常常睡得很晚，深夜时精力充沛，十分亢奋，喜欢和朋友一起开黑，每天都玩到尽兴。",
      "我希望早睡，有时会因为 ddl 或其他任务而不得不晚睡，但依然有熬夜的底线，并且不会打扰他人。",
      "我睡觉时间不规律，夜里喜欢自娱自乐（追番或者自己玩玩游戏等等）。",
      "我习惯于晚睡，每天不论忙碌与否，总是到凌晨睡觉。",
      "我作息规律，十分健康。喜欢早睡早起，不论学业忙碌还是空闲，都能按时睡觉，按时起床。",
      "我夜里喜欢去串门离开寝室到别处玩，很晚才回到宿舍。",
    ],
    [
      "",
      "我每天午睡，且要关灯拉窗帘，最好舍友还不要讲话",
      "我躺床上睡就行，舍友能保持安静就好",
      "午休不太重要，有时休息一下",
      "午睡是老年人的行为，年轻人从不午睡",
    ],
  ];

  oceanData = [
    {
      res: 0,
      title: "我无忧无虑",
      data: ["完全不同意", "不太同意", "有些同意", "同意", "完全同意"],
    },
    {
      res: 0,
      title: "我喜欢周围人多",
      data: ["完全不同意", "不太同意", "有些同意", "同意", "完全同意"],
    },
    {
      res: 0,
      title: "我不喜欢幻想",
      data: ["完全不同意", "不太同意", "有些同意", "同意", "完全同意"],
    },
    {
      res: 0,
      title: "我尽量有礼貌地对待遇到的每个人",
      data: ["完全不同意", "不太同意", "有些同意", "同意", "完全同意"],
    },
    {
      res: 0,
      title: "我将自己的物品保持得干净整齐",
      data: ["完全不同意", "不太同意", "有些同意", "同意", "完全同意"],
    },
    {
      res: 0,
      title: "我常常觉得自己不如别人",
      data: ["完全不同意", "不太同意", "有些同意", "同意", "完全同意"],
    },
    {
      res: 0,
      title: "我很容易发笑",
      data: ["完全不同意", "不太同意", "有些同意", "同意", "完全同意"],
    },
    {
      res: 0,
      title: "我发现哲学争论很无聊",
      data: ["完全不同意", "不太同意", "有些同意", "同意", "完全同意"],
    },
    {
      res: 0,
      title: "我常常跟家人或同时起争执",
      data: ["完全不同意", "不太同意", "有些同意", "同意", "完全同意"],
    },
    {
      res: 0,
      title: "我善于安排，以便如期完成事情",
      data: ["完全不同意", "不太同意", "有些同意", "同意", "完全同意"],
    },
    {
      res: 0,
      title: "当我处于巨大压力下，有时我觉得自己快要崩溃",
      data: ["完全不同意", "不太同意", "有些同意", "同意", "完全同意"],
    },
    {
      res: 0,
      title: "我并不认为自己心情非常愉快",
      data: ["完全不同意", "不太同意", "有些同意", "同意", "完全同意"],
    },
    {
      res: 0,
      title: "艺术及大自然种得各种图案经常让我感到着迷",
      data: ["完全不同意", "不太同意", "有些同意", "同意", "完全同意"],
    },
    {
      res: 0,
      title: "有些人认为我自私和以自我为中心",
      data: ["完全不同意", "不太同意", "有些同意", "同意", "完全同意"],
    },
    {
      res: 0,
      title: "我不是一个做事很有条理得人",
      data: ["完全不同意", "不太同意", "有些同意", "同意", "完全同意"],
    },
    {
      res: 0,
      title: "我很少觉得孤单或忧郁",
      data: ["完全不同意", "不太同意", "有些同意", "同意", "完全同意"],
    },
    {
      res: 0,
      title: "我真的很喜欢与人交谈",
      data: ["完全不同意", "不太同意", "有些同意", "同意", "完全同意"],
    },
    {
      res: 0,
      title: "我相信让学生听具有争议性得演讲，指挥混淆和误导他们",
      data: ["完全不同意", "不太同意", "有些同意", "同意", "完全同意"],
    },
    {
      res: 0,
      title: "如果要选择和他人合作或者竞争，我宁愿和他人合作",
      data: ["完全不同意", "不太同意", "有些同意", "同意", "完全同意"],
    },
    {
      res: 0,
      title: "我试图认真地完成交代给我的所有工作",
      data: ["完全不同意", "不太同意", "有些同意", "同意", "完全同意"],
    },
    {
      res: 0,
      title: "我常常觉得紧张或神经过敏",
      data: ["完全不同意", "不太同意", "有些同意", "同意", "完全同意"],
    },
    {
      res: 0,
      title: "我喜欢付诸行动的过程",
      data: ["完全不同意", "不太同意", "有些同意", "同意", "完全同意"],
    },
    {
      res: 0,
      title: "诗歌对我没有或极少有影响力",
      data: ["完全不同意", "不太同意", "有些同意", "同意", "完全同意"],
    },
    {
      res: 0,
      title: "我常会怀疑他人意图",
      data: ["完全不同意", "不太同意", "有些同意", "同意", "完全同意"],
    },
    {
      res: 0,
      title: "我有一套清晰的目标，并以有条理的方式朝它迈进",
      data: ["完全不同意", "不太同意", "有些同意", "同意", "完全同意"],
    },
    {
      res: 0,
      title: "又是我觉得自己毫无价值",
      data: ["完全不同意", "不太同意", "有些同意", "同意", "完全同意"],
    },
    {
      res: 0,
      title: "我通常宁愿独立做事",
      data: ["完全不同意", "不太同意", "有些同意", "同意", "完全同意"],
    },
    {
      res: 0,
      title: "我常常尝试新奇的、外国的食物",
      data: ["完全不同意", "不太同意", "有些同意", "同意", "完全同意"],
    },
    {
      res: 0,
      title: "我相信如果你允许他人占你便宜，大多数人会这么做",
      data: ["完全不同意", "不太同意", "有些同意", "同意", "完全同意"],
    },
    {
      res: 0,
      title: "我在安定下来做工作前浪费很多时间",
      data: ["完全不同意", "不太同意", "有些同意", "同意", "完全同意"],
    },
    {
      res: 0,
      title: "我很少觉得害怕或紧张",
      data: ["完全不同意", "不太同意", "有些同意", "同意", "完全同意"],
    },
    {
      res: 0,
      title: "我常常觉得自己似乎充满能量",
      data: ["完全不同意", "不太同意", "有些同意", "同意", "完全同意"],
    },
    {
      res: 0,
      title: "我很少注意到不同环境所引起的气氛或感觉上的差异",
      data: ["完全不同意", "不太同意", "有些同意", "同意", "完全同意"],
    },
    {
      res: 0,
      title: "我认识的大部分人都喜欢我",
      data: ["完全不同意", "不太同意", "有些同意", "同意", "完全同意"],
    },
    {
      res: 0,
      title: "我为达到我的目标不懈努力",
      data: ["完全不同意", "不太同意", "有些同意", "同意", "完全同意"],
    },
    {
      res: 0,
      title: "我常常对他人对待我的方式生气",
      data: ["完全不同意", "不太同意", "有些同意", "同意", "完全同意"],
    },
    {
      res: 0,
      title: "我是个快活、精力充沛的人",
      data: ["完全不同意", "不太同意", "有些同意", "同意", "完全同意"],
    },
    {
      res: 0,
      title: "某些音乐能够引发我无限的想象",
      data: ["完全不同意", "不太同意", "有些同意", "同意", "完全同意"],
    },
    {
      res: 0,
      title: "有些人认为我很冷漠、精于算计",
      data: ["完全不同意", "不太同意", "有些同意", "同意", "完全同意"],
    },
    {
      res: 0,
      title: "当我开始从事某件事活着承诺做某件事时，我总会坚持把事情做完",
      data: ["完全不同意", "不太同意", "有些同意", "同意", "完全同意"],
    },
    {
      res: 0,
      title: "当事情出错时，我常觉得沮丧，想要放弃",
      data: ["完全不同意", "不太同意", "有些同意", "同意", "完全同意"],
    },
    {
      res: 0,
      title: "我不是个乐观主义者",
      data: ["完全不同意", "不太同意", "有些同意", "同意", "完全同意"],
    },
    {
      res: 0,
      title: "有时当我阅读诗歌或欣赏艺术作品时，我会感到震撼和激动",
      data: ["完全不同意", "不太同意", "有些同意", "同意", "完全同意"],
    },
    {
      res: 0,
      title: "我这人任性，不轻易改变自己的态度",
      data: ["完全不同意", "不太同意", "有些同意", "同意", "完全同意"],
    },
    {
      res: 0,
      title: "有时候我不是那么值得信赖或依靠的",
      data: ["完全不同意", "不太同意", "有些同意", "同意", "完全同意"],
    },
    {
      res: 0,
      title: "我很少悲伤或沮丧",
      data: ["完全不同意", "不太同意", "有些同意", "同意", "完全同意"],
    },
    {
      res: 0,
      title: "我的生活节奏很快",
      data: ["完全不同意", "不太同意", "有些同意", "同意", "完全同意"],
    },
    {
      res: 0,
      title: "我没什么兴趣思索宇宙或人类的本质",
      data: ["完全不同意", "不太同意", "有些同意", "同意", "完全同意"],
    },
    {
      res: 0,
      title: "我一般情况下比较细心且为他人着想",
      data: ["完全不同意", "不太同意", "有些同意", "同意", "完全同意"],
    },
    {
      res: 0,
      title: "我是个办事效率高并且总能完成工作的人",
      data: ["完全不同意", "不太同意", "有些同意", "同意", "完全同意"],
    },
    {
      res: 0,
      title: "我常常觉得无助，并希望其他人来解决我的问题",
      data: ["完全不同意", "不太同意", "有些同意", "同意", "完全同意"],
    },
    {
      res: 0,
      title: "我是个活跃的人",
      data: ["完全不同意", "不太同意", "有些同意", "同意", "完全同意"],
    },
    {
      res: 0,
      title: "我有强烈的求知欲",
      data: ["完全不同意", "不太同意", "有些同意", "同意", "完全同意"],
    },
    {
      res: 0,
      title: "如果我不喜欢他人，我会让他们知道",
      data: ["完全不同意", "不太同意", "有些同意", "同意", "完全同意"],
    },
    {
      res: 0,
      title: "我从不感到自己做事有头绪",
      data: ["完全不同意", "不太同意", "有些同意", "同意", "完全同意"],
    },
    {
      res: 0,
      title: "我有事感到羞愧，以至于想要躲起来",
      data: ["完全不同意", "不太同意", "有些同意", "同意", "完全同意"],
    },
    {
      res: 0,
      title: "与其领导他人，我宁可走自己的路",
      data: ["完全不同意", "不太同意", "有些同意", "同意", "完全同意"],
    },
    {
      res: 0,
      title: "我常常喜欢用理论或抽象的概念",
      data: ["完全不同意", "不太同意", "有些同意", "同意", "完全同意"],
    },
    {
      res: 0,
      title: "假如必要的话，我会利用别人以达成我的目的",
      data: ["完全不同意", "不太同意", "有些同意", "同意", "完全同意"],
    },
    {
      res: 0,
      title: "对于所做的每件事我都努力做到最优秀的",
      data: ["完全不同意", "不太同意", "有些同意", "同意", "完全同意"],
    },
  ];

  submitted = false;
  radioGroup = [0, 0, 0];
  obj = {
    _id: "",
    uuid: "",
  };

  dialog = {
    open: false,
    title: "",
    text: "",
  };

  submitDialog = {
    open: false,
    title: "",
    text: "",
  };

  submitSuccess = false;

  checkRadio1() {
    if (this.raidoSelected1.length > 2) {
      this.showDialog(this.dialog, "提示", "最多选择 2 项！");
      this.raidoSelected1.pop();
    }
  }

  showDialog(dialog: any, title: string, text: string) {
    dialog.open = true;
    dialog.title = title;
    dialog.text = text;
  }

  save() {
    this.showDialog(this.dialog, "提示", "保存成功！");
  }

  reset() {
    for (let i = 0; i < this.radioGroup.length; ++i) this.radioGroup[i] = 0;
    this.showDialog(this.dialog, "提示", "重置成功！");
    for (const items of this.oceanData) items.res = 0;
    this.raidoSelected1 = [];
  }

  submitDialogFunc() {
    this.submitDialog.open = false;
    if (this.submitSuccess) {
      this.$router.push("/");
    }
  }

  submit() {
    let flag = true;
    for (const items of this.oceanData) {
      if (items.res == 0) {
        flag = false;
        break;
      }
    }
    for (let i = 1; i < this.radioGroup.length; ++i) {
      if (this.radioGroup[i] == 0) {
        flag = false;
        break;
      }
    }
    if (flag) {
      this.submitSuccess = true;
      this.showDialog(this.submitDialog, "提示", "提交成功！");
    } else {
      this.showDialog(this.dialog, "提示", "请完成问卷的填写！");
    }
  }

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