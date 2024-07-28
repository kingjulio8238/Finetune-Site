document.addEventListener('DOMContentLoaded', () => {
    const buttonBorder = document.querySelector('.button-border-rect');
    const buttonPerimeter = buttonBorder.getTotalLength();
    
    buttonBorder.style.strokeDasharray = `20 ${buttonPerimeter - 20}`;
    
    let offset = 0;
    const animationDuration = 3500; // 2 seconds for a full rotation
    
    function animate(timestamp) {
        if (!animate.startTime) {
            animate.startTime = timestamp;
        }
        
        const elapsed = timestamp - animate.startTime;
        offset = (elapsed % animationDuration) / animationDuration * buttonPerimeter;
        
        buttonBorder.style.strokeDashoffset = -offset;
        
        requestAnimationFrame(animate);
    }
    
    requestAnimationFrame(animate);
});