(function(jQuery) {

    jQuery.fn.addNewRoundTableForCompetition = function(roundNumber, parentDiv) {
        var roundCard =
        '<div class="card row mb-3">' +
        '    <div class="card-header"><h3><i class="bi bi-arrow-repeat"></i> Round #' + roundNumber + '</h3></div>' +
        '    <div class="card-body">' +
        '        <div class="row">' +
        '            <div class="col-md mb-3">' +
        '                <div class="form-floating">' +
        '                    <input id="roundDistance' + roundNumber + '" class="form-control" required type="text" placeholder="Distance" />' +
        '                    <label for="roundDistance' + roundNumber + '"><i class="bi bi-binoculars"></i> Distance<span style="color:red">*</span></label>' +
        '                </div>' +
        '            </div>' +
        '            <div class="col-md mb-3">' +
        '                <div class="form-floating">' +
        '                    <select id="roundTargetFace' + roundNumber +'" class="form-select" required>' +
        '                      <option value="" selected>Select a target face</option>' +
        '                      <option value="122cm">122 cm</option>' +
        '                      <option value="80cm">80 cm</option>' +
        '                      <option value="60cm">60 cm</option>' +
        '                      <option value="40cm">40 cm</option>' +
        '                      <option value="Multi-spot">Multi-spot</option>' +
        '                    </select>' +
        '                    <label for="roundTargetFace' + roundNumber + '"><i class="bi bi-bullseye"></i> Target face<span style="color:red">*</span></label>' +
        '                </div>' +
        '            </div>' +
        '        </div>' +
        '        <div class="row mb-3">' +
        '            <div class="col-md">' +
        '                <div class="form-floating">' +
        '                    <input id="roundComment' + roundNumber + '" class="form-control" type="text" placeholder="Comment" />' +
        '                    <label for="roundComment' + roundNumber + '"><i class="bi bi-chat-left-text"></i> Round comment</label>' +
        '                </div>' +
        '            </div>' +
        '        </div>' +
        '        <div id="roundDiv' + roundNumber + '" class="row mb-3 table-responsive">' +
        '            <table id="newRoundTable' + roundNumber + '" class="table table-bordered table-striped">' +
        '            <thead class="table-success">' +
        '                <tr>' +
        '                    <th>Shot #1</th>' +
        '                    <th>Shot #2</th>' +
        '                    <th>Shot #3</th>' +
        '                    <th>Shot #4</th>' +
        '                    <th>Shot #5</th>' +
        '                    <th>Shot #6</th>' +
        '                    <th>Sum</th>' +
        '                </tr>' +
        '              </thead>' +
        '              <tbody>' +
        '              </tbody>' +
        '              </table>' +
        '         <button class="btn btn-outline-success" id="btnAddEnd' + roundNumber + '" type="button"><i class="bi bi-plus-circle"></i> Add New End</button>' +
        '        </div>' +
        '    </div>' +
        '</div>' +
        '<script>' +
        '  jQuery(document).ready(function () {' +
        '    jQuery("#newRoundTable' + roundNumber + '").SetEditable({' +
        '        columnsEd: "0,1,2,3,4,5",' +
        '        onEdit: function(row){' +
        '            var cols = $(row).find("td");' +
        '            var sum = 0;' +
        '            var colIdx = 0;' +
        '            cols.each(function() {' +
        '                if ((colIdx < 6) && $(this).html()) {' +
        '                    sum = sum + parseInt($(this).html());' +
        '                }' +
        '                if (colIdx == 6) {' +
        '                    $(this).attr("name", "sum");' +
        '                    $(this).html("<strong>" + sum + "</strong>");' +
        '                }' +
        '                colIdx++;' +
        '            });' +
        '        }' +
        '    });' +
        '     jQuery("#btnAddEnd' + roundNumber + '").click(function() {' +
        '        rowAddNewAndEdit("newRoundTable' + roundNumber + '");' +
        '     });' +
        '  })' +
        '</script>';
        parentDiv.append(roundCard);
    } //addNewRoundTableForCompetition

    jQuery.fn.postNewCompetition = function(archerId, competitionType, ageClass, bowId, competitionCountry, competitionCity, competitionComment, roundsJson) {
        console.log("Rounds json: \n" +  roundsJson);
        var competitionJson = {
            "competitionType": competitionType,
            "ageClass": ageClass,
            "country": competitionCountry,
            "city": competitionCity,
            "comment": competitionComment,
            "rounds": []
        };

        roundsJson.forEach((round, i) => {
            var roundJson = {
                "bowId": bowId,
                "distance": round.distance,
                "targetFace": round.targetFace,
                "country": competitionCountry,
                "city": competitionCity,
                "comment": round.comment,
                "ends": tableJsonToEndsJson(round.scores)
            }
            competitionJson.rounds.push(roundJson);
        });

        //calling API
        console.log("Sending json to Archery Logbook API postCompetition: \n" + JSON.stringify(competitionJson));

        jQuery.ajax({
            url: "/wp-admin/admin-ajax.php",
            type: "POST",
            dataType: "JSON",
            data: {
                'action': 'archery_logbook_send_request',
                'request': JSON.stringify(competitionJson),
                'path': '/archers/' + archerId + '/competitions'
            },
            cache: false,
            success: function(data) {
                console.log("Archery Logbook API postCompetition response: " + JSON.stringify(data));
                showAlert("success", "<strong>Your new score has been stored</strong>", jQuery('div#newCompetitionAlertDiv'));
                window.location.reload();
            },
            error: function() {
                // Fail message
                showAlert("error", "<strong>It seems that Archery Logbook API service is not responding. Please try again later!</strong>", jQuery('div#newCompetitionAlertDiv'));
            }
        });
    } //postNewCompetition

    jQuery.fn.getCompetitionsAsTables = function(archerId, parentDiv, page = 0, size = 5) {
        jQuery.ajax({
            url: "/wp-admin/admin-ajax.php",
            type: "POST",
            dataType: "JSON",
            data: {
                'action': 'archery_logbook_get_data',
                'path': '/archers/' + archerId + '/competitions?page=' + page + "&size=" + size
            },
            cache: false,
            success: function(data, status, xhr) {
                console.log("Archery Logbook API getCompetitions response: " + JSON.stringify(data));

                var history = jQuery('<div>').addClass('container');
                jQuery.each(data.items, function (c, competition) {

                    var roundsSummaryList = '<ul>';
                    if (Array.isArray(competition.roundsSummary)) {
                        jQuery.each(competition.roundsSummary, function (s, rs) {
                            roundsSummaryList = roundsSummaryList + '<li><strong>' + rs + '</strong></li>';
                        });
                    } else {
                        roundsSummaryList = roundsSummaryList + '<li><strong>' + competition.roundsSummary + '</strong></li>';
                    }
                    roundsSummaryList = roundsSummaryList + '</ul>';

                    var competitionDetails = jQuery('<details>').addClass('mb-3');
                    var competitionSummary = jQuery('<summary><caption>Competition summary</caption>' +
                                    '<div class="card border-success">' +
                                    '<div class="card-header text-bg-success">'+
                                        '<h5 class="card-title">' + competition.competitionType + ' on ' + new Date(competition.competitionDate).toLocaleDateString() + '</h5>' +
                                    '</div>' +
                                          '<ul class="list-group list-group-flush">' +
                                            '<li class="list-group-item"><i class="bi bi-person-lines-fill"></i><strong class="text-secondary"> Age class: </strong><strong class="text-dark">' + competition.ageClass + '</strong></li>' +
                                            '<li class="list-group-item"><i class="bi bi-123"></i><strong class="text-secondary"> Number of arrows: </strong><strong class="text-dark">' + competition.shotsCount  + '</strong></li>' +
                                            '<li class="list-group-item"><i class="bi bi-calculator"></i><strong class="text-secondary"> Total Score: </strong><strong class="text-dark">' + competition.sum + '</strong></li>' +
                                            '<li class="list-group-item"><i class="bi bi-graph-up"></i><strong class="text-secondary"> Average score: </strong><strong class="text-dark">' + competition.avg + '</strong></li>' +
                                            '<li class="list-group-item"><i class="bi bi-geo-alt"></i><strong class="text-secondary"> Location: </strong><strong class="text-dark">' + competition.city + ', ' + competition.country + '</strong></li>' +
                                          '</ul>' +
                                          '<div class="card-body">' +
                                            '<h6 class="card-title"><i class="bi bi-card-list"></i><strong class="text-secondary"> Rounds summary:</strong></h6><p class="card-text">' + roundsSummaryList + '</p>' +
                                            '<h6 class="card-title"><i class="bi bi-chat-left-text"></i><strong class="text-secondary"> Additional comments:</strong></h6><p class="card-text">' + competition.comment + '</p>' +
                                          '</div>' +
                                        '</div>' +
                                        '</summary></br>');
                    competitionDetails.append(competitionSummary);

                    jQuery.each(competition.rounds, function (s, round) {
                        var details = jQuery('<details>').addClass('mb-3');

                        var roundSummary = jQuery('<summary><caption>Round #' + (s + 1) + ' summary</caption>' +
                                        '<div class="card border-info">' +
                                        '<div class="card-header text-bg-secondary">'+
                                            '<h5 class="card-title">Round #' + (s + 1) + ': ' + round.distance + ' meters' + '</h5>' +
                                        '</div>' +
                                              '<ul class="list-group list-group-flush">' +
                                                '<li class="list-group-item"><i class="bi bi-arrow-bar-right"></i><strong class="text-secondary"> Bow: </strong><strong class="text-dark">' + round.bow.name + ' : ' + round.bow.type + '</strong></li>' +
                                                '<li class="list-group-item"><i class="bi bi-123"></i><strong class="text-secondary"> Number of arrows: </strong><strong class="text-dark">' + round.shotsCount  + '</strong></li>' +
                                                '<li class="list-group-item"><i class="bi bi-bullseye"></i><strong class="text-secondary"> Target face: </strong><strong class="text-dark">' + round.targetFace  + '</strong></li>' +
                                                '<li class="list-group-item"><i class="bi bi-calculator"></i><strong class="text-secondary"><strong> Total score: </strong><strong class="text-dark">' + round.sum + '</strong></li>' +
                                                '<li class="list-group-item"><i class="bi bi-graph-up"></i><strong class="text-secondary"><strong> Average score: </strong><strong class="text-dark">' + round.avg + '</strong></li>' +
                                              '</ul>' +
                                              '<div class="card-body">' + round.comment + '</div>' +
                                            '</div>' +
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
                                    .append('<th scope="col">Score</th>')
                                    .append('<th scope="col">Avg</th>');

                        for (let r = 0; r < round.ends[0].shots.length; r++) {
                            roundDetailsHeaderTr.append('<th scope="col">Shot #' + (r + 1) + '</th>');
                        };
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

                        competitionDetails.append(details);

                    });// end of rounds

                    history.append(competitionDetails);
                });// end of competitions


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
    } //getCompetitionsAsTables

}) //jQuery