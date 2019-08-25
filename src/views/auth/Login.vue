<template>
  <v-card class="elevation-1 pa-3 login-card">
    <v-card-text>
      <div class="layout column align-center">
        <img src="/favicon.ico" alt="Vue Material Admin" width="120" height="120" />
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
        >
        <template slot="append">
          <img :src="vcode" @click="vcode = vcode +'?'">
          </template>
        </v-text-field>
      </v-form>
    </v-card-text>
    <div class="login-btn">
      <v-btn icon>
        <v-icon color="blue">fa fab fa-telegram fa-lg</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon color="blue">fa fa-qq fa-lg</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon color="light-blue">fa  fa-google fa-lg</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn block color="primary" @click="login" :loading="loading">Login</v-btn>
    </div>
  </v-card>
</template>

<script>
import {Login } from "@/api/toPost"
import md5 from 'js-md5'
export default {
  data: () => ({
    loading: false,
    model: {
      account: "",
      passwd: "",
      code_text: ""
    },
    vcode : process.env.VUE_APP_API+"/auth/VerifyCode/"
  }),

  methods: {
    login() {
      this.loading = true
      // handle login
      let datas= {
      account: this.model.account,
      passwd: md5(this.model.passwd),
      code_text: this.model.code_text
    }
      Login(datas)
      .then(res=>{
        
        if (res.code == 200 && res.data.role.trim() == "admin"){
          this.$router.push("/dashboard")
          this.$store.commit('login',res.data)
          // console.log(this.$store.state.userinfo)
          this.$message({
            message: "登入成功",
            type: "success"
          })
          
        }else{
            this.$message({
              message:"请用管理员账户登入",
              type:"info"
            })
          }
          this.loading = false
      }).catch(error=>{
        // this.$message({
        //   message: "登入异常",
        //   type: "error"
        // })
      })
     
    
    }
  },
  created(){
    // console.log(this.$store.state)
    if (this.$store.state.islogin){
      this.$router.replace("/dashboard")
    }
    
  }
}
</script>
<style scoped lang="css"></style>
