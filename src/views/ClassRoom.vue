<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <v-flex lg3 sm12 v-for="item in rooms" :key="`classroom`+item.id">
        <v-hover>
          <name-card bottom-nav v-bind="item" slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto"></name-card>
        </v-hover>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { AllRooms } from "@/api/toGet";
import NameCard from "@/components/widgets/card/NameCard";
export default {
  data() {
    return {
      rooms: [],
    };
  },
  methods: {
    GetRooms() {
      AllRooms()
        .then(res => {
          this.rooms = res.data;
        })
        .catch(error => {
          this.$message({
            message: "获取学堂列表失败",
            type: "error"
          });
          console.log(error);
        });
    }
  },
  components: {
    NameCard
  },
  created() {
    this.GetRooms();
  }
};
</script>