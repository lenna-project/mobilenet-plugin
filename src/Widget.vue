<template>
  <div class="plugin-config">
    <div>
      <label>x: </label>
      <input type="number" width="5ch" v-model.number="x" @change="updateConfig()" />
      <label>y: </label>
      <input type="number" width="5ch" v-model.number="y" @change="updateConfig()" />
      <label>size: </label>
      <input type="number" width="10ch" v-model.number="size" @change="updateConfig()" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "MobileNetWidget",
  props: {
    defaultConfig: Object,
  },
  data() {
    return {
      x: 0,
      y: 0,
      size: 12.5
    };
  },
  methods: {
    async updateConfig() {
      let config = {
        x: this.x,
        y: this.y,
        size: this.size
      };
      this.$emit("changeConfig", config);
    },
  },
  created() {
    this.x = this.defaultConfig.x;
    this.y = this.defaultConfig.y;
    this.size = this.defaultConfig.size;
    this.updateConfig();
  },
});
</script>

<style scoped lang="css">
.plugin-config {
  margin: 5px;
}
</style>
