// Start Diespling the images randomly
let derution = 1300;
let matchedBoxes;
let timer = document.querySelector(".timer span")
let tries = document.querySelector(".worng-tries span")
let imageGallary = document.querySelector(".memory-images-gallary");
let imagesBoxArray = Array.from(document.querySelectorAll(".memory-images-gallary .image-box"));
let orderArray = Array.from(imagesBoxArray.keys());
shuffel(orderArray);

imagesBoxArray.forEach((image,index)=>{
    image.style.order = orderArray[index]
    image.addEventListener("click",function(){
        flipTheBox(image);
    })
})

function shuffel(arr){
    let curr = arr.length,
        temp,
        rand;
    while(curr > 0){
        rand = Math.floor(Math.random() * curr);
        curr --;
        temp = arr[curr];
        arr[curr] = arr[rand];
        arr[rand]=temp;
    }
    return arr;
}
// End Diespling the images randomly

// Star The Splash Screen.
let splashScreen = document.querySelector(".wellcom-screen");
let startSpan = document.querySelector(".wellcom-screen .start");
let theName = document.querySelector(".game-info .player-name span");

startSpan.onclick = function(){
    let yourName = prompt("Entet Your Name Here!","John Johnson");
    if(yourName == null || yourName == ''){
        theName.innerHTML = 'UnKnown'
        startSpan.innerHTML = `Enjoy the Game`
    }else{
        theName.innerHTML = yourName  
        startSpan.innerHTML = `Enjoy the Game ${yourName}`
    }
    document.getElementById("game-start-audio").play();
    setTimeout(() => {
        splashScreen.remove(); 
    }, 1000);
    setTimeout(() => {
    if(document.body.querySelector(".wellcom-screen")==null){

        imagesBoxArray.forEach((img)=>{
            img.classList.add("isFlipped")
        })
        setTimeout(() => {
            imagesBoxArray.forEach((img)=>{
                img.classList.remove("isFlipped")
            })
            let hundler = setInterval(() => {
                timer.innerHTML = parseInt(timer.innerHTML) -1
                if(parseInt(timer.innerHTML)==0 || parseInt(tries.innerHTML)===5 ){
                    gameOver();
                    clearInterval(hundler);
                }
                if(matchedBoxes.length === imagesBoxArray.length )
                {
                    clearInterval(hundler);
                }
                }, 1000);
        }, 3000);
    }
    }, 1000);
}
// End The Splash Screen.

// Start Right & Wron Logic
function flipTheBox(box){
    box.classList.add("isFlipped")
    let filpedBoxesArray = imagesBoxArray.filter(box => box.classList.contains("isFlipped"))
    if(filpedBoxesArray.length===2){
        stopClicking();
        checkForMatching(filpedBoxesArray[0],filpedBoxesArray[1]);
    }
    // if(parseInt(tries.innerHTML)===5){
    //     gameOver();
    // }
    matchedBoxes = imagesBoxArray.filter(box => box.classList.contains("is-matched"))
    if(matchedBoxes.length === imagesBoxArray.length )
    {
        winGame();
    }
}

function stopClicking(){
    imageGallary.classList.add("not-clickble");
    setTimeout(() => {
        imageGallary.classList.remove("not-clickble"); 
    }, derution);
}
function checkForMatching(boxOne,boxTwo) {
    if(boxOne.getAttribute("data-imageName") === boxTwo.getAttribute("data-imageName") ){
        console.log("good");
        boxOne.classList.remove("isFlipped")
        boxTwo.classList.remove("isFlipped")

        boxOne.classList.add("is-matched")
        boxTwo.classList.add("is-matched")

        document.getElementById("right-answer-audio").play();
    }
    else{
        console.log("bad");
        tries.innerHTML = parseInt(tries.innerHTML) + 1
        setTimeout(() => {
            boxOne.classList.remove("isFlipped")
            boxTwo.classList.remove("isFlipped") 
        }, derution);
        document.getElementById("wrong-answer-audio").play();
    }
}
// End Right & Wron Logic 

function gameOver(){
    let gameOverScreen = document.createElement("div");
    gameOverScreen.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgb(0 150 136 / 80%);
    z-index: 5;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    `
    let gameOverSpan = document.createElement("span");
    gameOverSpan.style.cssText =`
    background: #f44336;
    padding: 15px 20px;
    border-radius: 8px;
    font-size: 25px;
    font-weight: bold;
    color: #fff;
    text-transform: capitalize;
    `
    let gameOverSpanMassge = document.createTextNode(`Game Over! You Rich 5 Wrong Tries`);

    let options = document.createElement("div");
    options.className=("options-div")

    let exitOption = document.createElement("button");
    exitOption.className=("exit-option")
    exitOption.addEventListener("click",function(){
        window.close();
    })
    let reloadOption = document.createElement("button");
    reloadOption.className=("reload-option")
    reloadOption.addEventListener("click",function(){
        window.location.reload();
    })
    // Appending
    gameOverSpan.append(gameOverSpanMassge);
    exitOption.append(document.createTextNode(`Exit`))
    reloadOption.append(document.createTextNode(`Restart`))
    options.append(exitOption)
    options.append(reloadOption)
    gameOverScreen.append(gameOverSpan);
    gameOverScreen.append(options);
    document.body.append(gameOverScreen);
    document.getElementById("game-start-audio").remove();
    document.getElementById("game-over-audio").play()
}
function winGame(){
    let winGameScreen = document.createElement("div");
    winGameScreen.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgb(0 150 136 / 80%);
    z-index: 5;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    `
    let winGameSpan = document.createElement("span");
    winGameSpan.style.cssText =`
    background: #f44336;
    padding: 15px 20px;
    border-radius: 8px;
    font-size: 25px;
    font-weight: bold;
    color: #fff;
    text-transform: capitalize;
    `
    let winGameSpanMassge = document.createTextNode(`You Win !!`);

    let options = document.createElement("div");
    options.className=("options-div")

    let exitOption = document.createElement("button");
    exitOption.className=("exit-option")
    exitOption.addEventListener("click",function(){
        window.close();
    })
    let reloadOption = document.createElement("button");
    reloadOption.className=("reload-option")
    reloadOption.addEventListener("click",function(){
        window.location.reload();
    })
    // Appending
    winGameSpan.append(winGameSpanMassge);
    exitOption.append(document.createTextNode(`Exit`))
    reloadOption.append(document.createTextNode(`Restart`))
    options.append(exitOption)
    options.append(reloadOption)
    winGameScreen.append(winGameSpan);
    winGameScreen.append(options);
    document.body.append(winGameScreen);
}
