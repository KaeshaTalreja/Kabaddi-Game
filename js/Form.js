class Form{
	constructor(){
		this.reset = createButton("Reset");
	}
	display(){
 		this.reset.position(550, 30);
  		this.reset.mousePressed(() => {
    		database.ref("/").update({
		      gameState: 0,
    		});
  		
	  		database.ref("players/player1/position").update({
			      x:400,
			      y:300
	    	});
			database.ref("players/player2/position").update({
			      x:200,
			      y:300
	    	});
	    	database.ref("players/player1").update({
			      score:0
	    	});
	    	database.ref("players/player2").update({
			      score:0
	    	});
	    });
	}
}