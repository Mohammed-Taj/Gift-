// DOM Elements
const themeToggle = document.querySelector(".theme-toggle");
const cartBtn = document.querySelector(".cart-btn");
const cartCounter = document.querySelector(".cart-counter");
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const loginModal = document.getElementById("loginModal");
const registerModal = document.getElementById("registerModal");
const closeButtons = document.querySelectorAll(".close");
const switchToRegister = document.getElementById("switchToRegister");
const switchToLogin = document.getElementById("switchToLogin");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

// Initialize cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];
updateCartCounter();

// Theme Toggle
themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);

  // Update button text
  themeToggle.textContent = newTheme === "dark" ? "☀️" : "🌙";
});

// Load saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  document.documentElement.setAttribute("data-theme", savedTheme);
  themeToggle.textContent = savedTheme === "dark" ? "☀️" : "🌙";
}

// Modal Functions
function openModal(modal) {
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeModal(modal) {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

// Modal Event Listeners
loginBtn.addEventListener("click", () => openModal(loginModal));
registerBtn.addEventListener("click", () => openModal(registerModal));

closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    closeModal(modal);
  });
});

switchToRegister.addEventListener("click", (e) => {
  e.preventDefault();
  closeModal(loginModal);
  openModal(registerModal);
});

switchToLogin.addEventListener("click", (e) => {
  e.preventDefault();
  closeModal(registerModal);
  openModal(loginModal);
});

// Close modal when clicking outside
window.addEventListener("click", (e) => {
  if (e.target === loginModal) closeModal(loginModal);
  if (e.target === registerModal) closeModal(registerModal);
});

// Form Submissions
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // In a real app, you would handle authentication here
  alert("تم تسجيل الدخول بنجاح!");
  closeModal(loginModal);
});

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // In a real app, you would handle registration here
  alert("تم إنشاء الحساب بنجاح!");
  closeModal(registerModal);
});

// Cart Functions
function updateCartCounter() {
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  cartCounter.textContent = totalItems;
}

function addToCart(product) {
  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCounter();

  // Show confirmation
  showNotification("تم إضافة المنتج إلى السلة");
}

