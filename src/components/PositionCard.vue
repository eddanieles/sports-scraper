<template>
  <div>
    <p>{{position.position}}</p>
    <h3>Count: {{position.count}}</h3>
    <p>{{position.players}}</p>
    <hr>
  </div>
</template>

<script>
export default {
    props: ['position']
}
</script>

<style>

</style>