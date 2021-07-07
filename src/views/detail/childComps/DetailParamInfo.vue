<template>
  <div class="param-info" v-if="Object.keys(paramInfo).length !== 0">
    <div class="rule-key">{{ paramInfo.ruleKey }}</div>
    <div class="size">
      <table v-for="(table, index) in paramInfo.sizes"
             class="info-size" :key="index">
        <tr v-for="(tr, indey) in table" :key="indey">
          <td v-for="(td, indez) in tr" :key="indez">{{ td }}</td>
        </tr>
      </table>
      <div class="rule-desc">{{paramInfo.ruleDesc}}</div>
    </div>
    <div class="info-key">{{ paramInfo.infoKey }}</div>
    <table class="info-param">
      <tr v-for="(info, index) in paramInfo.infos" :key="index">
        <td class="info-param-key">{{ info.key }}</td>
        <td class="param-value">{{ info.value }}</td>
      </tr>
    </table>
    <div class="info-img" v-if="paramInfo.image">
      <img :src="paramInfo.image" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailParamInfo",
  props: {
    paramInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>

.param-info {
  padding: 20px 15px;
  font-size: 14px;
  border-bottom: 5px solid #f2f5f8;
}

.rule-key {
  margin: 10px 0 15px 10px;
  font-size: 15px;
  color: #333;
}

.param-info table {
  width: 100%;
  border-collapse: collapse;
}

.size {
  border-bottom: 5px solid #f2f5f8;
}

.param-info table tr {
  height: 42px;
}

.param-info table tr td {
  padding-left: 20px;
  border-bottom: solid 1px rgba(100,100,100,.1);
}

.rule-desc {
  color: var(--color-high-text);
  font-size: 8px;
  padding: 10px 0 10px 5px;
}

.info-param-key {
  width: 95px;
}

.info-key {
  margin: 30px 0 15px 10px;
  font-size: 15px;
  color: #333;
}

.param-value {
  color: var(--color-high-text);
}

.info-img img {
  width: 100%;
}

</style>
