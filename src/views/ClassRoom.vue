<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <v-flex lg3 sm12 v-for="item in rooms" :key="item.id">
        <v-hover>
          <name-card bottom-nav v-bind="item"></name-card>
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
      users: [
        {
          jobTitle: "Web Developer",
          name: "Michael Wang",
          avatar: {
            src: "https://randomuser.me/api/portraits/men/1.jpg",
            size: "36"
          }
        },
        {
          jobTitle: "Web Designer",
          name: "Jessie J",
          color: "pink",
          dark: true,
          avatar: {
            src: "https://randomuser.me/api/portraits/women/1.jpg",
            size: "36"
          }
        },
        {
          jobTitle: "Web Developer",
          name: "Jim J",
          color: "teal",
          dark: true,
          avatar: {
            src: "https://randomuser.me/api/portraits/men/10.jpg",
            size: "36"
          }
        },
        {
          jobTitle: "Product Manager",
          name: "John Doe",
          dark: true,
          cardBgImage: "/static/bg/15.jpg",
          avatar: {
            src: "https://randomuser.me/api/portraits/men/5.jpg",
            size: "36"
          }
        }
      ],
      teacher: {}
    };
  },
  methods: {
    GetRooms() {
      AllRooms()
        .then(res => {
          this.rooms = res.data;
          //   this.teacher = res.data.teacher
          for (let i = 0; i < 6; ++i) {
            this.rooms.push(this.rooms[0]);
          }
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