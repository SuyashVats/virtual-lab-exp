
let step = 0;
let calculationData = {};

function startDivision() {
    const dividend = parseInt(document.getElementById('dividend').value);
    const divisor = parseInt(document.getElementById('divisor').value);
    const method = document.getElementById('method').value;

    if (isNaN(dividend) || isNaN(divisor) || divisor === 0) {
        displayError('Please enter valid numbers and make sure the divisor is not zero.');
        return;
    }

    document.getElementById('method').disabled = true;
    document.getElementById('dividend').disabled = true;
    document.getElementById('divisor').disabled = true;
    document.getElementById('startButton').disabled = true;

    if (method === 'nikhilam') {
        startNikhilamDivision(dividend, divisor);
    } else if (method === 'paravartya') {
        startParavartyaDivision(dividend, divisor);
    } else if (method === 'anurupyena') {
        startAnurupyenaDivision(dividend, divisor);
    }
}

function showConditions() {
    const method = document.getElementById('method').value;
    const conditionsDisplay = document.getElementById('conditionsDisplay');
    const conditionsSection = document.getElementById('conditionsSection');
    const dividendLabel = document.querySelector('label[for="dividend"]');
    const divisorLabel = document.querySelector('label[for="divisor"]');
    const dividendInput = document.getElementById('dividend');
    const divisorInput = document.getElementById('divisor');

    if (method === 'nikhilam' || method === 'paravartya' || method === 'anurupyena') {
        const methodConditions = {
            nikhilam: {
                description: `
                    <ul>
                        <li>Suitable for divisions where the divisor is near a power of 10.</li>
                        <li>Requires finding the base and the complement of the divisor.</li>
                    </ul>`,
                placeholder: { dividend: "e.g., 10013", divisor: "e.g., 89" }
            },
            paravartya: {
                description: `
                    <ul>
                        <li>Suitable for divisions involving a digit-based divisor.</li>
                        <li>Requires transposing the divisor and handling remainder and quotient accordingly.</li>
                    </ul>`,
                placeholder: { dividend: "e.g., 1234", divisor: "e.g., 112" }
            },
            anurupyena: {
                description: `
                    <ul>
                        <li>Suitable for divisions where the divisor is close to a power of 10.</li>
                        <li>Requires calculating the base and the difference from the base.</li>
                    </ul>`,
                placeholder: { dividend: "e.g., 1234", divisor: "e.g., 9" }
            }
        };

        conditionsDisplay.innerHTML = methodConditions[method].description;
        conditionsSection.style.display = 'block';
        dividendLabel.style.display = 'block';
        divisorLabel.style.display = 'block';
        dividendInput.style.display = 'block';
        divisorInput.style.display = 'block';
        dividendInput.placeholder = methodConditions[method].placeholder.dividend;
        divisorInput.placeholder = methodConditions[method].placeholder.divisor;
    } else {
        conditionsSection.style.display = 'none';
        dividendLabel.style.display = 'none';
        divisorLabel.style.display = 'none';
        dividendInput.style.display = 'none';
        divisorInput.style.display = 'none';
    }

    validateInputs();
}

function validateInputs() {
    const method = document.getElementById('method').value;
    const dividend = document.getElementById('dividend').value;
    const divisor = document.getElementById('divisor').value;

    if (method !== 'default' && dividend !== '' && divisor !== '') {
        document.getElementById('startButton').disabled = false;
    } else {
        document.getElementById('startButton').disabled = true;
    }
}
function startNikhilamDivision(dividend, divisor) {
  const base = Math.pow(10, divisor.toString().length); // Base is 100 for divisor 89
  const divisorComplement = base - divisor; // Complement is 11 (100 - 89)

  let quotientPart = Math.floor(dividend / base); // Get the first part of the quotient
  let remainderPart = dividend % base; // Get the remainder part (e.g., remainderPart = 13)

  let steps = [
    `Identify the base: ${base}`,
    `Calculate the complement of the divisor: Base - Divisor = ${base} - ${divisor} = ${divisorComplement}`,
    `Separate the dividend: Quotient part = ${quotientPart}, Remainder part = ${remainderPart}`
  ];

  // Initialize variables
  let quotient = quotientPart.toString().split('').map(Number); // Convert quotient part into an array of digits
  let remainder = remainderPart; // Start with the initial remainder part

  // Process each digit in the quotient part
  for (let i = 0; i < quotient.length; i++) {
    let currentDigit = quotient[i]; // Current digit of the quotient part

    // Multiply the current digit by the complement of the divisor
    let product = currentDigit * divisorComplement;

    steps.push(` Multiply the current quotient digit (${currentDigit}) by the complement (${divisorComplement}): ${currentDigit} * ${divisorComplement} = ${product}`);

    // Subtract the product from the remainder part
    remainder = remainder - product;


    // If there are more digits to process, bring down the next digit
    if (i + 1 < quotient.length) {
      remainder = parseInt(remainder.toString() + quotient[i + 1].toString());
      
    }
  }
  steps.push(` Now we add the remaining digits of Remainder `);
  steps.push(` Bring down the next digit. Updated remainder = ${dividend % divisor}`);
  // Adjust final quotient and remainder
  let finalQuotient = Math.floor(dividend / divisor); // Final quotient
  let finalRemainder = dividend % divisor; // Final remainder

  steps.push(`Final quotient after processing: ${finalQuotient}`);
  steps.push(`Final remainder: ${finalRemainder}`);

  calculationData = {
    base,
    divisorComplement,
    quotient: finalQuotient,
    remainder: finalRemainder,
    steps: steps,
    currentStep: 0
  };

  step = 0;
  document.getElementById('nextButton').disabled = false;
  nextStep();
}


