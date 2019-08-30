<template>
  <div id="pageDashboard">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <!-- mini statistic start -->
        <v-flex lg3 sm6 xs12>
          <mini-statistic icon=" fa fas fa-sticky-note" title="550+" sub-title="文章" color="indigo"></mini-statistic>
        </v-flex>
        <v-flex lg3 sm6 xs12>
          <mini-statistic icon="fa fa fa-comments" title="15+" sub-title="评论" color="red"></mini-statistic>
        </v-flex>
        <v-flex lg3 sm6 xs12>
          <mini-statistic icon="fa fa-thumbs-up" title="200+" sub-title="点赞数" color="light-blue"></mini-statistic>
        </v-flex>
        <v-flex lg3 sm6 xs12>
          <mini-statistic icon="fa fa-users" title="10+" sub-title="用户数量" color="purple"></mini-statistic>
        </v-flex>
        <v-flex lg4 sm12 xs12>
          <linear-statistic
            title="views"
            sub-title="浏览 增长"
            icon="trending_up"
            color="success"
            :value="15"
          ></linear-statistic>
          <linear-statistic
            class="my-4"
            title="PPT"
            sub-title="PPT 增长"
            icon="trending_up"
            color="pink"
            :value="30"
          ></linear-statistic>
          <linear-statistic
            class="my-4"
            title="Comment"
            sub-title="评论 增长"
            icon="trending_up"
            color="primary"
            :value="50"
          ></linear-statistic>
          <linear-statistic
            class="my-4"
            title="User"
            sub-title="用户增长"
            icon="trending_up"
            color="primary"
            :value="50"
          ></linear-statistic>
        </v-flex>
        <!-- Circle statistic -->
        <!-- <v-flex lg4 sm12 xs12 v-for="(item, index) in trending" :key="'c-trending' + index">
          <circle-statistic
            :title="item.subheading"
            :sub-title="item.headline"
            :caption="item.caption"
            :icon="item.icon.label"
            :color="item.linear.color"
            :value="item.linear.value"
          >
          </circle-statistic>
        </v-flex>-->
        <v-flex lg7 sm12 xs12>
          <plain-table></plain-table>
          <plain-table-order style="margin-top:60px"></plain-table-order>
        </v-flex>
        <v-flex lg7 sm12 xs12></v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import MiniStatistic from "@/components/widgets/statistic/MiniStatistic";
import PlainTable from "@/components/widgets/list/PlainTable";
import PlainTableOrder from "@/components/widgets/list/PlainTableOrder";
import Material from "vuetify/es5/util/colors";
import LinearStatistic from "@/components/widgets/statistic/LinearStatistic";
export default {
  components: {
    MiniStatistic,
    LinearStatistic,
    PlainTable,
    PlainTableOrder
  },
  data: () => ({
    color: Material,
    selectedTab: "tab-1",
    linearTrending: [],
    trending: []
  })
};
</script>
