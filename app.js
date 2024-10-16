let questions = [];

// Function to read and parse the Excel file
document.getElementById('fileUpload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const excelData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

            // Assuming the first row is a header, start reading from the second row
            questions = excelData.slice(1).map(row => row[1]).filter(q => q);
            if (questions.length > 0) {
                document.getElementById('randomBtn').disabled = false;
                document.getElementById('question').textContent = "File loaded! Click 'Get Random Question' to begin.";
            } else {
                document.getElementById('question').textContent = "No questions found in the uploaded file.";
            }
        };
        reader.readAsArrayBuffer(file);
    }
});

// Function to generate a random question
document.getElementById('randomBtn').addEventListener('click', function() {
    if (questions.length > 0) {
        const randomIndex = Math.floor(Math.random() * questions.length);
        const randomQuestion = questions[randomIndex];
        document.getElementById('question').textContent = randomQuestion;
    }
});
