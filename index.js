const colors = require("colors/safe");
const readline = require ('readline');


const rl = readline.createInterface({ input: process.stdin,   output: process.stdout });

let firstNumber = null;
let secondNumber = null;
let arr = [];
let orderCounter = "green";

const isPrime = num => {
    for(let i = 2, s = Math.sqrt(num); i <= s; i++)
        if(num % i === 0) return false; 
    return num > 1;
}

function findPrimesCount(firstNumber, secondNumber) {
    for (let i = firstNumber; i <= secondNumber; i++) {
        if ( isPrime(i) ) {
            arr.push(i); 
        }
    }
}

rl.question('Введите первое число диапазона', (answer) => { 
      
    if (isNaN(+answer)) {
        console.log("Вы ввели не число");
        process.exit();
    }

    firstNumber = +answer;

    rl.question('Введите второе число диапазона', (answer) => { 
        
        if (isNaN(+answer)) {
            console.log("Вы ввели не число");
            process.exit();
        }
        secondNumber = +answer;
        console.log(typeof firstNumber);

        if (typeof secondNumber !== 'number') {
            console.log("Вы ввели не число");
            rl.close();
        }

        if (firstNumber < 0) {
            firstNumber = 2;
        }
        if (secondNumber < 0) {
            secondNumber = 2;
        }

        if (firstNumber > secondNumber) {
            findPrimesCount(secondNumber,firstNumber);
        } else {
            findPrimesCount(firstNumber,secondNumber);
        }

        if (arr.length === 0) {
            console.log("Простых чисел в заданном диапазоне не найдено")
        }
        
        arr.forEach((item) => {
            if (orderCounter === "green") {
                console.log(colors.green(item));
                orderCounter = "yellow";
            } else if (orderCounter === "yellow") {
                console.log(colors.yellow(item));
                orderCounter = "red";
            } else if (orderCounter === "red") {
                console.log(colors.red(item));
                orderCounter = "green";
            }
        })

        rl.close();
    });
});

