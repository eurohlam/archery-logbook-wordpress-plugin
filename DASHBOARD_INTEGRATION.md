# Archery Logbook Dashboard Integration

## Overview
This document provides integration instructions for the new Dashboard shortcode feature added to the Archery Logbook WordPress Plugin.

## New Files Added

1. **Dashboard JavaScript Function**: `js/archerylogbook/functions/dashboard.js`
   - Contains all dashboard data loading logic
   - Handles statistics calculation
   - Renders charts using Chart.js
   - Displays recent rounds and bows

2. **Dashboard Shortcode**: Added to `archery-logbook-shortcodes.php`
   - New shortcode: `[archery_logbook_dashboard]`

## Usage

### Basic Implementation

To add the dashboard to a WordPress page, use the shortcode within the main archery logbook shortcode:

```
[archery_logbook_main]
   [archery_logbook_dashboard]
[/archery_logbook_main]
```

### Features Included

The dashboard automatically displays:

1. **Statistics Cards** - Shows:
   - Total rounds with this month's count
   - Average score with improvement indicator
   - Total competitions
   - Total bows

2. **Quick Actions** - Six quick action buttons for:
   - Add Round
   - Add Bow
   - Add Competition
   - View My Bows
   - View History
   - View Progress

3. **Score Progress Chart** - Interactive line chart showing average score over last 30 rounds

4. **Recent Rounds** - Cards displaying the 3 most recent shooting rounds with:
   - Distance and date
   - Bow used and target size
   - Number of arrows and average score
   - Color-coded score badges

5. **My Bows** - Overview of registered bows showing:
   - Bow name, type, and level
   - Poundage
   - Model details

## Build Instructions

Since the plugin uses Gulp to bundle JavaScript files, you need to rebuild after adding the dashboard functionality:

### 1. Ensure Node.js and npm are installed
```bash
node --version
npm --version
```

### 2. Install dependencies (if not already installed)
```bash
cd /path/to/archery-logbook-wordpress-plugin
npm install
```

### 3. Build the bundled JavaScript
```bash
gulp build-js
```

This will create:
- `js/archerylogbook.bundle.js`
- `js/archerylogbook.bundle.min.js`

### 4. For Development (auto-rebuild on changes)
```bash
gulp watch
```

## Integration Details

### API Endpoints Used

The dashboard makes AJAX calls to these Archery Logbook API endpoints:

1. `GET /archers/{archerId}/rounds?page=0&size=100` - For statistics
2. `GET /archers/{archerId}/rounds?page=0&size=30` - For chart data
3. `GET /archers/{archerId}/rounds?page=0&size=3` - For recent rounds
4. `GET /archers/{archerId}/competitions?page=0&size=100` - For competition count
5. `GET /archers/{archerId}/bows` - For bows list

### Customization

#### Styling

The dashboard includes inline CSS that can be customized by modifying the `<style>` section in the shortcode function within `archery-logbook-shortcodes.php`.

Key CSS variables:
- `--primary-color: #198754` (green)
- `--secondary-color: #0d6efd` (blue)
- `--warning-color: #ffc107` (yellow)
- `--danger-color: #dc3545` (red)

#### Data Limits

To change the number of items displayed:

**In `dashboard.js`:**
- Recent rounds: Change `size=3` in `loadRecentRounds()`
- Chart history: Change `size=30` in `loadDashboardChart()`
- Statistics: Change `size=100` in `loadDashboardStats()`
- Bows displayed: Change `if (i >= 4)` in `loadMyBows()`

## Browser Compatibility

The dashboard is compatible with:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (responsive design)

## Dependencies

- Bootstrap 5.2+ (already included)
- Bootstrap Icons (already included)
- Chart.js 4.3+ (already included)
- jQuery 3.3.1+ (already included)

## Troubleshooting

### Dashboard not loading data

1. Check browser console for API errors
2. Verify Archery Logbook API URL and credentials in WordPress settings
3. Ensure user is logged in (uses `get_current_user_id()`)

### Chart not displaying

1. Verify Chart.js is loaded: `js/chart/chart.umd.js`
2. Check if canvas element exists: `<canvas id="dashboardScoreChart">`
3. Ensure at least one round has been added

### Styles not applying

1. Verify Bootstrap CSS is loaded properly
2. Check for CSS conflicts with theme
3. Clear browser cache

## Example Page Structure

```html
<!-- WordPress Page Content -->
[archery_logbook_main]
   <h1>My Archery Dashboard</h1>
   [archery_logbook_dashboard]
[/archery_logbook_main]
```

## Support

For issues or feature requests, please refer to the main plugin repository.

