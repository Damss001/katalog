// Database Produk Lengkap (Velixir disesuaikan .png, Mykonos & Bali .jpeg/.jpg)
const products = [
    // Brand Mykonos
    {
        id: 1,
        brand: "mykonos",
        brandName: "Mykonos Collection",
        name: "Mykonos Eau De Parfum 1 - Dark Elegance",
        location: "Kota Jakarta",
        image: "img/mykonos1.jpeg",
        imageFallback: "img/mykonos1.jpg",
        description: "Menghadirkan aroma woody & sweet amber yang mewah, memberikan kesan misterius, berkelas, dan tahan lama hingga 12 jam di kulit maupun pakaian."
    },
    {
        id: 2,
        brand: "mykonos",
        brandName: "Mykonos Collection",
        name: "Mykonos Eau De Parfum 2 - Deep Ocean",
        location: "Kota Bandung",
        image: "img/mykonos2.jpeg",
        imageFallback: "img/mykonos2.jpg",
        description: "Perpaduan aroma segar laut (aquatic) dengan sentuhan vanilla lembut yang memikat. Sangat cocok digunakan untuk aktivitas harian di dalam maupun luar ruangan."
    },
    {
        id: 3,
        brand: "mykonos",
        brandName: "Mykonos Collection",
        name: "Mykonos Eau De Parfum 3 - Pink Floral Sweet",
        location: "Kota Surabaya",
        image: "img/mykonos3.jpeg",
        imageFallback: "img/mykonos3.jpg",
        description: "Kombinasi bunga mawar segar dan buah manis yang feminin. Memberikan kesegaran ceria, manis elegan, dan sangat digemari banyak wanita."
    },

    // Brand Velixir (Format .png sesuai aslinya)
    {
        id: 4,
        brand: "velixir",
        brandName: "Velixir Collection",
        name: "Velixir Premium Collection 1 - Gold Amber",
        location: "Kab. Tangerang",
        image: "img/velixir1.png",
        imageFallback: "img/velixir1.jpg",
        description: "Membawa sensasi kemewahan kelas atas dengan racikan oud berkualitas tinggi dan rempah eksotis hangat. Cocok untuk acara formal dan malam hari."
    },
    {
        id: 5,
        brand: "velixir",
        brandName: "Velixir Collection",
        name: "Velixir Premium Collection 2 - Ruby Red",
        location: "Kota Jakarta",
        image: "img/velixir2.png",
        imageFallback: "img/velixir2.jpg",
        description: "Aroma hangat yang membangkitkan karisma dan pesona kuat. Memiliki sillage pekat yang membuat orang di sekitar Anda terpana."
    },
    {
        id: 6,
        brand: "velixir",
        brandName: "Velixir Collection",
        name: "Velixir Premium Collection 3 - Crystal Emerald",
        location: "Kota Malang",
        image: "img/velixir3.png",
        imageFallback: "img/velixir3.jpg",
        description: "Sentuhan segar citrus herbal berpadu harmonis dengan musk mewah yang menenangkan serta memberi energi positif sepanjang hari."
    },

    // Brand Bali Surfers
    {
        id: 7,
        brand: "bali",
        brandName: "Bali Surfers Collection",
        name: "Bali Surfers Perfume 1 - Summer Breeze",
        location: "Kab. Badung",
        image: "img/bali surfers1.jpeg",
        imageFallback: "img/bali surfers1.jpg",
        description: "Nuansa pantai tropis Bali yang santai dan menyegarkan. Sangat pas dipakai untuk menemani aktivitas santai di bawah teriknya matahari."
    },
    {
        id: 8,
        brand: "bali",
        brandName: "Bali Surfers Collection",
        name: "Bali Surfers Perfume 2 - Sunset Chill",
        location: "Kab. Badung",
        image: "img/bali surfers2.jpeg",
        imageFallback: "img/bali surfers2.jpg",
        description: "Aroma khas kelapa manis (coconut vanilla) yang romantis mengingatkan pada keindahan suasana matahari terbenam di pantai Bali."
    },
    {
        id: 9,
        brand: "bali",
        brandName: "Bali Surfers Collection",
        name: "Blue Surfers Perfume 3 - Deep Wave",
        location: "Kota Denpasar",
        image: "img/blue surfers3.jpeg",
        imageFallback: "img/blue surfers3.jpg",
        description: "Sensasi kesegaran deburan ombak laut biru yang maskulin, sporty, dan dinamis. Menjadi pilihan sempurna untuk pria berjiwa aktif."
    }
];

