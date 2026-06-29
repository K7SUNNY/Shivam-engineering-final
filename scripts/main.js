// Shivam Engineering - Redesigned Interactive Frontend Scripts

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initHeaderScroll();
  initFormHandling();
  initCounters();
  initProjectFilters();
  initPipelineCalculator();
  initScrollAnimations();
});

// --- Mobile Menu Handler (Accessibility optimized) ---
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!mobileMenuBtn || !mobileMenu) return;

  const menuIcon = mobileMenuBtn.querySelector('.menu-icon');
  const closeIcon = mobileMenuBtn.querySelector('.close-icon');

  function toggleMenu(forceClose = false) {
    const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
    const shouldClose = forceClose || isExpanded;

    if (shouldClose) {
      mobileMenu.classList.add('hidden');
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    } else {
      mobileMenu.classList.remove('hidden');
      menuIcon.classList.add('hidden');
      closeIcon.classList.remove('hidden');
      mobileMenuBtn.setAttribute('aria-expanded', 'true');
    }
  }

  mobileMenuBtn.addEventListener('click', () => toggleMenu());

  // Close menu on link clicks
  const mobileNavLinks = mobileMenu.querySelectorAll('.mobile-nav-link');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(true));
  });

  // Keyboard navigation - close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenuBtn.getAttribute('aria-expanded') === 'true') {
      toggleMenu(true);
      mobileMenuBtn.focus();
    }
  });
}

// --- Shrinking Header Scroll Handler ---
function initHeaderScroll() {
  const nav = document.querySelector('.navigation');
  if (!nav) return;

  const handleScroll = () => {
    if (window.scrollY > 50) {
      nav.classList.add('shrink');
    } else {
      nav.classList.remove('shrink');
    }
  };
  
  // Throttle scroll event slightly for performance
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  });
  
  // Initial check
  handleScroll();
}

// --- Form Validation and Submission ---
function initFormHandling() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        isValid = false;
        field.style.borderColor = 'var(--danger)';
        
        // Show validation state via parent
        const parent = field.closest('.form-group');
        if (parent) parent.classList.add('has-error');
      } else {
        field.style.borderColor = '';
        const parent = field.closest('.form-group');
        if (parent) parent.classList.remove('has-error');
      }
    });

    if (!isValid) {
      showNotification('Please fill out all required fields marked with *', 'error');
      return;
    }

    // Submit button state change
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending Message...';
    submitBtn.disabled = true;

    // Send data to contact.php
    fetch('contact.php', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (response.ok) {
        showNotification('Thank you! Your message has been sent successfully.', 'success');
        form.reset();
        
        // Reset floating labels
        form.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
          input.dispatchEvent(new Event('input'));
        });
        
        // Reload after 2 seconds
        setTimeout(() => {
          window.location.reload();
        }, 2200);
      } else {
        showNotification('Something went wrong on the server. Please try again.', 'error');
      }
    })
    .catch(() => {
      showNotification('Connection error. Failed to send message.', 'error');
    })
    .finally(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    });
  });

  // Track value presence for floating labels
  const inputs = form.querySelectorAll('.form-group input, .form-group textarea');
  inputs.forEach(input => {
    const handleInput = () => {
      if (input.value.trim() !== '') {
        input.classList.add('not-empty');
      } else {
        input.classList.remove('not-empty');
      }
    };
    input.addEventListener('input', handleInput);
    handleInput(); // Initial run
  });
}

// --- Notification System ---
function showNotification(message, type = 'info') {
  // Clear any existing notifications
  const oldNotifications = document.querySelectorAll('.notification');
  oldNotifications.forEach(n => n.remove());

  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  
  // Icon creation
  let iconSVG = '';
  if (type === 'success') {
    iconSVG = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
  } else if (type === 'error') {
    iconSVG = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
  } else {
    iconSVG = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
  }

  notification.innerHTML = `${iconSVG}<span>${message}</span>`;
  document.body.appendChild(notification);
  
  // Trigger animation
  setTimeout(() => {
    notification.classList.add('show');
  }, 50);
  
  // Dismiss after 4.5 seconds
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove();
    }, 400);
  }, 4500);
}

// --- Statistics Counter Animation ---
function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  if (counters.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const rawTargetText = counter.textContent;
        const targetNumber = parseInt(rawTargetText.replace(/[^\d]/g, ''));
        const prefix = rawTargetText.match(/^[^\d]*/)[0] || '';
        const suffix = rawTargetText.match(/[^\d]*$/)[0] || '';
        
        let start = 0;
        const duration = 1500; // ms
        const startTime = performance.now();

        const animate = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // EaseOutQuad
          const easeProgress = progress * (2 - progress);
          const currentVal = Math.floor(easeProgress * targetNumber);
          
          counter.textContent = prefix + currentVal + suffix;

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            counter.textContent = rawTargetText; // Set final text
          }
        };

        requestAnimationFrame(animate);
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

