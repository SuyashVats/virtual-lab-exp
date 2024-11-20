let step = 0;
let calculationData = {};

// Show or hide sections based on selected operation
function toggleSections() {
    const operation = document.getElementById('operation').value;
    const ekadhikenaConditions = document.getElementById('conditions-ekadhikena');
    const nikhilamConditions = document.getElementById('conditions-nikhilam');
    const anurupenaConditions = document.getElementById('conditions-anurupena');
    const ekanyunenaConditions = document.getElementById('conditions-ekanyunena');
    const urdhvaConditions = document.getElementById('conditions-urdhva');
    const anurupenaInputs = document.getElementById('anurupenaInputs');
    const num1Input = document.getElementById('num1');
    const num2Input = document.getElementById('num2');
    const num1Label = document.getElementById('num1Label');
    const num2Label = document.getElementById('num2Label');
    const workingBaseInput = document.getElementById('workingBase');
    const constantBaseInput = document.getElementById('constantBase');

    ekadhikenaConditions.style.display = 'none';
    nikhilamConditions.style.display = 'none';
    anurupenaConditions.style.display = 'none';
    ekanyunenaConditions.style.display = 'none';
    urdhvaConditions.style.display = 'none';
    anurupenaInputs.style.display = 'none';

    if (operation) {
        num1Input.style.display = 'block';
        num2Input.style.display = 'block';
        num1Label.style.display = 'block';
        num2Label.style.display = 'block';
    } else {
        num1Input.style.display = 'none';
        num2Input.style.display = 'none';
        num1Label.style.display = 'none';
        num2Label.style.display = 'none';
    }

    switch (operation) {
        case 'ekadhikena':
            ekadhikenaConditions.style.display = 'block';
            num1Input.placeholder = 'e.g., 54';
            num2Input.placeholder = 'e.g., 56';
            break;
        case 'nikhilam':
            nikhilamConditions.style.display = 'block';
            num1Input.placeholder = 'e.g., 98';
            num2Input.placeholder = 'e.g., 97';
            break;
        case 'anurupena':
            anurupenaConditions.style.display = 'block';
            anurupenaInputs.style.display = 'block';
            num1Input.placeholder = 'e.g., 12';
            num2Input.placeholder = 'e.g., 13';
            workingBaseInput.placeholder = 'e.g., 10';
            constantBaseInput.placeholder = 'e.g., 100';
            break;
        case 'ekanyunena':
            ekanyunenaConditions.style.display = 'block';
            num1Input.placeholder = 'e.g., 98';
            num2Input.placeholder = 'e.g., 99';
            break;
        case 'urdhva':
            urdhvaConditions.style.display = 'block';
            num1Input.placeholder = 'e.g., 123';
            num2Input.placeholder = 'e.g., 456';
            break;
        default:
            num1Input.placeholder = '';
            num2Input.placeholder = '';
            workingBaseInput.placeholder = '';
            constantBaseInput.placeholder = '';
            break;
    }

    updateStartButtonState();
}

// Update the state of the Start button based on input values
function updateStartButtonState() {
    const operation = document.getElementById('operation').value;
    const num1 = document.getElementById('num1').value;
    const num2 = document.getElementById('num2').value;
    const workingBase = document.getElementById('workingBase').value;
    const constantBase = document.getElementById('constantBase').value;

    let enableStartButton = false;

    if (operation === 'anurupena') {
        enableStartButton = operation && num1 && num2 && workingBase && constantBase;
    } else {
        enableStartButton = operation && num1 && num2;
    }

    document.getElementById('startButton').disabled = !enableStartButton;
}

// Start the calculation
function startCalculation() {
    const operation = document.getElementById('operation').value;
    const num1 = parseInt(document.getElementById('num1').value);
    const num2 = parseInt(document.getElementById('num2').value);

    resetOutputs();
    step = 0;
    calculationData = {};

    switch (operation) {
        case 'ekadhikena':
            startEkadhikenaCalculation(num1, num2);
            break;
        case 'nikhilam':
            startNikhilamCalculation(num1, num2);
            break;
        case 'anurupena':
            const workingBase = parseInt(document.getElementById('workingBase').value);
            const constantBase = parseInt(document.getElementById('constantBase').value);
            startAnurupenaCalculation(num1, num2, workingBase, constantBase);
            break;
        case 'ekanyunena':
            startEkanyunenaCalculation(num1, num2);
            break;
        case 'urdhva':
            startUrdhvaCalculation(num1, num2);
            break;
        default:
            displayError('Please select an operation to proceed.');
            return;
    }

    document.getElementById('operation').disabled = true;
    document.getElementById('num1').disabled = true;
    document.getElementById('num2').disabled = true;
    document.getElementById('workingBase').disabled = true;
    document.getElementById('constantBase').disabled = true;
    document.getElementById('startButton').disabled = true;
    document.getElementById('nextButton').disabled = false;
}

