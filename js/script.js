AOS.init();

/* ================= BANNER SLIDER ================= */
const slides = document.querySelectorAll('.banner-slide');
let index = 0;

setInterval(() => {
    slides[index].classList.remove('active');
    index = (index + 1) % slides.length;
    slides[index].classList.add('active');
}, 4000);

/* ================= DATA RESEP ================= */
const recipes = [
    {
        id: 1,
        title: "Rendang",
        category: "makanan-berat",
        image: "img/rendang.jpg",
        ingredients: ["Daging sapi", "Santan", "Bumbu rendang"],
        instructions: "Masak perlahan hingga empuk dan bumbu meresap."
    },
    {
        id: 2,
        title: "Nasi Goreng",
        category: "makanan-berat",
        image: "img/nasi goreng.jpg",
        ingredients: ["Nasi", "Telur", "Kecap manis", "Bawang"],
        instructions: "Tumis bumbu lalu goreng nasi hingga harum."
    },
    {
        id: 3,
        title: "Klepon",
        category: "kue",
        image: "img/klepon.avif",
        ingredients: ["Tepung ketan", "Gula merah", "Kelapa parut"],
        instructions: "Rebus hingga mengapung lalu balur kelapa."
    },
    {
        id: 4,
        title: "Sate Ayam",
        category: "makanan-berat",
        image: "img/sate ayam.jpeg",
        ingredients: ["Daging ayam", "Kecap", "Bumbu kacang"],
        instructions: "Bakar hingga matang dan sajikan."
    },
    {
        id: 5,
        title: "Bakso",
        category: "makanan-berat",
        image: "img/bakso.jpeg",
        ingredients: ["Daging sapi", "Tepung tapioka", "Bawang"],
        instructions: "Rebus bakso hingga matang lalu sajikan dengan kuah."
    },
    {
        id: 6,
        title: "Pisang Goreng",
        category: "kue",
        image: "img/pisang goreng.jpg",
        ingredients: ["Pisang", "Tepung", "Minyak"],
        instructions: "Goreng hingga kuning keemasan."
    },
    {
        id: 7,
        title: "Es Cendol",
        category: "minuman",
        image: "img/es cendol.jpg",
        ingredients: ["Cendol", "Santan", "Gula merah"],
        instructions: "Sajikan dingin dengan es batu."
    }
];

/* ================= ELEMENT ================= */
const catalog = document.getElementById("katalog");
const searchBar = document.getElementById("searchBar");
const categoryFilter = document.getElementById("categoryFilter");

/* ================= RENDER ================= */
function render(data) {
    catalog.innerHTML = "";
    data.forEach(r => {
        catalog.innerHTML += `
        <div class="card" data-aos="fade-up">
            <img src="${r.image}" alt="${r.title}">
            <div class="card-content">
                <h3>${r.title}</h3>
                <p>${r.category}</p>
                <button onclick="openModal(${r.id})">Detail</button>
            </div>
        </div>`;
    });
}

/* ================= MODAL ================= */
const modal = document.getElementById("recipeModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalIngredients = document.getElementById("modalIngredients");
const modalInstructions = document.getElementById("modalInstructions");

function openModal(id) {
    const r = recipes.find(x => x.id === id);
    modalImage.src = r.image;
    modalTitle.textContent = r.title;
    modalIngredients.innerHTML = r.ingredients
        .map(i => `<li>${i}</li>`)
        .join("");
    modalInstructions.textContent = r.instructions;
    modal.style.display = "flex";
}

document.getElementById("closeModal").onclick = () => {
    modal.style.display = "none";
};

/* ================= FILTER ================= */
function filter() {
    const text = searchBar.value.toLowerCase();
    const cat = categoryFilter.value;

    const filtered = recipes.filter(r =>
        r.title.toLowerCase().includes(text) &&
        (cat === "semua" || r.category === cat)
    );

    render(filtered);
}

searchBar.oninput = filter;
categoryFilter.onchange = filter;

/* ================= DARK MODE ================= */
document.getElementById("darkModeToggle").onclick = () => {
    document.body.classList.toggle("dark");
};

/* ================= SCROLL TO TOP ================= */
const scrollTop = document.getElementById("scrollTop");

window.onscroll = () => {
    scrollTop.style.display = window.scrollY > 300 ? "block" : "none";
};

scrollTop.onclick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
};

/* ================= INIT ================= */
render(recipes);
