let grid = document.querySelectorAll(".cell")
let status = document.querySelector(".status");
let clickNum = 0;
let xList = [];
let olist = [];
let list = [];

let restart = document.querySelector(".restart-button");


restart.addEventListener("click", function(){
    for(let i = 0 ; i < grid.length ; i++){
        grid[i].textContent = "";
        clickNum = 0;
        xList.length = 0;
        olist.length = 0;
        status.textContent = "Player X's turn";
        list.length = 0;
    }
})


for(let i = 0 ; i < grid.length ; i++){
    
    
    grid[i].addEventListener("click", function(){
        if(status.textContent === "player X wins" || status.textContent === "player O wins" || status.textContent === "Its a tie"){
            return;
        }
        
        
        if(grid[i].textContent !== ""){
            clickNum--;
            list.splice(0,1);
        }
        

        
        if(clickNum%2 === 0){
            status.textContent = "Player O's turn";
        }
        else{
            status.textContent = "Player X's turn";
        }
        if(grid[i].textContent === "" && clickNum%2 === 0){
            
            grid[i].textContent = "X";
            xList.push(grid[i].getAttribute("data-index"));
            if(xList.length >= 3){
                let twodList = [];
                xList = xList.sort((a, b) => a - b);

                for (let j = 0; j < xList.length - 2; j++) {
                    for (let k = j + 1; k < xList.length - 1; k++) {
                        for (let l = k + 1; l < xList.length; l++) {
                            twodList.push([xList[j], xList[k], xList[l]]);
                        }
                    }
                }

                for(let j = 0 ; j < twodList.length ; j++){
                    if(check(twodList[j])){
                        status.textContent = "player X wins";
                        break;
                    }
                }

            }
        }
        else if(grid[i].textContent === "" && clickNum%2 === 1){
            
            grid[i].textContent = "O";
            olist.push(grid[i].getAttribute("data-index"))
            if(xList.length >= 3){
                let twodList1 = [];
                olist = olist.sort((a, b) => a - b);
                for (let j = 0; j < olist.sort((a, b) => a - b).length - 2; j++) {
                    for (let k = j + 1; k < olist.sort((a, b) => a - b).length - 1; k++) {
                        for (let l = k + 1; l < olist.sort((a, b) => a - b).length; l++) {
                            twodList1.push([olist[j], olist[k], olist[l]]);
                        }
                    }
                }

                for(let j = 0 ; j < twodList1.length ; j++){
                    if(check(twodList1[j])){
                        status.textContent = "player O wins";
                        break;
                    }
                    
                }

            }
            
        }
        clickNum++;
        list.push(clickNum)



        if (list.length === 9 && !status.textContent.includes("wins")) {
            status.textContent = "It's a tie";
        }
    })
}


function check(arr){
    if(JSON.stringify(arr) === JSON.stringify(['5','6','7']) || JSON.stringify(arr) === JSON.stringify(['2','3','4']) || JSON.stringify(arr) === JSON.stringify(['1','2','3']) || JSON.stringify(arr) === JSON.stringify(['4','5','6']) || JSON.stringify(arr) === JSON.stringify(['0','2','4']) || JSON.stringify(arr) === JSON.stringify(['4','6','8']) || JSON.stringify(arr) === JSON.stringify(['1','3','5']) || JSON.stringify(arr) === JSON.stringify(['3','5','7'])){
        return false;
    }

    let commonDifference = arr[1] - arr[0];

    for (let i = 1; i < arr.length - 1; i++) {
        if (arr[i + 1] - arr[i] !== commonDifference) {
            return false;
        }
    }

    return true;
}