// Start Ekadhikena Purvena calculation
function startEkadhikenaCalculation(num1, num2) {
    if (isNaN(num1) || isNaN(num2)) {
        displayError('Please enter valid numbers in both fields.');    
        return;
    }
    
    const A1 = Math.floor(num1 / 10);
    const A2 = Math.floor(num2 / 10);
    const B1 = num1 % 10;
    const B2 = num2 % 10;

    if (A1 !== A2 || B1 + B2 !== 10) {
        displayError('The first digits must be the same and the last digits must add up to 10.');
        return;
    }

    const base = A1 * (A1 + 1);
    const suffix = B1 * B2;
    const result = base * 100 + suffix;

    calculationData = {
        operation: 'ekadhikena',
        A1, A2, B1, B2, base, suffix, result,
        steps: [
            `First digits are the same: ${A1} and ${A2}`,
            `Last digits add up to 10: ${B1} + ${B2} = 10`,
            `Multiply the first digit (${A1}) by its successor (${A1 + 1}): ${A1} x ${A1 + 1} = ${base}`,
            `Multiply the last digits: ${B1} x ${B2} = ${suffix}`,
            `Multiply the last digits:${suffix}| ${base}`,
            `Combine the results: ${base} (base) + ${suffix} (suffix) = ${result}`
        ],
        currentStep: 0,
    };

    nextStep();
}

// Start Nikhilam Sutra calculation
function startNikhilamCalculation(num1, num2) {
    if (isNaN(num1) || isNaN(num2)) {
        displayError('Please enter valid numbers in both fields.');
        return;
    }

    const base = Math.pow(10, Math.max(num1.toString().length, num2.toString().length));
    const deficit1 = base - num1;
    const deficit2 = base - num2;
    const crossSum = num1 - deficit2; // Correct cross addition
    const product = deficit1 * deficit2;
    const result = crossSum * base + product;

    calculationData = {
        operation: 'nikhilam',
        base, deficit1, deficit2, crossSum, product, result,
        steps: [
            `Base value: ${base}`,
            `Deficit 1: Base - Num1 = ${base} - ${num1} = ${deficit1}`,
            `Deficit 2: Base - Num2 = ${base} - ${num2} = ${deficit2}`,
            `Cross sum: Num1 + Deficit 2 = ${num1} - ${deficit2} = ${crossSum}`,
            `Product of deficits: ${deficit1} * ${deficit2} = ${product}`,
            `Final result: (${crossSum}) * ${base} + ${product} = ${result}`
        ],
        currentStep: 0,
    };

    nextStep();
}


// Start Anurupena Method calculation
function startAnurupenaCalculation(num1, num2, workingBase, constantBase) {
    if (isNaN(num1) || isNaN(num2) || isNaN(workingBase) || isNaN(constantBase)) {
        displayError('Please enter valid numbers in all fields.');
        return;
    }

    let factor = 1;

    if (workingBase > constantBase) {
        // Find the factor by multiplying constantBase
        for (let i = 1; i <= workingBase; i++) {
            let x = constantBase * i;
            if (x === workingBase) {
                factor = i;
                break;
            }
        }
    } else {
        // Find the factor by dividing constantBase
        for (let i = 1; i <= constantBase; i++) {
            let x = constantBase / i;
            if (x === workingBase) {
                factor = i;
                break;
            }
        }
    }
    const deficit1 = workingBase - num1;
    const deficit2 = workingBase - num2;
    const crossSum = num1 - deficit2; 
    const product = deficit1 * deficit2;
    const result = num1*num2;
if(workingBase > constantBase){
    calculationData = {
        operation: 'anurupena',
        workingBase, constantBase, deficit1, deficit2, crossSum, product, result,
        steps: [
            `Working base: ${workingBase}`,
            `Constant base: ${constantBase}`,
            `Deficit 1: Working base - Num1 = ${workingBase} - ${num1} = ${deficit1}`,
            `Deficit 2: Working base - Num2 = ${workingBase} - ${num2} = ${deficit2}`,
            `Cross sum: Num1 - Deficit 2 = ${num1} - ${deficit2} = ${crossSum}`,
            `Cross sum: Num1 - Deficit 2 = ${crossSum} *${factor} `,
            `Product of deficits: ${deficit1} * ${deficit2} = ${product}`,
            `Final result:${result}`
        ],
        currentStep: 0,
    };
}
else{
    calculationData = {
        operation: 'anurupena',
        workingBase, constantBase, deficit1, deficit2, crossSum, product, result,
        steps: [
            `Working base: ${workingBase}`,
            `Constant base: ${constantBase}`,
            `Deficit 1: Working base - Num1 = ${workingBase} - ${num1} = ${deficit1}`,
            `Deficit 2: Working base - Num2 = ${workingBase} - ${num2} = ${deficit2}`,
            `Cross sum: Num1 - Deficit 2 = ${num1} - ${deficit2} = ${crossSum}`,
            `Cross sum: Num1 - Deficit 2 = ${crossSum} /${factor} `,
            `Product of deficits: ${deficit1} * ${deficit2} = ${product}`,
            `Final result: = ${result}`
        ],
        currentStep: 0,
    };
};

    nextStep();
}


