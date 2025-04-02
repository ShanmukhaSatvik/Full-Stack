document.addEventListener("DOMContentLoaded", () => {
    const logout = document.querySelector(".logout");
    logout.addEventListener("click", (event) => {
        event.preventDefault();  
        Swal.fire({
            title: "Are you sure you want to log out?",
            text: "You’ll need to log in again to continue from where you left off.",
            iconHtml: `<img src="https://cdn-icons-png.flaticon.com/512/1053/1053210.png" alt="Logout Icon" class="custom-logout-icon"/>`,
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Log Out",
            cancelButtonText: "Cancel",
            customClass: {
                popup: 'custom-swal-popup',
                icon: 'custom-swal-icon'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href ="/logout";
            }
        });
    });
});
const style = document.createElement("style");
style.innerHTML = `
    .custom-logout-icon {
        width: 65px !important; 
        height: 65px !important;
        display: block !important;
        margin: 10px auto !important;
    }
    .custom-swal-popup {
        background-color: #1e1e1e !important;
        color: white !important;
        border-radius: 10px !important;
    }
    .custom-swal-icon {
        background: none !important;
        border: none !important;
        box-shadow: none !important;
        padding: 0 !important;
    }
`;
document.head.appendChild(style);
