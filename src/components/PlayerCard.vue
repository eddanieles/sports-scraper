<template>
  <div>
    <p>{{player.player}} | {{player.position}}</p>
    <h3>Count: {{player.count}}</h3>
    <ul>
    <li v-for="year in player.years" :key="year.year">
        {{year.year}}: {{year.team}}
    </li>
    </ul>
    <hr>
  </div>
</template>

<script>
export default {
    props: ['player']
}
</script>

<style>

</style>