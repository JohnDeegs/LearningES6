let calculateMonthlyPayment = (principal, years, rate) => {
    let monthlyRate = 0;
    if (rate) {
        monthlyRate = rate / 100 / 12;
    }
    let monthlyPayment = principal * monthlyRate / (1 - (Math.pow(1 / (1 + monthlyRate), years * 12)));
    return {principal, years, rate, monthlyPayment, monthlyRate};
};

document.getElementById('calcBtn').addEventListener('click', () => {
    let principal = document.getElementById("principal").value;
    let years = document.getElementById("years").value;
    let rate = document.getElementById("rate").value;
    let {monthlyPayment, monthlyRate} = calculateAmortization(principal, years, rate);
    document.getElementById("monthlyPayment").innerHTML = monthlyPayment.toFixed(2);
    document.getElementById("monthlyRate").innerHTML = (monthlyRate * 100).toFixed(2);
    calculateAmortization(principal, years, rate).amortization.forEach(month => console.log(month));
});

let calculateAmortization = (principal, years, rate) => {
    let {monthlyRate, monthlyPayment} = calculateMonthlyPayment(principal, years, rate);
    let balance = principal;
    let amortization = [];
    for(let y = 0; y < years; y++){
        let interestY = 0;
        let principalY = 0;
        for(let m = 0; m < 12; m++){
            let interestM = balance * monthlyRate;  //interest payment for month month
            let principalM = monthlyPayment - interestM;    //Principal payment for month month
            interestY = interestY + interestM;
            principalY = principalY + principalM;
            balance = balance - principalY;
        }
        amortization.push({principalY, interestY, balance});
    }
    
    return {monthlyPayment, monthlyRate, amortization};
}