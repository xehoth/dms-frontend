<template>
  <div class="pa-3">
    测试
    <!-- <v-row style="text-align:center;">
      <h3 style="align-self:center;margin-left:20px;">
        全部作品
        <v-icon>home</v-icon>
      </h3>
      <v-spacer></v-spacer>
      <v-select
        style="align-self:right;margin-right:12px;width:50px;"
        @change="changeSort"
        v-model="model"
        :items="['最新', '最热']"
        label="排序方式"
      ></v-select>
    </v-row>

    <v-row v-if="topData.title">
      <v-col>
        <v-card class="mx-auto">
          <v-card-title>{{topData.title}}</v-card-title>
          <div>
            <v-card-text>
              <vue-markdown>{{getContent(topData.content)}}</vue-markdown>
            </v-card-text>
          </div>
          <v-expand-transition>
            <div v-show="auxShow[topData._id] && auxShow[topData._id].show">
              <v-divider></v-divider>

              <v-card-text>
                <vue-markdown>{{getContentAfter(topData.content)}}</vue-markdown>
              </v-card-text>
            </div>
          </v-expand-transition>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon @click="changeShow(topData)">
              展开
              <v-icon>{{ (auxShow[topData._id] && auxShow[topData._id].show) ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

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
    </v-row>-->
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
export default class Home extends Vue {
  sortId = "createdAt";
  show = false;
  data: any = {};
  query: any = {
    limit: 0,
  };
  auxShow: any = {};
  auxLike: any = {};
  voteStatus = false;
  model = "最新";
  topData: any = {};

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

  changeSort(item: string) {
    if (item === "最新") {
      this.sortId = "createdAt";
      this.query.sort = {
        [this.sortId]: -1,
      };
      this.fetch();
    } else if (item === "最热") {
      this.sortId = "like";
      this.query.sort = {
        [this.sortId]: -1,
      };
      this.fetch();
    }
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
        query: this.query,
      },
    });
    const topReq = await this.$http.get("items", {
      params: {
        query: {
          where: {
            title: "获奖名单公布",
          },
        },
      },
    });
    if (topReq.data.total) {
      const top = topReq.data.data[0];

      res.data.data.splice(
        (() => {
          for (let i = 0; i < res.data.data.length; ++i)
            if (res.data.data[i]._id === top._id) return i;
          return -1;
        })(),
        1
      );
      this.topData = top;
    }
    this.data = res.data.data;
    const status: number = (await this.$http.get("items/vote")).data;
    this.voteStatus = status === 1;
  }

  created() {
    console.log(localStorage.getItem("student"));
  }
}
</script>