function showNotification(message) {
  // Create notification element
  const notification = document.createElement("div");
  notification.textContent = message;
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 20px;
        background-color: var(--primary-color);
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 3px 10px rgba(0,0,0,0.2);
        z-index: 3000;
        transition: all 0.3s ease;
    `;

  document.body.appendChild(notification);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.opacity = "0";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Parallax Effect
function initParallax() {
  const parallaxElements = document.querySelectorAll("[data-parallax]");

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    parallaxElements.forEach((element) => {
      const speed = element.getAttribute("data-parallax-speed") || 0.5;
      const yPos = -(scrollY * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  });
}

// Counter Animation
function initCounters() {
  const counters = document.querySelectorAll(".stat-number");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute("data-count"));
          const duration = 2000; // 2 seconds
          const step = target / (duration / 16); // 60fps
          let current = 0;

          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              counter.textContent = target;
              clearInterval(timer);
            } else {
              counter.textContent = Math.floor(current);
            }
          }, 16);

          observer.unobserve(counter);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => {
    observer.observe(counter);
  });
}

// Load Featured Products
function loadFeaturedProducts() {
  const productsGrid = document.querySelector(".products-grid");

  // Sample products data
  const products = [
    {
      id: 1,
      name: "صندوق هدايا فاخر",
      description: "صندوق هدايا فاخر بتصميم أنيق يناسب جميع المناسبات",
      price: "45 ريال",
      emoji: "🎁",
    },
    {
      id: 2,
      name: "شريط ساتان ذهبي",
      description: "شريط ساتان عالي الجودة بألوان ذهبية وفضية",
      price: "15 ريال",
      emoji: "🎀",
    },
    {
      id: 3,
      name: "بطاقة تهنئة مخصصة",
      description: "بطاقة تهنئة بتصميم مخصص مع رسالة شخصية",
      price: "10 ريال",
      emoji: "💌",
    },
    {
      id: 4,
      name: "علبة هدايا خشبية",
      description: "علبة هدايا خشبية مصنوعة يدوياً بتصميم فريد",
      price: "60 ريال",
      emoji: "📦",
    },
  ];

  // Clear loading state
  productsGrid.innerHTML = "";

  // Add products to grid
  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";
    productCard.innerHTML = `
            <div class="product-image">
                ${product.emoji}
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">${product.price}</div>
                <div class="product-actions">
                    <button class="add-to-cart" data-product='${JSON.stringify(
                      product
                    )}'>إضافة إلى السلة</button>
                    <button class="view-details">عرض التفاصيل</button>
                </div>
            </div>
        `;

    productsGrid.appendChild(productCard);
  });

  // Add event listeners to add-to-cart buttons
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", (e) => {
      const product = JSON.parse(e.target.getAttribute("data-product"));
      addToCart(product);
    });
  });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Products Page Functionality
function initProductsPage() {
  if (!document.querySelector(".products-page")) return;

  loadAllProducts();
  setupFilters();
  setupSearch();
  setupNewsletter();
}

// Load All Products
function loadAllProducts() {
  const productsGrid = document.querySelector(".products-grid");
  const loadingState = document.querySelector(".loading-state");
  const noResults = document.querySelector(".no-results");

  // Show loading
  loadingState.style.display = "block";
  productsGrid.innerHTML = "";

  // Sample products data - expanded for products page
  const allProducts = [
    {
      id: 1,
      name: "صندوق هدايا فاخر",
      description: "صندوق هدايا فاخر بتصميم أنيق يناسب جميع المناسبات",
      price: "45 ريال",
      originalPrice: "55 ريال",
      emoji: "🎁",
      category: "wrapping",
      featured: true,
      badge: "الأكثر مبيعاً",
    },
    {
      id: 2,
      name: "شريط ساتان ذهبي",
      description: "شريط ساتان عالي الجودة بألوان ذهبية وفضية",
      price: "15 ريال",
      emoji: "🎀",
      category: "ribbons",
      featured: false,
    },
    {
      id: 3,
      name: "بطاقة تهنئة مخصصة",
      description: "بطاقة تهنئة بتصميم مخصص مع رسالة شخصية",
      price: "10 ريال",
      emoji: "💌",
      category: "cards",
      featured: true,
      badge: "جديد",
    },
    {
      id: 4,
      name: "علبة هدايا خشبية",
      description: "علبة هدايا خشبية مصنوعة يدوياً بتصميم فريد",
      price: "60 ريال",
      emoji: "📦",
      category: "wrapping",
      featured: false,
    },
    {
      id: 5,
      name: "ورق تغليف لامع",
      description: "ورق تغليف عالي الجودة بلمعة فاخرة",
      price: "8 ريال",
      emoji: "✨",
      category: "wrapping",
      featured: false,
    },
    {
      id: 6,
      name: "زينة عيد الميلاد",
      description: "مجموعة زينة متكاملة لأعياد الميلاد",
      price: "25 ريال",
      emoji: "🎄",
      category: "ribbons",
      featured: true,
      badge: "عرض خاص",
    },
  ];

  // Simulate loading delay
  setTimeout(() => {
    loadingState.style.display = "none";

    if (allProducts.length === 0) {
      noResults.style.display = "block";
      return;
    }

    noResults.style.display = "none";

    // Add products to grid
    allProducts.forEach((product) => {
      const productCard = createProductCard(product);
      productsGrid.appendChild(productCard);
    });

    // Add event listeners to add-to-cart buttons
    document.querySelectorAll(".add-to-cart").forEach((button) => {
      button.addEventListener("click", (e) => {
        const productId = parseInt(e.target.getAttribute("data-product-id"));
        const product = allProducts.find((p) => p.id === productId);
        if (product) {
          addToCart(product);
        }
      });
    });

    updateProductsStats(allProducts.length);
  }, 1000);
}

// Create Product Card
function createProductCard(product) {
  const productCard = document.createElement("div");
  productCard.className = "product-card";

  let badgeHTML = "";
  if (product.badge) {
    badgeHTML = `<div class="product-badge">${product.badge}</div>`;
  }

  let priceHTML = "";
  if (product.originalPrice) {
    priceHTML = `
            <div class="product-price">
                <span class="current-price">${product.price}</span>
                <span class="original-price">${product.originalPrice}</span>
            </div>
        `;
  } else {
    priceHTML = `<div class="product-price">${product.price}</div>`;
  }

  productCard.innerHTML = `
        ${badgeHTML}
        <div class="product-image">
            ${product.emoji}
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            ${priceHTML}
            <div class="product-actions">
                <button class="add-to-cart" data-product-id="${product.id}">إضافة إلى السلة</button>
                <button class="view-details">عرض التفاصيل</button>
            </div>
        </div>
    `;

  return productCard;
}

// Setup Filters
function setupFilters() {
  const categoryFilter = document.getElementById("categoryFilter");
  const priceFilter = document.getElementById("priceFilter");
  const sortFilter = document.getElementById("sortFilter");
  const resetFiltersBtn = document.querySelector(".reset-filters");

  [categoryFilter, priceFilter, sortFilter].forEach((filter) => {
    filter.addEventListener("change", filterProducts);
  });

  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener("click", resetFilters);
  }
}

// Setup Search
function setupSearch() {
  const searchInput = document.querySelector(".search-input");
  const searchBtn = document.querySelector(".search-btn");

  const performSearch = () => {
    const searchTerm = searchInput.value.trim();
    filterProducts();
  };

  searchBtn.addEventListener("click", performSearch);
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      performSearch();
    }
  });

  // Real-time search with debounce
  let searchTimeout;
  searchInput.addEventListener("input", () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(performSearch, 500);
  });
}

// Filter Products
function filterProducts() {
  const searchTerm = document
    .querySelector(".search-input")
    .value.toLowerCase();
  const category = document.getElementById("categoryFilter").value;
  const priceRange = document.getElementById("priceFilter").value;
  const sortBy = document.getElementById("sortFilter").value;

  const productsGrid = document.querySelector(".products-grid");
  const productCards = productsGrid.querySelectorAll(".product-card");
  const searchResultsInfo = document.querySelector(".search-results-info");
  const noResults = document.querySelector(".no-results");

  let visibleCount = 0;

  productCards.forEach((card) => {
    const title = card
      .querySelector(".product-title")
      .textContent.toLowerCase();
    const description = card
      .querySelector(".product-description")
      .textContent.toLowerCase();
    const productCategory = card.getAttribute("data-category") || "";
    const price =
      parseInt(card.querySelector(".current-price").textContent) ||
      parseInt(card.querySelector(".product-price").textContent);

    let matchesSearch =
      !searchTerm ||
      title.includes(searchTerm) ||
      description.includes(searchTerm);

    let matchesCategory = !category || productCategory === category;

    let matchesPrice = true;
    if (priceRange) {
      const [min, max] = priceRange.split("-").map(Number);
      matchesPrice = price >= min && (!max || price <= max);
    }

    if (matchesSearch && matchesCategory && matchesPrice) {
      card.style.display = "block";
      visibleCount++;
    } else {
      card.style.display = "none";
    }
  });

  // Update search results info
  if (searchTerm || category || priceRange) {
    let infoText = `عرض ${visibleCount} منتج`;
    if (searchTerm) infoText += ` لـ "${searchTerm}"`;
    if (category) {
      const categoryText =
        document.getElementById("categoryFilter").options[
          document.getElementById("categoryFilter").selectedIndex
        ].text;
      infoText += ` في ${categoryText}`;
    }

    searchResultsInfo.innerHTML = `<p>${infoText}</p>`;
    searchResultsInfo.style.display = "block";
  } else {
    searchResultsInfo.style.display = "none";
  }

  // Show/hide no results
  if (visibleCount === 0) {
    noResults.style.display = "block";
  } else {
    noResults.style.display = "none";
  }

  // Sort products if needed
  if (sortBy) {
    sortProducts(sortBy);
  }

  updateProductsStats(visibleCount);
}

// Sort Products
function sortProducts(sortBy) {
  const productsGrid = document.querySelector(".products-grid");
  const productCards = Array.from(
    productsGrid.querySelectorAll(".product-card")
  );

  productCards.sort((a, b) => {
    const aPrice = parseInt(
      a.querySelector(".current-price")?.textContent ||
        a.querySelector(".product-price").textContent
    );
    const bPrice = parseInt(
      b.querySelector(".current-price")?.textContent ||
        b.querySelector(".product-price").textContent
    );
    const aTitle = a.querySelector(".product-title").textContent;
    const bTitle = b.querySelector(".product-title").textContent;

    switch (sortBy) {
      case "price-asc":
        return aPrice - bPrice;
      case "price-desc":
        return bPrice - aPrice;
      case "name":
        return aTitle.localeCompare(bTitle, "ar");
      case "featured":
        const aFeatured = a.querySelector(".product-badge") !== null;
        const bFeatured = b.querySelector(".product-badge") !== null;
        return bFeatured - aFeatured;
      default:
        return 0;
    }
  });

  // Reappend sorted products
  productCards.forEach((card) => productsGrid.appendChild(card));
}

// Reset Filters
function resetFilters() {
  document.querySelector(".search-input").value = "";
  document.getElementById("categoryFilter").value = "";
  document.getElementById("priceFilter").value = "";
  document.getElementById("sortFilter").value = "";

  filterProducts();
}

// Update Products Stats
function updateProductsStats(visibleCount) {
  const statNumber = document.querySelector(".products-stats .stat-number");
  if (statNumber) {
    statNumber.textContent = visibleCount;
  }
}

// Setup Newsletter
function setupNewsletter() {
  const newsletterForm = document.querySelector(".newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = newsletterForm.querySelector('input[type="email"]').value;

      // Simulate newsletter subscription
      showNotification("شكراً لك! تم الاشتراك في النشرة البريدية بنجاح");
      newsletterForm.reset();
    });
  }
}

// Enhanced Product Card Creation with Categories
function enhanceProductCards() {
  document.querySelectorAll(".product-card").forEach((card) => {
    const productId = card
      .querySelector(".add-to-cart")
      ?.getAttribute("data-product-id");
    if (productId) {
      // Add category data attribute for filtering
      const product = getProductById(parseInt(productId));
      if (product) {
        card.setAttribute("data-category", product.category);
      }
    }
  });
}

// Helper function to get product by ID
function getProductById(id) {
  // This would typically come from your products data
  const products = [
    { id: 1, category: "wrapping" },
    { id: 2, category: "ribbons" },
    { id: 3, category: "cards" },
    { id: 4, category: "wrapping" },
    { id: 5, category: "wrapping" },
    { id: 6, category: "ribbons" },
  ];
  return products.find((p) => p.id === id);
}

// Services Page Functionality
function initServicesPage() {
  if (!document.querySelector(".services-page")) return;

  setupServiceInteractions();
  setupBookingForm();
  setupFAQ();
  setupServiceAnimations();
}

// Setup Service Interactions
function setupServiceInteractions() {
  const serviceItems = document.querySelectorAll(".service-item");

  serviceItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      // Scroll to booking form when clicking on a service
      if (!e.target.closest(".service-features") && !e.target.closest("ul")) {
        const bookingSection = document.querySelector(".booking-section");
        if (bookingSection) {
          bookingSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });

          // Auto-fill service type in booking form
          const serviceTitle = item.querySelector("h3").textContent;
          const serviceSelect = document.querySelector(".booking-form select");
          if (serviceSelect) {
            const options = Array.from(serviceSelect.options);
            const matchingOption = options.find((option) =>
              option.text.includes(serviceTitle.split(" ")[0])
            );
            if (matchingOption) {
              serviceSelect.value = matchingOption.value;
            }
          }
        }
      }
    });
  });
}

// Setup Booking Form
function setupBookingForm() {
  const bookingForm = document.querySelector(".booking-form");
  if (!bookingForm) return;

  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(bookingForm);
    const data = {
      name: bookingForm.querySelector('input[type="text"]').value,
      email: bookingForm.querySelector('input[type="email"]').value,
      phone: bookingForm.querySelector('input[type="tel"]').value,
      service: bookingForm.querySelector("select").value,
      date: bookingForm.querySelector('input[type="date"]').value,
      details: bookingForm.querySelector("textarea").value,
      budget: bookingForm.querySelector("select:last-child").value,
    };

    // Validate form
    if (validateBookingForm(data)) {
      submitBookingForm(data);
    }
  });

  // Add real-time validation
  const inputs = bookingForm.querySelectorAll("input, select, textarea");
  inputs.forEach((input) => {
    input.addEventListener("blur", () => {
      validateField(input);
    });

    input.addEventListener("input", () => {
      clearFieldError(input);
    });
  });
}

// Validate Booking Form
function validateBookingForm(data) {
  let isValid = true;

  // Required fields validation
  if (!data.name.trim()) {
    showFieldError("name", "الاسم الكامل مطلوب");
    isValid = false;
  }

  if (!data.email.trim()) {
    showFieldError("email", "البريد الإلكتروني مطلوب");
    isValid = false;
  } else if (!isValidEmail(data.email)) {
    showFieldError("email", "البريد الإلكتروني غير صحيح");
    isValid = false;
  }

  if (!data.phone.trim()) {
    showFieldError("phone", "رقم الجوال مطلوب");
    isValid = false;
  } else if (!isValidPhone(data.phone)) {
    showFieldError("phone", "رقم الجوال غير صحيح");
    isValid = false;
  }

  if (!data.service) {
    showFieldError("service", "نوع الخدمة مطلوب");
    isValid = false;
  }

  return isValid;
}

// Validate Individual Field
function validateField(field) {
  const value = field.value.trim();
  const fieldName =
    field.getAttribute("name") || field.previousElementSibling?.textContent;

  if (field.hasAttribute("required") && !value) {
    showFieldError(field, `${fieldName} مطلوب`);
    return false;
  }

  if (field.type === "email" && value && !isValidEmail(value)) {
    showFieldError(field, "البريد الإلكتروني غير صحيح");
    return false;
  }

  if (field.type === "tel" && value && !isValidPhone(value)) {
    showFieldError(field, "رقم الجوال غير صحيح");
    return false;
  }

  clearFieldError(field);
  return true;
}

// Show Field Error
function showFieldError(field, message) {
  if (typeof field === "string") {
    // Find field by name
    field =
      document.querySelector(`[name="${field}"]`) ||
      document.querySelector(`input[placeholder*="${field}"]`);
  }

  if (!field) return;

  clearFieldError(field);

  const errorElement = document.createElement("div");
  errorElement.className = "field-error";
  errorElement.textContent = message;
  errorElement.style.cssText = `
        color: #e74c3c;
        font-size: 0.8rem;
        margin-top: 5px;
        display: block;
    `;

  field.style.borderColor = "#e74c3c";
  field.parentNode.appendChild(errorElement);
}

// Clear Field Error
function clearFieldError(field) {
  const errorElement = field.parentNode.querySelector(".field-error");
  if (errorElement) {
    errorElement.remove();
  }
  field.style.borderColor = "";
}

// Email Validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Phone Validation (Saudi format)
function isValidPhone(phone) {
  const phoneRegex = /^(05)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
}

// Submit Booking Form
function submitBookingForm(data) {
  const submitBtn = document.querySelector(".submit-btn");
  const originalText = submitBtn.textContent;

  // Show loading state
  submitBtn.textContent = "جاري الإرسال...";
  submitBtn.disabled = true;

  // Simulate API call
  setTimeout(() => {
    // In real application, you would send data to your server here
    console.log("Booking form data:", data);

    // Show success message
    showNotification("تم إرسال طلبك بنجاح! سنتواصل معك خلال 24 ساعة");

    // Reset form
    document.querySelector(".booking-form").reset();

    // Reset button
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;

    // Track conversion (if you have analytics)
    trackServiceBooking(data.service);
  }, 2000);
}

// Track Service Booking
function trackServiceBooking(serviceType) {
  // Here you can integrate with Google Analytics or other analytics tools
  console.log(`Service booked: ${serviceType}`);

  // Example: Send to Google Analytics
  if (typeof gtag !== "undefined") {
    gtag("event", "service_booking", {
      event_category: "services",
      event_label: serviceType,
      value: 1,
    });
  }
}

// Setup FAQ
function setupFAQ() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const toggle = item.querySelector(".faq-toggle");

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Close all other items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
        }
      });

      // Toggle current item
      item.classList.toggle("active", !isActive);

      // Update toggle symbol
      if (!isActive) {
        toggle.textContent = "−";
      } else {
        toggle.textContent = "+";
      }
    });
  });

  // Open first FAQ by default
  if (faqItems.length > 0) {
    faqItems[0].classList.add("active");
    faqItems[0].querySelector(".faq-toggle").textContent = "−";
  }
}

// Setup Service Animations
function setupServiceAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = "running";
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe service items
  document.querySelectorAll(".service-item").forEach((item) => {
    item.style.animationPlayState = "paused";
    observer.observe(item);
  });

  // Observe steps
  document.querySelectorAll(".step-card").forEach((card, index) => {
    card.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s both`;
    card.style.animationPlayState = "paused";
    observer.observe(card);
  });
}

