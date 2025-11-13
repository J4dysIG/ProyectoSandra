// Database simulation using localStorage (in a real app, this would be IndexedDB)
const DB = {
    init: function() {
        if (!localStorage.getItem('users')) {
            localStorage.setItem('users', JSON.stringify([]));
        }
        if (!localStorage.getItem('productos')) {
            // Sample products data
            const productos = [
                {
                    id: 1,
                    name: "Laptop Gaming Pro",
                    price: 1299.99,
                    category: "Computadoras",
                    description: "Laptop de alto rendimiento para gaming y trabajo",
                    features: [
                        "Procesador Intel i7",
                        "16GB RAM",
                        "512GB SSD",
                        "Pantalla 15.6\" FHD",
                        "Tarjeta gráfica RTX 3060",
                        "Teclado RGB",
                        "Batería de larga duración",
                        "Windows 11 preinstalado"
                    ],
                    image: "https://via.placeholder.com/300x200?text=Laptop+Gaming"
                },
                {
                    id: 2,
                    name: "Smartphone Ultra",
                    price: 799.99,
                    category: "Teléfonos",
                    description: "Teléfono inteligente con cámara de alta resolución",
                    features: [
                        "Pantalla 6.7\" AMOLED",
                        "128GB almacenamiento",
                        "Cámara triple 108MP",
                        "Batería 5000mAh",
                        "Procesador Snapdragon 888",
                        "5G compatible",
                        "Resistente al agua",
                        "Carga rápida 65W"
                    ],
                    image: "https://via.placeholder.com/300x200?text=Smartphone+Ultra"
                },
                {
                    id: 3,
                    name: "Tablet Pro",
                    price: 599.99,
                    category: "Tablets",
                    description: "Tablet versátil para trabajo y entretenimiento",
                    features: [
                        "Pantalla 11\" IPS",
                        "64GB almacenamiento",
                        "Stylus incluido",
                        "Batería 8000mAh",
                        "Procesador Octa-core",
                        "4GB RAM",
                        "Android 12",
                        "Conectividad 4G"
                    ],
                    image: "https://via.placeholder.com/300x200?text=Tablet+Pro"
                },
                {
                    id: 4,
                    name: "Auriculares Inalámbricos",
                    price: 199.99,
                    category: "Audio",
                    description: "Auriculares con cancelación de ruido activa",
                    features: [
                        "Cancelación de ruido activa",
                        "Batería 30 horas",
                        "Carga rápida",
                        "Bluetooth 5.0",
                        "Micrófono incorporado",
                        "Compatibilidad con asistente de voz",
                        "Almohadillas ergonómicas",
                        "Estuche de carga incluido"
                    ],
                    image: "https://via.placeholder.com/300x200?text=Auriculares"
                },
                {
                    id: 5,
                    name: "Smartwatch Fitness",
                    price: 249.99,
                    category: "Wearables",
                    description: "Reloj inteligente con seguimiento de actividad",
                    features: [
                        "Pantalla AMOLED 1.4\"",
                        "Resistente al agua",
                        "Monitoreo cardíaco",
                        "Seguimiento de sueño",
                        "Notificaciones smartphone",
                        "GPS integrado",
                        "Batería 7 días",
                        "Compatible iOS/Android"
                    ],
                    image: "https://via.placeholder.com/300x200?text=Smartwatch"
                },
                {
                    id: 6,
                    name: "Monitor 4K",
                    price: 449.99,
                    category: "Monitores",
                    description: "Monitor ultra HD para trabajo y gaming",
                    features: [
                        "Pantalla 27\" 4K",
                        "Tasa de refresco 144Hz",
                        "Tiempo de respuesta 1ms",
                        "HDR compatible",
                        "Puertos HDMI/DisplayPort",
                        "Base ajustable",
                        "Modos de visualización",
                        "Filtro de luz azul"
                    ],
                    image: "https://via.placeholder.com/300x200?text=Monitor+4K"
                }
            ];
            localStorage.setItem('productos', JSON.stringify(productos));
        }
        if (!localStorage.getItem('cart')) {
            localStorage.setItem('cart', JSON.stringify([]));
        }
        
        // Load featured products
        this.loadFeaturedProducts();
        // Load inventory
        this.loadInventory();
        // Update cart count
        this.updateCartCount();
    },
    
    getUsers: function() {
        return JSON.parse(localStorage.getItem('users'));
    },
    
    addUser: function(user) {
        const users = this.getUsers();
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    },
    
    getUserByEmail: function(email) {
        const users = this.getUsers();
        return users.find(user => user.email === email);
    },
    
    getProducts: function() {
        return JSON.parse(localStorage.getItem('products'));
    },
    
    getProductById: function(id) {
        const products = this.getProducts();
        return products.find(product => product.id === id);
    },
    
    getCart: function() {
        return JSON.parse(localStorage.getItem('cart'));
    },
    
    addToCart: function(productos) {
        const cart = this.getCart();
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        this.updateCartCount();
    },
    
    removeFromCart: function(productId) {
        let cart = this.getCart();
        cart = cart.filter(item => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        this.updateCartCount();
    },
    
    updateCartQuantity: function(productId, quantity) {
        const cart = this.getCart();
        const item = cart.find(item => item.id === productId);
        
        if (item) {
            if (quantity <= 0) {
                this.removeFromCart(productId);
            } else {
                item.quantity = quantity;
            }
            
            localStorage.setItem('cart', JSON.stringify(cart));
            this.updateCartCount();
        }
    },
    
    updateCartCount: function() {
        const cart = this.getCart();
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        document.getElementById('cart-count').textContent = count;
    },
    
    loadFeaturedProducts: function() {
        const products = this.getProducts().slice(0, 3); // Show first 3 as featured
        const container = document.getElementById('featured-products');
        
        container.innerHTML = '';
        products.forEach(product => {
            container.innerHTML += this.createProductCard(product);
        });
    },
    
    loadInventory: function() {
        const products = this.getProducts();
        const container = document.getElementById('inventory-products');
        
        container.innerHTML = '';
        products.forEach(product => {
            container.innerHTML += this.createProductCard(product);
        });
    },
    
    createProductCard: function(product) {
        return `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                    <div class="product-actions">
                        <button class="btn btn-primary" onclick="addToCart(${product.id})">Añadir al Carrito</button>
                        <button class="btn btn-secondary" onclick="showProductDetail(${product.id})">Ver Detalles</button>
                    </div>
                </div>
            </div>
        `;
    },
    
    loadCart: function() {
        const cart = this.getCart();
        const container = document.getElementById('cart-items');
        const emptyMessage = document.getElementById('empty-cart-message');
        
        if (cart.length === 0) {
            container.innerHTML = '';
            container.appendChild(emptyMessage);
            emptyMessage.style.display = 'block';
            return;
        }
        
        emptyMessage.style.display = 'none';
        let html = '';
        let total = 0;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            html += `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                        <div class="cart-item-details">
                            <h3>${item.name}</h3>
                            <p>Precio: $${item.price.toFixed(2)}</p>
                        </div>
                    </div>
                    <div class="cart-item-actions">
                        <div class="quantity-control">
                            <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                            <span>${item.quantity}</span>
                            <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
                        </div>
                        <p>$${itemTotal.toFixed(2)}</p>
                        <button class="btn btn-accent" onclick="removeFromCart(${item.id})">Eliminar</button>
                    </div>
                </div>
            `;
        });
        
        html += `<div class="cart-total">Total: $${total.toFixed(2)}</div>`;
        container.innerHTML = html;
    },
    
    searchProducts: function(query) {
        const products = this.getProducts();
        const container = document.getElementById('inventory-products');
        
        container.innerHTML = '';
        
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase())
        );
        
        if (filteredProducts.length === 0) {
            container.innerHTML = '<p style="text-align: center; grid-column: 1 / -1;">No se encontraron productos</p>';
            return;
        }
        
        filteredProducts.forEach(product => {
            container.innerHTML += this.createProductCard(product);
        });
    }
};

