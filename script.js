document.addEventListener('DOMContentLoaded', function () {
    const theoryInputs = document.querySelectorAll('.theory');
    const practicalInputs = document.querySelectorAll('.practical');
    const totalSpans = document.querySelectorAll('.total');
    const wordsSpans = document.querySelectorAll('.words');
    const overallTotalSpan = document.getElementById('overalltotal');
    const overallTotalWordSpan = document.getElementById('overalltotalword');
    const resultSpan = document.getElementById('result');
    const percentageSpan = document.getElementById('percentage');
    const gradeSpan = document.getElementById('grade');

    function calculateTotals() {
        let grandTotal = 0;
        let totalMaxMarks = 0;
        let passed = true;

        theoryInputs.forEach((input, index) => {
            const theoryValue = parseFloat(input.value) || 0;
            const practicalValue = parseFloat(practicalInputs[index]?.value) || 0;
            const totalValue = theoryValue + practicalValue;

            totalSpans[index].textContent = totalValue;
            wordsSpans[index].textContent = numberToWords(totalValue);

            grandTotal += totalValue;
            totalMaxMarks += 100;
            if (theoryValue < 40 || practicalValue < 40) {
                passed = false;
            }
        });

        const percentage = (grandTotal / totalMaxMarks) * 100;
        const grade = calculateGrade(percentage);

        overallTotalSpan.textContent = grandTotal;
        overallTotalWordSpan.textContent = numberToWords(grandTotal);
        percentageSpan.textContent = percentage.toFixed(2) + '%';
        gradeSpan.textContent = grade;
        resultSpan.textContent = passed ? 'PASS' : 'FAIL';
    }

    function numberToWords(num) {
        const a = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
        const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

        if (num === 0) return 'Zero';

        if (num < 20) return a[num];

        let numString = num.toString();
        if (numString.length === 2) {
            return b[parseInt(numString[0])] + (a[parseInt(numString[1])] === '' ? '' : ' ' + a[parseInt(numString[1])]);
        }

        if (numString.length === 3) {
            return a[parseInt(numString[0])] + ' hundred' + (parseInt(numString[1] + numString[2]) === 0 ? '' : ' and ' + numberToWords(parseInt(numString[1] + numString[2])));
        }

        return '';
    }

    function calculateGrade(percentage) {
        if (percentage >= 90) return 'A+';
        if (percentage >= 80) return 'A';
        if (percentage >= 70) return 'B+';
        if (percentage >= 60) return 'B';
        if (percentage >= 50) return 'C+';
        if (percentage >= 40) return 'C';
        return 'F';
    }

    theoryInputs.forEach(input => input.addEventListener('input', calculateTotals));
    practicalInputs.forEach(input => input.addEventListener('input', calculateTotals));

    calculateTotals();
});