// Price Calculator (Optional Feature)
function initServicePriceCalculator() {
  const serviceItems = document.querySelectorAll(".service-item");

  serviceItems.forEach((item) => {
    const priceElement = item.querySelector(".service-price");
    if (priceElement) {
      const basePrice = parseInt(priceElement.textContent.match(/\d+/)[0]);

      // Add click to calculate final price based on options
      item.addEventListener("click", () => {
        // This could open a modal with options to calculate final price
        calculateFinalPrice(basePrice, item.querySelector("h3").textContent);
      });
    }
  });
}

function calculateFinalPrice(basePrice, serviceName) {
  // Simple price calculation example
  const complexityMultiplier = 1.2; // Could be based on user selections
  const urgencyMultiplier = 1.1; // Could be based on delivery date

  const finalPrice = Math.round(
    basePrice * complexityMultiplier * urgencyMultiplier
  );

  showNotification(
    `السعر التقريبي لـ ${serviceName}: ${finalPrice} ريال (يشمل التوصيل)`
  );
}

// Blog Page Functionality
function initBlogPage() {
  if (!document.querySelector(".blog-page")) return;

  setupBlogCategories();
  setupBlogPagination();
  setupBlogNewsletter();
  setupReadingProgress();
  setupBackToTop();
  setupBlogAnimations();
  setupShareButtons();
  setupBlogSearch();
}

