<script setup lang="ts">
import { ref } from 'vue';
const form = ref({playerX: "", playerO: ""})

defineEmits(["addPlayers"])

</script>

<template>
    <form class="startform" @submit.prevent="()=>$emit('addPlayers', form.playerX, form.playerO)">
        <label for="playerX"> Enter name for player X: </label>
        <input type="text" v-model="form.playerX" name="playerX" placeholder="player X name..." required>
        <label for="playerO">Enter name for player O: </label>
        <input type="text" v-model="form.playerO" name="playerO" placeholder="player O name..." required>
        <button type="submit">Start the game</button>
    </form>
  
 
</template>

<style scoped>
.startform{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 200px;
    width: 300px;
}


</style>