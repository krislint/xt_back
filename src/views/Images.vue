<template>
  <div id="media" class="media">
    <v-dialog v-model="dialog" persistent max-width="750px">
        <template v-slot:activator="{ on }">
          <!-- <v-btn color="primary" dark v-on="on">Open Dialog</v-btn> -->
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">选择文章</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-select
        :items="city_list"
        label="地区"
        placeholder="地区"
        v-model="card.city_id"
        item-text="name"
        item-value="id"
      ></v-select>
      <v-select
        :items="card.cc_list"
        label="分类"
        placeholder="分类"
        v-model="card.cc_id"
        item-text="name"
        item-value="id"
      ></v-select>
      
      <v-select
        :items="card.ariticle_list"
        label="文章"
        placeholder="文章"
        v-model="card.article_id"
        item-text="title"
        item-value="id"
      ></v-select>
               
              </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="dialog = false">关闭</v-btn>
            <v-btn color="blue darken-1" flat @click="setPhoto">确定</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    <v-toolbar class="elevation-0 transparent media-toolbar">
      
        <v-btn flat @click="handlerCilik" >
          <v-icon color="primary" >cloud_upload</v-icon>&nbsp;Upload
        </v-btn>
      
      <input type="file" id="upload" ref="upload" @change="changeimg" accept=".jpg, .jpeg, .png" v-show="false" />
      <v-spacer></v-spacer>
      <v-btn-toggle v-model="view">
        <v-btn flat value="list" >
          <v-icon color="primary">view_headline</v-icon>
        </v-btn>
        <v-btn flat value="grid">
          <v-icon color="primary">view_list</v-icon>
        </v-btn>
      </v-btn-toggle>
    </v-toolbar>
    <v-divider></v-divider>
    <div class="layout row media-layout">
      <div class="media-content flex transparent">
        <vue-perfect-scrollbar class="media-content--warp">
          <v-container fluid v-if="view === 'grid'">
            <v-layout row wrap class="x-grid-lg">
               
              <v-flex lg3 sm12 xs12 class="pa-2" v-for="item in files" :key="item.id">
                   <v-hover>
                <a @click="showDetail(item)" class="d-flex">
                  <v-card flat tile>
                    <v-responsive>
                      <v-img
                        :src="imgaddress(item.photo_address)"
                        alt
                        v-if="isImage(item)"
                        aspect-ratio="1"
                      ></v-img>
                      <v-icon class="mx-auto" size="135" v-else>insert_drive_file</v-icon>
                    </v-responsive>
                    <v-divider></v-divider>
                    <v-card-title>{{ item.id +".png" }}</v-card-title>
                  </v-card>
                </a>
                </v-hover>
              </v-flex>
                
            </v-layout>
          </v-container>
          <v-layout column v-else>
            <v-list dense class="transparent">
              <v-list-tile
                avatar
                @click="showDetail(item)"
                v-for="(item, index) in files"
                :key="'list-file-' + index"
              >
                <v-list-tile-avatar>
                  <v-icon>image</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <div class="container pl-0">
                    <div class="layout row">
                      <div class="flex">{{ item.id +".png" }}</div>
                      <v-spacer></v-spacer>
                      <div class="caption">
                        <!-- {{ item ? formateDate(item.ctime) : "" }} -->
                      </div>
                    </div>
                  </div>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-layout>
        </vue-perfect-scrollbar>
      </div>
    </div>
  </div>
</template>

