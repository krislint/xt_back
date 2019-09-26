<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <v-dialog v-model="dialog" max-width="290">
        <v-card>
          <v-card-title class="headline">Confirm</v-card-title>

          <v-card-text>是否删除该评论</v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="green darken-1" flat="flat" @click="dialog = false">取消</v-btn>

            <v-btn color="green darken-1" flat="flat" @click="deletecomment">确认</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-flex lg12>
        <v-card>
          <v-card-title>
            评论
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="搜索"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="comments"
            :search="search"
            v-model="selected"
            select-all
            :pagination.sync="qaq"
            >
            <template v-slot:items="props">
              <td>
                <v-checkbox v-model="props.selected" primary hide-details></v-checkbox>
              </td>
              <td>{{ props.item.user_id || '未注册' }}</td>
              <td>{{ props.item.name }}</td>
              <td>{{ props.item.content }}</td>
              <td>{{props.item.article}}</td>
              <td>{{ props.item.time }}</td>
              <td>
                <v-btn depressed outline icon fab dark color="primary" small>
                  <v-icon>edit</v-icon>
                </v-btn>
                <v-btn
                  depressed
                  outline
                  icon
                  fab
                  dark
                  color="pink"
                  small
                  @click.stop="dialog=true;delid=props.item.id"
                >
                  <v-icon>delete</v-icon>
                </v-btn>
              </td>
            </template>
            <!-- <template v-slot:no-data>
              <v-alert :value="true" color="orange" icon="warning">Sorry, nothing to display here :(</v-alert>
            </template> -->
            <template v-slot:no-results>
              <v-alert
                :value="true"
                color="error"
                icon="warning"
              >Your search for "{{ search }}" found no results.</v-alert>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { DeleteComment } from "@/api/toPost";
import { GetComments } from "@/api/toGet";
export default {
  data() {
    return {
      qaq:{rowsPerPage: 10},
      delid: 0,
      dialog: false,
      search: "",
      selected: [],
      headers: [
        {
          text: "用户id",
          align: "left",
          value: "name"
        },
        { text: "用户名", value: "calories" },
        { text: "内容", value: "fat" },
        {text:'评论文章',value:'article'},
        { text: "评论时间", value: "carbs" },
        { text: "操作", value: "" }
      ],
      comments: []
    };
  },
  methods: {
    deletecomment() {
      this.dialog = false;
      let datas = {
        comment_id: this.delid
      };
      DeleteComment(datas).then(res => {
        if (res.code == 200) {
          this.comments = this.comments.filter(item => item.id != this.delid);
          this.$message({
            message: "删除成功",
            type: "success"
          });
        }
      });
    },
    get_comments() {
      GetComments().then(res => {
        this.comments = res.data;
      });
    }
  },
  created() {
    this.get_comments();
  }
};
</script>