// --- Filterable Project Portfolio (on projects.html) ---
function initProjectFilters() {
  const filterContainer = document.querySelector('.project-filters');
  const projectGrid = document.querySelector('.projects-grid');
  if (!filterContainer || !projectGrid) return;

  const buttons = filterContainer.querySelectorAll('.filter-btn');
  const cards = projectGrid.querySelectorAll('.project-card');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active states
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      cards.forEach(card => {
        const category = card.dataset.category;
        const status = card.dataset.status;

        const matchesCategory = filter === 'all' || category === filter;
        const matchesStatus = filter === 'completed' && status === 'completed' || 
                              filter === 'ongoing' && status === 'ongoing';

        if (matchesCategory || matchesStatus) {
          card.classList.remove('hidden');
          // Simple reveal animation
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
            card.style.transition = 'all var(--transition-normal)';
          }, 30);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

// --- Interactive Pipeline Cost Calculator (on contact.html) ---
function initPipelineCalculator() {
  const calcContainer = document.getElementById('pipeline-calculator');
  if (!calcContainer) return;

  const lengthInput = document.getElementById('calc-length');
  const diameterSelect = document.getElementById('calc-diameter');
  const materialSelect = document.getElementById('calc-material');
  const terrainSelect = document.getElementById('calc-terrain');
  
  const estimateMinDisplay = document.getElementById('est-min');
  const estimateMaxDisplay = document.getElementById('est-max');
  const btnApplyCalc = document.getElementById('apply-calc-btn');

  function calculateCost() {
    const length = parseFloat(lengthInput.value) || 0;
    if (length <= 0) {
      estimateMinDisplay.textContent = '₹0.00';
      estimateMaxDisplay.textContent = '₹0.00';
      btnApplyCalc.disabled = true;
      return;
    }

    // Base Rate per KM (in Lakhs INR)
    const baseRate = 18.0; 

    // Diameter Multipliers
    const diameterMultipliers = {
      '4': 1.0,
      '6': 1.35,
      '8': 1.70,
      '12': 2.45
    };
    
    // Material Multipliers
    const materialMultipliers = {
      'carbon-steel': 1.0,
      'hdpe': 0.75,
      'stainless-steel': 1.5,
      'pvc': 0.55
    };

    // Terrain Multipliers
    const terrainMultipliers = {
      'rural': 1.0,
      'urban': 1.6,
      'mountainous': 2.1,
      'underwater': 3.2
    };

    const diamVal = diameterSelect.value;
    const matVal = materialSelect.value;
    const terrVal = terrainSelect.value;

    const diameterFactor = diameterMultipliers[diamVal] || 1.0;
    const materialFactor = materialMultipliers[matVal] || 1.0;
    const terrainFactor = terrainMultipliers[terrVal] || 1.0;

    // Calculate core estimate in Lakhs INR
    const totalBaseLakhs = length * baseRate * diameterFactor * materialFactor * terrainFactor;

    // Output formatted in Crores (Cr) or Lakhs (L)
    const formatCost = (lakhs) => {
      if (lakhs >= 100) {
        const crores = lakhs / 100;
        return `₹${crores.toFixed(2)} Cr`;
      } else {
        return `₹${lakhs.toFixed(2)} Lakhs`;
      }
    };

    // Calculate low and high range estimate (-10% to +15%)
    const minEstimate = totalBaseLakhs * 0.90;
    const maxEstimate = totalBaseLakhs * 1.15;

    estimateMinDisplay.textContent = formatCost(minEstimate);
    estimateMaxDisplay.textContent = formatCost(maxEstimate);
    btnApplyCalc.disabled = false;
  }

  // Bind calculation to input changes
  [lengthInput, diameterSelect, materialSelect, terrainSelect].forEach(element => {
    element.addEventListener('input', calculateCost);
  });

  // Populate cost data to the main contact form details
  btnApplyCalc.addEventListener('click', () => {
    const length = lengthInput.value;
    const diameter = diameterSelect.options[diameterSelect.selectedIndex].text;
    const material = materialSelect.options[materialSelect.selectedIndex].text;
    const terrain = terrainSelect.options[terrainSelect.selectedIndex].text;
    
    const estMin = estimateMinDisplay.textContent;
    const estMax = estimateMaxDisplay.textContent;

    const targetTextarea = document.getElementById('message');
    const targetService = document.getElementById('service');
    
    if (targetTextarea) {
      targetTextarea.value = `INQUIRY DETAILS FROM CALCULATOR:\n` +
                             `- Pipeline Length: ${length} km\n` +
                             `- Pipeline Diameter: ${diameter}\n` +
                             `- Material Specification: ${material}\n` +
                             `- Terrain Type: ${terrain}\n` +
                             `- Estimated Cost Range: ${estMin} to ${estMax}\n\n` +
                             `Please write any additional details here...`;
      
      // Trigger floating label input activation
      targetTextarea.classList.add('not-empty');
      showNotification('Cost estimate details copied to Project Details form.', 'success');
      
      // Auto-set the service dropdown if applicable
      if (targetService) {
        targetService.value = 'pipeline-design';
      }

      // Smooth scroll to form message area
      targetTextarea.scrollIntoView({ behavior: 'smooth', block: 'center' });
      targetTextarea.focus();
    }
  });

  // Run initial calc
  calculateCost();
}

// --- Scroll-triggered Fade In Animations (using IntersectionObserver) ---
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-fadeIn, .animate-slideUp, .animate-scaleIn');
  if (animatedElements.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appeared');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px -40px 0px'
  });

  animatedElements.forEach(element => {
    // Add default hidden states via CSS-inject classes dynamically to maintain accessibility if JS fails
    element.classList.add('scroll-animate');
    observer.observe(element);
  });
}

// Inject scroll animation styles dynamically to prevent hidden layouts if JS is disabled
const style = document.createElement('style');
style.textContent = `
  .scroll-animate {
    opacity: 0;
    will-change: transform, opacity;
  }
  .animate-fadeIn.scroll-animate {
    transform: translateY(15px);
    transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .animate-slideUp.scroll-animate {
    transform: translateY(30px);
    transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .animate-scaleIn.scroll-animate {
    transform: scale(0.96) translateY(10px);
    transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .scroll-animate.appeared {
    opacity: 1 !important;
    transform: scale(1) translateY(0) !important;
  }
`;
document.head.appendChild(style);