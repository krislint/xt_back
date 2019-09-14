<template>
  <v-card>
    <v-card-text>
      
      
      <v-select v-if="city_id==14"
        :items="city_list"
        label="地区"
        placeholder="地区"
        v-model="info.city_id_copy"
        item-text="name"
        item-value="id"
      ></v-select>
      <v-select
        :items="cc_list"
        label="分类"
        placeholder="分类"
        v-model="info.cc_id"
        item-text="name"
        item-value="id"
      ></v-select>
      <v-text-field v-model="photo_copy" label="轮播图" placeholder="轮播图地址"></v-text-field>
      <v-select
        :items="ariticle_list"
        label="文章"
        placeholder="文章"
        v-model="ariticle_id_copy"
        item-text="title"
        item-value="id"
      ></v-select>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn color="red darken-1" dark flat="flat" @click="deletecard">
        删除
        <v-icon dark right>delete</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { ShortAriticle, GetCategory } from "@/api/toGet";
export default {
  data() {
    return {
        info:{
            cc_id: 0,
            city_id_copy: 14,
        },  
      ariticle_id_copy: 0,
      photo_copy: "",
      
      ariticle_list:[],
      cc_list:[]
    };
  },
  methods: {
    deletecard() {
      this.$emit("delectcard", this.index);
    },
    get_ariticle_list() {
        let datas = {
        city_id: this.info.city_id_copy,
        cc_id: this.info.cc_id
      };
        ShortAriticle(datas)
        .then(res => {
          this.ariticle_list = res.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    get_cc_list(){
        let datas={
            city_id:this.info.city_id_copy
        };
        GetCategory(datas)
        .then(res=>{
            this.cc_list = res.data;
        });
    }
    
  },
  props: ["index", "city_id", "photo_address", "article_id", "city_list"],
  watch: {
    'photo_copy': function() {
      this.$emit("update:photo_address", this.photo_copy);
    },
    'ariticle_id_copy': function() {
      this.$emit("update:article_id", this.ariticle_id_copy);
    },
    "info":{
        handler:function(){
            this.get_cc_list();
            this.get_ariticle_list();
        },
        deep:true
    }
  },
  created() {
    this.photo_copy = this.photo_address;
    this.ariticle_id_copy = this.article_id;
    this.info.city_id_copy = this.city_id;
    this.get_cc_list();
    this.get_ariticle_list();
  }
};
</script>