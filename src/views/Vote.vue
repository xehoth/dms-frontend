<template>
  <div class="pa-3">
    <v-row v-for="item in data" :key="item._id">
      <v-col>
        <v-card class="mx-auto">
          <v-card-title>{{item.title}}</v-card-title>
          <div>
            <v-card-text>
              <vue-markdown>{{getContent(item.content)}}</vue-markdown>
            </v-card-text>
          </div>
          <v-expand-transition>
            <div v-show="auxShow[item._id] && auxShow[item._id].show">
              <v-divider></v-divider>

              <v-card-text>
                <vue-markdown>{{getContentAfter(item.content)}}</vue-markdown>
              </v-card-text>
            </div>
          </v-expand-transition>
          <v-card-actions>
            <v-btn text @click="dolike(item)">
              <v-icon>{{(auxLike[item._id] && auxLike[item._id].like) ? 'favorite' : 'favorite_border'}}</v-icon>
              {{item.like}}
            </v-btn>
            <v-btn text @click="dovote(item)" v-if="voteStatus">
              <v-icon>pan_tool</v-icon>
              {{item.vote}}
            </v-btn>
            <span>{{item.type != '5' ? '#' : ''}}{{getType(item.type)}}{{item.iscov ? " #抗疫专区" : ""}}</span>
            <v-spacer></v-spacer>
            <v-btn icon @click="changeShow(item)">
              展开
              <v-icon>{{ (auxShow[item._id] && auxShow[item._id].show) ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
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
export default class Home extends Vue {
  sortId = "vote";
  show = false;
  data: any = {};
  query: any = {
    limit: 0
  };
  auxShow: any = {};
  auxLike: any = {};
  voteStatus = false;

  getContent(s: string) {
    const idx = s.indexOf("<!-- more -->");
    if (idx != -1) {
      return s.substring(0, idx);
    }
    return s;
  }

  getContentAfter(s: string) {
    const idx = s.indexOf("<!-- more -->");
    if (idx != -1) {
      return s.substring(idx);
    }
    return "";
  }

  getType(item: string) {
    if (item === "3") return "视频";
    if (item === "1") return "诗歌";
    if (item === "2") return "画作";
    if (item === "4") return "随笔";
  }

  changeShow(item: any) {
    let newItem = this.auxShow[item._id];
    if (!newItem) newItem = { show: false };
    newItem.show = !newItem.show;
    Vue.set(this.auxShow, item._id, newItem);
  }

  async dolike(item: any) {
    let newItem = this.auxLike[item._id];
    if (!newItem) {
      newItem = { like: false };
    } else if (newItem.like) {
      return;
    }
    const res: any = await this.$http.put(`items/${item._id}`, item);
    if (res.data.success == -1) {
      alert("提示：投票、点赞已经结束！");
      return;
    }
    if (res.data.success) {
      newItem.like = true;
      Vue.set(this.auxLike, item._id, newItem);
      this.fetch();
    } else {
      alert("您已经赞过了!");
    }
  }

  async dovote(item: any) {
    const res: any = await this.$http.put(`items/vote/${item._id}`, item);
    if (res.data.success == -1) {
      alert("提示：投票、点赞已经结束！");
      return;
    }
    if (res.data.success) {
      this.fetch();
    } else {
      alert("您已经投过票了!");
    }
  }

  changeFilter(id: string) {
    this.query.where = { type: { $regex: id } };
    this.fetch();
  }

  async fetch() {
    const res = await this.$http.get("items", {
      params: {
        query: this.query
      }
    });
    const ret = [];
    const filters = [
      "【最佳人气奖】",
      "【最受欢迎vlogger奖】",
      "【诗歌六君子奖】",
      "【神笔马良奖】",
      "【逐光暖行线上文学比赛优秀作品奖】"
    ];
    for (let i = 0; i < res.data.data.length; ++i) {
      for (let j = 0; j < filters.length; ++j) {
        if (res.data.data[i].title.startsWith(filters[j])) {
          ret.push(res.data.data[i]);
          break;
        }
      }
    }
    ret.sort((a: any, b: any) => {
      return a.title < b.title ? -1 : 1;
    });
    
    this.data = ret;
    const status: number = (await this.$http.get("items/vote")).data;
    this.voteStatus = status === 1;
    if (!this.voteStatus) {
      alert("3月15号到3月17号将开启线上投票活动，敬请期待*^_^*！");
      this.$router.go(-1);
    }
  }

  created() {
    this.query.sort = {
      [this.sortId]: -1
    };

    this.fetch();
  }
}
</script>
