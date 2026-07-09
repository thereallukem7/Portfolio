// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  
  // Letter fade-in animation
  function animateLetters(element) {
    const text = element.innerText;
    element.innerHTML = '';
    
    text.split('').forEach((letter, index) => {
      const span = document.createElement('span');
      span.textContent = letter;
      span.className = 'letter';
      span.style.animationDelay = (index * 0.06) + 's';
      element.appendChild(span);
    });
  }

  // Apply letter animation to h1
  const h1 = document.querySelector('h1');
  const h2 = document.querySelector('h2');
  if (h1) animateLetters(h1);
  if (h2) animateLetters(h2);
  
  // Configuration options for the observer
  const observerOptions = {
    root: null,         
    rootMargin: "0px",  
    threshold: 0.15    
  };

  // Create the observer instance
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      // If the element is visible in the viewport
      if (entry.isIntersecting) {
        // Get the element's index among all fade-in elements
        const index = Array.from(hiddenElements).indexOf(entry.target);
        const delay = index * 100; // 100ms delay between each element
        
        // Delay adding the "show" class for staggered effect
        setTimeout(() => {
          entry.target.classList.add("show");
        }, delay);
        
        // Stop watching this element once it has faded in
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Target all elements with the .fade-in class and start tracking them
  const hiddenElements = document.querySelectorAll(".fade-in, .pure-fade-in");
  hiddenElements.forEach(element => observer.observe(element));
});
