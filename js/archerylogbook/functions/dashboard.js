(function(jQuery) {

    jQuery.fn.loadDashboardData = function(archerId) {
        // Load all dashboard data in parallel
        jQuery.fn.loadDashboardStats(archerId);
        jQuery.fn.loadDashboardChart(archerId);
        jQuery.fn.loadRecentRounds(archerId);
        jQuery.fn.loadMyBows(archerId);
    };

    jQuery.fn.loadDashboardStats = function(archerId) {
        // Load rounds statistics
        jQuery.ajax({
            url: "/wp-admin/admin-ajax.php",
            type: "POST",
            dataType: "JSON",
            data: {
                'action': 'archery_logbook_get_data',
                'path': '/archers/' + archerId + '/rounds?page=0&size=100'
            },
            cache: false,
            success: function(data) {
                if (!data || !data.items) {
                    jQuery('#totalRounds').text('0');
                    jQuery('#avgScore').text('N/A');
                    jQuery('#roundsThisMonth').html('<i class="bi bi-info-circle"></i> No data yet');
                    return;
                }

                // Calculate statistics
                var totalRounds = data.totalItems || data.items.length;
                jQuery('#totalRounds').text(totalRounds);

                // Calculate overall average score
                var totalAvg = 0;
                var validRounds = 0;
                jQuery.each(data.items, function(i, round) {
                    if (round.avg && !isNaN(round.avg)) {
                        totalAvg += parseFloat(round.avg);
                        validRounds++;
                    }
                });
                
                var overallAvg = validRounds > 0 ? (totalAvg / validRounds).toFixed(2) : 'N/A';
                jQuery('#avgScore').text(overallAvg);

                // Calculate this month's rounds
                var now = new Date();
                var thisMonth = 0;
                jQuery.each(data.items, function(i, round) {
                    var roundDate = new Date(round.roundDate);
                    if (roundDate.getMonth() === now.getMonth() && 
                        roundDate.getFullYear() === now.getFullYear()) {
                        thisMonth++;
                    }
                });
                jQuery('#roundsThisMonth').html('<i class="bi bi-arrow-up"></i> ' + thisMonth + ' this month');

                // Calculate improvement (compare last 10 vs previous 10)
                if (data.items.length >= 20) {
                    var recent10Avg = 0;
                    var previous10Avg = 0;
                    
                    for (var i = 0; i < 10; i++) {
                        if (data.items[i].avg) recent10Avg += parseFloat(data.items[i].avg);
                        if (data.items[i + 10].avg) previous10Avg += parseFloat(data.items[i + 10].avg);
                    }
                    
                    recent10Avg = recent10Avg / 10;
                    previous10Avg = previous10Avg / 10;
                    var improvement = (recent10Avg - previous10Avg).toFixed(2);
                    
                    if (improvement > 0) {
                        jQuery('#avgImprovement').html('<span class="text-success"><i class="bi bi-arrow-up"></i> +' + improvement + ' improved</span>');
                    } else if (improvement < 0) {
                        jQuery('#avgImprovement').html('<span class="text-danger"><i class="bi bi-arrow-down"></i> ' + improvement + '</span>');
                    } else {
                        jQuery('#avgImprovement').html('<span class="text-muted">No change</span>');
                    }
                } else {
                    jQuery('#avgImprovement').html('<span class="text-muted">Needs more data</span>');
                }
            },
            error: function() {
                jQuery('#totalRounds').text('Error');
                jQuery('#avgScore').text('Error');
                jQuery('#roundsThisMonth').text('Failed to load');
            }
        });

        // Load competitions statistics
        jQuery.ajax({
            url: "/wp-admin/admin-ajax.php",
            type: "POST",
            dataType: "JSON",
            data: {
                'action': 'archery_logbook_get_data',
                'path': '/archers/' + archerId + '/competitions?page=0&size=100'
            },
            cache: false,
            success: function(data) {
                if (!data || !data.items) {
                    jQuery('#totalCompetitions').text('0');
                    return;
                }
                var total = data.totalItems || data.items.length;
                jQuery('#totalCompetitions').text(total);
            },
            error: function() {
                jQuery('#totalCompetitions').text('0');
            }
        });

        // Load bows statistics
        jQuery.ajax({
            url: "/wp-admin/admin-ajax.php",
            type: "POST",
            dataType: "JSON",
            data: {
                'action': 'archery_logbook_get_data',
                'path': '/archers/' + archerId + '/bows'
            },
            cache: false,
            success: function(data) {
                if (!data) {
                    jQuery('#totalBows').text('0');
                    return;
                }
                jQuery('#totalBows').text(data.length || 0);
            },
            error: function() {
                jQuery('#totalBows').text('0');
            }
        });
    };

    jQuery.fn.loadDashboardChart = function(archerId) {
        jQuery.ajax({
            url: "/wp-admin/admin-ajax.php",
            type: "POST",
            dataType: "JSON",
            data: {
                'action': 'archery_logbook_get_data',
                'path': '/archers/' + archerId + '/rounds?page=0&size=30'
            },
            cache: false,
            success: function(data) {
                if (!data || !data.items || data.items.length === 0) {
                    jQuery('#dashboardScoreChart').parent().html('<p class="text-center text-muted">No data available yet. Start adding rounds to see your progress!</p>');
                    return;
                }

                var labels = [];
                var scoreData = [];
                
                // Reverse to show oldest to newest
                var reversedItems = data.items.slice().reverse();
                
                jQuery.each(reversedItems, function(i, round) {
                    labels.push(new Date(round.roundDate).toLocaleDateString());
                    scoreData.push(round.avg ? parseFloat(round.avg) : null);
                });

                var ctx = document.getElementById('dashboardScoreChart');
                if (ctx) {
                    new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: labels,
                            datasets: [{
                                label: 'Average Score',
                                data: scoreData,
                                borderColor: '#198754',
                                backgroundColor: 'rgba(25, 135, 84, 0.1)',
                                borderWidth: 3,
                                tension: 0.4,
                                fill: true,
                                pointRadius: 5,
                                pointHoverRadius: 7,
                                pointBackgroundColor: '#198754',
                                pointBorderColor: '#fff',
                                pointBorderWidth: 2
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    display: true,
                                    position: 'top'
                                },
                                tooltip: {
                                    mode: 'index',
                                    intersect: false,
                                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                    padding: 12,
                                    cornerRadius: 8
                                }
                            },
                            scales: {
                                y: {
                                    beginAtZero: false,
                                    min: 0,
                                    max: 10,
                                    grid: {
                                        color: 'rgba(0, 0, 0, 0.05)'
                                    }
                                },
                                x: {
                                    grid: {
                                        display: false
                                    }
                                }
                            }
                        }
                    });
                }
            },
            error: function() {
                jQuery('#dashboardScoreChart').parent().html('<p class="text-center text-danger">Failed to load chart data</p>');
            }
        });
    };

    jQuery.fn.loadRecentRounds = function(archerId) {
        jQuery.ajax({
            url: "/wp-admin/admin-ajax.php",
            type: "POST",
            dataType: "JSON",
            data: {
                'action': 'archery_logbook_get_data',
                'path': '/archers/' + archerId + '/rounds?page=0&size=3'
            },
            cache: false,
            success: function(data) {
                if (!data || !data.items || data.items.length === 0) {
                    jQuery('#recentRoundsContainer').html('<p class="text-center text-muted">No rounds yet. Add your first round to get started!</p>');
                    return;
                }

                var container = jQuery('<div>').addClass('row');
                
                jQuery.each(data.items, function(i, round) {
                    var badgeColor = 'bg-success';
                    if (round.avg >= 9) badgeColor = 'bg-warning';
                    else if (round.avg >= 8) badgeColor = 'bg-success';
                    else if (round.avg >= 7) badgeColor = 'bg-primary';
                    
                    var card = jQuery('<div>').addClass('col-lg-4 col-md-6 mb-3').html(
                        '<div class="card recent-round-card">' +
                        '    <div class="card-body">' +
                        '        <div class="d-flex justify-content-between align-items-start mb-3">' +
                        '            <div>' +
                        '                <h5 class="card-title mb-1">' + round.distance + ' meters</h5>' +
                        '                <small class="text-muted"><i class="bi bi-calendar"></i> ' + new Date(round.roundDate).toLocaleDateString() + '</small>' +
                        '            </div>' +
                        '            <span class="round-badge ' + badgeColor + ' text-white">' + round.sum + '</span>' +
                        '        </div>' +
                        '        <div class="row mb-2">' +
                        '            <div class="col-6">' +
                        '                <small class="text-muted">Bow:</small>' +
                        '                <p class="mb-0 fw-bold">' + round.bow.name + '</p>' +
                        '            </div>' +
                        '            <div class="col-6">' +
                        '                <small class="text-muted">Target:</small>' +
                        '                <p class="mb-0 fw-bold">' + round.targetFace + '</p>' +
                        '            </div>' +
                        '        </div>' +
                        '        <div class="row">' +
                        '            <div class="col-6">' +
                        '                <small class="text-muted">Arrows:</small>' +
                        '                <p class="mb-0 fw-bold">' + round.shotsCount + '</p>' +
                        '            </div>' +
                        '            <div class="col-6">' +
                        '                <small class="text-muted">Average:</small>' +
                        '                <p class="mb-0 fw-bold">' + (round.avg ? round.avg.toFixed(2) : 'N/A') + '</p>' +
                        '            </div>' +
                        '        </div>' +
                        '    </div>' +
                        '</div>'
                    );
                    
                    container.append(card);
                });
                
                jQuery('#recentRoundsContainer').html(container);
            },
            error: function() {
                jQuery('#recentRoundsContainer').html('<p class="text-center text-danger">Failed to load recent rounds</p>');
            }
        });
    };

    jQuery.fn.loadMyBows = function(archerId) {
        jQuery.ajax({
            url: "/wp-admin/admin-ajax.php",
            type: "POST",
            dataType: "JSON",
            data: {
                'action': 'archery_logbook_get_data',
                'path': '/archers/' + archerId + '/bows'
            },
            cache: false,
            success: function(data) {
                if (!data || data.length === 0) {
                    jQuery('#myBowsContainer').html('<p class="text-center text-muted">No bows registered yet. Add your first bow!</p>');
                    return;
                }

                var container = jQuery('<div>').addClass('row');
                
                jQuery.each(data, function(i, bow) {
                    // Only show first 4 bows on dashboard
                    if (i >= 4) return false;
                    
                    var typeColor = 'success';
                    if (bow.type === 'COMPOUND') typeColor = 'info';
                    else if (bow.type === 'BAREBOW') typeColor = 'warning';
                    else if (bow.type === 'TRADITIONAL') typeColor = 'secondary';
                    else if (bow.type === 'LONGBOW') typeColor = 'danger';
                    
                    var levelColor = 'success';
                    if (bow.level === 'INTERMEDIATE') levelColor = 'warning';
                    else if (bow.level === 'BEGINNER') levelColor = 'secondary';
                    
                    var detailsText = '';
                    if (bow.type === 'RECURVE' || bow.type === 'BAREBOW') {
                        detailsText = 'Riser: ' + (bow.riserModel || 'N/A') + ' | Limbs: ' + (bow.limbsModel || 'N/A');
                    } else if (bow.type === 'COMPOUND') {
                        detailsText = 'Model: ' + (bow.compoundModel || 'N/A');
                    } else if (bow.type === 'TRADITIONAL') {
                        detailsText = 'Model: ' + (bow.traditionalModel || 'N/A');
                    } else if (bow.type === 'LONGBOW') {
                        detailsText = 'Model: ' + (bow.longbowModel || 'N/A');
                    }
                    
                    var card = jQuery('<div>').addClass('col-lg-6 mb-3').html(
                        '<div class="card bow-card">' +
                        '    <div class="card-body">' +
                        '        <div class="d-flex justify-content-between align-items-start mb-3">' +
                        '            <div>' +
                        '                <h5 class="card-title mb-2">' +
                        '                    <i class="bi bi-arrow-bar-right text-' + typeColor + '"></i> ' + bow.name +
                        '                </h5>' +
                        '                <span class="badge-bow-type bg-' + typeColor + ' bg-opacity-10 text-' + typeColor + '">' + bow.type + '</span> ' +
                        '                <span class="badge-bow-type bg-' + levelColor + ' bg-opacity-10 text-' + levelColor + '">' + bow.level + '</span>' +
                        '            </div>' +
                        '        </div>' +
                        '        <div class="row">' +
                        '            <div class="col-4">' +
                        '                <small class="text-muted">Poundage</small>' +
                        '                <p class="mb-0 fw-bold">' + bow.poundage + '</p>' +
                        '            </div>' +
                        '            <div class="col-4">' +
                        '                <small class="text-muted">Type</small>' +
                        '                <p class="mb-0 fw-bold">' + bow.type + '</p>' +
                        '            </div>' +
                        '            <div class="col-4">' +
                        '                <small class="text-muted">Level</small>' +
                        '                <p class="mb-0 fw-bold">' + bow.level + '</p>' +
                        '            </div>' +
                        '        </div>' +
                        '        <hr>' +
                        '        <small class="text-muted"><i class="bi bi-info-circle"></i> ' + detailsText + '</small>' +
                        '    </div>' +
                        '</div>'
                    );
                    
                    container.append(card);
                });
                
                // Add "View All" button if there are more than 4 bows
                if (data.length > 4) {
                    container.append(
                        '<div class="col-12 text-center">' +
                        '    <a href="#" class="btn btn-outline-success" data-action="bows">View All Bows (' + data.length + ')</a>' +
                        '</div>'
                    );
                }
                
                jQuery('#myBowsContainer').html(container);
            },
            error: function() {
                jQuery('#myBowsContainer').html('<p class="text-center text-danger">Failed to load bows</p>');
            }
        });
    };

}) //jQuery

