<script setup lang="ts">
import SquaresForBoard from './SquaresForBoard.vue'
import StartForm from './StartForm.vue'
import { ref, computed} from 'vue';
import {Player} from '../models/Player';

let beforeGame = ref(true);
let players = ref<Player[]>([]);
let currentPlayer= ref<string>("X");
let haveWinner= ref<boolean>(false)


 

const calculateWinner = (clickedSquares: number[]) => {
        const winnerLines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

			for (let i = 0; i < winnerLines.length; i++) {
				let wc= winnerLines[i]
				let cells = clickedSquares.sort()
				console.log(cells[0])
				if (cells[0] === wc[0] && cells[1]===wc[1] && cells[2]===wc[2]) {
					return true
				}
        if (cells[1] === wc[0] && cells[2]===wc[1] && cells[3]===wc[2]) {
					return true
				}
        if (cells[2] === wc[0] && cells[3]===wc[1] && cells[4]===wc[2]) {
					return true
				}
			}
			return false
		}


   



function handleStart(x: string, o: string){
  
players.value.push(new Player(x, false, false, "X", []), new Player(o, true, false, "O",[]) )
currentPlayer.value = players.value[0].name;
beforeGame.value= false;

}

function squareClicked(e: MouseEvent, i:number){
    let square= e.target as HTMLDivElement
    players.value.forEach(player => {
        if(player.currentPlayer){
         player.clickedSquares.push(i)
         square.innerHTML= player.type
         console.log(player)
         haveWinner.value=calculateWinner(player.clickedSquares)
   
        }
        
        
    });
    togglePlayer(players.value)
    console.log(i)
}

function togglePlayer(players: Player[]){
players[0].currentPlayer = !players[0].currentPlayer
players[1].currentPlayer = !players[1].currentPlayer
currentPlayer
    
}

</script>

<template>
  <h1>TIC TAC TOE</h1>
  <StartForm v-if="beforeGame" @addPlayers="handleStart"></StartForm>
  <div  v-else class="board">
    <SquaresForBoard v-for="n, index in 9" :key="index" @click="squareClicked($event,index)"/>
  </div>
<div v-for="player, index in players"  :key="index" ><p v-if="player.currentPlayer">{{player.name}}--{{player.type }}: make your move</p> </div>
  <div v-if="haveWinner">we have a winner!</div>
 

</template>

<style scoped>
.board {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
   background-color: rgb(169, 205, 169);
    height:350px;
    width: 350px;
    margin: 0 auto;
}

</style>