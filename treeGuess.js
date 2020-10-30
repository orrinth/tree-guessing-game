const playBtn = document.getElementById("play");
const retryBtn = document.getElementById("retry");
const scoreDiv = document.getElementById("score");
const levelDiv = document.getElementById("level");
const nextBtn = document.getElementById("next");
const keyboardBtns = document.querySelectorAll(".keyboard button");
const lastDiv = document.querySelector(".end");

const randomWords = ["Pine", "Apple", "Sequoia", "Redwood", 
                    "Aspen", "Willow", "Cedar", "Palm", 
                    "Oak", "Spruce", "Maple", "Birch", 
                    "Poplar", "Elm"];

let score = 0, level = 0, randomStartIndex = 0, randomWord;

function play(randomWord) {
    nextBtn.style.display = "none";
    for (let keyboardBtn of keyboardBtns) {
        keyboardBtn.disabled = false;
    }

    let rwArr = [];
    for (const rwChar of randomWord) {
        rwArr.push(rwChar);
    }

    const guess = document.querySelector(".guess");
    guess.innerHTML = "";
    let idCount = 0, theParasList = [], para;
    for (let rwaChar of randomWord) {
        para = document.createElement("p");
        para.textContent = rwaChar; 
        para.classList.add("para-styles");
        para.setAttribute("id", `para${idCount}`);
        guess.appendChild(para);
        theParasList.push(para);
        idCount++;
    }

    let matchingLetterParas = [];
    function letterActivated(letter) {
        function findLetter(letter) {
            let i = 0, letterMatch, elementId;
            while (i < randomWord.length) {
                letterMatch = randomWord.indexOf(letter, i);
                if (letterMatch != -1) {
                    elementId = document.getElementById(`para${letterMatch}`);
                    matchingLetterParas.push(elementId);
                }
                i++;
            }

            for (let updatePara of matchingLetterParas) {
                updatePara.style.fontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";
                updatePara.style.backgroundColor = "#333";
                updatePara.style.color = "white";
                updatePara.style.border = "1px solid black";
            }
        }
        if (numTries > 1) {
            numTries--;
            tryDisplay.textContent = `Tries Remaining: ${numTries}`;
            findLetter(letter);

        } else {
            numTries--;
            tryDisplay.textContent = `Tries Remaining: ${numTries}`;
            findLetter(letter);
            for (let keyboardBtn of keyboardBtns) {
                keyboardBtn.disabled = true;
            }
            const overlay = document.querySelector(".overlay");
            const overlay2 = document.querySelector(".overlay-2");
            const overlay3 = document.querySelector(".overlay-3");
            const overlay4 = document.querySelector(".overlay-4");
            
            overlay.classList.remove("overlay-hide");
            overlay2.classList.remove("overlay-2-hide");
            overlay3.classList.remove("overlay-3-hide");
            overlay4.classList.remove("overlay-4-hide");
            overlay.classList.add("overlay-show");
            overlay2.classList.add("overlay-2-show");
            overlay3.classList.add("overlay-3-show");
            overlay4.classList.add("overlay-4-show");
            
            
            tryDisplay.textContent = `Tries Remaining: ${numTries}`;

            const submit = document.querySelector("#submit");
            submit.onclick = function() {
                let wordGuess = document.querySelector("input").value;

                if (numTries == 0) {
                    let success;
                    if (wordGuess.toUpperCase() == randomWord) {
                        success = true;
                    } else if (wordGuess == null || wordGuess == "" || wordGuess.toUpperCase() != randomWord) {
                        success = false;
                    }
                    
                    if (success == true) {
                        let j = 0, differentElementId, difElemIdList = [];
                        while (j < randomWord.length) {
                            differentElementId = document.getElementById(`para${j}`);
                            difElemIdList.push(differentElementId);
                            j++;
                        }
                        for (let eachPara of difElemIdList) {
                            eachPara.style.fontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";
                            eachPara.style.backgroundColor = "#333";
                            eachPara.style.color = "white";
                            eachPara.style.border = "1px solid black";
                        }
                        
                        score += 100
                        scoreDiv.textContent = `Score: ${score}`;

                    } else if (success == false && wordGuess == null) {
                        score -= 100;
                        scoreDiv.textContent = `Score: ${score}`;

                    } else if (success == false && wordGuess == "") {
                        score -= 100;
                        scoreDiv.textContent = `Score: ${score}`;

                    } else if (success == false && wordGuess.toUpperCase() != randomWord) {
                        let k = 0, differentElementId, difElemIdList = [];
                        while (k < randomWord.length) {
                            differentElementId = document.getElementById(`para${k}`);
                            difElemIdList.push(differentElementId);
                            k++;
                        }
                        for (let eachPara of difElemIdList) {
                            eachPara.style.fontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";
                            eachPara.style.backgroundColor = "#333";
                            eachPara.style.color = "white";
                            eachPara.style.border = "1px solid black";
                        }
                        
                        score -= 100;
                        scoreDiv.textContent = `Score: ${score}`;

                    }
                }
                overlay.classList.remove("overlay-show");
                overlay2.classList.remove("overlay-2-show");
                overlay3.classList.remove("overlay-3-show");
                overlay4.classList.remove("overlay-4-show");
                
                overlay.classList.add("overlay-hide");
                overlay2.classList.add("overlay-2-hide");
                overlay3.classList.add("overlay-3-hide");
                overlay4.classList.add("overlay-4-hide");
                
                if (level >= 14) {
                    nextBtn.style.display = "none";
                    retryBtn.style.display = "block";
                    levelDiv.textContent = `Level: 14`;
                } else {
                    nextBtn.style.display = "block";
                }
            }
        }
    }


    let numTries = 3;
    let tryDisplay = document.getElementById("num-tries");
    tryDisplay.textContent = `Tries Remaining: ${numTries}`;

    const buttons = document.querySelectorAll("button");
    if (buttons.length != 0) {
        for (let btn of buttons) {
            if ((btn.id != "play" && btn.id != "retry" && btn.id != "next") && numTries > 0) {
                btn.onclick = function() {
                    let letter = btn.textContent;
                    letterActivated(letter);
                }
            } else {
                continue;
            }
        }
    }
}



function noPlayDisplay() {
    const keyboard = document.getElementsByClassName("keyboard");
    keyboard[0].style.display = "none";
    return keyboard;
}

let keyboardDiv = noPlayDisplay();

playBtn.onclick = function() {
    keyboardDiv[0].style.display = "block"; 
    level++;
    levelDiv.textContent = `Level: ${level}`;
    playBtn.style.display = "none";
    nextBtn.style.display = "none";

    randomWord = randomWords[randomStartIndex].toUpperCase();
    play(randomWord);
    
}

nextBtn.onclick = function() {
    randomStartIndex++;
    level++;
    levelDiv.textContent = `Level: ${level}`;

    if (randomStartIndex < randomWords.length) {
        randomWord = randomWords[randomStartIndex].toUpperCase();
        play(randomWord);
    }

    if (level >= 15) {
        nextBtn.style.display = "none";
        retryBtn.style.display = "block";
        levelDiv.textContent = `Level: 14`;
    } 
}

retryBtn.onclick = function() {
    const endMessage = document.querySelector("#end-message");
    endMessage.classList.add("end-message-show");
}


