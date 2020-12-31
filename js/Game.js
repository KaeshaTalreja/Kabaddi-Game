class Game{
	constructor(){

	}
	getGameState(){
		var gameStateRef = database.ref("gameState");
		  gameStateRef.on("value", (data) => {
		    gameState = data.val();
		  });
	}
	updateGameState(state) {
  		database.ref("/").update({
    		gameState: state,
  		});
	}
}