// Setup Blog Categories
function setupBlogCategories() {
  const categoryBtns = document.querySelectorAll(".category-btn");
  const blogPosts = document.querySelectorAll(".blog-post");

  categoryBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      categoryBtns.forEach((b) => b.classList.remove("active"));
      // Add active class to clicked button
      btn.classList.add("active");

      const category = btn.textContent.trim();
      filterBlogPosts(category);
    });
  });
}

// Filter Blog Posts by Category
function filterBlogPosts(category) {
  const blogPosts = document.querySelectorAll(".blog-post");
  let visibleCount = 0;

  blogPosts.forEach((post) => {
    const postCategory = post
      .querySelector(".post-category")
      .textContent.trim();
    const isFeatured = post.closest(".featured-post");

    if (
      category === "جميع المقالات" ||
      postCategory === category ||
      isFeatured
    ) {
      post.style.display = "flex";
      visibleCount++;

      // Add animation
      post.style.animation = "fadeInUp 0.6s ease forwards";
    } else {
      post.style.display = "none";
    }
  });

  // Update pagination or show no results
  updateBlogPagination(visibleCount);

  // Scroll to blog grid
  document.querySelector(".blog-grid").scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

// Setup Blog Pagination
function setupBlogPagination() {
  const pageBtns = document.querySelectorAll(".page-btn:not(.prev):not(.next)");
  const prevBtn = document.querySelector(".page-btn.prev");
  const nextBtn = document.querySelector(".page-btn.next");
  const blogPosts = document.querySelectorAll(".blog-post");
  const postsPerPage = 6;
  let currentPage = 1;

  // Calculate total pages
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);

  // Initialize pagination
  updatePaginationDisplay();

  // Page number click events
  pageBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      currentPage = parseInt(btn.textContent);
      updatePaginationDisplay();
      showPagePosts(currentPage);
    });
  });

  // Previous button
  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      updatePaginationDisplay();
      showPagePosts(currentPage);
    }
  });

  // Next button
  nextBtn.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      updatePaginationDisplay();
      showPagePosts(currentPage);
    }
  });

  function updatePaginationDisplay() {
    // Update active state
    pageBtns.forEach((btn) => {
      btn.classList.toggle("active", parseInt(btn.textContent) === currentPage);
    });

    // Update button states
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;

    // Update page numbers if needed (for dynamic pagination)
    updatePageNumbers();
  }

  function showPagePosts(page) {
    const startIndex = (page - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;

    blogPosts.forEach((post, index) => {
      if (index >= startIndex && index < endIndex) {
        post.style.display = "flex";
        post.style.animation = "fadeInUp 0.6s ease forwards";
      } else {
        post.style.display = "none";
      }
    });

    // Scroll to top of blog grid
    document.querySelector(".blog-grid").scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function updatePageNumbers() {
    // This function can be enhanced to show limited page numbers
    // For simplicity, we're using static page numbers in HTML
  }
}

// Update Blog Pagination based on filtered results
function updateBlogPagination(visibleCount) {
  // This would update pagination when filtering
  // For now, we'll just show all visible posts
  const postsPerPage = 6;
  const totalPages = Math.ceil(visibleCount / postsPerPage);

  if (totalPages <= 1) {
    document.querySelector(".pagination").style.display = "none";
  } else {
    document.querySelector(".pagination").style.display = "flex";
  }
}

// Setup Blog Newsletter
function setupBlogNewsletter() {
  const newsletterForm = document.querySelector(
    ".blog-newsletter .newsletter-form"
  );
  if (!newsletterForm) return;

  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = newsletterForm.querySelector('input[type="email"]').value;
    const submitBtn = newsletterForm.querySelector("button");
    const originalText = submitBtn.textContent;

    // Validate email
    if (!isValidEmail(email)) {
      showNotification("يرجى إدخال بريد إلكتروني صحيح", "error");
      return;
    }

    // Show loading state
    submitBtn.textContent = "جاري الاشتراك...";
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
      // Success
      showNotification("شكراً لك! تم الاشتراك في النشرة البريدية بنجاح");
      newsletterForm.reset();

      // Reset button
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;

      // Track newsletter subscription
      trackNewsletterSubscription();
    }, 1500);
  });
}

