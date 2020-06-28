let grid;
let score = 0;
let move = 0;
function isGameOver(){
	for (let i = 0; i <=3; i++){
		for (let j = 0; j <=3; j++){
			if(grid[i][j] == 0){
				return false;
			}
			if(i<3 && grid[i][j] == grid[i+1][j] ){
				return false;
			}
			if(j<3 && grid[i][j] == grid[i][j+1]){
				return false;
			}
		}
	}
	return true;
}

function blankGrid(){
	return [
	       [0,0,0,0],
           [0,0,0,0],
           [0,0,0,0],
           [0,0,0,0]
	       ];
}

function setup(){
	createCanvas(400,400);
	noLoop();
	grid = blankGrid();
	//console.table(grid);
	addNumber();
	addNumber();
	updateCanvas();
	//console.table(grid);	
}

function updateCanvas() {
	  background(255);
	  drawGrid();
	  select('#score').html(score);
}

function drawGrid(){
	let w =100;
	  for (let i = 0; i < 4; i++){
			for (let j = 0; j < 4; j++){
				strokeWeight(2);
				stroke(0);
				
				let val = grid [i][j];
				var color = ["#FFFFFF","#FFBF00","#FFFF00","#CCFF00","#80FF00","#40FF00","#00FF00",
				             "#00FF40","#00FF80","#00FFCC","#00FFFF","#00CCFF","0080FF",
				             "#0040FF","#0000FF","#4000FF","#8000FF","#CC00FF","#FF00FF",
				             "#FF00CC","#FF0080","#FF0040"];
				fill(color[getPowerValue(val)]);
				
				rect(i * w, j * w, w, w);
				
				if(grid[i][j] !== 0){
					textAlign(CENTER, CENTER);
					let s = ""+val;
					let sizes = [64,64,48,32]
					textSize(sizes[s.length-1]);
					fill(0);
					noStroke();
					text(val, i * w + w / 2, j * w + w / 2);
				}
			}
	}
}

function getPowerValue(val){
	let ans =0;
	while(val>=2){
        ans++;
        val = val/2;
    }
	return ans;
}

function compareGrid(a,b){
	for (let i = 0; i < 4; i++){
		for (let j = 0; j < 4; j++){
			if(a[i][j] != b[i][j]){
				return true;
			}
		}
	}
	return false;
}

function copyGrid(grid){
	let extra = blankGrid();
	for (let i = 0; i < 4; i++){
		for (let j = 0; j < 4; j++){
			extra[i][j] = grid[j][i];
		}
	}
	return extra;
	
}

function flipGrid(grid){
	for (let i = 0; i < 4; i++){
		grid[i].reverse();
	}
	return grid;
}

function rotateGrid(grid){
	let newGrid = blankGrid();
	for (let i = 0; i < 4; i++){
		for (let j = 0; j < 4; j++){
			newGrid[i][j] = grid[j][i];
		}
	}
	return newGrid;
}

function keyPressed(){
	console.log(keyCode);
	let flipped = false;
	let rotated = false;
	if(keyCode === DOWN_ARROW){
		
	}else if(keyCode === UP_ARROW){
		grid = flipGrid(grid);
		flipped = true;
	}else if(keyCode === RIGHT_ARROW){
		grid = rotateGrid(grid);
		rotated = true;
	}else if(keyCode === LEFT_ARROW){
		grid = rotateGrid(grid);
		grid = flipGrid(grid);
		flipped = true;
		rotated = true;
	}
		let prevGrid = copyGrid(grid);
		
		for (let i = 0; i < 4; i++){
			grid[i] = operateRow(grid[i]);
		}
		
		let changed = compareGrid(prevGrid,grid);
		
		if(flipped){
			grid = flipGrid(grid);
		}
		
		if(rotated){
			grid = rotateGrid(grid);
			grid = rotateGrid(grid);
			grid = rotateGrid(grid);
		}
		
		if(changed){
			addNumber(); 
		}
		updateCanvas();
		
		let gameOver = isGameOver();
		if(gameOver){
			select('#game-over').html("GAME OVER!");
		}else{
			move++;
			select('#moves').html("Moves: "+move);
			
		}
}



function slide(row){
	let arr = row.filter(val => val);
	let missing = 4 - arr.length;
	let zeros = Array(missing).fill(0);
	arr = zeros.concat(arr);
	return arr;
}

function combine(row){
	for(let i = 3; i >= 1; i-- ){
		let a = row[i];
		let b = row[i-1];
		
		if(a == b){
			row [i] = a + b;
			score += row[i];
			row [i-1] = 0;
		}
	}
	return row;
}

function operateRow(row){
	row = slide(row);
	row = combine(row);
	row = slide(row);
	return row;
}

function addNumber(){
	let options =[];
	for (let i = 0; i < 4; i++){
		for (let j = 0; j < 4; j++){
			if(grid[i][j] === 0 && !isGameOver()){
				options.push({
					x: i,
					y:j
				});
			}
		}
	}
	if(options.length > 0 && options!= null);{
	let spot = random(options);
	if(spot != null){
		let r = random(1);
		grid [spot.x][spot.y] = r > 0.85 ? 4 : 2;
	}
}
}