// Page navigation
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    document.getElementById(pageId).classList.add('active');
    
    // Special handling for certain pages
    if (pageId === 'cart') {
        DB.loadCart();
    }
}

// Product functions
function showProductDetail(productId) {
    const product = DB.getProductById(productId);
    if (!product) return;
    
    const container = document.getElementById('product-detail-content');
    let featuresHtml = '';
    
    product.features.forEach(feature => {
        featuresHtml += `<li>${feature}</li>`;
    });
    
    container.innerHTML = `
        <div style="display: flex; flex-wrap: wrap; gap: 2rem; background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <div style="flex: 1; min-width: 300px;">
                <img src="${product.image}" alt="${product.name}" style="width: 100%; border-radius: 8px;">
            </div>
            <div style="flex: 2; min-width: 300px;">
                <h2>${product.name}</h2>
                <p style="font-size: 1.5rem; color: var(--accent); font-weight: bold; margin: 1rem 0;">$${product.price.toFixed(2)}</p>
                <p>${product.description}</p>
                <h3 style="margin: 1.5rem 0 1rem;">Características:</h3>
                <ul style="margin-left: 1.5rem;">
                    ${featuresHtml}
                </ul>
                <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                    <button class="btn btn-primary" onclick="addToCart(${product.id})">Añadir al Carrito</button>
                    <button class="btn btn-accent" onclick="contactAboutProduct(${product.id})">Contactar sobre este producto</button>
                    <button class="btn btn-secondary" onclick="showPage('inventory')">Volver al Inventario</button>
                </div>
            </div>
        </div>
    `;
    
    showPage('product-detail');
}