// Start Ekanyunena Method calculation
function startEkanyunenaCalculation(num1, num2) {
    if (isNaN(num1) || isNaN(num2)) {
        displayError('Please enter valid numbers in both fields.');
        return;
    }

    const base = Math.pow(10, Math.max(num1.toString().length, num2.toString().length));
    const deficit1 = base - num1;
    const deficit2 = base - num2;
    const crossSum = deficit1 + deficit2;
    const product = deficit1 * deficit2;
      // Assuming Ekanyunena means num2 - (num1 - 1)
      var x = num1 - 1;
    var y = num2 - (num1 - 1);
    var p=y.toString()
    var q=num2.toString()
    if(y<9 || p.length<q.length){
    var z=[x,0,y]
    }
    else{
    var z=[x,y]
    };

    // The result array to hold the modified numbers
    const result = z.join('');
if(y>9) {
    calculationData = {
        operation: 'ekanyunena',
        base, deficit1, deficit2, crossSum, product, result,
        steps: [
            `Base value: ${base}`,
            `Deficit 1: Base - Num1 = ${base} - ${num1} = ${deficit1}`,
            `Deficit 2: Base - Num2 = ${base} - ${num2} = ${deficit2}`,
            `Cross sum: ${deficit1} + ${deficit2} = ${crossSum}`,
            `Product of deficits: ${deficit1} * ${deficit2} = ${product}`,
            `Intermediate result: X = Num1 - 1 = ${x}, | Y = Num2 - (Num1 - 1) = ${y}`,
            `Final result: Combine the results ${x}|${y}`
        ],
        currentStep: 0,
    };
}
else {
    calculationData = {
        operation: 'ekanyunena',
        base, deficit1, deficit2, crossSum, product, result,
        steps: [
            `Base value: ${base}`,
            `Deficit 1: Base - Num1 = ${base} - ${num1} = ${deficit1}`,
            `Deficit 2: Base - Num2 = ${base} - ${num2} = ${deficit2}`,
            `Cross sum: ${deficit1} + ${deficit2} = ${crossSum}`,
            `Product of deficits: ${deficit1} * ${deficit2} = ${product}`,
            `Intermediate result: X = Num1 - 1 = ${x}, | Y = Num2 - (Num1 - 1) = 0${y}`,
            `Final result: Combine the results ${x}|0${y}`
        ],
        currentStep: 0,
    };
}
    nextStep();
}

// Start Urdhva Tiryagbhyam calculation
function startUrdhvaCalculation(num1, num2) {
    if (isNaN(num1) || isNaN(num2)) {
        displayError('Please enter valid numbers in both fields.');
        return;
    }

    const steps = urdhvaTiryagbhyamSteps(num1, num2);
    const result = steps[steps.length - 1].result; // Get the final result from the last step
    calculationData = {
        operation: 'urdhva',
        steps,
        result,
        currentStep: 0,
    };

    nextStep();
}

