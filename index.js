const span = document.querySelector('span');
const button = document.querySelector('button');
const boxes = document.querySelectorAll('.box');
const h3 = document.querySelector('h3');

// 1. Randomizer function.

function randomizer(num) {
    return Math.floor(Math.random() * num) + 1;
}

// 2. Declaration of selected RGB and number of tries.

let chosen = randomizer(9) - 1;
let tries = 3;

// 3. Color generator.

function colorGenerator() {
    let red = randomizer(255);
    let green = randomizer(255);
    let blue = randomizer(255);
    return `rgb(${red}, ${green}, ${blue})`;
}

// 4. Generation of selected RGB and box.

const pickBox = () => {
    chosen = randomizer(9) - 1;
    tries = 3;
    span.innerText = boxes[chosen].style.backgroundColor;
    span.style.color = 'black';
    h3.innerText = `Let's test your prowess, choose one of the boxes that's the color of the RGB text (You got ${tries} tries)`;
};

const colorBox = () => {
    for (let box of boxes) {
        box.style.backgroundColor = colorGenerator();
        box.style.opacity = 1;
        box.style.border = 'none';
    }
};

// 5. Declaration of reset function

function reset() {
    colorBox();
    pickBox();
}

// 6. Reset initialization and assignment to NG button

reset();

button.addEventListener('click', reset);

// 7. Declaration of win and lose function

function win() {
    span.innerText = 'Congratulations! You got it!';
    span.style.color = 'blue';
    for (const [ind, box] of boxes.entries()) {
        if (ind !== chosen) {
            box.style.opacity = 0.25;
        }
    }
}

function lose() {
    span.innerText = 'Aw! You lost!';
    span.style.color = 'red';
    for (const [ind, box] of boxes.entries()) {
        if (ind !== chosen) {
            box.removeEventListener('');
        } else {
            box.style.border = '1px solid red';
        }
    }
}

function picked() {
    this.style.opacity = 0.25;
}

// 8. Declaration of play function and initialization

function play() {
    for (let box of boxes) {
        box.addEventListener('click', function (evt) {
            if (this.style.backgroundColor === span.innerText) {
                win();
            } else {
                this.style.opacity = 0.25;
                tries--;

                h3.innerText = `Let's test your prowess, choose one of the boxes that's the color of the RGB text (You got ${
                    tries +
                    (tries === 1
                        ? ' try'
                        : tries === 0
                        ? ' - no tries left'
                        : ' tries')
                })`;
                if (tries === 0) {
                    lose();
                }
            }
        });
    }
}

play();
