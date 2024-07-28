document.addEventListener('DOMContentLoaded', () => {
    // Existing button border animation
    const buttonBorder = document.querySelector('.button-border-rect');
    if (buttonBorder) {
        const buttonPerimeter = buttonBorder.getTotalLength();
        
        buttonBorder.style.strokeDasharray = `20 ${buttonPerimeter - 20}`;
        
        let offset = 0;
        const animationDuration = 3500; // 3.5 seconds for a full rotation
        
        function animateButton(timestamp) {
            if (!animateButton.startTime) {
                animateButton.startTime = timestamp;
            }
            
            const elapsed = timestamp - animateButton.startTime;
            offset = (elapsed % animationDuration) / animationDuration * buttonPerimeter;
            
            buttonBorder.style.strokeDashoffset = -offset;
            
            requestAnimationFrame(animateButton);
        }
        
        requestAnimationFrame(animateButton);
    }

    // New pill animation
    const movingPills = document.querySelector('.moving-pills');
    if (movingPills) {
        const pillRows = movingPills.querySelectorAll('.pill-row:not(.fixed-row)');

        pillRows.forEach((row) => {
            // Clone the content for seamless looping
            row.innerHTML += row.innerHTML;

            function animateRow() {
                row.style.transform = 'translateX(0)';
                row.animate(
                    [
                        { transform: 'translateX(0)' },
                        { transform: 'translateX(-50%)' }
                    ],
                    {
                        duration: 3000, // Keep the same 10-second duration
                        iterations: Infinity,
                        easing: 'linear'
                    }
                );
            }

            animateRow();
        });
    }
});