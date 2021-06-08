<template>
    <div>
        <b-button-group vertical>
            <b-button><router-link :to="`/${this.$route.params.league}/year`">Year</router-link></b-button>
            <b-button><router-link :to="`/${this.$route.params.league}/team`">Team</router-link></b-button>
            <b-button><router-link :to="`/${this.$route.params.league}/player`">Player</router-link></b-button>
            <b-button><router-link :to="`/${this.$route.params.league}/position`">Position</router-link></b-button>
        </b-button-group>
    </div>
</template>

<script>
export default {
    
}
</script>

<style>

</style>