// Elemen DOM
const homeView = document.getElementById('home-view');
const catalogView = document.getElementById('catalog-view');
const productGrid = document.getElementById('product-grid');
const catalogBrandTitle = document.getElementById('catalog-brand-title');
const modal = document.getElementById('product-modal');
const closeModalBtn = document.getElementById('close-modal');
const searchInput = document.getElementById('search-input');

// Kembali ke Home / Pilih Brand
function goHome() {
    catalogView.classList.remove('active');
    homeView.classList.add('active');
    searchInput.value = '';
    window.scrollTo(0, 0);
}

// Pilih Brand
function selectBrand(brandKey) {
    homeView.classList.remove('active');
    catalogView.classList.add('active');
    
    const filteredProducts = products.filter(p => p.brand === brandKey);
    if (filteredProducts.length > 0) {
        catalogBrandTitle.innerText = filteredProducts[0].brandName;
    }

    renderProducts(filteredProducts);
    window.scrollTo(0, 0);
}

// Render Produk ke Grid
function renderProducts(items) {
    productGrid.innerHTML = '';
    
    if (items.length === 0) {
        productGrid.innerHTML = '<p style="grid-column: 1/-1; text-align:center; color:#8C7A6B; padding:30px;">Maaf, produk atau brand yang kamu cari tidak ditemukan.</p>';
        return;
    }

    items.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        card.onclick = () => openModal(product);

        card.innerHTML = `
            <div class="img-box">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='${product.imageFallback}'">
            </div>
            <div class="card-info">
                <div class="product-title">${product.name}</div>
                <div class="card-footer">
                    <span class="badge-location">${product.location}</span>
                    <span style="color: #8B5A2B; font-weight: 600;">Detail Parfum &rarr;</span>
                </div>
            </div>
        `;
        productGrid.appendChild(card);
    });
}

// Buka Modal Detail Produk
function openModal(product) {
    const modalImg = document.getElementById('modal-img');
    modalImg.src = product.image;
    modalImg.onerror = function() { this.src = product.imageFallback; };

    document.getElementById('modal-title').innerText = product.name;
    document.getElementById('modal-brand-tag').innerText = product.brandName;
    document.getElementById('modal-desc').innerText = product.description;
    document.getElementById('modal-location').innerText = product.location;

    modal.classList.add('active');
}

// Tutup Modal Detail
closeModalBtn.onclick = () => modal.classList.remove('active');

window.onclick = (event) => {
    if (event.target === modal) modal.classList.remove('active');
};

// Fitur Pencarian Cerdas (Bisa langsung ketik nama brand atau nama parfum)
searchInput.addEventListener('input', (e) => {
    const keyword = e.target.value.trim().toLowerCase();

    if (keyword === '') {
        goHome();
        return;
    }

    // Jika user mengetik nama brand (contoh: "velixir", "mykonos", "bali"), langsung tampilkan semua produk brand tersebut
    if (keyword.includes("mykonos")) {
        selectBrand('mykonos');
        return;
    } else if (keyword.includes("velixir")) {
        selectBrand('velixir');
        return;
    } else if (keyword.includes("bali") || keyword.includes("blue")) {
        selectBrand('bali');
        return;
    }

    // Jika mengetik nama parfum spesifik
    homeView.classList.remove('active');
    catalogView.classList.add('active');
    catalogBrandTitle.innerText = `Hasil Pencarian: "${keyword}"`;

    const searchResults = products.filter(p => 
        p.name.toLowerCase().includes(keyword) || 
        p.brandName.toLowerCase().includes(keyword)
    );

    renderProducts(searchResults);
});