<template>
  <v-layout row class="align-center layout px-4 pt-4 app--page-header">
    <div class="page-header-left">
      <h3 class="pr-3">{{ $route.meta.title || '' }}</h3>
    </div>
    <v-breadcrumbs divider="-" :items="breadcrumbs">
        <template v-slot:item="props">
        <router-link :to="props.item.href" :class="[props.item.disabled && 'disabled']">{{ props.item.text}}</router-link>
      </template>
    </v-breadcrumbs>
    <v-spacer></v-spacer>
    <div class="page-header-right">
      <v-btn icon>
        <v-icon class="text--secondary">refresh</v-icon>
      </v-btn>
    </div>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      title: "主页",
      breadcrumbs: [
      ]
    }
  },
  watch: {
    '$route.path': function () {
      this.computeBreadcrumbs()
    }
  },
  methods: {
    computeBreadcrumbs () {
      let  breadcrumbs = [
        {
          text: "主页",
          href: "/",
          disabled: false
        }
      ];
      let appends = []
      appends = this.$route.matched.map( item => {
        return {
          text: item.meta.title || "",
          href: item.path || "/",
          disabled: item.path === this.$route.path
        }
      })
      this.breadcrumbs = breadcrumbs.concat(appends)
    }
  },
  created () {
    this.computeBreadcrumbs()
  }
}
</script>
<style lang="stylus" scoped>
  .disabled
    color: grey
    pointer-events: none
    text-decoration: blink
</style>