// Track Newsletter Subscription
function trackNewsletterSubscription() {
  // Analytics integration
  console.log("Newsletter subscription recorded");

  if (typeof gtag !== "undefined") {
    gtag("event", "newsletter_subscription", {
      event_category: "blog",
      event_label: "blog_page",
    });
  }
}

// Setup Reading Progress
function setupReadingProgress() {
  const progressBar = document.createElement("div");
  progressBar.className = "reading-progress";
  progressBar.innerHTML = '<div class="reading-progress-bar"></div>';
  document.body.appendChild(progressBar);

  window.addEventListener("scroll", () => {
    const winHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset;
    const trackLength = docHeight - winHeight;
    const progress = Math.floor((scrollTop / trackLength) * 100);

    const progressBarElement = document.querySelector(".reading-progress-bar");
    if (progressBarElement) {
      progressBarElement.style.width = progress + "%";

      // Show/hide progress bar
      const progressContainer = document.querySelector(".reading-progress");
      if (scrollTop > 100) {
        progressContainer.style.display = "block";
      } else {
        progressContainer.style.display = "none";
      }
    }
  });
}

// Setup Back to Top Button
function setupBackToTop() {
  const backToTopBtn = document.createElement("button");
  backToTopBtn.className = "back-to-top";
  backToTopBtn.innerHTML = "↑";
  backToTopBtn.setAttribute("aria-label", "العودة إلى الأعلى");
  document.body.appendChild(backToTopBtn);

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });
}

