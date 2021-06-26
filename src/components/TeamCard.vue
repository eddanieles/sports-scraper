<template>
  <div>
    <!-- <p>{{team.teamName}}</p>
    <h3>Count: {{team.count}}</h3> -->
    <!-- <ul>
    <li v-for="player in team.players" :key="player.year">
        
    </li>
    </ul> -->


    <v-list>
        <v-list-group>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>{{team.teamName}} | Count: {{team.count}}</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="player in team.players"
            :key="player.year"
            no-action
          >
            <v-list-item-content>
              <v-list-item-title>{{player.year}}: {{player.player}} - {{player.position}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
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