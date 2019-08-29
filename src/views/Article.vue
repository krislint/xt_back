<template>
  <div id="social">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex xs12>
          <v-combobox
            v-model="chips"
            :items="items"
            item-value = 'id'
            item-text= 'name'
            label="Your favorite hobbies"
            chips
            clearable
            prepend-icon="filter_list"
            solo

          >
            <template v-slot:selection="data">
              <v-chip :selected="data.selected" close @input="remove(data.item)">
                <strong>{{ data.item.name }}</strong>&nbsp;
                
              </v-chip>
            </template>
          </v-combobox>
        </v-flex>
        <v-flex lg12 sm12 xs12>
          <post-list-card :items="posts" @delarticle="delete_ariticle"></post-list-card>
        </v-flex>
      </v-layout>
      <div class="text-xs-center">
        <v-pagination v-model="current_page" :length="totoal" @input="getList" :total-visible="7"  circle></v-pagination>
      </div>
      <v-btn dark fab bottom right color="pink" :fixed="true" @click="CreateArticle">
        <v-icon>add</v-icon>
      </v-btn>
    </v-container>
  </div>
</template>
<script>
import PostListCard from "@/components/widgets/card/PostListCard";
import { article_list } from "@/api/post.js";

export default {
  data() {
    return {
      current_page: 1,
      totoal: 1,
      pagenum: 12,
      posts: [],
      chips: {name:'全部',id:0},
      items: [{name:'全部',id:0},{"id":1,"name":"杭州"},{"id":2,"name":"宁波"},{"id":3,"name":"温州"},{"id":4,"name":"绍兴"},{"id":5,"name":"湖州"},{"id":6,"name":"嘉兴"},{"id":7,"name":"金华"},{"id":8,"name":"衢州"},{"id":9,"name":"台州"},{"id":10,"name":"丽水"},{"id":11,"name":"舟山"}]
    };
  },
  methods: {
    remove (item) {
        this.chips.splice(this.chips.indexOf(item), 1)
        this.chips = [...this.chips]
      },
    getList() {
      let datas = {
        city_id: this.chips.id,
        page: this.current_page,
        pagenum: this.pagenum
      };
      article_list(datas)
        .then(res => {
          this.posts = res.data;
          this.totoal = res.totalpage;
        })
        .catch(error => {
          this.$message(error);
        });
    },
    CreateArticle() {
      this.$router.push({ path: "/Article/ " });
    },
    delete_ariticle(id){
      this.posts=this.posts.filter(item=>item.id!=id)
      
    }
  },
  created() {
    this.getList();
  },
  watch:{
    'chips.id':function(){
      this.getList()
    }
  },
  components: {
    PostListCard
  }
};
</script>
<style scoped>
</style>