function contactAboutProduct(productId) {
    const product = DB.getProductById(productId);
    if (!product) return;
    
    document.getElementById('contact-message').value = `Hola, estoy interesado en el producto "${product.name}". Por favor, envíenme más información.`;
    showPage('contact');
}

// Cart functions
function addToCart(productId) {
    const product = DB.getProductById(productId);
    if (!product) return;
    
    DB.addToCart(product);
    Toastify({
        text: "Producto añadido al carrito",
        duration: 3000,
        gravity: "bottom",
        position: "right",
        backgroundColor: "var(--success)",
    }).showToast();
}

function removeFromCart(productId) {
    DB.removeFromCart(productId);
    DB.loadCart();
}

function updateCartQuantity(productId, quantity) {
    DB.updateCartQuantity(productId, quantity);
    DB.loadCart();
}

// Search function
function searchProducts() {
    const query = document.getElementById('search-input').value;
    DB.searchProducts(query);
}

// Form validation and submission
document.getElementById('register-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    
    let isValid = true;
    
    // Reset errors
    document.querySelectorAll('#register-form .error-message').forEach(error => {
        error.style.display = 'none';
    });
    
    // Validate name
    if (!name.trim()) {
        document.getElementById('register-name-error').style.display = 'block';
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('register-email-error').style.display = 'block';
        isValid = false;
    }
    
    // Validate password
    if (password.length < 6) {
        document.getElementById('register-password-error').style.display = 'block';
        isValid = false;
    }
    
    // Check if email already exists
    if (DB.getUserByEmail(email)) {
        Toastify({
            text: "Este email ya está registrado",
            duration: 3000,
            gravity: "bottom",
            position: "right",
            backgroundColor: "var(--accent)",
        }).showToast();
        isValid = false;
    }
    
    if (isValid) {
        // Simple password encryption (in a real app, use proper hashing)
        const encryptedPassword = btoa(password);
        
        DB.addUser({
            name: name,
            email: email,
            password: encryptedPassword
        });
        
        Toastify({
            text: "Registro exitoso",
            duration: 3000,
            gravity: "bottom",
            position: "right",
            backgroundColor: "var(--success)",
        }).showToast();
        
        // Redirect to login after a delay
        setTimeout(() => {
            showPage('login');
        }, 1500);
    }
});

document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    let isValid = true;
    
    // Reset errors
    document.querySelectorAll('#login-form .error-message').forEach(error => {
        error.style.display = 'none';
    });
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('login-email-error').style.display = 'block';
        isValid = false;
    }
    
    // Validate password
    if (!password) {
        document.getElementById('login-password-error').style.display = 'block';
        isValid = false;
    }
    
    if (isValid) {
        const user = DB.getUserByEmail(email);
        const encryptedPassword = btoa(password);
        
        if (user && user.password === encryptedPassword) {
            Toastify({
                text: "Inicio de sesión exitoso",
                duration: 3000,
                gravity: "bottom",
                position: "right",
                backgroundColor: "var(--success)",
            }).showToast();
            
            // Redirect to home after a delay
            setTimeout(() => {
                showPage('home');
            }, 1500);
        } else {
            Toastify({
                text: "Email o contraseña incorrectos",
                duration: 3000,
                gravity: "bottom",
                position: "right",
                backgroundColor: "var(--accent)",
            }).showToast();
        }
    }
});

document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const message = document.getElementById('contact-message').value;
    
    let isValid = true;
    
    // Reset errors
    document.querySelectorAll('#contact-form .error-message').forEach(error => {
        error.style.display = 'none';
    });
    
    // Validate name
    if (!name.trim()) {
        document.getElementById('name-error').style.display = 'block';
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('email-error').style.display = 'block';
        isValid = false;
    }
    
    // Validate message
    if (!message.trim()) {
        document.getElementById('message-error').style.display = 'block';
        isValid = false;
    }
    
    if (isValid) {
        Toastify({
            text: "Mensaje enviado correctamente",
            duration: 3000,
            gravity: "bottom",
            position: "right",
            backgroundColor: "var(--success)",
        }).showToast();
        
        // Reset form
        document.getElementById('contact-form').reset();
    }
});

// Initialize the application
window.onload = function() {
    DB.init();
};