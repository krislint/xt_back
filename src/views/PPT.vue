<template>
  <div id="media" class="media">
    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent max-width="750px">
        <template v-slot:activator="{ on }">
          <!-- <v-btn color="primary" dark v-on="on">Open Dialog</v-btn> -->
          <v-btn flat v-on="on">
            <v-icon color="primary">cloud_upload</v-icon>&nbsp;上传PPT
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">上传PPT</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md6>
                  <v-text-field label="标题*" required v-model="title"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field label="标签" hint="PPT 的标签" v-model="tag"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-btn flat @click="handlerCilik">
                    <v-icon color="primary">cloud_upload</v-icon>&nbsp;上传PPT展示图片
                  </v-btn>

                  <input
                    type="file"
                    id="upload"
                    ref="upload"
                    @change="changeimg"
                    accept=".png, .jpg, .gif"
                    v-show="false"
                  />
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="图片地址*" required v-model="ppt_img"></v-text-field>
                </v-flex>
                <v-flex xs12 align="center">
                  <v-layout align-center justify-center row fill-height>
                    <v-img
                      :src="imgaddress(ppt_img)"
                      aspect-ratio="1"
                      class="grey lighten-2"
                      :maxWidth="300"
                    ></v-img>
                  </v-layout>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="ppt地址*" required v-model="ppt_address"></v-text-field>
                </v-flex>
                <v-btn flat @click="handlerPPT">
                  <v-icon color="primary">cloud_upload</v-icon>&nbsp;上传PPT文件
                </v-btn>

                <input
                  type="file"
                  id="uploadppt"
                  ref="uploadppt"
                  @change="changePPT"
                  accept=".ppt, .pptx"
                  v-show="false"
                />
              </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="dialog = false">关闭</v-btn>
            <v-btn color="blue darken-1" flat @click="upload_ppt">确定</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
    <v-toolbar class="elevation-0 transparent media-toolbar">
      <v-spacer></v-spacer>
      <v-btn-toggle v-model="view">
        <v-btn flat value="list">
          <v-icon color="primary">view_headline</v-icon>
        </v-btn>
        <v-btn flat value="grid">
          <v-icon color="primary">view_list</v-icon>
        </v-btn>
      </v-btn-toggle>
    </v-toolbar>
    <v-divider></v-divider>
    <v-dialog v-model="dialog_editor" max-width="800">
      <v-card>
        <v-card-title>
          <span class="headline">PPT资源 编辑</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md6>
                <v-text-field label="标题*" required v-model="ppt_editot.title"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md5>
                <v-text-field label="标签*" hint="PPT 标签" v-model="ppt_editot.tag"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="图片*" required v-model="ppt_editot.photo"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="文件*" required v-model="ppt_editot.file"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-textarea label="图集*" required v-model="ppt_editot.short_photos" auto-grow></v-textarea>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog_editor = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="eddppt">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div class="layout row media-layout">
      <div class="media-content flex transparent">
        <vue-perfect-scrollbar class="media-content--warp">
          <v-container fluid v-if="view === 'grid'">
            <v-layout row wrap class="x-grid-lg">
              <v-flex lg3 sm12 xs12 class="pa-2" v-for="item in files" :key="item.id">
                <v-hover>
                  <a @click="showDetail(item.id)" class="d-flex">
                    <v-card flat tile>
                      <v-responsive>
                        <v-img
                          :src="imgaddress(item.photo)"
                          alt
                          v-if="isImage(item)"
                          aspect-ratio="1"
                          center
                        ></v-img>
                        <v-icon class="mx-auto" size="135" v-else>insert_drive_file</v-icon>
                      </v-responsive>
                      <v-divider></v-divider>
                      <v-card-title>{{ item.title }}</v-card-title>
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
                @click="showDetail(item.id)"
                v-for="(item, index) in files"
                :key="'list-file-' + index"
              >
                <v-list-tile-avatar>
                  <v-icon>image</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <div class="container pl-0">
                    <div class="layout row">
                      <div class="flex">{{ item.title }}</div>
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
import Bytes from "bytes";
import { getFileMenu } from "@/api/file";
import { GetPPTs, PPTDetail } from "@/api/toGet.js";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import { Upload2, AddPPT, EditorPPT } from "@/api/toPost.js";
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
    ppt_img: "",
    tag: "",
    title: "",
    dialog: false,
    dialog_editor: false,
    ppt_address: "",
    size: "lg",
    view: "grid",
    selectedFile: {
      path: "/static/icon/empty_file.svg"
    },
    imageMime: ["image/jpeg", "image/png", "image/svg+xml"],
    files: [],
    ppt_editot: {
      id: 0,
      title: "",
      tag: "",
      photo: "",
      file: "",
      short_photos: ""
    }
  }),
  computed: {
    mediaMenu() {
      return getFileMenu;
    }
  },
  created() {
    this.getfiles();
  },

  methods: {
    getfiles() {
      GetPPTs()
        .then(res => {
          this.files = res.data;
        })
        .catch(error => {
          this.$message({
            message: error,
            type: "error"
          });
        });
    },
    imgaddress(image) {
      if (!image) return "";
      if (image.toString().startsWith("http")) {
        return image;
      } else {
        return process.env.VUE_APP_CDN + image;
      }
    },
    isImage() {
      return true;
      // return this.imageMime.includes(file.photo_address)
    },
    mimeIcons(file) {
      return this.imageMime.includes(file.photo_address)
        ? "image"
        : "insert_drive_file";
    },
    showDetail(id) {
      PPTDetail({ ppt_id: id })
        .then(res => {
          this.ppt_editot = res.data;
        })
        .catch(error => {
          this.$message({
            message: "请求错误",
            type: "error"
          });
          console.log(error);
        });
      this.dialog_editor = true;
    },
    fileSize(number) {
      return Bytes.format(number);
    },
    formateDate(string) {
      return string ? new Date(string).toLocaleDateString() : "";
    },
    computeFileImage(file) {
      return this.isImage(file) ? file.path : "/static/icon/file_empty.svg";
    },
    handlerCilik() {
      let uploadbtn = this.$refs.upload;
      uploadbtn.click();
    },
    handlerPPT() {
      let uploadbtn = this.$refs.uploadppt;
      uploadbtn.click();
    },
    async changeimg(e) {
      let formData = new FormData();
      formData.append("file", e.target.files[0]);
      Upload2(formData)
        .then(res => {
          this.ppt_img = res.data[0];
        })
        .catch(error => {
          this.$message({
            message: "上传异常",
            type: "error"
          });
          console.log(error);
        });
    },
    async changePPT(e) {
      let formData = new FormData();
      formData.append("file", e.target.files[0]);
      Upload2(formData)
        .then(res => {
          this.ppt_address = res.data[0];
        })
        .catch(error => {
          this.$message({
            message: "上传异常" + error.toString(),
            type: "error"
          });
        });
    },
    upload_ppt() {
      let datas = {
        title: this.title,
        tag: this.tag,
        photo: this.ppt_img,
        file: this.ppt_address
      };
      this.$message({
            message: "上传中，请稍后在浏览",
            type: "success"
          });
      AddPPT(datas)
        .then(res => {
          this.files.push(res.data);
          this.$message({
            message: "上传成功",
            type: "success"
          });
          this.title = "";
          this.tag = "";
          this.ppt_img = "";
          this.ppt_address = "";
        })
      this.dialog = false;
    },
    eddppt() {
      EditorPPT(this.ppt_editot)
        .then(res => {
          if (res.code == 200) {
            this.$message({
              message: "修改成功",
              type: "success"
            });
          }
        })
        .catch(error => {
          console.log(error);
          this.$message({
            message: "未知错误",
            type: "error"
          });
        });
      this.dialog_editor = false;
    }
  }
};
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
