<template>
    <div>
        <v-btn><router-link :to="`/${this.$route.params.league}/year`">Year</router-link></v-btn>
        <v-btn><router-link :to="`/${this.$route.params.league}/team`">Team</router-link></v-btn>
        <v-btn><router-link :to="`/${this.$route.params.league}/player`">Player</router-link></v-btn>
        <v-btn><router-link :to="`/${this.$route.params.league}/position`">Position</router-link></v-btn>
        <v-divider></v-divider>
    </div>
</template>

<script>
export default {
    
}
</script>

<style>

</style>