function startParavartyaDivision(dividend, divisor) {
    // Base and difference calculation
    const base = 100;
    const difference = base - divisor;

    // Convert divisor to a string and create modified divisor
    const divisorStr = String(divisor);
    const modifiedDivisor = divisorStr.split('').map((digit, index) => {
        return index === 0 ? -digit : -digit;
    }).join('');

    // Initialize variables
    let quotient = '';
    let remainder = 0;
    let partialDividend = 0;

    // Process each digit of the dividend
    for (let i = 0; i < String(dividend).length; i++) {
        let currentDigit = Number(String(dividend)[i]);
        partialDividend = remainder * 10 + currentDigit;
        let quotientDigit = Math.floor(partialDividend / divisor);
        remainder = partialDividend % divisor;

        quotient += quotientDigit;
    }

    // Ensure that quotient and remainder are valid numbers
    const finalQuotient = quotient === '' ? 0 : parseInt(quotient, 10);
    const finalRemainder = remainder;

    // Setting up the calculation data object with detailed steps
    calculationData = {
        base,
        divisor,
        modifiedDivisor: parseInt(modifiedDivisor, 10),
        quotient: finalQuotient,
        remainder: finalRemainder,
        steps: [
            `Calculate the difference between base and divisor: ${base} - ${divisor} = ${difference}`,
            `Create modified divisor by negating its digits: ${modifiedDivisor}`,
            `Process each digit of the dividend. Start with initial partial dividend 0.`,
            `For each digit of the dividend, calculate partial dividend, quotient digit, and update remainder.`,
            `After processing all digits, the final quotient is: ${finalQuotient}`,
            `The final remainder is: ${finalRemainder}`
        ],
        currentStep: 0
    };

    // Resetting step and enabling the next button
    step = 0;
    document.getElementById('nextButton').disabled = false;
    nextStep();
}


function startAnurupyenaDivision(dividend, divisor) {
    let steps = [];
    let quotient = 0;
    let remainder = 0;

    // Convert dividend to string to handle each digit separately
    let dividendStr = dividend.toString();

    // Initial step
    let currentNumber = 0;
    let currentQuotient = 0;

    for (let i = 0; i < dividendStr.length; i++) {
        currentNumber = currentNumber * 10 + parseInt(dividendStr[i]);

        if (currentNumber >= divisor) {
            currentQuotient = Math.floor(currentNumber / divisor);
            remainder = currentNumber % divisor;
            quotient = quotient * 10 + currentQuotient;

            steps.push(`Divide ${currentNumber} by ${divisor} to get ${currentQuotient} (remainder ${remainder})`);

            // Update currentNumber to the remainder
            currentNumber = remainder;
        } else {
            steps.push(`Current number ${currentNumber} is less than ${divisor}, bring down the next digit.`);
            quotient = quotient * 10;
        }
    }

    // Final result
    const finalRemainder = currentNumber;

    calculationData = {
        base: divisor,
        difference: 0, // Not used in this implementation
        quotient,
        remainder: finalRemainder,
        adjustedQuotient: quotient,
        finalRemainder,
        steps,
        currentStep: 0
    };

    // Setup for step-by-step execution
    step = 0;
    document.getElementById('nextButton').disabled = false;
    nextStep();
}


function nextStep() {
    if (step < calculationData.steps.length) {
        const stepDescription = calculationData.steps[step];
        const stepsTableBody = document.getElementById('stepsTable').querySelector('tbody');

        const newRow = document.createElement('tr');
        const newCell = document.createElement('td');
        newCell.textContent = `Step ${step + 1}: ${stepDescription}`;
        newRow.appendChild(newCell);
        stepsTableBody.appendChild(newRow);

        step++;
    } else {
        document.getElementById('nextButton').disabled = true;
        displayResult();
    }
}

function displayResult() {
    const method = document.getElementById('method').value;
    let resultText;

    // Check the selected method and format result accordingly
    if (method === 'nikhilam') {
        resultText = `Quotient: ${calculationData.quotient}, Remainder: ${calculationData.remainder}`;
    } else if (method === 'paravartya') {
        resultText = `Final Quotient: ${calculationData.quotient}, Final Remainder: ${calculationData.remainder}`;
    } else if (method === 'anurupyena') {
        resultText = `Final Quotient: ${calculationData.quotient}, Final Remainder: ${calculationData.remainder}`;
    }

    // Display the result
    const resultDisplay = document.getElementById('resultDisplay');
    resultDisplay.textContent = resultText;

    // Enable the reset button
    document.getElementById('resetButton').disabled = false;
}

function resetCalculator() {
    step = 0;
    calculationData = {};

    document.getElementById('method').disabled = false;
    document.getElementById('dividend').disabled = false;
    document.getElementById('divisor').disabled = false;

    document.getElementById('dividend').value = '';
    document.getElementById('divisor').value = '';

    document.getElementById('nextButton').disabled = true;
    document.getElementById('resetButton').disabled = true;
    document.getElementById('startButton').disabled = true;

    document.getElementById('stepsTable').querySelector('tbody').innerHTML = '';
    document.getElementById('resultDisplay').textContent = '';

    showConditions();
}

function displayError(message) {
    alert(message);
}