// Urdhva Tiryagbhyam steps calculation
function urdhvaTiryagbhyamSteps(a, b) {
    const aStr = a.toString();
    const bStr = b.toString();
    const n = aStr.length + bStr.length;
    let result = 0;
    let carry = 0;
    let steps = [];

    for (let i = 0; i < n - 1; i++) {
        let sum = carry;
        let description = `Sum of products for position ${i + 1}: `;

        for (let j = 0; j <= i; j++) {
            if (j < aStr.length && (i - j) < bStr.length) {
                const product = parseInt(aStr[aStr.length - 1 - j], 10) * parseInt(bStr[bStr.length - 1 - (i - j)], 10);
                sum += product;
                description += `${aStr[aStr.length - 1 - j]} * ${bStr[bStr.length - 1 - (i - j)]} + `;
            }
        }

        description += `carry (${carry}) = ${sum}`;
        carry = Math.floor(sum / 10); // update the carry for the next step
        const currentDigit = sum % 10;
        result += currentDigit * Math.pow(10, i);
        steps.push({ description: description.trimEnd().slice(0, -1), result });
    }

    // Adding the final carry to the result
    result += carry * Math.pow(10, n - 2);
    steps.push({ description: `Final carry addition: ${carry}`, result });

    return steps;
}





// Function to proceed to the next step in the calculation
function nextStep() {
    if (calculationData.currentStep < calculationData.steps.length) {
        const step = calculationData.steps[calculationData.currentStep];
        console.log(`Step ${calculationData.currentStep + 1}: ${step.description}`);
        console.log(`Intermediate Result: ${step.result}`);
        calculationData.currentStep++;
    } else {
        console.log(`Final Result: ${calculationData.result}`);
    }
}


// Show the next step in the calculation
function nextStep() {
    const operation = calculationData.operation;
    let stepContent = '';

    switch (operation) {
        case 'ekadhikena':
        case 'nikhilam':
        case 'anurupena':
        case 'ekanyunena':
            stepContent = `<tr><td>Step ${step + 1}:</td><td>${calculationData.steps[step]}</td></tr>`;
            break;
        case 'urdhva':
            stepContent = `<tr><td>Step ${step + 1}:</td><td>${calculationData.steps[step].description}</td></tr>`;
            break;
    }

    document.getElementById('stepsTable').querySelector('tbody').innerHTML += stepContent;
    step++;

    if (step >= calculationData.steps.length) {
        displayResult(`Result: ${calculationData.result}`);
        document.getElementById('nextButton').disabled = true;
    }
}

// Display the result
function displayResult(result) {
    document.getElementById('resultDisplay').innerHTML = result;
    document.getElementById('resetButton').disabled = false; // Enable the reset button
    
}

// Display an error message
function displayError(message) {
    document.getElementById('resultDisplay').innerHTML = `<div class="error">${message}</div>`;
    document.getElementById('nextButton').disabled=true;
    document.getElementById('resetButton').disabled=false;
}

// Reset the calculator
function resetCalculator() {
    document.getElementById('operation').disabled = false;
    document.getElementById('num1').disabled = false;
    document.getElementById('num2').disabled = false;
    document.getElementById('workingBase').disabled = false;
    document.getElementById('constantBase').disabled = false;
    document.getElementById('startButton').disabled = false;
    document.getElementById('nextButton').disabled = true;
    document.getElementById('resetButton').disabled = true;

    document.getElementById('operation').value = '';
    document.getElementById('num1').value = '';
    document.getElementById('num2').value = '';
    document.getElementById('workingBase').value = '';
    document.getElementById('constantBase').value = '';

    resetOutputs();
    toggleSections();
}

// Reset the outputs
function resetOutputs() {
    document.getElementById('stepsTable').querySelector('tbody').innerHTML = '';
    document.getElementById('resultDisplay').innerHTML = '';
}

// Attach event listeners to input fields and select element
document.getElementById('operation').addEventListener('change', toggleSections);
document.getElementById('num1').addEventListener('input', updateStartButtonState);
document.getElementById('num2').addEventListener('input', updateStartButtonState);
document.getElementById('workingBase').addEventListener('input', updateStartButtonState);
document.getElementById('constantBase').addEventListener('input', updateStartButtonState);

// Initially hide input fields
document.getElementById('num1').style.display = 'none';
document.getElementById('num2').style.display = 'none';
document.getElementById('num1Label').style.display = 'none';
document.getElementById('num2Label').style.display = 'none';
document.getElementById('resetButton').disabled = true;
document.getElementById('startButton').disabled = true;
document.getElementById('nextButton').disabled = true;
