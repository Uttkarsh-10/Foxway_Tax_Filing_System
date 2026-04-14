// Individual Tax
function calculateIndividualTax(income) {
    let tax = 0;

    if (income <= 300000) return 0;

    if (income > 300000)
        tax += Math.min(income - 300000, 300000) * 0.05;

    if (income > 600000)
        tax += Math.min(income - 600000, 300000) * 0.10;

    if (income > 900000)
        tax += Math.min(income - 900000, 300000) * 0.15;

    if (income > 1200000)
        tax += Math.min(income - 1200000, 300000) * 0.20;

    if (income > 1500000)
        tax += (income - 1500000) * 0.30;

    return tax;
}

// Corporate Tax
function calculateCorporateTax(profit, taxType) {
    if (taxType === "startup") return profit * 0.15;
    return profit * 0.25;
}

module.exports = {
    calculateIndividualTax,
    calculateCorporateTax
};