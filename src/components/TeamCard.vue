<template>
  <div>
    <p>{{team.teamName}}</p>
    <h3>Count: {{team.count}}</h3>
    <ul>
    <li v-for="player in team.players" :key="player.year">
        {{player.year}}: {{player.player}} - {{player.position}}
    </li>
    </ul>
    <hr>
  </div>
</template>

<script>
export default {
    props: ['team']

}
</script>

<style>

</style>