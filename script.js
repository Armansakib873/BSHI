 // Initialize table with 20 rows
 const tableBody = document.querySelector('#patientTable tbody');
 for (let i = 1; i <= 20; i++) {
     const row = document.createElement('tr');
     row.innerHTML = `
         <td>${i}</td>
         <td><input type="number" step="0.01" aria-label="Test Conc" oninput="calculateResult(this)" onkeydown="moveToNextField(event)"></td>
         <td>0.00</td>`;
     tableBody.appendChild(row);
 }

 function calculateCF() {
     const factor = parseFloat(document.getElementById('factor').value);
     const conc = parseFloat(document.getElementById('conc').value);

     if (!isNaN(factor) && !isNaN(conc)) {
         const cf = conc * factor;
         document.getElementById('cf').value = cf.toFixed(4);

         // Recalculate all results when CF changes
         document.querySelectorAll('#patientTable tbody tr').forEach(row => {
             const testConcInput = row.cells[1].querySelector('input');
             if (testConcInput.value) {
                 calculateResult(testConcInput);
             }
         });

         // Enable all Test Conc inputs
         enableTestConcInputs(true);
     } else {
         document.getElementById('cf').value = ''; // Clear CF if inputs are invalid
         enableTestConcInputs(false);
     }
 }

 function calculateResult(input) {
     const cf = parseFloat(document.getElementById('cf').value);
     if (isNaN(cf)) {
         return; // CF must be calculated first
     }

     const testConc = parseFloat(input.value);
     const resultCell = input.parentNode.nextElementSibling;

     if (!isNaN(testConc)) {
         const result = testConc / cf;
         resultCell.textContent = result.toFixed(2);
         resultCell.className = result > 1 ? 'bold-red' : '';
     } else {
         resultCell.textContent = '0.00'; // Clear result if input is invalid
         resultCell.className = '';
     }
 }

 function reset() {
console.log("Reset function called");

// Clear the main input fields
document.getElementById('factor').value = '';
document.getElementById('conc').value = '';
document.getElementById('cf').value = '';
console.log("Main fields cleared");

// Clear all Test Conc inputs and reset result cells
const rows = document.querySelectorAll('#patientTable tbody tr');
console.log(`Found ${rows.length} rows in the table`);

rows.forEach((row, index) => {
 const testConcInput = row.cells[1].querySelector('input');
 if (testConcInput) {
     testConcInput.value = '';
     console.log(`Cleared Test Conc input for row ${index + 1}`);
 } else {
     console.log(`No Test Conc input found for row ${index + 1}`);
 }
 
 if (row.cells[2]) {
     row.cells[2].textContent = '0.00';
     row.cells[2].className = '';
     console.log(`Reset result cell for row ${index + 1}`);
 } else {
     console.log(`No result cell found for row ${index + 1}`);
 }
});

// Disable Test Conc inputs
enableTestConcInputs(false);
console.log("Test Conc inputs disabled");
}

// Make sure the reset button is properly connected to the reset function
document.addEventListener('DOMContentLoaded', (event) => {
const resetButton = document.getElementById('resetButton');
if (resetButton) {
 resetButton.addEventListener('click', reset);
 console.log("Reset button event listener added");
} else {
 console.log("Reset button not found");
}
});

 function moveToNextField(event) {
     if (event.key === "Enter") {
         event.preventDefault();  // Prevent form submission on Enter key
         const allInputs = Array.from(document.querySelectorAll('input[type="number"]:not(#cf):not([id^="reset"])'));
         const currentInput = event.target;
         const currentIndex = allInputs.indexOf(currentInput);
         const nextInput = allInputs[currentIndex + 1];

         if (nextInput) {
             nextInput.focus();
         }
     }
 }

 function enableTestConcInputs(enable) {
     document.querySelectorAll('#patientTable tbody tr input[type="number"]').forEach(input => {
         input.disabled = !enable;
     });
 }

 // Initial call to disable Test Conc inputs
 enableTestConcInputs(false);

// Existing code...

function printDiv(divId) {
    let printWindow = window.open('', '_blank');
    let elementToPrint = document.getElementById(divId);
    let clonedElement = elementToPrint.cloneNode(true);
    
    let originalInputs = elementToPrint.querySelectorAll('input');
    let clonedInputs = clonedElement.querySelectorAll('input');
    for (let i = 0; i < originalInputs.length; i++) {
        clonedInputs[i].value = originalInputs[i].value;
        clonedInputs[i].setAttribute('value', originalInputs[i].value);
    }

    // Remove hover-message elements
    clonedElement.querySelectorAll('.hover-message').forEach(el => el.remove());

    let printContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>FACTOR Calculation Tool - Print Version</title>
            <style>
                body { 
                    font-family: Arial, sans-serif; 
                    line-height: 1.6; 
                    color: #333;
                    padding: 20px;
                }
                h1 {
                    color: #2c3e50;
                    border-bottom: 2px solid #3498db;
                    padding-bottom: 10px;
                }
                .input-section {
                    background-color: #f9f9f9;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    padding: 15px;
                    margin-bottom: 20px;
                }
                .input-group {
                    margin-bottom: 10px;
                }
                label {
                    font-weight: bold;
                    margin-right: 10px;
                }
                input { 
                    border: 1px solid #ccc;
                    padding: 5px;
                    border-radius: 3px;
                    font-family: inherit;
                    font-size: inherit;
                    background-color: transparent;
                }
                table { 
                    border-collapse: collapse; 
                    width: 100%;
                    margin-top: 20px;
                }
                th, td { 
                    border: 1px solid #ddd; 
                    padding: 12px; 
                    text-align: left; 
                }
                th {
                    background-color: #f2f2f2;
                    font-weight: bold;
                }
                .hover-message, button, .container2 { 
                    display: none; 
                }
                @media print {
                    body * { visibility: visible; }
                    input { 
                        color-adjust: exact; 
                        -webkit-print-color-adjust: exact; 
                        print-color-adjust: exact;
                        border: none;
                    }
                    input[type="number"] {
                        -moz-appearance: textfield;
                    }
                    input::-webkit-outer-spin-button,
                    input::-webkit-inner-spin-button {
                        -webkit-appearance: none;
                        margin: 0;
                    }
                }
            </style>
        </head>
        <body>
            ${clonedElement.outerHTML}
            <script>
                window.onload = function() {
                    document.querySelectorAll('input').forEach(input => {
                        if (input.value) {
                            input.setAttribute('value', input.value);
                        }
                    });
                    window.print();
                    window.close();
                }
            </script>
        </body>
        </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
}

// Make sure to call this function when the page loads
window.onload = function() {
    // Existing onload code...
    document.getElementById('printButton').addEventListener('click', () => printDiv('container'));
}