<script>
import Bytes from "bytes"
import { getFileMenu } from "@/api/file"
import { GetImages } from "@/api/toGet.js"
import VuePerfectScrollbar from "vue-perfect-scrollbar"
import { Uploads,SetTuji } from "@/api/toPost.js"
import { ShortAriticle, GetCategory,GetTuji,GetCities } from "@/api/toGet";
export default {
  components: {
    VuePerfectScrollbar
  },
  props: {
    type: {
      type: String,
      default: "image"
    }
  },
  data: () => ({
    city_list:[],
    card:{
      article_id:0,
      city_id:14,
      cc_id:0,
      ariticle_list:[],
      cc_list:[],
      
    },
    current_photo:0,
    size: "lg",
    view: "grid",
    dialog:false,
    selectedFile: {
      path: "/static/icon/empty_file.svg"
    },
    imageMime: ["image/jpeg", "image/png", "image/svg+xml"],
    files: [],
    folders: [
      {
        name: "bg",
        lastModified: "2018-03-03"
      },
      {
        name: "cards",
        lastModified: "2018-03-03"
      },
      {
        name: "avatar",
        lastModified: "2018-03-03"
      }
    ]
  }),
  computed: {
    mediaMenu() {
      return getFileMenu
    }
  },
  created() {
    this.getfiles();
    this.getCity();
    this.get_cc_list();
    this.get_ariticle_list();
  },

  methods: {
    setPhoto(){
      let datas={
        photo_id:this.current_photo,
        article_id:this.card.article_id
      }
      SetTuji(datas)
      .then(res=>{
        if (res.code==200){
          this.$message({
            message:"设置成功",
            type:"success"
          })
        }
      })
      .catch(error=>{
        this.$message({
          message:error,
          type:"error"
        })
      })
    this.dialog=false;
    },
    getfiles() {
      GetImages()
        .then(res => {
          this.files = res.data
        })
        .catch(error => {
          this.$message({
            message: error,
            type: "error"
          })
        })
    },
    imgaddress(image) {
      if (image.toString().startsWith("http")) {
        return image
      } else {
        return process.env.VUE_APP_CDN + image
      }
    },
    isImage(file) {
      return true
      // return this.imageMime.includes(file.photo_address)
    },
    mimeIcons(file) {
      return this.imageMime.includes(file.photo_address) ? "image" : "insert_drive_file"
    },
    showDetail(item) {
      let datas={
        photo_id : item.id
      }
      this.current_photo= item.id;
      GetTuji(datas)
      .then(res=>{
        this.card.article_id = res.data.article_id;
        this.card.city_id=14;
      })
      this.dialog=true;
    },
    fileSize(number) {
      return Bytes.format(number)
    },
    formateDate(string) {
      return string ? new Date(string).toLocaleDateString() : ""
    },
    computeFileImage(file) {
      return this.isImage(file) ? file.path : "/static/icon/file_empty.svg"
    },
    handlerCilik() {
      let uploadbtn = this.$refs.upload
      uploadbtn.click()
    },
    async changeimg(e) {
      let formData = new FormData()
      formData.append('file', e.target.files[0])
      Uploads(formData)
      .then(res=>{
          let file  = res.data;
          this.files.push(...file)
      })
      .catch(error=>{
          this.$message({
              message:"上传异常",
              type:"error"
          })
          console.log(error)
      })
    },
    getCity(){
      GetCities()
      .then(res=>{
        this.city_list = res.data;
      })
    },
    get_ariticle_list() {
        let datas = {
        city_id: this.card.city_id,
        cc_id: this.card.cc_id
      };
        ShortAriticle(datas)
        .then(res => {
          this.card.ariticle_list = res.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    get_cc_list(){
        let datas={
            city_id:this.card.city_id
        };
        GetCategory(datas)
        .then(res=>{
            this.card.cc_list = res.data;
        });
    }
  },
  watch:{
    'card.city_id':{
      handler:function(){
        this.get_cc_list();
        this.get_ariticle_list();
      },
      deep:true
    },
    "card.cc_id":{
        handler:function(){
            this.get_ariticle_list();
        },
        deep:false
    }
  }
}
</script>
<style lang="stylus" scoped>
.media {
  &-cotent--wrap, &-menu {
    min-width: 260px;
    border-right: 1px solid #eee;
    min-height: calc(100vh - 50px - 64px);
  }

  &-detail {
    min-width: 300px;
    border-left: 1px solid #eee;
  }
}
</style>
