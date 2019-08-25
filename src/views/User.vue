<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <v-dialog v-model="dialog" max-width="500">
        <v-card>
          <v-card-title class="headline">编辑用户信息</v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md6>
                  <v-text-field label="姓名" v-model="this.userinfo.name" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field
                    label="账户"
                    hint="区别用户的唯一id"
                    v-model="this.userinfo.account"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Password*" type="password" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="RePassword*" type="password" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-select :items="['student', 'teacher', 'admin']" label="角色" hint="分为学生、教师、管理员" persistent-hint required v-model="this.userinfo.role"></v-select>
                </v-flex>
                
              </v-layout>
            </v-container>
            <!-- <small>*indicates required field</small> -->
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="green darken-1" flat="flat" @click="dialog = false">取消</v-btn>

            <v-btn color="green darken-1" flat="flat" @click="dialog = false">确定</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-flex lg12>
        <v-card>
          <v-toolbar card color="white">
            <v-text-field
              flat
              solo
              prepend-icon="search"
              placeholder="Type something"
              v-model="search"
              hide-details
              class="hidden-sm-and-down"
            ></v-text-field>
            <v-btn icon>
              <v-icon>filter_list</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text class="pa-0">
            <v-data-table
              :headers="headers"
              :search="search"
              :items="users"
              :rows-per-page-items="[10, 25, 50, { text: 'All', value: -1 }]"
              class="elevation-1"
              item-key="name"
              select-all
              v-model="selected"
            >
              <template slot="items" slot-scope="props">
                <td>
                  <v-checkbox primary hide-details v-model="props.selected"></v-checkbox>
                </td>
                <td>
                  <v-avatar size="32">
                    <v-icon style="font-size:24px">fa fas fa-user</v-icon>
                  </v-avatar>
                </td>
                <td>{{ props.item.name }}</td>
                <td>{{ props.item.account }}</td>
                <td>{{ props.item.role }}</td>
                <td>{{ props.item.intro }}</td>
                <td>
                  <v-btn depressed outline icon fab dark color="primary" small @click="dialog=true;current_id = props.item.id">
                    <v-icon>edit</v-icon>
                  </v-btn>
                  <v-btn depressed outline icon fab dark color="pink" small>
                    <v-icon>delete</v-icon>
                  </v-btn>
                </td>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { GetUser, GetUserInfo } from "@/api/toGet.js";
export default {
  data() {
    return {
      dialog: false,
      current_id:0,
      userinfo:{},
      selected: [],
      users: [],
      headers: [
        { text: "头像", align: "left", sortable: false, value: "photo" },
        { text: "姓名", value: "name" },
        { text: "账户", value: "account" },
        { text: "身份", value: "role" },
        { text: "介绍", value: "intro" },
        { text: "Action", value: "" }
      ],
      search: ""
    };
  },
  methods: {
    getuuu() {
      GetUser()
        .then(res => {
          this.users = res.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.getuuu();
  },
  watch:{
    current_id(){
      GetUserInfo({user_id:this.current_id})
      .then(res=>{
        this.userinfo = res.data
      })
    }
  }
};
</script>