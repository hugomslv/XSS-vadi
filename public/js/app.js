/**
 * XSS VADI - Application JavaScript
 * Fonctions utilitaires et composants interactifs
 */

// =============================================================================
// Toast Notifications
// =============================================================================

const ToastManager = {
  container: null,

  init() {
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.className = 'toast-container';
      document.body.appendChild(this.container);
    }
  },

  show(message, type = 'info', duration = 4000) {
    this.init();

    const icons = {
      success: '&#10004;',
      warning: '&#9888;',
      danger: '&#10006;',
      info: '&#8505;'
    };

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span class="toast-icon">${icons[type] || icons.info}</span>
      <div class="toast-content">
        <span class="toast-message">${message}</span>
      </div>
      <button class="toast-close" onclick="this.parentElement.remove()">&#10005;</button>
    `;

    this.container.appendChild(toast);

    if (duration > 0) {
      setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
      }, duration);
    }

    return toast;
  },

  success(message, duration) {
    return this.show(message, 'success', duration);
  },

  warning(message, duration) {
    return this.show(message, 'warning', duration);
  },

  danger(message, duration) {
    return this.show(message, 'danger', duration);
  },

  info(message, duration) {
    return this.show(message, 'info', duration);
  }
};

// =============================================================================
// Copy to Clipboard
// =============================================================================

async function copyToClipboard(text, successMessage = 'Copie !') {
  try {
    await navigator.clipboard.writeText(text);
    ToastManager.success(successMessage, 2000);
    return true;
  } catch (err) {
    console.error('Erreur de copie:', err);
    ToastManager.danger('Erreur lors de la copie', 2000);
    return false;
  }
}

function copyCode(button) {
  const codeBlock = button.closest('.code-block');
  const code = codeBlock.querySelector('code').textContent;
  copyToClipboard(code);
}

// =============================================================================
// Modal Management
// =============================================================================

const Modal = {
  open(modalId) {
    const overlay = document.getElementById(modalId);
    if (overlay) {
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  },

  close(modalId) {
    const overlay = document.getElementById(modalId);
    if (overlay) {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  },

  closeAll() {
    document.querySelectorAll('.modal-overlay.active').forEach(modal => {
      modal.classList.remove('active');
    });
    document.body.style.overflow = '';
  }
};

// Close modal on overlay click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    Modal.closeAll();
  }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    Modal.closeAll();
  }
});

// =============================================================================
// Tabs Component
// =============================================================================

function initTabs() {
  document.querySelectorAll('.tabs').forEach(tabsContainer => {
    const triggers = tabsContainer.querySelectorAll('.tabs-trigger');
    const contents = tabsContainer.parentElement.querySelectorAll('.tabs-content');

    triggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        const targetId = trigger.dataset.tab;

        // Deactivate all
        triggers.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));

        // Activate selected
        trigger.classList.add('active');
        const targetContent = document.getElementById(targetId);
        if (targetContent) {
          targetContent.classList.add('active');
        }
      });
    });
  });
}

// =============================================================================
// HTML Escaping Utility
// =============================================================================

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function unescapeHtml(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.documentElement.textContent;
}

// =============================================================================
// Timer Component
// =============================================================================

class Timer {
  constructor(element, duration, onComplete) {
    this.element = element;
    this.duration = duration;
    this.remaining = duration;
    this.onComplete = onComplete;
    this.interval = null;
    this.paused = false;
  }

  start() {
    this.interval = setInterval(() => {
      if (!this.paused) {
        this.remaining--;
        this.update();

        if (this.remaining <= 0) {
          this.stop();
          if (this.onComplete) this.onComplete();
        }
      }
    }, 1000);
    this.update();
  }

  pause() {
    this.paused = true;
  }

  resume() {
    this.paused = false;
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  reset() {
    this.remaining = this.duration;
    this.update();
  }

  update() {
    const minutes = Math.floor(this.remaining / 60);
    const seconds = this.remaining % 60;
    this.element.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    // Update classes based on remaining time
    this.element.classList.remove('warning', 'danger');
    if (this.remaining <= 60) {
      this.element.classList.add('danger');
    } else if (this.remaining <= 180) {
      this.element.classList.add('warning');
    }
  }
}

// =============================================================================
// Quiz/Activity Helpers
// =============================================================================

const Quiz = {
  checkAnswer(questionId, selectedOption, correctOption) {
    const options = document.querySelectorAll(`#${questionId} .quiz-option`);
    options.forEach(option => {
      option.classList.remove('selected');
      const value = option.dataset.value;
      if (value === correctOption) {
        option.classList.add('correct');
      } else if (value === selectedOption && selectedOption !== correctOption) {
        option.classList.add('incorrect');
      }
    });
    return selectedOption === correctOption;
  },

  selectOption(element) {
    const parent = element.closest('.quiz-options');
    parent.querySelectorAll('.quiz-option').forEach(opt => {
      opt.classList.remove('selected');
    });
    element.classList.add('selected');
    return element.dataset.value;
  }
};

