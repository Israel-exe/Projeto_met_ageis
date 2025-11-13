// Base de dados simulada (localStorage)
const DB = {
  products: [
    {
      id: 1,
      name: "Quarto Standard",
      description: "Quarto confortável com cama queen size, TV, ar-condicionado e vista para a cidade.",
      price: 350.0,
      capacity: 2,
      image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=600&fit=crop",
    },
    {
      id: 2,
      name: "Quarto Deluxe",
      description: "Quarto espaçoso com cama king size, banheiro de mármore e vista panorâmica.",
      price: 550.0,
      capacity: 2,
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
    },
    {
      id: 3,
      name: "Suíte Premium",
      description: "Suíte luxuosa com sala de estar, jacuzzi, varanda privativa e serviço de mordomo.",
      price: 890.0,
      capacity: 3,
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop",
    },
    {
      id: 4,
      name: "Suíte Presidencial",
      description: "O máximo em luxo com 2 quartos, sala de jantar, cozinha e vista espetacular.",
      price: 1500.0,
      capacity: 4,
      image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&h=600&fit=crop",
    },
  ],
}

// Funções auxiliares
function formatCurrency(value) {
  return "R$ " + value.toFixed(2).replace(".", ",")
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("pt-BR")
}

function getCart() {
  return JSON.parse(localStorage.getItem("cart") || "[]")
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart))
  updateCartCount()
}

function updateCartCount() {
  const cart = getCart()
  const countElements = document.querySelectorAll("#cart-count")
  countElements.forEach((el) => {
    el.textContent = cart.length
  })
}

function getBookings() {
  return JSON.parse(localStorage.getItem("bookings") || "[]")
}

function saveBookings(bookings) {
  localStorage.setItem("bookings", JSON.stringify(bookings))
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser") || "null")
}

function setCurrentUser(user) {
  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user))
  } else {
    localStorage.removeItem("currentUser")
  }
}

function generateBookingId() {
  return "RES" + Date.now() + Math.floor(Math.random() * 1000)
}

// Toggle menu mobile
function toggleMobileMenu() {
  const menu = document.getElementById("navMenu")
  if (menu) {
    menu.classList.toggle("active")
  }
}

