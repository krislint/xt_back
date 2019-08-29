/* eslint-disable */
<template>

      <Editor
        api-key="umd14fdhgt2cop3u70eg1t6anz6oj1mp42b1g1qrg1qij4hp"
        :init="init"
        v-model="content"
      ></Editor>
</template>
<script>

import tinymce from "tinymce/tinymce";
import "tinymce/themes/silver/theme.min.js";
import "tinymce/skins/ui/oxide/skin.min.css";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/plugins/image"; // 插入上传图片插件
import "tinymce/plugins/media"; // 插入视频插件
import "tinymce/plugins/table"; // 插入表格插件
import "tinymce/plugins/lists"; // 列表插件
import "tinymce/plugins/wordcount"; // 字数统计插件
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/preview";
import "tinymce/plugins/autoresize";
export default {
  data() {
    return {
      init: {
        // height:700,
        branding: false,
        language_url: `/static/tinymce/langs/zh_CN.js`,
        language: "zh_CN",
        plugins: "lists image media table wordcount preview autoresize",
        toolbar:
          "undo redo |  formatselect | bold italic forecolor backcolor  | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table | removeformat | preview",
        images_upload_handler: (blobInfo, success, failure) => {
          const img = "data:image/jpeg;base64," + blobInfo.base64();
          success(img);
        }
      }
    };
  },
  props:['content']
  ,
  components: {
    Editor
  },
  watch:{
    content:function (newvalue, oldvalue){
      this.$emit('update:content',newvalue)
    }
  }
};
</script>
<style>
</style>