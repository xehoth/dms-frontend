<template>
  <div>
    <div class="background">
      <v-img
        :src="require('../assets/bg1f.png')"
        :min-height="'calc(100vh - ' + $vuetify.application.top + 'px)'"
        :max-height="'100vh'"
        alt
      />
    </div>
    <div>
      <v-app id="inspire">
        <v-main>
          <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
              <v-card class="elevation-12" min-width="40vw" style="opacity:0.8">
                <v-toolbar color="primary" dark flat>
                  <v-toolbar-title>登录</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn icon large v-on="on" @click.stop="helpDialog = true">
                        <v-icon>help</v-icon>
                      </v-btn>
                    </template>
                    <span>帮助</span>
                  </v-tooltip>
                </v-toolbar>
                <v-dialog v-model="helpDialog" max-width="280">
                  <v-card>
                    <v-card-title class="headline">帮助</v-card-title>

                    <v-card-text>使用提供的学号和密码登录，默认密码为身份证号后六位。</v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="green darken-1" text @click="helpDialog = false">确定</v-btn>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-card-text>
                  <v-form>
                    <v-text-field
                      label="学号"
                      name="login"
                      prepend-icon="mdi-account"
                      type="text"
                      v-model="name"
                    ></v-text-field>
                    <v-text-field
                      id="password"
                      label="密码"
                      name="password"
                      prepend-icon="mdi-lock"
                      type="password"
                      v-model="password"
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="submit">登录</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
              <v-dialog v-model="loginDialog.open" max-width="280">
                <v-card>
                  <v-card-title class="headline">{{loginDialog.title}}</v-card-title>

                  <v-card-text>{{loginDialog.text}}</v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" text @click="loginDialog.open = false">确定</v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-row>
          </v-container>
        </v-main>
      </v-app>
    </div>
  </div>
</template>


<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import VueMarkdown from "vue-markdown";

@Component({})
export default class Login extends Vue {
  name = "";
  password = "";
  helpDialog = false;
  loginDialog = {
    open: false,
    title: "",
    text: "",
  };

  async submit() {
    const req = await this.$http.put(`login`, {
      name: this.name,
      password: this.password,
    });
    const res = req.data;
    if (!res.success) {
      if (res.message == "no such user") {
        this.loginDialog.open = true;
        this.loginDialog.title = "提示";
        this.loginDialog.text = "学号或密码错误";
      }
    } else {
      // this.$router.push(`${JSON.stringify(res.data)}`);
      localStorage.setItem("student", JSON.stringify(res.data));
      this.$router.push("/");
    }
  }
}
</script>


<style>
.background {
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>
