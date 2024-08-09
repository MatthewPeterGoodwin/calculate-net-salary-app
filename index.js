const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.post('/calculate-net-salary', (request, response) => {
    const { grossAnnualSalary } = request.body;

    if (!grossAnnualSalary || isNaN(grossAnnualSalary) || grossAnnualSalary < 0) {
        return response.status(400).json({ error: 'Invalid salary value' });
    }

    const personalAllowance = 12570;
    const basicRateThreshold = 50270;
    const higherRateThreshold = 125140;

    let netAnnualSalary = grossAnnualSalary;

    if (grossAnnualSalary <= personalAllowance) {
        return response.json({ netAnnualSalary: grossAnnualSalary });
    }

    // Basic rate
    let taxableIncome = grossAnnualSalary - personalAllowance;
    if (grossAnnualSalary <= basicRateThreshold) {
        netAnnualSalary -= taxableIncome * 0.2; // 20%
        return response.json({ netAnnualSalary });
    }

    // Higher rate
    taxableIncome = grossAnnualSalary - basicRateThreshold;
    netAnnualSalary -= (basicRateThreshold - personalAllowance) * 0.2; // 20%
    if (grossAnnualSalary <= higherRateThreshold) {
        netAnnualSalary -= taxableIncome * 0.4; // 40%
        return response.json({ netAnnualSalary });
    }

    // Additional rate
    taxableIncome = grossAnnualSalary - higherRateThreshold;
    netAnnualSalary -= (basicRateThreshold - personalAllowance) * 0.2; // 20%
    netAnnualSalary -= (higherRateThreshold - basicRateThreshold) * 0.4; // 40%
    netAnnualSalary -= taxableIncome * 0.45; // 45%

    response.json({ netAnnualSalary });
});
