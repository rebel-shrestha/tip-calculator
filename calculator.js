const billInput = document.querySelector("#billAmount");
const numOfPeopleInput = document.querySelector("#numOfPeople");
const tipContainer = document.querySelector("#tipContainer");
const tipInput = document.querySelector("#tipCustomAmount");
const resetBtn = document.querySelector("#resetBtn");


//checking if bill amount is zero
billInput.addEventListener("input", () => {
    if (billInput.value == "0") {
        document.querySelector("#billErr").style.display = "inline";
    } else {
        document.querySelector("#billErr").style.display = "none";
        calculate();
    }
});


//setting the tip% value in session storage
for (let childIdx = 0; childIdx < tipContainer.childElementCount - 1; childIdx++) {
    tipContainer.children[childIdx].addEventListener("click", function (e) {
        e.target.style.backgroundColor = "hsl(172, 67%, 45%)";
        e.target.style.color = "hsl(183, 100%, 15%)";

        //to remove active state from other tip percent divs
        for (let index = 0; index < tipContainer.childElementCount - 1; index++) {
            const element = tipContainer.children[index];
            if (element != e.target) {
                element.style.backgroundColor = "hsl(183, 100%, 15%)";
                element.style.color = "hsl(189, 41%, 97%)";
            }
        }
        //storing tip value in session for later use
        sessionStorage.setItem("tipValue", e.target.value);
        calculate();
    })
}

//getting the custom tip value
tipInput.addEventListener("input", () => {
    calculate();
});

//checking if number of people is zero
numOfPeopleInput.addEventListener("input", () => {
    if (numOfPeopleInput.value == "0") {
        document.querySelector("#peopleErr").style.display = "inline";
    } else {
        document.querySelector("#peopleErr").style.display = "none";
        calculate();
    }
});


// calculate tip per person and total bill per person 
function calculate() {
    if (billInput.value && numOfPeopleInput.value) {
        let bill = Number(billInput.value);
        let numOfPeople = Number(numOfPeopleInput.value);
        let tipPercent = tipInput.value == "" ? Number(sessionStorage.tipValue) : Number(tipInput.value);

        if (isNaN(tipPercent)) {
            tipPercent = 0;
        }

        let tip = (bill * tipPercent) / 100;
        let totalBill = bill + tip;
        let tipPerPerson = tip / numOfPeople;
        let billPerPerson = totalBill / numOfPeople;

        document.querySelector("#tipPerPerson").innerHTML = "$" + tipPerPerson.toFixed(2);
        document.querySelector("#totalPerPerson").innerHTML = "$" + billPerPerson.toFixed(2);
        resetBtn.style.backgroundColor = "hsl(172, 67%, 45%)";
        resetBtn.style.color = "hsl(183, 100%, 15%)";
    }
}

//reset all inputs and results
resetBtn.addEventListener("click", () => {
    billInput.value = "";
    numOfPeopleInput.value = "";
    tipInput.value = "";
    document.querySelector("#tipPerPerson").innerHTML = "$0.00";
    document.querySelector("#totalPerPerson").innerHTML = "$0.00";

    document.querySelector('[value="' + sessionStorage.tipValue + '"]').style.backgroundColor = "hsl(183, 100%, 15%)";
    document.querySelector('[value="' + sessionStorage.tipValue + '"]').style.color = "hsl(189, 41%, 97%)";
    sessionStorage.removeItem("tipValue");

    resetBtn.style.backgroundColor = "hsl(186, 14%, 43%)";
    resetBtn.style.color = "hsl(185, 41%, 84%)";
})


//to remove tip percent value from session on page relaod
window.addEventListener("load", () => {
    sessionStorage.removeItem("tipValue");
});