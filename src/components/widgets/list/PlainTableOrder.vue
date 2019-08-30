<template>
  <v-card>
    <v-toolbar card dense color="transparent">
      <v-toolbar-title><h4>评论</h4></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text class="pa-0">
      <template>
        <v-data-table :headers="headers" :items="items" hide-actions class="elevation-0 table-striped">
          <template slot="items" slot-scope="props">
            <td>{{ props.item.id }}</td>
            <td class="text-xs-left">{{ props.item.article }}</td>
            <td class="text-xs-left">{{ props.item.content }}</td>
            <td class="text-xs-left">{{ props.item.time }}</td>
            <td><v-chip label small :color="getColorByStatus('delivered')" text-color="white">审核通过</v-chip></td>
          </template>
        </v-data-table>
      </template>
      <v-divider></v-divider>
    </v-card-text>
  </v-card>
</template>

<script>
import {last_comment} from '@/api/toGet'
export default {
  data() {
    return {
      headers: [
        {
          text: "#",
          align: "left",
          sortable: false,
          value: "id"
        },
        { text: "文章", value: "deadline" },
        { text: "内容", value: "progress" },
        { text: "发表时间", value: "time" },
        {text:"状态",value:"status"}
      ],
      items: [],
      colors: {
        processing: "blue",
        sent: "red",
        delivered: "green"
      }
    }
  },
  computed: {
    randomColor() {
      let item = Math.floor(Math.random() * this.colors.length)
      return this.colors[item]
    }
  },
  methods: {
    getColorByStatus(status) {
      return this.colors[status]
    },
    get_comments(){
      last_comment()
      .then(res=>{
        this.items = res.data;
      }).catch(error=>{
        console.log(error)
      })
    }
  },
  created(){
    this.get_comments()
  }
}
</script>
