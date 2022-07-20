// The flow is this

// Take a matrix of arrays as input, calculate the max rowsize and colsize
// Make a visual matrix of each array and label each element as window (W), middle (M), aisle (A). []

// Now fill in the seats starting with A, W, M (Aisle,Window,Middle) with numbers

// Print out the matrix , unpopulated seats are marked with -1

import inquirer from 'inquirer';
const questions = [
    {
      type: 'input',
      name: 'matrix',
      message: "Enter the seats as arrays in json notation? ",
    },
    {
        type: 'input',
        name: 'people',
        message: "How many people are to be seated",
      },
  ];



inquirer.prompt(questions).then(answers=>{
	try{

	
    var array=JSON.parse(answers.matrix);
    var people = JSON.parse(answers.people);
	

	  var rowSize=Math.max.apply(Math, array.map(element => element[0]));
	  var colSize=Math.max.apply(Math, array.map(element=>element[1]));

	  var seats=labelSeats(array);
	  

	  var obj={};
	  obj=orderseats("A",1,seats,colSize,rowSize,people);
	  obj=orderseats("W",obj.counter,obj.seats,colSize,rowSize,people);
	  obj=orderseats("M",obj.counter,obj.seats,colSize,rowSize,people);
	  seats=obj.seats;
	  
	  //print the seats
	  printValues(seats,colSize,rowSize,people)
	}
	catch(error) {

		if(error.name == 'TypeError')
		console.log("Please enter valid input  \n Matrix - [[3,3],[4,2]] ")
		else if(error.name == "SyntaxError")
		console.log("Error in parsing input, please try again")
	}
})


function printValues(seats,colSize,rowSize,people){
	var stringJ=""
	for(var i=0;i<colSize;i++){
		  for(var j=0;j<rowSize;j++){
			  if(seats[j]==null||seats[j][i]==null){
				
				
				  continue;
			  }
			  for(var k=0;k<seats[j][i].length;k++){
                if(seats[j][i][k]<=people)
				  stringJ+=(seats[j][i][k]+" ");
                else
                stringJ+=(-1+" ");
			  }
			  stringJ+=",";
		  }
		  stringJ+="\n"
	  }

	  console.log(stringJ)
}	



function labelSeats(array){
	var seats=[];
	for(var i=0;i<array.length;i++)
    {
    
	  	seats.push(Array(array[i][0]).fill().map(()=>Array(array[i][1]).fill("M")));
	}
	for(var i=0;i<seats.length;i++){
		for(var j=0;j<seats[i].length;j++){  
	  		seats[i][j][0]="A";
			seats[i][j][seats[i][j].length-1]="A";
		}
	  }

	  for(var i=0;i<seats[0].length;i++)
	  	seats[0][i][0]="W";
	  for(var i=0;i<seats[seats.length-1].length;i++)
		seats[seats.length-1][i][(seats[seats.length-1][i].length)-1]="W";
	  
	return seats;
}

function orderseats(val,counter,seats,colSize,rowSize,people){
	for(var i=0;i<colSize;i++){
		for(var j=0;j<rowSize;j++){
			if(seats[j]==null||seats[j][i]==null)
				continue;
			for(var k=0;k<seats[j][i].length;k++){
			        if(seats[j]!=null&& seats[j][i]!=null && seats[j][i][k]===val){
				 	  seats[j][i][k]=counter;
					  counter++;
				}
			}
		}

	}
	return {seats:seats,counter:counter};
}