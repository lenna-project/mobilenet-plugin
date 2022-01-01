<template>
  <div class="plugin-config">
    <div>
      <input
        type="checkbox"
        id="print"
        v-model="print"
        v-on:change="updateConfig()"
      />
      <label for="print">print label to image</label>
      <input
        type="checkbox"
        id="exif"
        v-model="exif"
        v-on:change="updateConfig()"
      />
      <label for="exif">add label to exif data</label>
      <label>x: </label>
      <input
        type="number"
        width="5ch"
        v-model.number="x"
        @change="updateConfig()"
      />
      <label>y: </label>
      <input
        type="number"
        width="5ch"
        v-model.number="y"
        @change="updateConfig()"
      />
      <label>size: </label>
      <input
        type="number"
        width="10ch"
        v-model.number="size"
        @change="updateConfig()"
      />
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
      size: 12.5,
      print: true,
      exif: false
    };
  },
  methods: {
    async updateConfig() {
      let config = {
        x: this.x,
        y: this.y,
        size: this.size,
        print: this.print,
        exif: this.exif,
      };
      this.$emit("changeConfig", config);
    },
  },
  created() {
    this.x = this.defaultConfig.x;
    this.y = this.defaultConfig.y;
    this.size = this.defaultConfig.size;
    this.print = this.defaultConfig.print;
    this.exif = this.defaultConfig.exif;
    this.updateConfig();
  },
});
</script>

<style scoped lang="css">
.plugin-config {
  margin: 5px;
}
</style>