// =============================================================================
// XSS Demo Helpers
// =============================================================================

const XSSDemo = {
  // Preview input in both vulnerable and secure panels
  preview(input, vulnerableId, secureId) {
    const vulnerablePanel = document.getElementById(vulnerableId);
    const securePanel = document.getElementById(secureId);

    if (vulnerablePanel) {
      // Vulnerable: render as raw HTML
      vulnerablePanel.innerHTML = input;
    }

    if (securePanel) {
      // Secure: escape and display as text
      securePanel.textContent = input;
    }
  },

  // Common test payloads (safe for demonstration)
  getTestPayloads() {
    return [
      {
        name: 'HTML basique - Gras',
        payload: '<strong>Texte en gras</strong>',
        description: 'Injection HTML simple avec balise strong'
      },
      {
        name: 'HTML basique - Italique',
        payload: '<em>Texte en italique</em>',
        description: 'Injection HTML simple avec balise em'
      },
      {
        name: 'Script Alert',
        payload: '<script>alert("XSS Demo")</script>',
        description: 'Injection de script avec alert (inoffensif)'
      },
      {
        name: 'Image avec onerror',
        payload: '<img src="x" onerror="alert(\'XSS via image\')">',
        description: 'XSS via attribut onerror sur image invalide'
      },
      {
        name: 'Lien avec onclick',
        payload: '<a href="#" onclick="alert(\'XSS via lien\')">Cliquez ici</a>',
        description: 'XSS via evenement onclick'
      }
    ];
  }
};

// =============================================================================
// Form Validation Helpers
// =============================================================================

function validateForm(formElement) {
  let isValid = true;
  const inputs = formElement.querySelectorAll('[required]');

  inputs.forEach(input => {
    if (!input.value.trim()) {
      input.classList.add('error');
      isValid = false;
    } else {
      input.classList.remove('error');
    }
  });

  return isValid;
}

// =============================================================================
// Progress/Stepper Helpers
// =============================================================================

function updateStepper(stepperElement, currentStep) {
  const steps = stepperElement.querySelectorAll('.stepper-step');
  steps.forEach((step, index) => {
    step.classList.remove('active', 'completed');
    if (index < currentStep) {
      step.classList.add('completed');
    } else if (index === currentStep) {
      step.classList.add('active');
    }
  });
}

function updateProgress(progressElement, percent) {
  const bar = progressElement.querySelector('.progress-bar');
  if (bar) {
    bar.style.width = `${Math.min(100, Math.max(0, percent))}%`;
  }
}

// =============================================================================
// Local Storage Helpers
// =============================================================================

const Storage = {
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },

  remove(key) {
    localStorage.removeItem(key);
  }
};

// =============================================================================
// Initialize on DOM Ready
// =============================================================================

document.addEventListener('DOMContentLoaded', () => {
  initTabs();

  // Add copy buttons to code blocks
  document.querySelectorAll('.code-block:not(.no-copy)').forEach(block => {
    if (!block.querySelector('.code-block-copy')) {
      const header = block.querySelector('.code-block-header');
      if (header) {
        const copyBtn = document.createElement('button');
        copyBtn.className = 'btn btn-sm code-block-copy';
        copyBtn.textContent = 'Copier';
        copyBtn.onclick = () => copyCode(copyBtn);
        header.appendChild(copyBtn);
      }
    }
  });
});

// Export for use in other scripts
window.ToastManager = ToastManager;
window.Modal = Modal;
window.Quiz = Quiz;
window.XSSDemo = XSSDemo;
window.Timer = Timer;
window.Storage = Storage;
window.copyToClipboard = copyToClipboard;
window.escapeHtml = escapeHtml;
