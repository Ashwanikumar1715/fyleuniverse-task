document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('taxForm');
    const modal = document.getElementById('modal');
    const resultDiv = document.getElementById('result');
    const closeBtn = document.getElementsByClassName('close')[0];

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const age = document.getElementById('age').value;
        const income = parseFloat(document.getElementById('income').value) || 0;
        const extraIncome = parseFloat(document.getElementById('extraIncome').value) || 0;
        const deductions = parseFloat(document.getElementById('deductions').value) || 0;

        // Validate input fields
        const ageError = document.getElementById('ageError');
        const incomeError = document.getElementById('incomeError');
        const extraIncomeError = document.getElementById('extraIncomeError');
        const deductionsError = document.getElementById('deductionsError');
        const errorTooltip = document.getElementById('errorTooltip');

        let valid = true;
        if (!age) {
            ageError.style.display = 'inline';
            errorTooltip.innerHTML = 'Age group is required';
            valid = false;
        } else {
            ageError.style.display = 'none';
        }
        if (!income || isNaN(income)) {
            incomeError.style.display = 'inline';
            incomeError.innerHTML = 'Please enter a valid income';
            valid = false;
        } else {
            incomeError.style.display = 'none';
        }
        if ( isNaN(extraIncome)) {
            extraIncomeError.style.display = 'inline';
            extraIncomeError.innerHTML = 'Please enter a valid no.';
            errorTooltip.innerHTML = 'Please enter a valid extra income';
            valid = false;
        } else {
            extraIncomeError.style.display = 'none';
        }
        if (isNaN(deductions)) {
            deductionsError.style.display = 'inline';
            extraIncomeError.innerHTML = 'Please enter a valid income';
            errorTooltip.innerHTML = 'Please enter a valid deductions';
            valid = false;
        } else {
            deductionsError.style.display = 'none';
        }

        if (valid) {
            // Perform tax calculation
            let tax = 0;
            if (income + extraIncome - deductions > 800000) {
                if (age === 'below40') {
                    tax = 0.3 * (income + extraIncome - 800000);
                } else if (age === '40to60') {
                    tax = 0.4 * (income + extraIncome - 800000);
                } else if (age === 'above60') {
                    tax = 0.1 * (income + extraIncome - 800000);
                }
            }

            // Display result in modal
            resultDiv.innerHTML = `Tax to be paid: ₹${tax.toFixed(2)}`;
            showModal();
        }
    });

    function showModal() {
        modal.style.display = 'block';
        closeBtn.onclick = function() {
            modal.style.display = 'none';
        };
        window.onclick = function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        };
    }
});
