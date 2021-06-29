<template>
  <div class="about">
    <h1>This is an about page</h1>
    <b-tabs 
      active-nav-item-class="font-weight-bold text-uppercase text-danger"
      active-tab-class="font-weight-bold text-success"
      content-class="mt-3"
      vertical>
      <b-tab title="First" active><p class="animate-spin">I'm the first tab</p></b-tab>
      <b-tab title="Second">
        <div class="border-black border-8"></div>
      </b-tab>
      <b-tab title="Disabled" disabled><p>I'm a disabled tab!</p></b-tab>
    </b-tabs>

    <!-- <div class="container" :style="{ background: gradient }">
      <div class="circle" :style="{ background: gradient2 }"></div>
    </div> -->
  
  </div>
</template>

<script>
  export default {
    data: () => ({
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
      offset: true,
      xPosition: '',
      yPosition: ''
    }),
    computed: {
      gradient() {
        return `linear-gradient(to right, #61b${this.xPosition}, #a34${this.yPosition})`
      },
      gradient2() {
        return `linear-gradient(to right, #a34${this.yPosition}, #61b${this.xPosition})`
      }
    },
    methods: {
      mousemove(event) {
        this.xPosition = event.clientX;
        this.yPosition = event.clientY;
      }
    },
    mounted() {
      window.addEventListener('mousemove', this.mousemove)
    }
  }
</script>

<style scoped>
.container {
  width: 50em;
  height: 50em;
  display: flex;
  justify-content: center;
  align-items: center;
}

.circle {
  width: 20em;
  height: 20em;
  /* background: linear-gradient(to right, #a345bb, #61b4d4); */
  border-radius: 100%;
}
</style>