/**
 * Org Portal - Frontend Logic
 * Author: Gemini CLI
 */

// CONFIGURATION: Replace with your Google Apps Script Web App URL
const API_URL = 'https://script.google.com/macros/s/AKfycbx0ghSRNS0M4vodrwgnvwdiC_Eb17Njq3Yv8v_frVpXL4WvVcUCBGTfZEeQgwH0zMHi/exec'; 


// State Management
let allLinks = [];
let filteredLinks = [];

// DOM Elements
const linkGrid = document.getElementById('linkGrid');
const loadingSpinner = document.getElementById('loading');
const errorMessage = document.getElementById('errorMessage');
const errorText = document.getElementById('errorText');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const sortOrder = document.getElementById('sortOrder');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const lastUpdatedSpan = document.getElementById('lastUpdated');

// Statistics Elements
const statTotalLinks = document.getElementById('statTotalLinks');
const statTotalCategories = document.getElementById('statTotalCategories');
const statActiveSystems = document.getElementById('statActiveSystems');

/**
 * Initialize Application
 */
async function init() {
    setupTheme();
    setupEventListeners();
    await fetchData();
}

/**
 * Fetch Data from Google Apps Script API
 */
async function fetchData() {
    if (API_URL === 'YOUR_GAS_WEB_APP_URL_HERE') {
        showError('Please set your Google Apps Script API URL in js/app.js');
        loadingSpinner.classList.add('d-none');
        return;
    }

    try {
        const response = await fetch(`${API_URL}?action=links`, {
            method: 'GET',
            mode: 'cors',
            redirect: 'follow'
        });
        
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        
        if (data.error) throw new Error(data.error);
        
        allLinks = data;
        filteredLinks = [...allLinks];
        
        renderLinks(filteredLinks);
        updateStatistics(allLinks);
        populateCategories(allLinks);
        
        loadingSpinner.classList.add('d-none');
        lastUpdatedSpan.textContent = new Date().toLocaleString();
    } catch (error) {
        console.error('Fetch error:', error);
        showError(`Error: ${error.message}`);
        loadingSpinner.classList.add('d-none');
    }
}

/**
 * Render Cards to Grid
 */
function renderLinks(links) {
    linkGrid.innerHTML = '';
    
    if (links.length === 0) {
        linkGrid.innerHTML = '<div class="col-12 text-center my-5"><p class="text-muted">No systems found matching your criteria.</p></div>';
        return;
    }

    links.forEach(link => {
        const cardCol = document.createElement('div');
        cardCol.className = 'col card-container';
        
        cardCol.innerHTML = `
            <div class="card shadow-sm border-0 h-100">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start">
                        <div class="icon-box bg-${link.color || 'primary'} bg-opacity-10 text-${link.color || 'primary'}">
                            <i class="bi ${link.icon || 'bi-app'}"></i>
                        </div>
                        <span class="badge bg-light text-dark border">${link.category}</span>
                    </div>
                    <h5 class="card-title fw-bold mt-2">${link.name}</h5>
                    <p class="card-text text-muted small">${link.description || 'No description available.'}</p>
                </div>
                <div class="card-footer bg-transparent border-0 pb-3 pt-0">
                    <a href="${link.url}" target="_blank" class="btn btn-outline-${link.color || 'primary'} btn-sm w-100 rounded-pill">
                        Open System <i class="bi bi-box-arrow-up-right ms-1"></i>
                    </a>
                </div>
            </div>
        `;
        linkGrid.appendChild(cardCol);
    });
}

/**
 * Update Stats Dashboard
 */
function updateStatistics(links) {
    statTotalLinks.textContent = links.length;
    
    const categories = [...new Set(links.map(l => l.category))];
    statTotalCategories.textContent = categories.length;
    
    const active = links.filter(l => l.status === 'active').length;
    statActiveSystems.textContent = active;
}

/**
 * Populate Category Filter Dropdown
 */
function populateCategories(links) {
    const categories = [...new Set(links.map(l => l.category))].sort();
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        categoryFilter.appendChild(option);
    });
}

/**
 * Filter and Search Logic
 */
function handleFilter() {
    const searchTerm = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    const sort = sortOrder.value;

    filteredLinks = allLinks.filter(link => {
        const matchesSearch = 
            link.name.toLowerCase().includes(searchTerm) || 
            link.description.toLowerCase().includes(searchTerm) ||
            link.category.toLowerCase().includes(searchTerm);
        
        const matchesCategory = category === 'all' || link.category === category;
        
        return matchesSearch && matchesCategory;
    });

    // Apply Sorting
    if (sort === 'name') {
        filteredLinks.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'category') {
        filteredLinks.sort((a, b) => a.category.localeCompare(b.category));
    } else {
        // Default sort (sort_order)
        filteredLinks.sort((a, b) => (parseInt(a.sort_order) || 0) - (parseInt(b.sort_order) || 0));
    }

    renderLinks(filteredLinks);
}

/**
 * Theme Management (Dark Mode)
 */
function setupTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-bs-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.className = 'bi bi-moon-stars-fill fs-4';
    } else {
        themeIcon.className = 'bi bi-sun-fill fs-4';
    }
}

/**
 * UI Event Listeners
 */
function setupEventListeners() {
    searchInput.addEventListener('input', handleFilter);
    categoryFilter.addEventListener('change', handleFilter);
    sortOrder.addEventListener('change', handleFilter);
    themeToggle.addEventListener('click', toggleTheme);

    // Add Link Form Submission
    const addLinkForm = document.getElementById('addLinkForm');
    if (addLinkForm) {
        addLinkForm.addEventListener('submit', handleAddLink);
    }
}

/**
 * Handle Add Link Form Submission
 */
async function handleAddLink(e) {
    e.preventDefault();
    
    const form = e.target;
    const saveBtn = document.getElementById('saveBtn');
    const spinner = document.getElementById('saveBtnSpinner');
    
    // Disable button and show spinner
    saveBtn.disabled = true;
    spinner.classList.remove('d-none');

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (result.status === 'success') {
            alert('Success: Link added successfully!');
            
            // Reset form and close modal
            form.reset();
            const modal = bootstrap.Modal.getInstance(document.getElementById('addLinkModal'));
            modal.hide();
            
            // Refresh data
            loadingSpinner.classList.remove('d-none');
            await fetchData();
        } else {
            alert(`Error: ${result.message}`);
        }
    } catch (error) {
        console.error('Submission error:', error);
        alert('Error: Failed to connect to API.');
    } finally {
        saveBtn.disabled = false;
        spinner.classList.add('d-none');
    }
}

/**
 * Error Handling Helper
 */
function showError(msg) {
    errorText.textContent = msg;
    errorMessage.classList.remove('d-none');
}

// Start the App
init();
