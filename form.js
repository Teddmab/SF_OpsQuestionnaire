document.getElementById('questionnaire-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const searchParams = new URLSearchParams();

    for (const pair of formData) {
        searchParams.append(pair[0], pair[1]);
    }

    fetch('/submit', {
        method: 'POST',
        body: searchParams
    }).then(function(response) {
        if (response.ok) {
            alert('Data has been submitted successfully!');
        } else {
            throw new Error('Error: ' + response.statusText);
        }
    }).catch(function(error) {
        console.log('There has been a problem with your fetch operation: ', error.message);
    });
});
