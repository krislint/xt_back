<template>
  <v-card class="elevation-1 pa-3 login-card">
    <v-card-text>
      <div class="layout column align-center">
        <!-- <img src="/favicon.ico" alt="Vue Material Admin" width="120" height="120" /> -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          data-name="Layer 1"
          viewBox="0 0 5 5"
          class="nav-logo "
        >
          <path
            d="M2.77 1.478h.555v-.193h-.361V.933h-.569v.193h.375v.352zM2.396 1.93h.194v-.569h-.353V1h-.193v.555h.352v.375zM3.164 2.205h.194v-.36h.352v-.569h-.194v.375h-.352v.554z"
            class="logo_basic" :style="{fill:$vuetify.theme.primary}"
          />
          <path
            d="M2.763 2.059h-.35l-.01.439.194.004.006-.249h.354v-.569h-.194v.375zM4.067 2.395h-.193v.375h-.352v.555h.193v-.361h.352v-.569z"
            class="logo_basic" :style="{fill:$vuetify.theme.primary}"
          />
          <path
            d="M3.513 2.396H3.07v.194h.637v-.353H4v-.193h-.487v.352zM3.724 3.71v-.194h-.375v-.433h-.554v.194h.36v.433h.569z"
            class="logo_basic" :style="{fill:$vuetify.theme.primary}"
          />
          <path
            d="M2.747 2.503v.439h.569v-.194h-.375v-.245h-.194zM2.605 4.067v-.193H2.23v-.352h-.555v.193h.361v.352h.569zM2.956 4v-.555h-.352V3.07H2.41v.569h.353V4h.193zM1.484 3.349h.352v-.554h-.194v.36H1.29v.569h.194v-.375z"
            class="logo_basic" :style="{fill:$vuetify.theme.primary}"
          />
          <path
            d="M2.043 3.316h.194v-.44H2.6v-.194h-.557v.634zM1.126 2.23h.371v-.555h-.193v.361H.933v.569h.193V2.23z"
            class="logo_basic" :style="{fill:$vuetify.theme.primary}"
          />
          <path
            d="M1.304 2.763H1v.193h.497v-.352h.433V2.41h-.626v.353zM1.651 1.909h.554v-.193h-.36V1.29h-.569v.194h.375v.425zM1.684 2.237h.375v.255h.194v-.449h-.569v.194z"
            class="logo_basic" :style="{fill:$vuetify.theme.primary}"
          />
        </svg>
        <h1 class="flex my-4 primary--text">浙里文化 后台</h1>
      </div>
      <v-form>
        <v-text-field
          append-icon="person"
          name="login"
          label="账户"
          type="text"
          v-model="model.account"
        ></v-text-field>
        <v-text-field
          append-icon="lock"
          name="password"
          label="密码"
          type="password"
          v-model="model.passwd"
        ></v-text-field>
        <v-text-field
          append-icon="lock"
          name="password"
          label="验证码"
          type="text"
          v-model="model.code_text"
          @keyup.enter.native="login"
        >
          <template slot="append">
            <img :src="vcode" @click="vcode = vcode +'?'" />
          </template>
        </v-text-field>
      </v-form>
    </v-card-text>
    <div class="login-btn">
      <!-- <v-btn icon>
        <v-icon color="blue">fa fab fa-telegram fa-lg</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon color="blue">fa fa-qq fa-lg</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon color="light-blue">fa fa-google fa-lg</v-icon>
      </v-btn> -->
      <v-spacer></v-spacer>
      <v-btn block color="primary" @click="login" :loading="loading">登入</v-btn>
    </div>
  </v-card>
</template>

<script>
import { Login } from "@/api/toPost";
import md5 from "js-md5";
export default {
  data: () => ({
    loading: false,
    model: {
      account: "",
      passwd: "",
      code_text: ""
    },
    vcode: process.env.VUE_APP_API + "/auth/VerifyCode/"
  }),

  methods: {
    login() {
      this.loading = true;
      // handle login
      let datas = {
        account: this.model.account,
        passwd: md5(this.model.passwd),
        code_text: this.model.code_text
      };
      Login(datas)
        .then(res => {
          if (res.code == 200 && res.data.role.trim() == "admin") {
            this.$router.push("/dashboard");
            this.$store.commit("login", res.data);
            // console.log(this.$store.state.userinfo)
            this.$message({
              message: "登入成功",
              type: "success"
            });
          } else {
            this.$message({
              message: "请用管理员账户登入",
              type: "info"
            });
          }
          this.loading = false;
          this.vcode = this.vcode +'?'
        })
        .catch(error => {
          // this.$message({
          //   message: "登入异常",
          //   type: "error"
          // })
          console.log(error)
          this.loading = false;
          this.vcode = this.vcode +'?'
        });
    }
  },
  created() {
    // console.log(this.$store.state)
    if (this.$store.state.islogin) {
      this.$router.replace("/dashboard");
    }
  }
};
</script>
<style scoped lang="css">
.nav-logo {
  display: inline-block;
  height: 120px;
  width: 120px;
}
.nav-logo .logo_basic {
  transition: fill 0.2s;
  /* fill: #3f48e7; */
}
</style>