// Carregar produtos
function loadProducts() {
  const grid = document.getElementById("products-grid")
  if (!grid) return

  grid.innerHTML = DB.products
    .map(
      (product) => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p class="product-price">${formatCurrency(product.price)}<small>/noite</small></p>
                <p class="product-details">Capacidade: ${product.capacity} pessoa(s)</p>
                <button onclick="addToCart(${product.id})" class="btn-primary btn-block">
                    Adicionar ao Carrinho
                </button>
            </div>
        </div>
    `,
    )
    .join("")
}

// Adicionar ao carrinho
function addToCart(productId) {
  const product = DB.products.find((p) => p.id === productId)
  if (!product) return

  const checkIn = prompt("Data de Check-in (DD/MM/AAAA):")
  const checkOut = prompt("Data de Check-out (DD/MM/AAAA):")

  if (!checkIn || !checkOut) {
    alert("Datas de check-in e check-out são obrigatórias!")
    return
  }

  const cart = getCart()
  cart.push({
    id: Date.now(),
    product: product,
    checkIn: checkIn,
    checkOut: checkOut,
    nights: calculateNights(checkIn, checkOut),
    total: product.price * calculateNights(checkIn, checkOut),
  })

  saveCart(cart)
  alert("Reserva adicionada ao carrinho!")
}

function calculateNights(checkIn, checkOut) {
  // Simplificado - em produção, usar biblioteca de datas
  return 3 // Retorna 3 noites como exemplo
}

// Carregar carrinho
function loadCart() {
  const container = document.getElementById("cart-content")
  if (!container) return

  const cart = getCart()

  if (cart.length === 0) {
    container.innerHTML = `
            <div class="empty-state">
                <h3>Seu carrinho está vazio</h3>
                <p>Adicione quartos ao seu carrinho para continuar</p>
                <a href="produtos.html" class="btn-primary">Ver Quartos</a>
            </div>
        `
    return
  }

  const total = cart.reduce((sum, item) => sum + item.total, 0)

  container.innerHTML = `
        ${cart
          .map(
            (item, index) => `
            <div class="cart-item">
                <div>
                    <h3>${item.product.name}</h3>
                    <p>Check-in: ${item.checkIn} | Check-out: ${item.checkOut}</p>
                    <p>${item.nights} noite(s) × ${formatCurrency(item.product.price)}</p>
                    <p><strong>Subtotal: ${formatCurrency(item.total)}</strong></p>
                </div>
                <button onclick="removeFromCart(${index})" class="btn-secondary">Remover</button>
            </div>
        `,
          )
          .join("")}
        
        <div class="cart-summary">
            <h2>Total: <span class="cart-total">${formatCurrency(total)}</span></h2>
            <button onclick="checkout()" class="btn-primary">Finalizar Reserva</button>
        </div>
    `
}

function removeFromCart(index) {
  const cart = getCart()
  cart.splice(index, 1)
  saveCart(cart)
  loadCart()
}

// Finalizar compra
function checkout() {
  const name = prompt("Seu nome completo:")
  const email = prompt("Seu email:")
  const phone = prompt("Seu telefone:")

  if (!name || !email || !phone) {
    alert("Todos os campos são obrigatórios!")
    return
  }

  const cart = getCart()
  const bookingId = generateBookingId()
  const booking = {
    id: bookingId,
    customer: { name, email, phone },
    items: cart,
    total: cart.reduce((sum, item) => sum + item.total, 0),
    date: new Date().toISOString(),
    status: "active",
  }

  const bookings = getBookings()
  bookings.push(booking)
  saveBookings(bookings)

  // Criar conta de cliente
  setCurrentUser({ email, name, type: "client" })

  // Limpar carrinho
  saveCart([])

  // Redirecionar para comprovante
  localStorage.setItem("lastBooking", JSON.stringify(booking))
  window.location.href = "comprovante.html"
}

// Carregar comprovante
function loadReceipt() {
  const container = document.getElementById("receipt-content")
  if (!container) return

  const booking = JSON.parse(localStorage.getItem("lastBooking") || "null")

  if (!booking) {
    container.innerHTML = '<div class="empty-state"><h3>Nenhum comprovante encontrado</h3></div>'
    return
  }

  container.innerHTML = `
        <div style="text-align: center; margin-bottom: 2rem;">
            <h2 style="color: var(--primary-blue);">Comprovante de Reserva</h2>
            <p style="font-size: 1.2rem; color: var(--success);">✓ Reserva Confirmada</p>
        </div>

        <div style="background-color: var(--light-blue); padding: 1.5rem; border-radius: 8px; margin-bottom: 2rem;">
            <p><strong>Código da Reserva:</strong> ${booking.id}</p>
            <p><strong>Data da Reserva:</strong> ${formatDate(booking.date)}</p>
        </div>

        <div style="margin-bottom: 2rem;">
            <h3 style="color: var(--primary-blue); margin-bottom: 1rem;">Dados do Hóspede</h3>
            <p><strong>Nome:</strong> ${booking.customer.name}</p>
            <p><strong>Email:</strong> ${booking.customer.email}</p>
            <p><strong>Telefone:</strong> ${booking.customer.phone}</p>
        </div>

        <div style="margin-bottom: 2rem;">
            <h3 style="color: var(--primary-blue); margin-bottom: 1rem;">Detalhes da Reserva</h3>
            ${booking.items
              .map(
                (item) => `
                <div style="padding: 1rem; background-color: var(--gray-light); margin-bottom: 1rem; border-radius: 4px;">
                    <p><strong>${item.product.name}</strong></p>
                    <p>Check-in: ${item.checkIn} | Check-out: ${item.checkOut}</p>
                    <p>${item.nights} noite(s) × ${formatCurrency(item.product.price)} = ${formatCurrency(item.total)}</p>
                </div>
            `,
              )
              .join("")}
        </div>

        <div style="background-color: var(--primary-blue); color: white; padding: 1.5rem; border-radius: 8px; text-align: center;">
            <h2>Valor Total: ${formatCurrency(booking.total)}</h2>
        </div>

        <div style="margin-top: 2rem; padding: 1rem; background-color: var(--light-blue); border-radius: 4px;">
            <p><strong>Importante:</strong> Apresente este comprovante no check-in. Um email de confirmação foi enviado para ${booking.customer.email}</p>
        </div>
    `
}

// Formulário de contato
function handleContactForm(event) {
  event.preventDefault()
  const form = event.target
  const data = {
    name: form.name.value,
    email: form.email.value,
    phone: form.phone.value,
    message: form.message.value,
  }

  console.log("[v0] Mensagem enviada:", data)
  alert("Mensagem enviada com sucesso! Entraremos em contato em breve.")
  form.reset()
}

// Login cliente
function handleLogin(event) {
  event.preventDefault()
  const email = event.target.email.value
  const password = event.target.password.value

  // Simulação de login - em produção, validar com backend
  const bookings = getBookings()
  const userBooking = bookings.find((b) => b.customer.email === email)

  if (userBooking) {
    setCurrentUser({
      email: userBooking.customer.email,
      name: userBooking.customer.name,
      type: "client",
    })
    window.location.href = "cliente-dashboard.html"
  } else {
    alert("Email não encontrado. Faça uma reserva para criar sua conta!")
  }
}

// Login admin
function handleAdminLogin(event) {
  event.preventDefault()
  const username = event.target.username.value
  const password = event.target.password.value

  // Credenciais de demonstração
  if (username === "admin" && password === "admin123") {
    setCurrentUser({ username, type: "admin" })
    window.location.href = "admin-dashboard.html"
  } else {
    alert("Credenciais inválidas!")
  }
}

// Verificar autenticação admin
function checkAdminAuth() {
  const user = getCurrentUser()
  if (!user || user.type !== "admin") {
    window.location.href = "admin-login.html"
  }
}

// Verificar autenticação cliente
function checkClientAuth() {
  const user = getCurrentUser()
  if (!user || user.type !== "client") {
    window.location.href = "login.html"
  }
}

// Logout
function logout() {
  setCurrentUser(null)
  window.location.href = "index.html"
}

// Carregar dashboard admin
function loadAdminDashboard() {
  const bookings = getBookings()

  // Calcular estatísticas
  const currentMonth = new Date().getMonth()
  const monthlyRevenue = bookings
    .filter((b) => new Date(b.date).getMonth() === currentMonth)
    .reduce((sum, b) => sum + b.total, 0)

  const activeBookings = bookings.filter((b) => b.status === "active").length

  // Atualizar estatísticas
  document.getElementById("monthly-revenue").textContent = formatCurrency(monthlyRevenue)
  document.getElementById("total-bookings").textContent = bookings.length
  document.getElementById("active-bookings").textContent = activeBookings

  // Carregar tabela de reservas
  const container = document.getElementById("admin-bookings")
  if (!container) return

  if (bookings.length === 0) {
    container.innerHTML = '<div class="empty-state"><h3>Nenhuma reserva encontrada</h3></div>'
    return
  }

  container.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Cliente</th>
                    <th>Email</th>
                    <th>Valor</th>
                    <th>Data</th>
                    <th>Status</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                ${bookings
                  .map(
                    (booking) => `
                    <tr>
                        <td>${booking.id}</td>
                        <td>${booking.customer.name}</td>
                        <td>${booking.customer.email}</td>
                        <td>${formatCurrency(booking.total)}</td>
                        <td>${formatDate(booking.date)}</td>
                        <td>
                            <span class="status-badge status-${booking.status}">
                                ${booking.status === "active" ? "Ativa" : "Cancelada"}
                            </span>
                        </td>
                        <td>
                            ${
                              booking.status === "active"
                                ? `<button onclick="cancelBookingAdmin('${booking.id}')" class="btn-secondary">Cancelar</button>`
                                : "<span>-</span>"
                            }
                        </td>
                    </tr>
                `,
                  )
                  .join("")}
            </tbody>
        </table>
    `
}

function cancelBookingAdmin(bookingId) {
  if (!confirm("Deseja realmente cancelar esta reserva?")) return

  const bookings = getBookings()
  const booking = bookings.find((b) => b.id === bookingId)
  if (booking) {
    booking.status = "cancelled"
    saveBookings(bookings)
    loadAdminDashboard()
    alert("Reserva cancelada com sucesso!")
  }
}

// Carregar reservas do cliente
function loadClientBookings() {
  const user = getCurrentUser()
  const container = document.getElementById("client-bookings")
  if (!container || !user) return

  const bookings = getBookings().filter((b) => b.customer.email === user.email)

  if (bookings.length === 0) {
    container.innerHTML = `
            <div class="empty-state">
                <h3>Você ainda não tem reservas</h3>
                <p>Faça sua primeira reserva para começar!</p>
                <a href="produtos.html" class="btn-primary">Ver Quartos Disponíveis</a>
            </div>
        `
    return
  }

  container.innerHTML = bookings
    .map(
      (booking) => `
        <div class="booking-card">
            <h3>Reserva ${booking.id}</h3>
            <div class="booking-details">
                <div class="booking-detail-item">
                    <strong>Data da Reserva</strong>
                    <span>${formatDate(booking.date)}</span>
                </div>
                <div class="booking-detail-item">
                    <strong>Valor Total</strong>
                    <span>${formatCurrency(booking.total)}</span>
                </div>
                <div class="booking-detail-item">
                    <strong>Status</strong>
                    <span class="status-badge status-${booking.status}">
                        ${booking.status === "active" ? "Ativa" : "Cancelada"}
                    </span>
                </div>
            </div>
            <div>
                <h4>Quartos Reservados:</h4>
                ${booking.items
                  .map(
                    (item) => `
                    <p>• ${item.product.name} - ${item.checkIn} a ${item.checkOut}</p>
                `,
                  )
                  .join("")}
            </div>
            ${
              booking.status === "active"
                ? `<button onclick="cancelBookingClient('${booking.id}')" class="btn-secondary" style="margin-top: 1rem;">
                    Cancelar Reserva
                </button>`
                : ""
            }
        </div>
    `,
    )
    .join("")
}

function cancelBookingClient(bookingId) {
  if (!confirm("Deseja realmente cancelar esta reserva?")) return

  const bookings = getBookings()
  const booking = bookings.find((b) => b.id === bookingId)
  if (booking) {
    booking.status = "cancelled"
    saveBookings(bookings)
    loadClientBookings()
    alert("Reserva cancelada com sucesso! O reembolso será processado em até 5 dias úteis.")
  }
}

// Carregar reservas para funcionários
function loadEmployeeBookings() {
  const bookings = getBookings().filter((b) => b.status === "active")
  const container = document.getElementById("employee-bookings")
  if (!container) return

  if (bookings.length === 0) {
    container.innerHTML = '<div class="empty-state"><h3>Nenhuma reserva ativa hoje</h3></div>'
    return
  }

  container.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Cliente</th>
                    <th>Telefone</th>
                    <th>Quartos</th>
                    <th>Check-in</th>
                    <th>Check-out</th>
                </tr>
            </thead>
            <tbody>
                ${bookings
                  .map(
                    (booking) => `
                    <tr>
                        <td>${booking.id}</td>
                        <td>${booking.customer.name}</td>
                        <td>${booking.customer.phone}</td>
                        <td>
                            ${booking.items.map((item) => item.product.name).join(", ")}
                        </td>
                        <td>${booking.items[0].checkIn}</td>
                        <td>${booking.items[0].checkOut}</td>
                    </tr>
                `,
                  )
                  .join("")}
            </tbody>
        </table>
    `
}

// Login funcionário
function handleEmployeeLogin(event) {
  event.preventDefault()
  const username = event.target.username.value
  const password = event.target.password.value

  // Credenciais de demonstração
  if (username === "funcionario" && password === "func123") {
    setCurrentUser({ username, type: "employee" })
    window.location.href = "funcionarios-dashboard.html"
  } else {
    alert("Credenciais inválidas!")
  }
}

// Verificar autenticação funcionário
function checkEmployeeAuth() {
  const user = getCurrentUser()
  if (!user || user.type !== "employee") {
    window.location.href = "funcionarios-login.html"
  }
}

// Inicializar
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount()

  // Adicionar event listeners aos links do menu para fechar em mobile
  const navLinks = document.querySelectorAll(".nav-menu a")
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const menu = document.getElementById("navMenu")
      if (menu && window.innerWidth <= 768) {
        menu.classList.remove("active")
      }
    })
  })

  // Fechar menu ao clicar fora dele
  document.addEventListener("click", (event) => {
    const menu = document.getElementById("navMenu")
    const toggle = document.querySelector(".mobile-menu-toggle")

    if (menu && toggle && window.innerWidth <= 768) {
      if (!menu.contains(event.target) && !toggle.contains(event.target)) {
        menu.classList.remove("active")
      }
    }
  })
})
