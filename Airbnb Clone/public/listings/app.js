document.addEventListener("DOMContentLoaded", () => {
    const deleteForms = document.querySelectorAll(".delete-form");
    for (let form of deleteForms){
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            Swal.fire({
                title: "Are you sure you want to delete?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Delete",
                cancelButtonText: "Cancel",
                didOpen: () => {
                    document.querySelector(".swal2-popup").style.backgroundColor = "#1e1e1e";
                    document.querySelector(".swal2-title").style.color = "white";
                    document.querySelector(".swal2-html-container").style.color = "white";
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    form.submit();
                }
            });
        });
    };
    const mapElement = document.getElementById("map");
    let mapTilerKey = mapElement.dataset.mapTilerKey;    
    const coordinates = JSON.parse(mapElement.dataset.coordinates);
    const map = new maplibregl.Map({
        container: "map",
        style: `https://api.maptiler.com/maps/streets/style.json?key=${mapTilerKey}`,
        center: coordinates, 
        zoom: 10
    });
    map.addControl(new maplibregl.NavigationControl());
    new maplibregl.Marker({color:"red"})
    .setLngLat(coordinates)
    .addTo(map);
});
let taxSwitches = document.querySelectorAll('input[type="checkbox"][role="switch"]');
let taxInfo = document.getElementsByClassName("tax-info");
const toggleTaxInfo = (event) => {
    const showTaxes = event.target.checked;
    for (let info of taxInfo) {
        info.style.display = showTaxes ? "inline" : "none";
    }
    taxSwitches.forEach(switchEl => {
        switchEl.checked = showTaxes;
    });
};
taxSwitches.forEach(switchEl => {
    switchEl.removeEventListener("click", toggleTaxInfo);
    switchEl.addEventListener("change", toggleTaxInfo);
});
window.addEventListener("DOMContentLoaded", () => {
    const initialState = taxSwitches[0].checked;
    for (let info of taxInfo) {
        info.style.display = initialState ? "inline" : "none";
    }
    taxSwitches.forEach(switchEl => {
        switchEl.checked = initialState;
    });
});
const filters = document.getElementById("filters");
const leftBtn = document.getElementById("left-btn");
const rightBtn = document.getElementById("right-btn");
leftBtn.addEventListener("click", () => {
    filters.scrollBy({ left: -200, behavior: "smooth" });
});
rightBtn.addEventListener("click", () => {
    filters.scrollBy({ left: 200, behavior: "smooth" });
});
const filterLinks = document.querySelectorAll('.filter-link');    
const currentFilter = window.location.pathname.split('/').pop();     
filterLinks.forEach(link => {
    const filterText = link.querySelector('p').textContent.trim();
    const filterContainer = link.querySelector('.filter-item');
    const encodedFilterText = encodeURIComponent(filterText);
    if (currentFilter === encodedFilterText) {
        filterContainer.classList.add('selected');
        filterContainer.scrollIntoView({
            behavior: "smooth",
            inline: "center",  
            block: "nearest"   
        });
    }        
    link.addEventListener('click', function (event) {
        filterLinks.forEach(link => link.querySelector('.filter-item').classList.remove('selected'));
        event.currentTarget.querySelector('.filter-item').classList.add('selected');
        filterContainer.scrollIntoView({
            behavior: "smooth",
            inline: "center",  
            block: "nearest"   
        });
    });
});