const sectionTitles = [
  "Weekly Bestsellers",
  "Hot Under $49",
  "New Bestsellers",
  "Top Shop Items",
];
const imageSources = [
  "images/kalles.png",
  "images/ecomus.png",
  "images/minimog.png",
  "images/gecko.png",
  "images/ambaz.png",
  "images/aceno.png",
  "images/aarau.png",
  "images/revone.png",
  "images/rokan.png",
  "images/milano.png",
  "images/adena.png",
  "images/vogal.png",
  "images/emilia.png",
  "images/lumei.png",
  "images/glowing.png",
  "images/entry.png",
];
const productTitles = [
  "Kalles - Clean, Versatile, Responsive Shopify Theme - RTL support",
  "Ecomus - Ultimate Shopify OS 3.0 (Theme Block)",
  "Minimog - Next-gen Multipurpose Shopify theme grade-A",
  "Gecko 6.0 - Responsive Shopify Theme - RTL support",
  "Ambaz - Multipurpose Shopify Theme OS 2.0 - RTL support",
  "Aceno - Multipurpose Shopify Themes",
  "Aarau - Beauty Cosmetics & Fashion Clothing Shopify 2.0 Theme",
  "Revone - Next Level Versatile Shopify Theme",
  "Rokan - Multipurpose Shopify Theme OS 2.0",
  "Milano - Multipurpose Shopify Theme OS 2.0",
  "Adena – Jewelry Shopify Theme OS 2.0",
  "Vogal - Multipurpose Shopify Theme OS 2.0",
  "Emillia – Jewelry & Fashion Accessories Shopify Theme",
  "Lumei - Fashion Shopify Theme OS 2.0",
  "Glowing - Beauty & Cosmetics Shopify 2.0 Theme",
  "Entry - Multipurpose Shopify Theme OS 2.0 - RTL Support",
];
const authors = [
  "by The4 in Fashion",
  "by The4 in Shopping",
  "by ThemeMove in Fashion",
  "by The4 in Fashion",
  "by hooktheme in Fashion",
  "by velatheme in Fashion",
  "by Qodex in Fashion",
  "by adornthemes in Fashion",
  "by Bersky in Fashion",
  "by Bersky in Fashion",
  "by wpbingo in Fashion",
  "by adornthemes in Fashion",
  "by Nova-Creative in Fashion",
  "by wpbingo in Fashion",
  "by G5Theme in Health & Beauty",
  "by magentech in Shopping",
];
const originalPrices = [
  "$109",
  "$128",
  "$119",
  "$139",
  "$29",
  "$28",
  "$29",
  "$48",
  "$79",
  "$69",
  "$56",
  "$79",
  "$106",
  "$96",
  "$99",
  "$50",
];
const discountedPrices = [
  "$79",
  "$98",
  "$89",
  "99",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "$56",
  "$56",
  "$49",
  "$29",
];
const stars = [5, 5, 5, 5, 4, 4.5, 5, 4.5, 5, 4.5, 4, 3.5, 5, 3.5, 4, 4.5];
const reviews = [
  "2.1K",
  "1.5K",
  "300",
  "733",
  "23",
  "9",
  "11",
  "10",
  "18",
  "14",
  "3",
  "9",
  "553",
  "163",
  "82",
  "78",
];
const salesCounts = [
  "22.9K",
  "45.6K",
  "4.9K",
  "15.2K",
  "663",
  "345",
  "248",
  "143",
  "10.9K",
  "971",
  "1.2K",
  "1.3K",
  "25.1K",
  "13.7K",
  "9.3K",
  "7.4K",
];
const container = document.getElementById("product-sections");
function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  let html = "";
  for (let i = 0; i < fullStars; i++) {
    html += '<i class="fas fa-star"></i>';
  }
  if (halfStar) html += '<i class="fas fa-star-half-alt"></i>';
  return html;
}
for (let sectionIndex = 0; sectionIndex < 4; sectionIndex++) {
  const section = document.createElement("div");
  section.classList.add("section");
  const title = document.createElement("h2");
  title.classList.add("section-title");
  title.textContent = sectionTitles[sectionIndex];
  section.appendChild(title);
  const grid = document.createElement("div");
  grid.classList.add("grid");
  for (let i = 0; i < 4; i++) {
    const index = sectionIndex * 4 + i;
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <div class="card-image">
        <img src="${imageSources[index]}" alt="${productTitles[index]}" />
      </div>
      <div class="card-body">
        <h3 class="product-title">${productTitles[index]}</h3>
        <p class="author">${authors[index]}</p>
        <div class="price">
          ${
            discountedPrices[index]
              ? `<span class="original-price">${originalPrices[index]}</span>`
              : ""
          }
          <span class="discounted-price">${
            discountedPrices[index] || originalPrices[index]
          }</span>
        </div>
        <div class="rating">
          <span class="stars">
            ${generateStars(stars[index])}
          </span>
          <span class="reviews">(${reviews[index]})</span>
        </div>
        <p class="sales-count">${salesCounts[index]} Sales</p>
        <div class="buttons">
          <button class="cart-btn">Buy Now <i class="fas fa-shopping-cart"></i></button>
          <button class="preview-btn">Live Preview</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  }
  section.appendChild(grid);
  container.appendChild(section);
}
document.querySelectorAll(".cart-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    alert("Added to cart!");
  });
});
document.querySelectorAll(".preview-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    alert("No previews as of now!");
  });
});
