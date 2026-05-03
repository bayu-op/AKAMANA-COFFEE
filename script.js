const menuItems = [
  {
    name: "Avo on Toast",
    category: "Makanan",
    price: "Rp 90.000",
    description: "Classic sourdough dengan avocado dan poached egg."
  },
  {
    name: "Ubud Breakfast Wrap",
    category: "Makanan",
    price: "Rp 78.000",
    description: "Wrap isi lettuce, egg, tomato, hash brown potato, dan avocado."
  },
  {
    name: "Grilled Tuna Steak",
    category: "Makanan",
    price: "Rp 114.000",
    description: "Tuna steak dengan pilaf rice dan sentuhan mango."
  },
  {
    name: "Nasi Goreng Suna Cekuh",
    category: "Makanan",
    price: "Rp 78.000",
    description: "Fried rice khas Balinese herb dengan fried egg dan chicken sate."
  },
  {
    name: "BBQ Pork Ribs",
    category: "Makanan",
    price: "Rp 150.000",
    description: "Pilihan menu berat untuk tamu yang ingin makan lebih puas."
  },
  {
    name: "Cappuccino",
    category: "Kopi",
    price: "Rp 39.000",
    description: "Kopi creamy yang pas untuk pagi atau sore santai."
  },
  {
    name: "Latte",
    category: "Kopi",
    price: "Rp 39.000",
    description: "Espresso dan susu dengan rasa lembut yang mudah disukai."
  },
  {
    name: "Americano",
    category: "Kopi",
    price: "Rp 33.000",
    description: "Pilihan klasik untuk penikmat kopi hitam yang clean."
  },
  {
    name: "Sunshine",
    category: "Minuman Segar",
    price: "Rp 58.000",
    description: "Pineapple, mango, dan lime juice dengan rasa tropis."
  },
  {
    name: "Dragon Smoothie",
    category: "Minuman Segar",
    price: "Rp 58.000",
    description: "Dragon fruit, banana, yogurt, honey, dan milk."
  },
  {
    name: "Butterfly Mojito",
    category: "Minuman Segar",
    price: "Rp 58.000",
    description: "Sparkling butterfly drink dengan lime, mint, dan lemongrass."
  },
  {
    name: "Fresh Whole Coconut",
    category: "Minuman Segar",
    price: "Rp 39.000",
    description: "Kelapa segar untuk pilihan yang ringan dan menyegarkan."
  }
];

const state = {
  activeCategory: "Semua",
  expanded: false
};

const menuGrid = document.getElementById("menuGrid");
const menuFilters = document.getElementById("menuFilters");
const toggleMenuButton = document.getElementById("toggleMenu");

function createFilters() {
  const categories = ["Semua", ...new Set(menuItems.map((item) => item.category))];

  menuFilters.innerHTML = categories
    .map(
      (category) => `
        <button
          class="filter-chip ${category === state.activeCategory ? "is-active" : ""}"
          type="button"
          data-category="${category}"
        >
          ${category}
        </button>
      `
    )
    .join("");

  menuFilters.querySelectorAll("[data-category]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeCategory = button.dataset.category;
      createFilters();
      renderMenu();
    });
  });
}

function getVisibleItems() {
  const filteredItems =
    state.activeCategory === "Semua"
      ? menuItems
      : menuItems.filter((item) => item.category === state.activeCategory);

  return state.expanded ? filteredItems : filteredItems.slice(0, 6);
}

function renderMenu() {
  const visibleItems = getVisibleItems();

  menuGrid.innerHTML = visibleItems
    .map(
      (item) => `
        <article class="menu-card">
          <div class="menu-meta">
            <span class="menu-badge">${item.category}</span>
            <span class="menu-price">${item.price}</span>
          </div>
          <h3>${item.name}</h3>
          <p>${item.description}</p>
        </article>
      `
    )
    .join("");

  const totalFiltered =
    state.activeCategory === "Semua"
      ? menuItems.length
      : menuItems.filter((item) => item.category === state.activeCategory).length;

  toggleMenuButton.textContent =
    state.expanded || totalFiltered <= 6 ? "Ringkas Menu" : "Tampilkan Semua";

  toggleMenuButton.hidden = totalFiltered <= 6;
}

toggleMenuButton.addEventListener("click", () => {
  state.expanded = !state.expanded;
  renderMenu();
});

createFilters();
renderMenu();
