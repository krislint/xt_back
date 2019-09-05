<template>
  <v-card class="post-card">
    <v-dialog v-model="dialog" max-width="290">
        <v-card>
          <v-card-title class="headline">Confirm</v-card-title>

          <v-card-text>是否确认删除该文章</v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="green darken-1" flat="flat" @click="dialog = false">取消</v-btn>

            <v-btn color="green darken-1" flat="flat" @click="handleDelete">确认</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    <v-toolbar color="transparent" flat dense card>
      <v-toolbar-title class="subheading ft-200">最近发布</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon class="text--secondary">more_vert</v-icon>
      </v-btn>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text class="pa-0">
      
      <ul class="post--list flex-list vertical">
        <li class="post--item" v-for="(item, key) in items" :key="key">
          <router-link :to="`/Article/`+item.id" class=" post--link pa-4 layout row ma-0 text--primary">
            <div class="post--media">
              <v-img :width="150" :src="src(item.imgSrc)" alt="" :maxHeight="100"  class="image-scale"></v-img>
            </div>
            <div class="post--content ml-3">
              <h3 class="title post--title">
                {{ item.title }}
              </h3>
              <div class="post--desc py-2 text--secondary" v-html="item.content">
               
              </div>
              <div class="post--meta o-flex justify-space-between">
                <div class="post--author caption grey--text text--darken-1">
                  <span>{{ item.author }}</span>
                  <time class="px-2">{{ item.create_time }}</time>
                </div>
                <v-layout class="social" row>
                  <v-flex xs1>
                  <a @click="handleThumb" class="grey--text text--darken-1">
                    <v-icon small>thumb_up</v-icon>
                    <small>{{item.likeNum}}+</small>
                  </a>
                  </v-flex>
                <v-flex xs2>
                  <a @click="handleComment" class="grey--text text--darken-1 mx-3">
                    <v-icon small>mode_comment</v-icon>
                    12+
                  </a>
                </v-flex>
                <v-flex xs1>
                  <a @click="handleFavorite" class="grey--text text--darken-1">
                    <v-icon small>favorite</v-icon>
                    <small>50+</small>
                  </a>
                </v-flex>
                <v-flex xs1>
                  <v-btn  flat="flat" @click.stop.prevent="dialog=true;delete_id=item.id">
                  <v-icon small color='red' >delete</v-icon>删除
                  </v-btn>
                  </v-flex>
                </v-layout>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
      
    </v-card-text>
  </v-card>
</template>

<script>
import {DeleteAriticle} from "@/api/toPost"
export default {
  data(){
    return {
      dialog:false,
      delete_id :0
    }
  },
  props: {
    items: { type: [Array, Object] }
  },

  methods: {
    src(emm){
      if (emm){
        
      if (emm.toString().startsWith("http")) {
        return emm
      } else {
        return process.env.VUE_APP_CDN + emm
      }
      }else{
        return '/static/discover_word/ds_2.jpeg'
      }

    },
    handleThumb() {
      // implement your own method here
    },
    handleComment() {
      // implement your own method here
    },
    handleFavorite() {
      // implement your own method here
    },
    handleDelete(){
      DeleteAriticle({ariticle_id:this.delete_id})
      .then(res=>{
        if (res.code==200){
          this.$emit('delarticle',this.delete_id)
          this.$message({
            message:"删除成功",
            type:"success"
          })
        }
        this.dialog= false
      })
      .catch(error=>{
        this.dialog= false
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
.ft-200 {
  font-weight: 200;
}
.post--item:hover {
  background: #f6f6f6;
}
.post--desc{
  max-height: 100px;
  overflow: hidden;
}
.post--content{
  min-width:75%
}
.post--item a {
  text-decoration: none;
}
.flex-list.vertical {
  flex-direction: column;
}
.flex-list li {
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
}
.flex-list li:last-child {
  border: none;
}

.flexbox-centering {
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-scale:hover {
  transform: scale(1.05);
  transition: 0.7s;
}
</style>
