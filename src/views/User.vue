<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
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
                  <v-btn depressed outline icon fab dark color="primary" small>
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
import { GetUser } from "@/api/toGet.js"
export default {
  data() {
    return {
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
      search:''
    }
  },
  methods: {
    getuuu() {
      GetUser()
        .then(res => {
          this.users = res.data
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  created() {
    this.getuuu()
  }
}
</script>