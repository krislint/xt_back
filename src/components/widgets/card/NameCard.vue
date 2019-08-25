<template>
  <div class="name-card">
    <v-card color="orange" ref="card" dark :img="cardBgImage">
      <v-responsive v-if="showTopNav">
        <v-layout row justify-space-between class="ma-0">
          <v-flex xs2>
            <v-icon color="pink">favorite</v-icon>
          </v-flex>
          <v-flex xs2 class="text-sm-right">
            <v-icon>more_vert</v-icon>
          </v-flex>
        </v-layout>
      </v-responsive>
      <v-card-text>
        <div class="layout ma-0 align-center" :class="computeCardLayout">
          <v-avatar :size="96" color="primary">
            <img :src="$imageaddress(photo)" :alt="name" v-if="showAvatar" />
            <span  v-else class="white--text headline">{{ name }}</span>
          </v-avatar>
          <div class="flex" :class="computeTextAlgin">
            <div class="subheading">{{ teacher.name }}</div>
            <span class="caption">{{ name }}</span>
          </div>
        </div>
      </v-card-text>
    </v-card>
    <v-bottom-nav :value="true" color="transparent" :height="64" >
      <v-btn flat color="teal" value="recent">
        <span>最近课程</span>
        <v-icon>history</v-icon>
      </v-btn>
      <v-btn flat color="teal" value="favorites">
        <span>学生列表</span>
        <v-icon>supervised_user_circle</v-icon>
      </v-btn>
      <v-btn flat color="teal" value="nearby">
        <span>开课地点</span>
        <v-icon>place</v-icon>
      </v-btn>
    </v-bottom-nav>
  </div>
</template>

<script>
export default {
  props: {
    description: {
      type: String,
      default: ""
    },
    teacher: {
      type: Object,
      default: ()=>{return {}}
    },
    photo:{
      type: String,
      default: ""
    },
    name:{
      type: String,
      default: ""
    },
    mini:{
      type:Boolean,
      default:true
    }
  },
  data: () => ({}),

  computed: {
    computeCardLayout() {
      return this.mini ? "row" : "column"
    },
    computeTextAlgin() {
      return this.mini ? "text-sm-right" : "text-sm-center"
    },
    computeAvatarSize() {
      return this.mini ? "48" : "96"
    },
    showAvatar() {
      return this.photo !== null && this.photo.trim()
    },

    showBottomNav() {
      return this.mini === false && this.bottomNav
    },

    showTopNav() {
      return this.mini === false && this.topNav
    }
  },

  methods: {}
}
</script>

<style lang="stylus" scoped>
.caption, .subheading {
  font-weight:200;
}
</style>
