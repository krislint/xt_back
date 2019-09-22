<template>
  <v-card>
    <v-toolbar card dense color="transparent">
      <v-toolbar-title><h4>最近文章</h4></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text class="pa-0">
      <template>
        <v-data-table :headers="headers" :items="articles" hide-actions class="elevation-0">
          <template slot="items" slot-scope="props">
            <td>
              {{props.item.id}}
            </td>
            <td>{{ props.item.title }}</td>
            <td >{{ props.item.likenum }}</td>
            <td >
              {{props.item.commentnum}}
            </td>
            <td >
              <v-btn flat icon color="grey">
                <v-icon>edit</v-icon>
              </v-btn>
              <v-btn flat icon color="grey">
                <v-icon>delete</v-icon>
              </v-btn>
            </td>
          </template>
        </v-data-table>
      </template>
      <v-divider></v-divider>
    </v-card-text>
  </v-card>
</template>

<script>
import { last_article } from "@/api/toGet"
export default {
  data() {
    return {
      headers: [
        {
          text: "#",
          align: "center",
          sortable: false,
          value: "avatar"
        },
        {
          text: "文章标题",
          align: "left",
          value: "name"
        },
        { text: "点赞数", value: "deadline" },
        { text: "评论数", value: "progress" },
        { text: "操作", value: "action" }
      ],
      articles:[]
      
    }
  },
  methods:{
    get_article(){
      last_article()
      .then(res=>{
        this.articles = res.data;
      })
      .catch(error=>{
        console.log(error)
      })
    }

  },
  created(){
    this.get_article()
  }
}
</script>
