(function(jQuery) {

    jQuery.fn.postNewRound = function(archerId, bowId, distance, targetFace, scoreTableJson, country, city, comment) {
        console.log("Parsing json: \n" +  scoreTableJson);
        var roundJson = {
            "bowId": bowId,
            "distance": distance,
            "targetFace": targetFace,
            "country": country,
            "city": city,
            "comment": comment,
            "ends": []
        };
        var ends = tableJsonToEndsJson(scoreTableJson);
        roundJson.ends = ends;

        //validate score data

        if (ends.length === 0) {
            showAlert("error", "At least one end must be added", jQuery('div#newRoundAlertDiv'));
            return;
        }
        var invalidScores = [];
        var invalidEnds = [];
        ends.forEach( (end, idx) => {
            if (end.shots.length == 0) {
                invalidEnds.push((idx+1));
            } else {
                end.shots.forEach( (shot, c) => {
                    if (shot.shotScore && (c < 6)) {
                        var score = Number.parseInt(shot.shotScore);
                        if (score < 0 || score > 10) {
                            invalidScores.push(score);
                        }
                    }
                });
            }
        });
        if (invalidEnds.length > 0) {
            showAlert("error", "Ends [ " + invalidEnds + " ] do not have any scores. At least one score must be added", jQuery('div#newRoundAlertDiv'));
            return;
        } else if (invalidScores.length > 0) {
            showAlert("error", "Invalid scores have been added. Please, fix the following values and resubmit: [ " + invalidScores + " ]", jQuery('div#newRoundAlertDiv'));
            return;
        }

        //calling API
        console.log("Sending json to Archery Logbook API postRound: \n" + JSON.stringify(roundJson));

        jQuery.ajax({
            url: "/wp-admin/admin-ajax.php",
            type: "POST",
            dataType: "JSON",
            data: {
                'action': 'archery_logbook_send_request',
                'request': JSON.stringify(roundJson),
                'path': '/archers/' + archerId + '/rounds'
            },
            cache: false,
            success: function(data) {
                console.log("Archery Logbook API postRound response: " + JSON.stringify(data));
                showAlert("success", "<strong>Your new score has been stored</strong>", jQuery('div#newRoundAlertDiv'));
                window.location.reload();
            },
            error: function() {
                // Fail message
                showAlert("error", "<strong>It seems that Archery Logbook API service is not responding. Please try again later!</strong>", jQuery('div#newRoundAlertDiv'));
            }
        });
    } //postNewRound

    jQuery.fn.getRoundsAsTables = function(archerId, parentDiv, page = 0, size = 5) {
        jQuery.ajax({
            url: "/wp-admin/admin-ajax.php",
            type: "POST",
            dataType: "JSON",
            data: {
                'action': 'archery_logbook_get_data',
                'path': '/archers/' + archerId + '/rounds?page=' + page + "&size=" + size
            },
            cache: false,
            success: function(data, status, xhr) {
                console.log("Archery Logbook API getRounds response: " + JSON.stringify(data));

                var history = jQuery('<div>').addClass('container');
                jQuery.each(data.items, function (s, round) {
                    var details = jQuery('<details>').addClass('mb-3');

                    var roundSummary = jQuery('<summary><caption>Round summary</caption>' +
                                    '<div class="card border-success">' +
                                    '<div class="card-header text-bg-success">'+
                                        '<h5 class="card-title">' + round.distance + ' meters on ' + new Date(round.roundDate).toLocaleString() + '</h5>' +
                                        '<div class="btn-toolbar justify-content-end">' +
                                           '<button class="btn btn-outline-danger btn-sm" data-bs-toggle="modal" data-bs-target="#deleteRoundModal' + round.id + '"><span class="bi bi-trash"> Delete</span></button>' +
                                        '</div>' +
                                    '</div>' +
                                          '<ul class="list-group list-group-flush">' +
                                            '<li class="list-group-item"><i class="bi bi-arrow-bar-right"></i><strong class="text-secondary"> Bow: </strong><strong class="text-dark">' + round.bow.name + ' : ' + round.bow.type + '</strong></li>' +
                                            '<li class="list-group-item"><i class="bi bi-123"></i><strong class="text-secondary"> Number of arrows: </strong><strong class="text-dark">' + round.shotsCount  + '</strong></li>' +
                                            '<li class="list-group-item"><i class="bi bi-bullseye"></i><strong class="text-secondary"> Target face: </strong><strong class="text-dark">' + round.targetFace  + '</strong></li>' +
                                            '<li class="list-group-item"><i class="bi bi-calculator"></i><strong class="text-secondary"> Total score: </strong><strong class="text-dark">' + round.sum + '</strong></li>' +
                                            '<li class="list-group-item"><i class="bi bi-graph-up"></i><strong class="text-secondary"> Average score: </strong><strong class="text-dark">' + round.avg + '</strong></li>' +
                                            '<li class="list-group-item"><i class="bi bi-geo-alt"></i><strong class="text-secondary"> Location: </strong><strong class="text-dark">' + round.city + ', ' + round.country + '</strong></li>' +
                                          '</ul>' +
                                          '<div class="card-body">' + round.comment + '</div>' +
                                        '</div>' +
                                        '<!-- Delete Round Modal -->' +
                                        '<div class="modal fade" id="deleteRoundModal' + round.id + '" tabindex="-1" aria-labelledby="modelLabel' + round.id + '" aria-hidden="true">' +
                                        '  <div class="modal-dialog modal-dialog-centered">' +
                                        '    <div class="modal-content">' +
                                        '      <div class="modal-header bg-danger text-white">' +
                                        '        <h1 class="modal-title fs-5" id="modelLabel' + round.id + '"><span class="bi bi-exclamation-octagon"> DELETE ROUND</span></h1>' +
                                        '        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>' +
                                        '      </div>' +
                                        '      <form id="deleteRoundForm' + round.id + '">' +
                                        '      <div class="modal-body text-danger-emphasis text-center">' +
                                        '          <p>You are about to delete the round: </p>' +
                                        '          <h4>' + round.distance + ' meters on ' + new Date(round.roundDate).toLocaleString() + '</h4>' +
                                        '          <p>Do you confirm the deletion?</p>' +
                                        '      </div>' +
                                        '      <div id="deleteRoundAlertDiv"></div>' +
                                        '      <div class="modal-footer">' +
                                        '        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>' +
                                        '        <button type="submit" id="btnDeleteRound' + round.id + '" class="btn btn-success" data-bs-dismiss="modal">Delete round</button>' +
                                        '      </div>' +
                                        '     </form>' +
                                        '    </div>' +
                                        '  </div>' +
                                        '</div>' +
                                        '<!-- End of Delete Round Modal -->' +
                                        '<script>jQuery(document).ready(function(){	' +
                                        '    jQuery("#deleteRoundForm' + round.id +'").submit(function(event){' +
                                        '        jQuery("#btnDeleteRound' + round.id + '").attr("disabled", true);' +
                                        '        jQuery.fn.deleteRound(' + archerId + ', ' + round.id + ');' +
                                        '        jQuery("#btnDeleteRound' + round.id + '").attr("disabled", false);' +
                                        '        return false;' +
                                        '    });' +
                                        '});</script>' +
                                        '</summary></br>');
                    details.append(roundSummary);

                    var roundDetails = jQuery('<table>')
                        .addClass('table')
                        .addClass('table-striped')
                        .addClass('table-bordered')
                        .append('<caption>Round details</caption>');

                    var roundDetailsHeader = jQuery('<thead>').addClass('table-success');
                    var roundDetailsHeaderTr = jQuery('<tr>')
                                .append('<th scope="col">End #</th>')
                                .append('<th scope="col">Sum</th>')
                                .append('<th scope="col">Avg</th>');

                    for (let r = 0; r < round.ends[0].shots.length; r++) {
                        roundDetailsHeaderTr.append('<th scope="col">Arrow #' + (r + 1) + '</th>');
                    }
                    roundDetailsHeader.append(roundDetailsHeaderTr);

                    var roundDetailsBody = jQuery('<tbody>').addClass('table-group-divider');
                    jQuery.each(round.ends, function(e, end) {
                        var tr = jQuery('<tr align="center">');
                        tr.append('<th scope="row">' + end.endNumber + '</th>')
                          .append('<td>' + end.sum + '</td>')
                          .append('<td>' + end.avg + '</td>');

                        jQuery.each(end.shots, function(r, shot) {
                            if (shot.shotScore === 10) {
                                tr.append('<td class="bg-warning text-success"><i class="bi bi-crosshair"></i><strong> ' + shot.shotScore + '</strong></td>')
							} else if (shot.shotScore === 9) {
                                tr.append('<td class="bg-warning text-success">' + shot.shotScore + '</td>')
							} else if (shot.shotScore === 8 || shot.shotScore === 7) {
                                tr.append('<td class="bg-danger text-white">' + shot.shotScore + '</td>')
							} else if (shot.shotScore === 6 || shot.shotScore === 5) {
                                tr.append('<td class="bg-primary text-white">' + shot.shotScore + '</td>')
							} else if (shot.shotScore === 4 || shot.shotScore === 3) {
                                tr.append('<td class="bg-dark text-white">' + shot.shotScore + '</td>')
							} else {
                                tr.append('<td class="bg-white">' + shot.shotScore + '</td>')
							}
                        }); //end of shots

                        roundDetailsBody.append(tr);

                    }); //end of ends
                    roundDetails
                        .append(roundDetailsHeader)
                        .append(roundDetailsBody);

    				var roundDetailsDiv = jQuery('<div>').addClass('table-responsive');
    				roundDetailsDiv.append(roundDetails);
                    details.append(roundDetailsDiv);
                    history.append(details);

                });// end of rounds


                if (data.totalPages > 1) {
                    var paginationNav = '<nav>' +
                         ' <ul class="pagination">';
                    if (data.isFirstPage) {
                        paginationNav = paginationNav +
                        '  <li class="page-item disabled">' +
                        '    <a class="page-link link-dark" aria-label="Previous">' +
                        '      <span aria-hidden="true">&laquo;</span>' +
                        '     </a>' +
                        '  </li>' +
                        '  <li class="page-item active"><a class="page-link link-dark bg-success" href="#">' + (page + 1) + '</a></li>';
                    } else {
                        paginationNav = paginationNav + '  <li class="page-item">' +
                        '    <a class="page-link link-dark" aria-label="Previous" href="#" onClick="jQuery.fn.getRoundsAsTables(' + archerId + ',jQuery(\'#roundsHistoryDiv\'),' + (page - 1) + ')">' +
                        '      <span aria-hidden="true">&laquo;</span>' +
                        '     </a>' +
                        '  </li>';
                        for (let i = (page >= 4 ? page - 4 : 0); i < page; i++) {
                            paginationNav = paginationNav +
                            '  <li class="page-item"><a class="page-link link-dark" href="#" onClick="jQuery.fn.getRoundsAsTables(' + archerId + ',jQuery(\'#roundsHistoryDiv\'),' + i + ')">' + (i + 1) + '</a></li>';
                        }
                        paginationNav = paginationNav +
                        '  <li class="page-item active"><a class="page-link link-dark bg-success" href="#">' + (page + 1) + '</a></li>';
                    }
                    for (let i = (page + 1); (i <= 4) && (i < data.totalPages); i++) {
                        paginationNav = paginationNav +
                        '  <li class="page-item"><a class="page-link link-dark" href="#" onClick="jQuery.fn.getRoundsAsTables(' + archerId + ',jQuery(\'#roundsHistoryDiv\'),' + i + ')">' + (i + 1) + '</a></li>';
                    }

                    if (data.isLastPage) {
                        paginationNav = paginationNav +
                        '  <li class="page-item disabled">' +
                        '    <a class="page-link link-dark" aria-label="Next">' +
                        '       <span aria-hidden="true">&raquo;</span>' +
                        '    </a>' +
                        '   </li>' +
                        ' </ul>' +
                        '</nav>';
                    } else {
                        paginationNav = paginationNav +
                        '  <li class="page-item">' +
                        '    <a class="page-link link-dark" aria-label="Next" href="#" onClick="jQuery.fn.getRoundsAsTables(' + archerId + ',jQuery(\'#roundsHistoryDiv\'),' + (page + 1) + ')">' +
                        '       <span aria-hidden="true">&raquo;</span>' +
                        '    </a>' +
                        '   </li>' +
                        ' </ul>' +
                        '</nav>';
                    }

                    history.append(paginationNav);
                }
                parentDiv.html(history);
            },
            error: function(jqXHR, exception, errorThrown) {
                //TODO: API errors handling
                console.log(jqXHR.status + '  ' + exception + ' ' + errorThrown + ' ' + jqXHR.responseText);
                // Fail message
                var roundAlertDiv = jQuery('<div id="roundAlertDiv"></div>');
                parentDiv.append(roundAlertDiv);
                showAlert("error", "<strong>It seems that Archery Logbook API service is not responding. Please try again later!</strong>", roundAlertDiv);
            }
        });
    } //getRoundsAsTables

    jQuery.fn.deleteRound = function(archerId, roundId) {
        console.log("Archery Logbook API deleteRound: " + roundId);
        showAlert("success", "<strong>Connecting to Archery Logbook API service. Please, wait for a moment ...</strong>", jQuery('div#deleteRoundAlertDiv'));

        jQuery.ajax({
            url: "/wp-admin/admin-ajax.php",
            type: "POST",
            dataType: "JSON",
            data: {
                'action': 'archery_logbook_send_request',
                'request': '',
                'method': 'DELETE',
                'path': '/archers/' + archerId + '/rounds/' + roundId
            },
            cache: false,
            success: function(data) {
                console.log("Archery Logbook API response: " + JSON.stringify(data));
                showAlert("success", "<strong>The score has been deleted</strong>", jQuery('div#deleteRoundAlertDiv'));
                window.location.reload();
            },
            error: function() {
                console.log("Error happened");
                // Fail message
                showAlert("error", "<strong>It seems that Archery Logbook API service is not responding. Please try again later</strong>", jQuery('div#deleteRoundAlertDiv'));
            }
        });
    } //deleteRound


}) //jQuery