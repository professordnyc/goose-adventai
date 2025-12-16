// Global state
let allItems = [];
let filteredItems = [];
let data = null;

// Load data on page load
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('../output/processed_data.json');
        data = await response.json();
        allItems = data.items;
        filteredItems = [...allItems];
        
        initializeDashboard();
        populateFilters();
        renderTable();
        
        // Set up event listeners
        setupEventListeners();
    } catch (error) {
        console.error('Error loading data:', error);
        document.querySelector('.container').innerHTML = `
            <div style="text-align: center; padding: 50px;">
                <h2>Error Loading Data</h2>
                <p>Could not load processed_data.json. Please make sure the file exists.</p>
            </div>
        `;
    }
});

// Initialize dashboard summary cards
function initializeDashboard() {
    document.getElementById('total-items').textContent = data.summary.total_items;
    document.getElementById('urgent-items').textContent = data.summary.urgent_items;
    document.getElementById('pairs').textContent = data.summary.pairs;
    
    // Render category chart
    renderChart('category-chart', data.summary.categories);
    
    // Render location chart
    renderChart('location-chart', data.summary.locations);
}

// Render bar chart
function renderChart(containerId, dataObj) {
    const container = document.getElementById(containerId);
    const maxValue = Math.max(...Object.values(dataObj));
    
    const sortedEntries = Object.entries(dataObj).sort((a, b) => b[1] - a[1]);
    
    container.innerHTML = sortedEntries.map(([label, value]) => {
        const percentage = (value / maxValue) * 100;
        return `
            <div class="chart-bar">
                <div class="chart-label">${label}</div>
                <div class="chart-bar-container">
                    <div class="chart-bar-fill" style="width: ${percentage}%">
                        ${value}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Populate filter dropdowns
function populateFilters() {
    const categories = [...new Set(allItems.map(item => item.category))].sort();
    const locations = [...new Set(allItems.map(item => item.normalized_location))].sort();
    
    const categoryFilter = document.getElementById('category-filter');
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        categoryFilter.appendChild(option);
    });
    
    const locationFilter = document.getElementById('location-filter');
    locations.forEach(loc => {
        const option = document.createElement('option');
        option.value = loc;
        option.textContent = loc;
        locationFilter.appendChild(option);
    });
}

// Setup event listeners
function setupEventListeners() {
    document.getElementById('search-input').addEventListener('input', applyFilters);
    document.getElementById('category-filter').addEventListener('change', applyFilters);
    document.getElementById('location-filter').addEventListener('change', applyFilters);
    document.getElementById('urgency-filter').addEventListener('change', applyFilters);
    document.getElementById('pair-filter').addEventListener('change', applyFilters);
    document.getElementById('sort-select').addEventListener('change', applySorting);
}

// Apply filters
function applyFilters() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const categoryFilter = document.getElementById('category-filter').value;
    const locationFilter = document.getElementById('location-filter').value;
    const urgencyFilter = document.getElementById('urgency-filter').value;
    const pairFilter = document.getElementById('pair-filter').value;
    
    filteredItems = allItems.filter(item => {
        // Search filter
        if (searchTerm && !item.description.toLowerCase().includes(searchTerm)) {
            return false;
        }
        
        // Category filter
        if (categoryFilter && item.category !== categoryFilter) {
            return false;
        }
        
        // Location filter
        if (locationFilter && item.normalized_location !== locationFilter) {
            return false;
        }
        
        // Urgency filter
        if (urgencyFilter === 'urgent' && !item.urgent) {
            return false;
        }
        if (urgencyFilter === 'non-urgent' && item.urgent) {
            return false;
        }
        
        // Pair filter
        if (pairFilter === 'pairs' && !item.is_pair) {
            return false;
        }
        
        return true;
    });
    
    applySorting();
}

// Apply sorting
function applySorting() {
    const sortBy = document.getElementById('sort-select').value;
    
    filteredItems.sort((a, b) => {
        switch (sortBy) {
            case 'id':
                return a.id - b.id;
            case 'category':
                return a.category.localeCompare(b.category);
            case 'location':
                return a.normalized_location.localeCompare(b.normalized_location);
            case 'urgent':
                return (b.urgent ? 1 : 0) - (a.urgent ? 1 : 0);
            default:
                return 0;
        }
    });
    
    renderTable();
}

// Render table
function renderTable() {
    const tbody = document.getElementById('items-tbody');
    
    if (filteredItems.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center; padding: 30px; color: #7f8c8d;">
                    No items found matching your filters.
                </td>
            </tr>
        `;
        document.getElementById('showing-count').textContent = 'Showing 0 of 0 items';
        return;
    }
    
    tbody.innerHTML = filteredItems.map(item => {
        const urgentClass = item.urgent ? 'urgent-item' : '';
        const statusBadges = [];
        
        if (item.urgent) {
            statusBadges.push('<span class="status-badge status-urgent">⚠️ Urgent</span>');
        } else {
            statusBadges.push('<span class="status-badge status-normal">Normal</span>');
        }
        
        if (item.is_pair) {
            statusBadges.push('<span class="status-badge status-pair">Pair</span>');
        }
        
        return `
            <tr class="${urgentClass}">
                <td class="item-id">#${item.id}</td>
                <td class="item-description">${escapeHtml(item.description)}</td>
                <td class="item-category">${item.category}</td>
                <td class="item-location">${item.normalized_location}</td>
                <td>${statusBadges.join(' ')}</td>
            </tr>
        `;
    }).join('');
    
    document.getElementById('showing-count').textContent = 
        `Showing ${filteredItems.length} of ${allItems.length} items`;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
