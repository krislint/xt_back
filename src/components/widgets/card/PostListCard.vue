<template>
  <v-card class="post-card">
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
                <div class="social">
                  <a @click="handleThumb" class="grey--text text--darken-1">
                    <v-icon small>thumb_up</v-icon>
                    <small>{{item.likeNum}}+</small>
                  </a>
                  <a @click="handleComment" class="grey--text text--darken-1 mx-3">
                    <v-icon small>mode_comment</v-icon>
                    <small>12+</small>
                  </a>
                  <a @click="handleFavorite" class="grey--text text--darken-1">
                    <v-icon small>favorite</v-icon>
                    <small>50+</small>
                  </a>
                </div>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
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
