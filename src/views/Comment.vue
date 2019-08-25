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
            Nutrition
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
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
            <template v-slot:no-data>
              <v-alert :value="true" color="error" icon="warning">Sorry, nothing to display here :(</v-alert>
            </template>
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
        { text: "评论时间", value: "carbs" },
        { text: "Action", value: "" }
      ],
      comments: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%"
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1%"
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7%"
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: "8%"
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: "16%"
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: "0%"
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: "2%"
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: "45%"
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: "22%"
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: "6%"
        }
      ]
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
