<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <!-- <v-img :src="require('../assets/geekpie.png')" style="filter: invert(50%);margin-top:12px;" /> -->
      <v-list dense>
        <v-list-item :to="item.link" v-for="item in items" :key="item.text" link>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="blue" dense>
      <v-app-bar-nav-icon class="white--text" @click.stop="drawer = !drawer" />
      <v-toolbar-title
        class="mr-12 align-center"
        style="padding-left:0;margin-right: 0px !important;"
      >
        <span class="title" style="color:white;">宿舍分配系统</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <router-view :key="$route.path"></router-view>
    </v-main>
  </v-app>
</template>


<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class Main extends Vue {
  @Prop(String) student!: string;
  drawer = null;

  items = [
    { icon: "home", text: "首页", link: "/" },
    { icon: "menu_book", text: "宿舍生活指南", link: "/manual" },
    { icon: "account_box", text: "我的宿舍", link: "/dorm" },
    { icon: "assignment", text: "问卷填写", link: "/form" },
    { icon: "chat", text: "TODO", link: "/chat" },
    // menu_book
    // assignment
    // account_box
    // chat
  ];

  obj = {
    _id: "",
    uuid: "",
  };

  async check() {
    try {
      this.obj = JSON.parse(this.student);
      const req = await this.$http.post(`check`, {
        _id: this.obj._id,
        uuid: this.obj.uuid,
      });
      if (!req.data) {
        console.log("invalid user");
        this.$router.push({ path: "/" });
      } else {
        console.log("valid user");
      }
    } catch (e) {
      this.$router.push({ path: "/" });
    }
  }

  created() {
    this.$vuetify.theme.dark = false;
    // localStorage.setItem("student", this.student);
    this.check();
  }
}
</script>

<style>
.v-application .mr-12 {
  margin-right: 0px !important;
}
</style>