// Setup Blog Animations
function setupBlogAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = "running";
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe blog posts
  document.querySelectorAll(".blog-post").forEach((post) => {
    post.style.animationPlayState = "paused";
    observer.observe(post);
  });

  // Observe featured post
  const featuredPost = document.querySelector(".featured-post");
  if (featuredPost) {
    featuredPost.style.opacity = "0";
    featuredPost.style.transform = "translateY(30px)";
    featuredPost.style.transition = "all 0.8s ease";

    setTimeout(() => {
      featuredPost.style.opacity = "1";
      featuredPost.style.transform = "translateY(0)";
    }, 300);
  }
}

// Setup Share Buttons
function setupShareButtons() {
  const shareButtons = document.createElement("div");
  shareButtons.className = "share-buttons";
  shareButtons.innerHTML = `
        <button class="share-btn twitter" onclick="shareOnTwitter()">
            🐦 تويتر
        </button>
        <button class="share-btn facebook" onclick="shareOnFacebook()">
            📘 فيسبوك
        </button>
        <button class="share-btn linkedin" onclick="shareOnLinkedIn()">
            💼 لينكدإن
        </button>
    `;

  // Add share buttons to featured post
  const featuredContent = document.querySelector(".featured-content");
  if (featuredContent) {
    featuredContent.appendChild(shareButtons);
  }
}

// Social Media Share Functions
function shareOnTwitter() {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(
    "اكتشف مدونة هدايا لأفكار تغليف الهدايا المبتكرة!"
  );
  window.open(
    `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
    "_blank"
  );
}

function shareOnFacebook() {
  const url = encodeURIComponent(window.location.href);
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
}

function shareOnLinkedIn() {
  const url = encodeURIComponent(window.location.href);
  window.open(
    `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    "_blank"
  );
}

// Setup Blog Search (Optional Enhancement)
function setupBlogSearch() {
  // This would integrate with a search functionality
  // For now, we'll add a search event listener if search exists
  const searchInput = document.querySelector(".search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase();
      filterBlogPostsBySearch(searchTerm);
    });
  }
}

function filterBlogPostsBySearch(searchTerm) {
  const blogPosts = document.querySelectorAll(".blog-post");
  let visibleCount = 0;

  blogPosts.forEach((post) => {
    const title = post.querySelector("h2").textContent.toLowerCase();
    const excerpt = post
      .querySelector(".post-excerpt")
      .textContent.toLowerCase();
    const category = post
      .querySelector(".post-category")
      .textContent.toLowerCase();

    if (
      title.includes(searchTerm) ||
      excerpt.includes(searchTerm) ||
      category.includes(searchTerm)
    ) {
      post.style.display = "flex";
      visibleCount++;
    } else {
      post.style.display = "none";
    }
  });

  // Show/hide no results message
  const noResults =
    document.querySelector(".no-results") || createNoResultsElement();
  if (visibleCount === 0 && searchTerm) {
    noResults.style.display = "block";
  } else {
    noResults.style.display = "none";
  }
}

function createNoResultsElement() {
  const noResults = document.createElement("div");
  noResults.className = "no-results";
  noResults.innerHTML = `
        <div class="no-results-content">
            <div class="no-results-icon">🔍</div>
            <h3>لم نعثر على مقالات</h3>
            <p>جرب البحث بمصطلحات أخرى أو تصفح الفئات المختلفة</p>
        </div>
    `;
  noResults.style.display = "none";
  document
    .querySelector(".blog-grid")
    .parentNode.insertBefore(
      noResults,
      document.querySelector(".blog-grid").nextSibling
    );
  return noResults;
}

// Blog Post View Tracking
function trackBlogPostView(postTitle) {
  // Track blog post views for analytics
  console.log(`Blog post viewed: ${postTitle}`);

  if (typeof gtag !== "undefined") {
    gtag("event", "blog_post_view", {
      event_category: "blog",
      event_label: postTitle,
    });
  }
}

// Initialize blog post view tracking
document.addEventListener("DOMContentLoaded", () => {
  const blogPosts = document.querySelectorAll(".blog-post");
  blogPosts.forEach((post) => {
    post.addEventListener("click", () => {
      const postTitle = post.querySelector("h2").textContent;
      trackBlogPostView(postTitle);
    });
  });
});

// Contact Page Functionality
function initContactPage() {
  if (!document.querySelector(".contact-page")) return;

  setupContactForm();
  setupFAQQuickLinks();
  setupContactAnimations();
  setupSocialLinks();
  setupClickToCall();
}

// Setup Contact Form
function setupContactForm() {
  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return;

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const data = {
      name: contactForm.querySelector('input[type="text"]').value,
      email: contactForm.querySelector('input[type="email"]').value,
      subject: contactForm.querySelector('input[placeholder="موضوع الرسالة"]')
        .value,
      inquiryType: contactForm.querySelector("select[required]").value,
      message: contactForm.querySelector("textarea").value,
      source: contactForm.querySelector("select:not([required])").value,
    };

    // Validate form
    if (validateContactForm(data)) {
      submitContactForm(data, contactForm);
    }
  });

  // Add real-time validation
  const inputs = contactForm.querySelectorAll("input, select, textarea");
  inputs.forEach((input) => {
    input.addEventListener("blur", () => {
      validateContactField(input);
    });

    input.addEventListener("input", () => {
      clearContactFieldError(input);
    });
  });
}

