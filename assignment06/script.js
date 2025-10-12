// 1. Hello, World!
function naytaHeiMaailma() {
    document.getElementById("tulos1").innerHTML = "Hei, maailma!"
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
    document.getElementById("tulos4").innerHTML = (Number(document.getElementById("ika4").value) < 18) ? "Olet alaikäinen" : "Olet täysi-ikäinen"
}

// 5.
function tulostaNumerot5() {

}

// 6.
function fizzBuzz6() {
    
}