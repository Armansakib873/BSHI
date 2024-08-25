document.querySelectorAll('.table-seba tbody tr').forEach(function(row) {
    row.addEventListener('mouseenter', function() {
        const hoverSound = document.getElementById('hoverSound');
        hoverSound.currentTime = 0; // Reset the audio to the beginning
        hoverSound.play();
    });
});
