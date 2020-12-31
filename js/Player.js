class Player{
	constructor(){

	}

	getScore(){
		var player1ScoreRef = database.ref("players/player1/score");
		player1ScoreRef.on("value", (data) => {
		    player1Score = data.val();
		});

		var player2ScoreRef = database.ref("players/player2/score");
		player2ScoreRef.on("value", (data) => {
		    player2Score = data.val();
		});
	}

	writeScore(score1, score2) {
		database.ref("players/player1").update({
		    score: player1Score + score1,
		  });
		database.ref("players/player2").update({
		    score: player2Score + score2,
		  });
	}
	readPosition(){
		var playerPositionRef1 = database.ref("players/player1/position");
	  	playerPositionRef1.on("value", (data) => {
		    player1Pos = data.val();
		    player1.x = player1Pos.x;
		    player1.y = player1Pos.y;
		});
		var playerPositionRef2 = database.ref("players/player2/position");
	  	playerPositionRef2.on("value", (data) => {
		    player2Pos = data.val();
		    player2.x = player2Pos.x;
		    player2.y = player2Pos.y;
		});
	}
	writePosition1(x, y) {
	  database.ref("players/player1/position").update({
	    x: player1Pos.x + x,
	    y: player1Pos.y + y,
	  });
	  player1.x=player1Pos.x + x;
	  player1.y=player1Pos.y + y;
	}

	writePosition2(x, y) {
	  database.ref("players/player2/position").update({
	    x: player2Pos.x + x,
	    y: player2Pos.y + y,
	  });
	  player2.x=player2Pos.x + x;
	  player2.y=player2Pos.y + y;
	}
}