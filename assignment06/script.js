// 1. Hello, World!
function naytaHeiMaailma() {
    document.getElementById("tulos1").innerHTML = "Hei, maailma!";
}

// 2.
function tervehdiNimella() {
    document.getElementById("tulos2").innerHTML = "Hei, " + document.getElementById("nimi2").value + "!";
}

// 3.
function laske3() {
    let a = Number(document.getElementById("lukuA3").value);
    let b = Number(document.getElementById("lukuB3").value);
    let ans1 = a + b;
    let ans2 = a - b;
    let ans3 = a * b;
    if (b != 0) {
        let ans4 = a / b;
        document.getElementById("tulos3").innerHTML = "Summa: (" + ans1 + ") Erotus: (" + ans2 + ") Tulo: (" + ans3 + ") Osamäärä: (" + ans4 + ")";
        return;
    }
    document.getElementById("tulos3").innerHTML = "Summa: (" + ans1 
        + ") Erotus: (" + ans2 + ") Tulo: (" 
        + ans3 + ") Osamäärä: *Tries to divide with 0* >> *Fails* ";
}

// 4.
function tarkistaIka4() {
    document.getElementById("tulos4").innerHTML = (Number(document.getElementById("ika4").value) < 18) ? "Olet alaikäinen" : "Olet täysi-ikäinen";
}

// 5.
function tulostaNumerot5() {
    let numbers = [];
    for (let i = 0; i < 10; i++) {
        numbers.push(i + 1);
    }
    document.getElementById("tulos5").innerHTML = numbers.join(" ");
}

// 6.
function fizzBuzz6() {
    let fizzBuzzArr = [];
    for (let i = 1; i < 51; i++) {
        if (i % 3 === 0 && i % 5 === 0){
            fizzBuzzArr.push(i + " FizzBuzz!");
        } else if (i % 3 === 0) {
            fizzBuzzArr.push(i + " Fizz!");
        } else if (i % 5 === 0) {
            fizzBuzzArr.push(i + " Buzz!");
        } else {
            fizzBuzzArr.push(i);
        }
    }
    document.getElementById("tulos6").innerHTML = fizzBuzzArr.join("<br>");
}

// 7.
function laskeNelio7() {
    let sqrRoot = document.getElementById("luku7").value;
    document.getElementById("tulos7").innerHTML = sqrRoot * sqrRoot;
}

// 8.
function luoAuto8() {
    let brand = document.getElementById("merkki8").value;
    let model = document.getElementById("malli8").value;
    let year = Number(document.getElementById("vuosi8").value);
    document.getElementById("tulos8").innerHTML = "Autosi on " + year + " " + brand + " " + model;
}

// 9.
function laskeSumma9() {
    
    let splitStr = document.getElementById("luvut9").value.split(",");
    let sumOfString = 0;
    for (let i = 0; i < splitStr.length; i++) {
        sumOfString += Number(splitStr[i]);
    }
    document.getElementById("tulos9").innerHTML = sumOfString;
}

// 10.
function laskeSanat10() {
    // TODO count words from a text area input
}

// 11.
function tarkistaPalindromi11() {
    // TODO check if a word is a palindrome
}