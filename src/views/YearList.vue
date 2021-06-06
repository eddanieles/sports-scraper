<template>
    <div>
        <div v-for="year in nbaMvps" :key="year.year + year.player">
            <p>{{year.year}} | {{year.player}} | {{year.position}} | {{year.team}}</p>
            <hr>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    computed: {
        ...mapState(['nbaMvps'])
    }

}
</script>

<style>

</style>