// Validate Contact Form
function validateContactForm(data) {
  let isValid = true;

  // Required fields validation
  if (!data.name.trim()) {
    showContactFieldError("name", "الاسم الكامل مطلوب");
    isValid = false;
  }

  if (!data.email.trim()) {
    showContactFieldError("email", "البريد الإلكتروني مطلوب");
    isValid = false;
  } else if (!isValidEmail(data.email)) {
    showContactFieldError("email", "البريد الإلكتروني غير صحيح");
    isValid = false;
  }

  if (!data.subject.trim()) {
    showContactFieldError("subject", "موضوع الرسالة مطلوب");
    isValid = false;
  }

  if (!data.inquiryType) {
    showContactFieldError("inquiryType", "نوع الاستفسار مطلوب");
    isValid = false;
  }

  if (!data.message.trim()) {
    showContactFieldError("message", "الرسالة مطلوبة");
    isValid = false;
  }

  return isValid;
}

// Validate Individual Contact Field
function validateContactField(field) {
  const value = field.value.trim();
  const isRequired = field.hasAttribute("required");
  const fieldName = field.previousElementSibling?.textContent || "هذا الحقل";

  if (isRequired && !value) {
    showContactFieldError(field, `${fieldName} مطلوب`);
    return false;
  }

  if (field.type === "email" && value && !isValidEmail(value)) {
    showContactFieldError(field, "البريد الإلكتروني غير صحيح");
    return false;
  }

  clearContactFieldError(field);
  return true;
}

// Show Contact Field Error
function showContactFieldError(field, message) {
  if (typeof field === "string") {
    // Find field by context
    field =
      document.querySelector(`[placeholder*="${field}"]`) ||
      document.querySelector(`input[name="${field}"]`);
  }

  if (!field) return;

  clearContactFieldError(field);

  const formGroup = field.closest(".form-group");
  if (formGroup) {
    formGroup.classList.add("error");
  }

  const errorElement = document.createElement("div");
  errorElement.className = "field-error";
  errorElement.textContent = message;

  field.parentNode.appendChild(errorElement);
}

// Clear Contact Field Error
function clearContactFieldError(field) {
  const formGroup = field.closest(".form-group");
  if (formGroup) {
    formGroup.classList.remove("error");
  }

  const errorElement = field.parentNode.querySelector(".field-error");
  if (errorElement) {
    errorElement.remove();
  }
}

// Submit Contact Form
function submitContactForm(data, form) {
  const submitBtn = form.querySelector(".submit-btn");
  const originalText = submitBtn.textContent;

  // Show loading state
  submitBtn.innerHTML =
    '<div class="loading-dots"><div></div><div></div><div></div><div></div></div>';
  submitBtn.disabled = true;

  // Simulate API call
  setTimeout(() => {
    // Success - show success message
    showContactSuccessMessage(form, data);

    // Reset form
    form.reset();

    // Reset button
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;

    // Track contact form submission
    trackContactFormSubmission(data);
  }, 2000);
}

// Show Contact Success Message
function showContactSuccessMessage(form, data) {
  const successMessage = document.createElement("div");
  successMessage.className = "success-message";
  successMessage.innerHTML = `
        <h3>✅ تم إرسال رسالتك بنجاح!</h3>
        <p>شكراً لك ${data.name}، سنرد على رسالتك خلال 24 ساعة.</p>
        <p>رقم التذكرة: #${generateTicketNumber()}</p>
    `;

  form.parentNode.insertBefore(successMessage, form);

  // Remove success message after 5 seconds
  setTimeout(() => {
    successMessage.remove();
  }, 5000);
}

// Generate Ticket Number
function generateTicketNumber() {
  return "TKT" + Date.now().toString().slice(-6);
}

// Track Contact Form Submission
function trackContactFormSubmission(data) {
  console.log("Contact form submitted:", data);

  if (typeof gtag !== "undefined") {
    gtag("event", "contact_form_submission", {
      event_category: "contact",
      event_label: data.inquiryType,
    });
  }
}

// Setup FAQ Quick Links
function setupFAQQuickLinks() {
  const faqLinks = document.querySelectorAll(".faq-link");

  faqLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const linkType = link.querySelector("h3").textContent;
      const inquirySelect = document.querySelector(
        "#contactForm select[required]"
      );

      // Auto-fill inquiry type based on FAQ link
      switch (linkType) {
        case "معلومات التوصيل":
          inquirySelect.value = "order";
          break;
        case "طرق الدفع":
          inquirySelect.value = "products";
          break;
        case "سياسة الإرجاع":
          inquirySelect.value = "complaint";
          break;
        case "خدمات مخصصة":
          inquirySelect.value = "services";
          break;
      }

      // Scroll to contact form
      document.querySelector(".contact-form").scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      // Show notification
      showNotification(`تم تحديد "${linkType}" كنوع الاستفسار`);
    });
  });
}

// Setup Contact Animations
function setupContactAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = "running";
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe contact items
  document.querySelectorAll(".contact-item").forEach((item) => {
    item.style.animationPlayState = "paused";
    observer.observe(item);
  });

  // Observe FAQ links
  document.querySelectorAll(".faq-link").forEach((link) => {
    link.style.opacity = "0";
    link.style.transform = "translateY(30px)";
    link.style.transition = "all 0.6s ease";
    observer.observe(link);

    const index = Array.from(document.querySelectorAll(".faq-link")).indexOf(
      link
    );
    link.style.transitionDelay = `${index * 0.1}s`;
  });
}

