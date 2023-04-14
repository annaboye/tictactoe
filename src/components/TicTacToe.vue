<script setup lang="ts">
import SquaresForBoard from './SquaresForBoard.vue'
import StartForm from './StartForm.vue'
import { ref, onMounted} from 'vue';
import {Player} from '../models/Player';
import ScoreBoard from './ScoreBoard.vue';


let playersFromLs = JSON.parse(localStorage.getItem("currentGamePlayers") || "[]")
let beforeGame = ref<boolean>();
if (playersFromLs.length<1){
  beforeGame.value=true
}
else {
beforeGame.value= false;
}
let players = ref<Player[]>(playersFromLs);
let haveWinner= ref<boolean>(false)
let winner = ref<string>("");
let isTie= ref<boolean>(false);



 
const checkTie =()=>{
  if(players.value[0].clickedSquares.length + players.value[1].clickedSquares.length===9)
  isTie.value=true
  winner.value="It's a tie"
}
const calculateWinner = (clickedSquares: number[], player: Player) => {
  
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
        let cells = clickedSquares.sort()
       
			for (let i = 0; i < winnerLines.length; i++) {
				let winnerCells= winnerLines[i]
        let countMatches= 0;

        for (let y= 0; y < cells.length; y++) {
          if (winnerCells[0] === cells[y] || winnerCells[1]=== cells[y] || winnerCells[2]=== cells[y]) {
            countMatches++;
            console.log(countMatches)
          }
          if (countMatches===3){
            winner.value = player.name;
            player.scores++;
            winner.value = player.name;
            players.value[0].clickedSquares=[];
            players.value[1].clickedSquares=[];
            localStorage.setItem("currentGamePlayers", JSON.stringify(players.value))
            return true
          }
        }

        
      }

    checkTie();

      return false};


onMounted(()=>{
    if (beforeGame.value=== false){
      clickedSquaresInLs()
    }} )
    
function clickedSquaresInLs(){
  players.value[0].clickedSquares.forEach(clickedSquare => {
    if(clickedSquare<=9){
     
      let btn= document.getElementById((clickedSquare.toString())) as HTMLButtonElement
      btn.innerHTML= players.value[0].type
      btn.disabled= true;
    
    }
  });
  players.value[1].clickedSquares.forEach(clickedSquare => {
    if(clickedSquare<=9){
     
      let btn= document.getElementById((clickedSquare.toString())) as HTMLButtonElement
      btn.innerHTML= players.value[1].type
      btn.disabled= true;
    }
  });
  
};


function handleStart(xName: string, oName: string){
  
players.value.push(new Player(xName, false, 0, "X", []), new Player(oName, true, 0, "O",[]) )
beforeGame.value= false;

}
function togglePlayer(){
players.value[0].currentPlayer = !players.value[0].currentPlayer
players.value[1].currentPlayer = !players.value[1].currentPlayer
}
function squareClicked(e:Event, i:number){
  let square = e.target as HTMLButtonElement;

    players.value.forEach(player => {
        if(player.currentPlayer){
         
         player.clickedSquares.push(i)
         square.innerHTML= player.type
         console.log(player.type)
         console.log(player)
         
         haveWinner.value=calculateWinner(player.clickedSquares, player)
   
        }
        
    });
    togglePlayer()
    if(!haveWinner.value){
      localStorage.setItem("currentGamePlayers", JSON.stringify(players.value))
    }
}



</script>

<template>
  <h1>TIC TAC TOE</h1>
  <ScoreBoard :is-tie="isTie" :players="players" :winner="winner" v-if="haveWinner||isTie"></ScoreBoard>
  <div v-else>
   <div v-for="player, index in players" :key="index" ><p v-if="player.currentPlayer">{{player.name}}--{{player.type }}: make your move</p>
   </div>
  </div>
  <StartForm v-if="beforeGame" @addPlayers="handleStart"></StartForm>
  <div  v-else class="board" >
    <SquaresForBoard v-for="n, index in 9" :id="index" :key="index"  :disabled="haveWinner" @click.once="squareClicked($event,index)" :buttonKey="index" />
  </div>


 

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