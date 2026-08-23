(function(jQuery) {

    jQuery.fn.getScoresProgress = function(archerId, parentDiv) {
        jQuery.ajax({
            url: "/wp-admin/admin-ajax.php",
            type: "POST",
            dataType: "JSON",
            data: {
                'action': 'archery_logbook_get_data',
                'path': '/archers/' + archerId + '/rounds?page=0&size=50'
            },
            cache: false,
            success: function(data) {
                //console.log("Archery Logbook API getRounds response: " + JSON.stringify(data));

                if (!data) {
                    return;
                }

                var canvasDiv = jQuery('<div>').addClass('container');
                var avgCanvas = jQuery('<canvas id="avgScoreCanvas" height="420"></canvas>');
                var avgDiv = jQuery('<div class="row mb-3"></div>');
                avgDiv.append('<h3>Common progress of average score</h3>').append(avgCanvas);
                var matchCanvas = jQuery('<canvas id="avgScoreByMatchCanvas" height="420"></canvas>');
                var matchDiv = jQuery('<div class="row mb-3"></div>');
                matchDiv.append('<h3>Progress of average score by match</h3>').append(matchCanvas);
                var bowCanvas = jQuery('<canvas id="avgScoreByBowCanvas" height="420"></canvas>');
                var bowDiv = jQuery('<div class="row mb-3"></div>');
                bowDiv.append('<h3>Progress of average score by bow</h3>').append(bowCanvas);
                canvasDiv.append(avgDiv).append(matchDiv).append(bowDiv);
                parentDiv.html(canvasDiv);

                var scoreLabels = [];
                var scoreData = [];
                var bows = [];
                var matches = [];
                jQuery.each(data.items, function (s, round) {
                    scoreLabels.push(new Date(round.roundDate).toLocaleDateString());
                    scoreData.push(round.avg);
                    if (!bows.includes(round.bow.id)) {
                        bows.push(round.bow.id);
                    }
                    if (!matches.includes(round.distance)) {
                        matches.push(round.distance);
                    }
                });
                new Chart(avgCanvas, {
                  type: 'line',
                  data: {
                    labels: scoreLabels.reverse(),
                    datasets: [{
                        label: 'Avg score',
                        data: scoreData.reverse(),
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1,
                        spanGaps: true
                    }]
                  },
                  options: {
                    scales: {
                      y: {
                        beginAtZero: true,
                        max: 10
                      }
                    }
                  }
                });

                if (matches.length > 0) {
                    var colors = ['rgb(75, 192, 192)', 'rgb(192, 75, 192)','rgb(192, 192, 75)', 'rgb(240, 150, 150)', 'rgb(150, 240, 150)', 'rgb(150, 150, 240)'];
                    var matchDatasets = [];
                    jQuery.each(matches, function(m, match){
                        var dataset = {
                            label: match,
                            fill: false,
                            borderColor:  colors[m],
                            tension: 0.1,
                            spanGaps: true
                        };
                        var matchData = [];
                        jQuery.each(data.items, function (s, round) {
                            if (match === round.distance) {
                                dataset.label = round.distance + " m";
                                matchData.push(round.avg);
                            } else {
                                matchData.push(null);
                            }
                        });
                        dataset.data = matchData.reverse();
                        matchDatasets.push(dataset);
                    });
                    new Chart(matchCanvas, {
                      type: 'line',
                      data: {
                        labels: scoreLabels,
                        datasets: matchDatasets
                      },
                      options: {
                        scales: {
                          y: {
                            beginAtZero: true,
                            max: 10
                          }
                        }
                      }
                    });
                }

                if (bows.length > 0) {
                    var colors = ['rgb(75, 192, 192)', 'rgb(192, 75, 192)','rgb(192, 192, 75)', 'rgb(240, 150, 150)', 'rgb(150, 240, 150)', 'rgb(150, 150, 240)'];
                    var bowDatasets = [];
                    jQuery.each(bows, function(b, bowId){
                        var dataset = {
                            label: 'Avg ' + bowId,
                            fill: false,
                            borderColor:  colors[b],
                            tension: 0.1,
                            spanGaps: true
                        };
                        var bowData = [];
                        jQuery.each(data.items, function (s, round) {
                            if (bowId == round.bow.id) {
                                dataset.label = round.bow.name + ' : ' + round.bow.type;
                                bowData.push(round.avg);
                            } else {
                                bowData.push(null);
                            }
                        });
                        dataset.data = bowData.reverse();
                        bowDatasets.push(dataset);
                    });
                    new Chart(bowCanvas, {
                      type: 'line',
                      data: {
                        labels: scoreLabels,
                        datasets: bowDatasets
                      },
                      options: {
                        scales: {
                          y: {
                            beginAtZero: true,
                            max: 10
                          }
                        }
                      }
                    });
                }
            },
            error: function() {
                // Fail message
                var scoreAlertDiv = jQuery('<div id="scoreAlertDiv"></div>');
                parentDiv.append(scoreAlertDiv);
                showAlert("error", "<strong>It seems that Archery Logbook API service is not responding. Please try again later!</strong>", scoreAlertDiv);
            }
        });
    } //getScoresProgress

}) //jQuery