// Setup Social Links
function setupSocialLinks() {
  const socialLinks = document.querySelectorAll(".social-link");

  socialLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const platform = link.textContent.trim();
      let url = "#";

      switch (platform) {
        case "فيسبوك":
          url = "https://facebook.com/hadiya";
          break;
        case "إنستغرام":
          url = "https://instagram.com/hadiya";
          break;
        case "تويتر":
          url = "https://twitter.com/hadiya";
          break;
        case "يوتيوب":
          url = "https://youtube.com/hadiya";
          break;
      }

      // Open social media in new tab
      window.open(url, "_blank");

      // Track social media click
      trackSocialMediaClick(platform);
    });
  });
}

// Track Social Media Click
function trackSocialMediaClick(platform) {
  console.log(`Social media clicked: ${platform}`);

  if (typeof gtag !== "undefined") {
    gtag("event", "social_media_click", {
      event_category: "contact",
      event_label: platform,
    });
  }
}

// Setup Click to Call
function setupClickToCall() {
  const phoneLinks = document.querySelectorAll('a[href^="tel:"]');

  phoneLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      // Track phone call attempt
      trackPhoneCall();
    });
  });
}

// Track Phone Call
function trackPhoneCall() {
  console.log("Phone call attempted");

  if (typeof gtag !== "undefined") {
    gtag("event", "phone_call", {
      event_category: "contact",
    });
  }
}

// Business Hours Check
function checkBusinessHours() {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday, 6 = Saturday
  const hour = now.getHours();

  // Business hours: Sun-Thu 9AM-6PM, Fri 4PM-9PM, Sat closed
  let isOpen = false;
  let message = "";

  if (day >= 0 && day <= 3) {
    // Sun-Wed
    isOpen = hour >= 9 && hour < 18;
    message = isOpen ? "نحن مفتوحون الآن" : "نحن مغلقون الآن";
  } else if (day === 4) {
    // Thu
    isOpen = hour >= 9 && hour < 18;
    message = isOpen ? "نحن مفتوحون الآن" : "نحن مغلقون الآن";
  } else if (day === 5) {
    // Fri
    isOpen = hour >= 16 && hour < 21;
    message = isOpen ? "نحن مفتوحون الآن" : "نحن مغلقون الآن";
  } else {
    // Sat
    isOpen = false;
    message = "نحن مغلقون اليوم";
  }

  return { isOpen, message };
}

// Update Business Hours Status
function updateBusinessHoursStatus() {
  const { isOpen, message } = checkBusinessHours();
  const statusElement = document.createElement("div");
  statusElement.className = `business-hours-status ${
    isOpen ? "open" : "closed"
  }`;
  statusElement.innerHTML = `
        <span class="status-dot ${isOpen ? "open" : "closed"}"></span>
        ${message}
    `;

  statusElement.style.cssText = `
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 15px;
        background: ${isOpen ? "#27ae60" : "#e74c3c"};
        color: white;
        border-radius: 20px;
        font-size: 0.9rem;
        font-weight: 500;
        margin-right: 15px;
    `;

  const statusDot = statusElement.querySelector(".status-dot");
  statusDot.style.cssText = `
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: currentColor;
        animation: ${isOpen ? "pulse 2s infinite" : "none"};
    `;

  // Add to contact info header
  const contactInfoHeader = document.querySelector(".contact-info h2");
  if (contactInfoHeader) {
    contactInfoHeader.appendChild(statusElement);
  }
}

// Auto-fill Form from URL Parameters
function autoFillFormFromURL() {
  const urlParams = new URLSearchParams(window.location.search);

  const name = urlParams.get("name");
  const email = urlParams.get("email");
  const subject = urlParams.get("subject");

  if (name)
    document.querySelector('#contactForm input[type="text"]').value = name;
  if (email)
    document.querySelector('#contactForm input[type="email"]').value = email;
  if (subject)
    document.querySelector(
      '#contactForm input[placeholder="موضوع الرسالة"]'
    ).value = subject;
}

// Enhanced Email Validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Enhanced Phone Validation
function isValidPhone(phone) {
  const phoneRegex = /^(05)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initParallax();
  initCounters();
  loadFeaturedProducts();
  initSmoothScrolling();
  initProductsPage();
  initServicesPage();
  initBlogPage();
  initContactPage();

  // Add business hours status
  updateBusinessHoursStatus();

  // Auto-fill form from URL parameters
  autoFillFormFromURL();

  // Add loading animation to hero section
  const heroContent = document.querySelector(".hero-content");
  const heroVisual = document.querySelector(".hero-visual");

  setTimeout(() => {
    heroContent.style.opacity = "1";
    heroContent.style.transform = "translateY(0)";
  }, 300);

  setTimeout(() => {
    heroVisual.style.opacity = "1";
    heroVisual.style.transform = "translateY(0)";
  }, 600);

  // Set initial styles for animation
  heroContent.style.cssText = `
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease;
    `;

  heroVisual.style.cssText = `
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease 0.3s;
    `;
});

// Add some interactive effects
document.addEventListener("DOMContentLoaded", () => {
  // Add hover effect to service cards
  const serviceCards = document.querySelectorAll(".service-card");
  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px) scale(1.02)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)";
    });
  });

  // Add click effect to buttons
  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    button.addEventListener("mousedown", () => {
      button.style.transform = "scale(0.95)";
    });

    button.addEventListener("mouseup", () => {
      button.style.transform = "scale(1)";
    });

    button.addEventListener("mouseleave", () => {
      button.style.transform = "scale(1)";
    });
  });
});
