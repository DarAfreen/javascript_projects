document.addEventListener("DOMContentLoaded", () => {
    let boxes = document.querySelectorAll(".box");
    let resetBtn = document.querySelector("#reset-btn");
    let newGameBtn = document.querySelector("#new-btn");
    let msgContainer = document.querySelector(".msg-container");
    let msg = document.querySelector("#msg");

    let turnO = true;

    const winPatterns = [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [3, 4, 5],
        [6, 7, 8],
    ];

    const resetGame = () => {
        turnO = true;
        enableBoxes();
        msgContainer.classList.add("hide");
    }

    boxes.forEach((box) => {
        box.addEventListener("click", () => {
            if (turnO) {
                box.innerText = "X";
                turnO = false;
            } else {
                box.innerText = "O";
                turnO = true;
            }
            box.disabled = true;
            checkWinner();
        });
    });

    const disableBoxes = () => {
        for (let box of boxes) {
            box.disabled = true;
        }
    }

    const enableBoxes = () => {
        for (let box of boxes) {
            box.disabled = false;
            box.innerText = "";
        }
    }

    const showWinner = (winner) => {
        msg.innerText = ` Congratulations, \n The Winner is player ${winner}`;
        msgContainer.classList.remove("hide");
        disableBoxes();
    }

    const showDraw = () => {
        msg.innerText = "DEADLOCK \n Reset to continue" ;
        msgContainer.classList.remove("hide");
        disableBoxes();
    }

    const checkWinner = () => {
        let winnerFound = false;

        for (let pattern of winPatterns) {
            let pos1Val = boxes[pattern[0]].innerText;
            let pos2Val = boxes[pattern[1]].innerText;
            let pos3Val = boxes[pattern[2]].innerText;

            if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
                if (pos1Val === pos2Val && pos2Val === pos3Val) {
                    showWinner(pos1Val);
                    winnerFound = true; // A winner is found
                    break;
                }
            }
        }

        // If no winner and all boxes are filled, declare a draw
        if (!winnerFound && [...boxes].every(box => box.innerText !== "")) {
            showDraw();
        }
    }

    newGameBtn.addEventListener("click", resetGame);
    resetBtn.addEventListener("click", resetGame);
});


    