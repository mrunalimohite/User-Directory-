let allUsers = [];

// Fetch Data
async function getUsers() {
    try {
        const response = await fetch("https://dummyjson.com/users");
        const data = await response.json();
        allUsers = data.users;
        displayUsers(allUsers);
    } catch (error) {
        console.error("Error fetching users:", error);
        document.getElementById('userContainer').innerHTML = "<p>Failed to load users.</p>";
    }
}

// Render Data
function displayUsers(userArray) {
    const container = document.getElementById("userContainer");
    container.innerHTML = ""; // Clear existing cards

    if (userArray.length === 0) {
        container.innerHTML = "<p class='no-results'>No users found matching your search.</p>";
        return;
    }

    userArray.forEach(user => {
        const card = document.createElement('div');
        card.classList.add('user-card');
        card.innerHTML = `
            <div class="img-box">
                <img src="${user.image}" alt="${user.firstName}">
            </div>
            <div class="user-information">
                <h2>${user.firstName} ${user.lastName}</h2>
                <p class="role">${user.company?.title || 'N/A'}</p>
                <p class="country"><i class="fa-solid fa-location-dot"></i> ${user.address?.country || 'Global'}</p>
                <p class="other"><i class="fa-solid fa-envelope"></i> ${user.email}</p>
                <p class="other"><i class="fa-solid fa-phone"></i> ${user.phone}</p>
            </div>
        `;
        container.appendChild(card);
    });
}

// Filter Data
function handleSearch(event) {
    event.preventDefault(); // This critical line stops the page from refreshing!
    
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();

    const filteredUsers = allUsers.filter(user => {
        const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
        const role = (user.company?.title || '').toLowerCase();
        return fullName.includes(searchTerm) || role.includes(searchTerm);
    });

    displayUsers(filteredUsers);
}

// Global Event Listeners & Start
document.getElementById('searchForm').addEventListener('submit', handleSearch);
getUsers();

//clear input filed
const searchInput = document.getElementById('searchInput');
const clearBtn = document.getElementById('clearBtn');

// 1. Monitor text entry to show the 'X' icon
searchInput.addEventListener('input', () => {
    if (searchInput.value.trim().length > 0) {
        clearBtn.style.display = 'block'; // Reveal icon
    } else {
        clearBtn.style.display = 'none';  // Hide icon if empty
    }
});

// 2. Action when the 'X' icon is clicked
clearBtn.addEventListener('click', () => {
    searchInput.value = '';             // Wipe out text value
    clearBtn.style.display = 'none';    // Hide the icon button
    displayUsers(allUsers);             // Reset back to original full roster
    searchInput.focus();                // Snap the keyboard cursor focus back in
});