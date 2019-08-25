<template>
  <div id="social">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex lg12 sm12 xs12>
          <post-list-card :items="posts"></post-list-card>
        </v-flex>
      </v-layout>
      <div class="text-xs-center">
        <v-pagination v-model="current_page" :length="totoal" @input="getList"></v-pagination>
      </div>
      <v-btn dark fab bottom right color="pink" :fixed="true" @click="CreateArticle">
        <v-icon>add</v-icon>
      </v-btn>
    </v-container>
    
  </div>
</template>
<script>
import PostListCard from "@/components/widgets/card/PostListCard"
import { article_list } from "@/api/post.js"
export default {
  data() {
    return {
      current_page: 1,
      totoal: 1,
      city_id: 0,
      pagenum: 12,
      posts: []
    }
  },
  methods: {
    getList() {
      let datas = {
        city_id: this.city_id,
        page: this.current_page,
        pagenum: this.pagenum
      }
      article_list(datas)
        .then(res => {
          this.posts = res.data
          this.totoal = res.totalpage
        })
        .catch(error => {
          this.$message(error)
        })
    },
    CreateArticle(){
      this.$router.push({path:'/Article/ ' })
    }
  },
  created() {
    this.getList()
  },
  components: {
    PostListCard
  }
}
</script>
<style scoped>
</style>