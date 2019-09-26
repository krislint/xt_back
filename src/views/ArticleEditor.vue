<template>
  <v-container class="grey lighten-5" grid-list-xl>
    <v-layout row wrap>
      <v-flex xs10>
        <v-text-field v-model="title" label="文章标题"></v-text-field>
        <v-text-field v-model="tags" label="文章标签" placeholder="如有多个请用空格分隔"></v-text-field>
        <v-select :items="cities" label="城市" item-text="name" item-value="id" v-model="city_id"></v-select>
        <v-select :items="ccs" label="分类" item-text="name" item-value="id" v-model="cc_id"></v-select>
        <v-select :items="ppts" label="ppt" v-model="ppt_id" item-text="title" item-value="id"></v-select>
        <v-text-field v-model="video" label="视频地址" placeholder="绝对路径或者上传后获取的文件名"></v-text-field>
      </v-flex>
      <v-flex xs10>
        <v-text-field label="图片上传" v-model="short_img"></v-text-field>

        <v-btn flat @click="handlerCilik">
          <v-icon color="primary">cloud_upload</v-icon>&nbsp;上传图片
        </v-btn>
        <input
          type="file"
          id="upload"
          ref="upload"
          @change="changeimg"
          accept=".jpg, .jpeg, .png"
          v-show="false"
        />
        <v-img :src="imgaddress(short_img)" aspect-ratio="1" class="grey lighten-2" :maxWidth="300">
          <template v-slot:placeholder>
            <v-layout fill-height align-center justify-center ma-0>
              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
            </v-layout>
          </template>
        </v-img>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs10>
        <editor :content.sync="editor_content" />
      </v-flex>
    </v-layout>
    <v-layout no-gutters>
      <v-flex>
        <v-btn color="primary" dark @click="handlerSave">
          确认
          <v-icon right dark>fa fas fa-paper-plane</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import editor from "@/components/editor.vue"
import { GetArticle, GetCities, GetCategory,pptppps } from "@/api/toGet.js"
import { SetArticle, AddArticle, Upload2 } from "@/api/toPost.js"

export default {
  data() {
    return {
      content: "",
      title: "",
      article_id: 1,
      create_time: "",
      cities: [],
      city_id: 0,
      tags: "",
      cc_id: 0,
      ccs: [],
      short_img: "",
      ppt_id:0,
      ppts:[],
      video:""
    }
  },
  components: {
    editor
  },
  computed: {
    editor_content: {
      get() {
        return this.content
      },
      set(val) {
        this.content = val
      }
    }
  },
  created() {
    this.article_id = this.$route.params.id || 0
    this.article_id = this.article_id.trim();
    if (this.article_id.trim()) {
      this.get_article()
    }

    this.get_cities()
    this.getcc()
    this.getppts()
  },
  methods: {
    get_article() {
      GetArticle({ article_id: this.article_id }).then(res => {
        this.content = res.data.content
        this.title = res.data.title
        this.create_time = res.data.create_time
        this.city_id = res.data.city_id
        this.tags = res.data.tag
        this.cc_id = res.data.ccid
        this.short_img = res.data.imgSrc
        this.ppt_id =res.data.ppt_id,
        this.video = res.data.viedo;
      })
    },
    save_article() {
      if (this.article_id) {
        let datas = {
          content: this.content,
          title: this.title,
          article_id: this.article_id,
          tag: this.tags,
          city_id: this.city_id,
          ccid: this.cc_id,
          imgSrc: this.short_img,
          ppt_id:this.ppt_id,
          viedo:this.video
        }
        SetArticle(datas)
          .then(res => {
            if (res.code ==200)
              this.$message.success('保存成功')
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        let datas = {
          content: this.content,
          title: this.title,
          tag: this.tags,
          city_id: this.city_id,
          ccid: this.cc_id,
          imgSrc:this.short_img
        }
        AddArticle(datas)
          .then(res => {
            if (res.code == 200) {
              this.$message({ message: "添加文章成功", type: "success" })
              this.$router.push('/Article/Admin')
            } else {
              this.$message({ message: res.msg, type: "error" })
            }
          })
          .catch(error => console.log(error))
      }
    },
    handlerSave() {
      this.save_article()
    },
    get_cities() {
      GetCities()
        .then(res => {
          this.cities = res.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    getcc() {
      GetCategory({ city_id: this.city_id }).then(res => {
        this.ccs = res.data
      })
    },
    getppts(){
      pptppps()
      .then(res=>{
        this.ppts = res.data
      })
    },
    handlerCilik() {
      let uploadbtn = this.$refs.upload
      uploadbtn.click()
    },
    async changeimg(e) {
      let formData = new FormData()
      formData.append("file", e.target.files[0])
      Upload2(formData)
        .then(res => {
          this.short_img = res.data[0]
        })
        .catch(error => {
          this.$message({
            message: "上传异常"+error.toString(),
            type: "error"
          })
        })
    },
    imgaddress(image) {
      if (!image) return "null"
      if (image.toString().startsWith("http")) {
        return image
      } else {
        return process.env.VUE_APP_CDN + image
      }
    }
  },
  watch: {
    city_id: function() {
      this.getcc()
    }
  }
}
</script>
<style scoped>
</style>