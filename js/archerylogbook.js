(function(jQuery) {

    jQuery("#newArcherForm").submit(function(event) {

        // Prevent spam click and default submit behaviour
        jQuery("#btnAddArcher").attr("disabled", true);
        event.preventDefault();

        //bow parameters
        var firstName = jQuery("input#firstName").val();
		var lastName = jQuery("input#lastName").val();
        var clubName = jQuery("input#clubName").val();
        var email = jQuery("input#email").val();
        var username = jQuery("input#username").val();
        var password = jQuery("input#password").val();


		//prepare json data
        var archerData = {};
        archerData.firstName = firstName;
        archerData.lastName = lastName;
        archerData.email = email;
        archerData.clubName = clubName;
        archerData.username = username;
        archerData.password = password;


        var requestJson = JSON.stringify(archerData);
        console.log("Archery Logbook API newArcher request: \n" + requestJson);
        showAlert("success", "<strong>Connecting to Archery Logbook API service. Please, wait for a moment ...</strong>", jQuery('div#archerAlertDiv'));

        jQuery.ajax({
            url: "/wp-admin/admin-ajax.php",
            type: "POST",
            dataType: "JSON",
            data: {
                'action': 'archery_logbook_send_request',
                'request': requestJson,
                'path': '/archers/'
            },
            cache: false,
            success: function(data) {
                console.log("Archery Logbook API response: " + JSON.stringify(data));
                showAlert("success", "<strong>New archer has been added</strong>", jQuery('div#archerAlertDiv'));
                // Enable button
                jQuery("#btnAddArcher").attr("disabled", false);

            },
            error: function() {
                // Fail message
                showAlert("error", "<strong>It seems that Archery Logbook API service is not responding. Please try again later</strong>", jQuery('div#archerAlertDiv'));
                // Enable button
                jQuery("#btnAddArcher").attr("disabled", false);
            },
        });
    }); //newArcherForm submit

    jQuery("#newBowForm").submit(function(event) {

        // Prevent spam click and default submit behaviour
        jQuery("#btnAddBow").attr("disabled", true);
        event.preventDefault();

        var archerId = jQuery("input#archerId").val();

        //bow parameters
        var bowName = jQuery("input#bowName").val();
        var bowType = jQuery("input[name='bowTypeGroup']:checked").val();
        var bowLevel = jQuery("select#bowLevel").val();
        var poundage = jQuery("input#poundage").val();
        var riserModel = jQuery("input#riserModel").val();
        var limbsModel = jQuery("input#limbsModel").val();
        var compoundModel = jQuery("input#compoundModel").val();
        var traditionalModel = jQuery("input#traditionalModel").val();
        var archerId = jQuery("input#archerId").val();


		//prepare json data
        var bowData = {};
        bowData.name = bowName;
        bowData.type = bowType;
        bowData.level = bowLevel;
        bowData.poundage = poundage;
        bowData.riserModel = riserModel;
        bowData.limbsModel = limbsModel;
        bowData.compoundModel = compoundModel;
        bowData.traditionalModel = traditionalModel;


        var requestJson = JSON.stringify(bowData);
        console.log("Archery Logbook API newBow request: \n" + requestJson);
        showAlert("success", "<strong>Connecting to Archery Logbook API service. Please, wait for a moment ...</strong>", jQuery('div#newBowAlertDiv'));

        jQuery.ajax({
            url: "/wp-admin/admin-ajax.php",
            type: "POST",
            dataType: "JSON",
            data: {
                'action': 'archery_logbook_send_request',
                'request': requestJson,
                'path': '/archers/' + archerId + '/bows/'
            },
            cache: false,
            success: function(data) {
                console.log("Archery Logbook API response: " + JSON.stringify(data));
                showAlert("success", "<strong>New bow has been added</strong>", jQuery('div#newBowAlertDiv'));
                // Enable button
                jQuery("#btnAddBow").attr("disabled", false);
            },
            error: function() {
                // Fail message
                showAlert("error", "<strong>It seems that Archery Logbook API service is not responding. Please try again later</strong>", jQuery('div#newBowAlertDiv'));
                // Enable button
                jQuery("#btnAddBow").attr("disabled", false);
            }
        });
    }); //newBowForm submit


    jQuery("#newDistanceSettingsForm").submit(function(event) {
        // Prevent spam click and default submit behaviour
        jQuery("#btnAddDistanceSettings").attr("disabled", true);
        event.preventDefault();

        var archerId = jQuery("input#archerId").val();

        //bow parameters
        var bowId = jQuery("select#bowList").val();
        var distance = jQuery("input#distance").val();
        var sight = jQuery("input#sight").val();
        var isTested = jQuery("input#isTested").is(":checked");

        showAlert("success", "<strong>Connecting to Archery Logbook API service. Please, wait for a moment ...</strong>", jQuery('div#newDistanceAlertDiv'));

        jQuery.fn.submitDistanceSettings(archerId, bowId, distance, sight, isTested);

        jQuery("#btnAddDistanceSettings").attr("disabled", false);
        return false;
    }); //newDistanceSettingsForm submit

    jQuery.fn.submitDistanceSettings = function(archerId, bowId, distance, sight, isTested) {
        //prepare json data
        var settingsData = {};
        settingsData.distance = distance;
        settingsData.sight = sight;
        settingsData.isTested = isTested;

        var requestJson = JSON.stringify(settingsData);
        console.log("Archery Logbook API newDistanceSettings request: \n" + requestJson);
        showAlert("success", "<strong>Connecting to Archery Logbook API service. Please, wait for a moment ...</strong>", jQuery('div#newDistanceAlertDiv'));

        jQuery.ajax({
            url: "/wp-admin/admin-ajax.php",
            type: "POST",
            dataType: "JSON",
            data: {
                'action': 'archery_logbook_send_request',
                'request': requestJson,
                'method': 'PUT',
                'path': '/archers/' + archerId + '/bows/' + bowId + "/"
            },
            cache: false,
            success: function(data) {
                console.log("Archery Logbook API response: " + JSON.stringify(data));
                showAlert("success", "<strong>New settings have been added</strong>", jQuery('div#newDistanceAlertDiv'));
                window.location.reload();
            },
            error: function() {
                console.log("Error happened");
                // Fail message
                showAlert("error", "<strong>It seems that Archery Logbook API service is not responding. Please try again later</strong>", jQuery('div#newDistanceAlertDiv'));
            }
        });
    }; //submitDistanceSettings

    jQuery.fn.getClubs = function(parentDiv) {
        jQuery.ajax({
            url: "/wp-admin/admin-ajax.php",
            type: "POST",
            dataType: "JSON",
            data: {
                'action': 'archery_logbook_get_data',
                'path': '/clubs'
            },
            cache: false,
            success: function(data) {
                console.log("Archery Logbook API response: " + JSON.stringify(data));
                parentDiv.html("<p>" + JSON.stringify(data) + "</p>");
            },
            error: function() {
                // Fail message
                var clubAlertDiv = jQuery('<div id="clubAlertDiv"></div>');
                parentDiv.append(clubAlertDiv);
                showAlert("error", "<strong>It seems that Archery Logbook API service is not responding. Please try again later!</strong>", clubAlertDiv);
            }
        });
    } //getClubs

    jQuery.fn.getArchers = function(parentDiv) {
        jQuery.ajax({
            url: "/wp-admin/admin-ajax.php",
            type: "POST",
            dataType: "JSON",
            data: {
                'action': 'archery_logbook_get_data',
                'path': '/archers'
            },
            cache: false,
            success: function(data) {
                console.log("Archery Logbook API getArchers response: " + JSON.stringify(data));
                parentDiv.html("<p>" + JSON.stringify(data) + "</p>");
            },
            error: function() {
                // Fail message
                var archerAlertDiv = jQuery('<div id="archerAlertDiv"></div>');
                parentDiv.append(archerAlertDiv);
                showAlert("error", "<strong>It seems that Archery Logbook API service is not responding. Please try again later!</strong>", archerAlertDiv);
            }
        });
    } //getArchers

    jQuery.fn.getBowsWithDetails = function(archerId, parentDiv) {
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
                console.log("Archery Logbook API getBow response: " + JSON.stringify(data));

                var bows = jQuery('<div>').addClass('container');
                jQuery.each(data, function (i, bow) {
                    var details = jQuery('<details>').addClass('mb-3');

                    var bowSummary = '<summary><caption>Bow</caption>' +
                                    '<div class="card border-success">' +
                                    '<div class="card-header text-bg-success">'+
                                        '<h5 class="card-title">' + bow.name + " : " + bow.type + " : " + bow.poundage + '</h5>' +
                                        '<button class="btn btn-outline-warning btn-sm" data-bs-toggle="modal" data-bs-target="#editBowModal' + bow.id + '">Edit</button>' +
                                    '</div>' +
                                          '<ul class="list-group list-group-flush">' +
                                            '<li class="list-group-item"><strong>Type: </strong>' + bow.type + '</li>' +
                                            '<li class="list-group-item"><strong>Poundage: </strong>' + bow.poundage  + '</li>' +
                                            '<li class="list-group-item"><strong>Level: </strong>' + bow.level + '</li>';
                    if (bow.type === 'RECURVE') {
                        bowSummary = bowSummary +
                                            '<li class="list-group-item"><strong>Riser model: </strong>' + bow.riserModel + '</li>' +
                                            '<li class="list-group-item"><strong>Limbs model: </strong>' + bow.limbsModel + '</li>';
                    }
                    if (bow.type === 'COMPOUND') {
                        bowSummary = bowSummary +
                                            '<li class="list-group-item"><strong>Compound model: </strong>' + bow.compoundModel + '</li>';
                    }
                    if (bow.type === 'TRADITIONAL') {
                        bowSummary = bowSummary +
                                            '<li class="list-group-item"><strong>Traditional model: </strong>' + bow.traditionalModel + '</li>';
                    }
                    bowSummary = bowSummary + '</ul>' +
                                        '</div>' +
                                        '<!-- Edit Bow Modal -->' +
                                        '<div class="modal fade" id="editBowModal' + bow.id + '" tabindex="-1" aria-labelledby="modelLabel' + bow.id + '" aria-hidden="true">' +
                                        '  <div class="modal-dialog modal-dialog-centered">' +
                                        '    <div class="modal-content">' +
                                        '      <div class="modal-header">' +
                                        '        <h1 class="modal-title fs-5" id="modelLabel' + bow.id + '">EDIT BOW</h1>' +
                                        '        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>' +
                                        '      </div>' +
                                        '      <form id="editBowForm' + bow.id + '">' +
                                        '      <div class="modal-body">' +
                                        '          <h3>' + bow.name + " : " + bow.type + " : " + bow.poundage + '</h3>' +
                                        '          <div class="card">' +
                                        '             <div class="card-header">Bow parameters</div>' +
                                        '             <div class="card-body">' +
                                        '                <div class="form-floating mb-3">' +
                                        '                   <input id="bowName' + bow.id + '" class="form-control" type="text" placeholder="Bow Name" value="' + bow.name + '"/>' +
                                        '                   <label for="bowName' + bow.id + '">Bow name</label>' +
                                        '                </div>' +
                                        '                <div class="form-floating mb-3">' +
                                        '                   <input id="poundage' + bow.id + '" class="form-control" type="text" placeholder="Poundage" value="' + bow.poundage + '"/>' +
                                        '                   <label for="poundage' + bow.id + '">Poundage</label>' +
                                        '                </div>' +
                                        '                <div class="form-floating mb-3">' +
                                        '                   <select id="bowLevel" class="form-select">' +
                                        '                       <option value="BEGINNER"' + (bow.level == "BEGINNER" ? ' selected ' : '') + '>Beginner</option>' +
                                        '                       <option value="INTERMEDIATE"'+ (bow.level == "INTERMEDIATE" ? ' selected ' : '') + '>Intermediate</option>' +
                                        '                       <option value="ADVANCED"'+ (bow.level == "ADVANCED" ? ' selected ' : '') + '>Advanced</option>' +
                                        '                   </select>' +
                                        '                   <label for="bowLevel' + bow.id + '">Bow level</label>' +
                                        '                </div>';
                    if (bow.type == "RECURVE") {
                        bowSummary = bowSummary +
                                        '                <div class="form-floating mb-3">' +
                                        '                   <input id="riserModel' + bow.id + '" class="form-control" type="text" placeholder="Riser model" value="' + bow.riserModel + '"/>' +
                                        '                   <label for="riserModel' + bow.id + '">Riser model</label>' +
                                        '                </div>' +
                                        '                <div class="form-floating mb-3">' +
                                        '                   <input id="limbsModel' + bow.id + '" class="form-control" type="text" placeholder="Limbs model" value="' + bow.limbsModel + '"/>' +
                                        '                   <label for="limbsModel' + bow.id + '">Limbs model</label>' +
                                        '                </div>';
                    } else if (bow.type == "COMPOUND") {
                        bowSummary = bowSummary +
                                        '                <div class="form-floating mb-3">' +
                                        '                   <input id="compoundModel' + bow.id + '" class="form-control" type="text" placeholder="Compound bow model" value="' + bow.compoundModel + '"/>' +
                                        '                   <label for="compoundModel' + bow.id + '">Compound bow model</label>' +
                                        '                </div>';
                    } else if (bow.type == "TRADITIONAL") {
                        bowSummary = bowSummary +
                                        '                <div class="form-floating mb-3">' +
                                        '                   <input id="traditionalModel' + bow.id + '" class="form-control" type="text" placeholder="Traditional bow model" value="' + bow.traditionalModel + '"/>' +
                                        '                   <label for="traditionalModel' + bow.id + '">Traditional bow model</label>' +
                                        '                </div>';
                    };
                    bowSummary = bowSummary +
                                        '             </div>' +
                                        '          </div>' +
                                        '      </div>' +
                                        '      <div id="newDistanceAlertDiv"></div>' +
                                        '      <div class="modal-footer">' +
                                        '        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>' +
                                        '        <button type="submit" id="btnUpdateBow' + bow.id + '" class="btn btn-success" data-bs-dismiss="modal">Update bow</button>' +
                                        '      </div>' +
                                        '     </form>' +
                                        '    </div>' +
                                        '  </div>' +
                                        '</div>' +
                                        '<!-- End of Edit Bow Modal -->' +
                                        '</summary></br>';
                    details.append(jQuery(bowSummary));
                    if (Array.isArray(bow.distanceSettingsList) && bow.distanceSettingsList.length > 0) {
                        var settingsTable = '<table class="table table-sm table-striped-columns">' +
                            '<caption>Distance settings</caption>' +
                            '<thead class="table-success"><tr>' +
                            '<th scope="col">Distance</th>' +
                            '<th scope="col">Sight</th>' +
                            '<th scope="col">Is tested?</th>' +
                            '</tr></thead>' +
                            '<tbody class="table-group-divider">';
                        jQuery.each(bow.distanceSettingsList, function (y, settings) {
                            settingsTable = settingsTable + '<tr>' +
                                '<td>' + settings.distance + '</td>' +
                                '<td>' + settings.sight + '</td>' +
                                '<td>' + settings.tested + '</td>' +
                                '</tr>';
                        });
                        settingsTable = settingsTable + '</tbody></table>';

                        details.append(jQuery(settingsTable));

                    }

                    var distanceSetingsModal = '<button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#bowModal' + bow.id + '">' +
                      'Add distance settings</button>' +
                    '<!-- Distance Settings Modal -->' +
                    '<div class="modal fade" id="bowModal' + bow.id + '" tabindex="-1" aria-labelledby="modelLabel' + bow.id + '" aria-hidden="true">' +
                    '  <div class="modal-dialog modal-dialog-centered">' +
                    '    <div class="modal-content">' +
                    '      <div class="modal-header">' +
                    '        <h1 class="modal-title fs-5" id="modelLabel' + bow.id + '">ADD NEW DISTANCE SETTINGS</h1>' +
                    '        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>' +
                    '      </div>' +
                    '      <form id="newDistanceSettingsForm' + bow.id + '">' +
                    '      <div class="modal-body">' +
                    '          <h3>' + bow.name + " : " + bow.type + " : " + bow.poundage + '</h3>' +
                    '          <div class="card">' +
                    '             <div class="card-header">Distance settings</div>' +
                    '             <div class="card-body">' +
                    '                <div class="form-floating mb-3">' +
                    '                   <input id="distance' + bow.id + '" class="form-control" required type="number" placeholder="Distance" />' +
                    '                   <label for="distance' + bow.id + '">Distance<span style="color:red">*</span></label>' +
                    '                </div>' +
                    '                <div class="form-floating mb-3">' +
                    '                   <input id="sight' + bow.id + '" class="form-control" required type="text" placeholder="Sight" />' +
                    '                   <label for="sight' + bow.id + '">Sight<span style="color:red">*</span></label>' +
                    '                </div>' +
                    '                <div class="mb-3">' +
                    '                   <input id="isTested' + bow.id + '" class="form-check-input" type="checkbox" placeholder="Is tested?" />' +
                    '                   <label for="isTested' + bow.id + '">Is tested?</label>' +
                    '                </div>' +
                    '             </div>' +
                    '          </div>' +
                    '      </div>' +
                    '      <div id="newDistanceAlertDiv"></div>' +
                    '      <div class="modal-footer">' +
                    '        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>' +
                    '        <button type="submit" id="btnSubmitDistanceSettings' + bow.id + '" class="btn btn-success" data-bs-dismiss="modal">Submit Distance Settings</button>' +
                    '      </div>' +
                    '     </form>' +
                    '    </div>' +
                    '  </div>' +
                    '</div>' +
                    '<!-- End of Distance Settings Modal -->' +
                    '<script>jQuery(document).ready(function(){	' +
                    '    jQuery("#newDistanceSettingsForm' + bow.id +'").submit(function(event){' +
                    '        jQuery("#btnSubmitDistanceSettings' + bow.id + '").attr("disabled", true);' +
                    '        var distance = jQuery("input#distance' + bow.id + '").val();' +
                    '        var sight = jQuery("input#sight' + bow.id + '").val();' +
                    '        var isTested = jQuery("input#isTested' + bow.id + '").is(":checked");' +
                    '        jQuery.fn.submitDistanceSettings(' + archerId + ', ' + bow.id + ', distance, sight, isTested);' +
                    '        jQuery("#btnSubmitDistanceSettings' + bow.id + '").attr("disabled", false);' +
                    '        return false;' +
                    '    });' +
                    '});</script>';
                    details.append(jQuery(distanceSetingsModal));
                    bows.append(details);
                });

                parentDiv.html(bows);
            },
            error: function() {
                // Fail message
                var bowAlertDiv = jQuery('<div id="bowAlertDiv"></div>');
                parentDiv.append(bowAlertDiv);
                showAlert("error", "<strong>It seems that Archery Logbook API service is not responding. Please try again later!</strong>", bowAlertDiv);
            }
        });
    } //getBowsWithDetails

    jQuery.fn.getBowsAsDropdown = function(archerId, parentDiv) {
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
                console.log("Archery Logbook API getBows response: " + JSON.stringify(data));

                var select = jQuery('<select>')
                    .addClass('form-select')
                    .attr({'id': 'bowList'})
                    .append('<option selected>Select the bow</option>');
                jQuery.each(data, function (i, bow) {
                    select.append('<option value="' + bow.id + '">' + bow.name + ' : ' + bow.type + '</option>');
                });
                var div = jQuery('<div>')
                    .addClass('form-floating')
                    .append(select)
                    .append('<label for="bowList">Bow name<span style="color:red">*</span></label>');
                parentDiv.html(div);
            },
            error: function() {
                // Fail message
                var bowAlertDiv = jQuery('<div id="bowDropdownAlertDiv"></div>');
                parentDiv.append(bowAlertDiv);
                showAlert("error", "<strong>It seems that Archery Logbook API service is not responding. Please try again later!</strong>", bowAlertDiv);
            }
        });
    } //getBowsAsDropdown

    jQuery.fn.postNewScore = function(archerId, bowId, match, scoreTableJson, country, city, comment) {
        console.log("Parsing json: \n" +  scoreTableJson);
        var scoreJson = {
            "bowId": bowId,
            "match": match,
            "country": country,
            "city": city,
            "comment": comment,
            "ends": []
        };
        var ends = [];
        Object.entries(JSON.parse(scoreTableJson)).forEach( row => {
            const [key, value] = row;
            console.log(`${key}: ${value}`);
            if (key != "0") { //ignoring headers
                var end = {
                    "endNumber": key,
                    "rounds" : []
                };
                value.forEach( (column, idx) => {
                    if (column.trim()) {
                        var round = {
                            "roundNumber": (idx + 1),
                            "roundScore": column
                        };
                        end.rounds.push(round);
                    }
                });
                scoreJson.ends.push(end);
            }
        });

        console.log("Sending json to Archery Logbook API postScore: \n" + JSON.stringify(scoreJson));

        jQuery.ajax({
            url: "/wp-admin/admin-ajax.php",
            type: "POST",
            dataType: "JSON",
            data: {
                'action': 'archery_logbook_send_request',
                'request': JSON.stringify(scoreJson),
                'path': '/archers/' + archerId + '/scores/'
            },
            cache: false,
            success: function(data) {
                console.log("Archery Logbook API postScore response: " + JSON.stringify(data));
                showAlert("success", "<strong>Your new score has been stored</strong>", jQuery('div#newScoreAlertDiv'));
            },
            error: function() {
                // Fail message
                showAlert("error", "<strong>It seems that Archery Logbook API service is not responding. Please try again later!</strong>", jQuery('div#newScoreAlertDiv'));
            }
        });
    } //postNewScore

    jQuery.fn.getScoresAsTables = function(archerId, parentDiv) {
        jQuery.ajax({
            url: "/wp-admin/admin-ajax.php",
            type: "POST",
            dataType: "JSON",
            data: {
                'action': 'archery_logbook_get_data',
                'path': '/archers/' + archerId + '/scores'
            },
            cache: false,
            success: function(data) {
                console.log("Archery Logbook API getScores response: " + JSON.stringify(data));

                var history = jQuery('<div>').addClass('container table-responsive');
                jQuery.each(data, function (s, score) {
                    var details = jQuery('<details>').addClass('mb-3');

                    var scoreSummary = jQuery('<summary><caption>Score summary</caption>' +
                                    '<div class="card border-success">' +
                                    '<div class="card-header text-bg-success">'+
                                        '<h5 class="card-title">' + score.match + ' meters on ' + new Date(score.scoreDate).toLocaleString() + '</h5>' +
                                    '</div>' +
                                          '<ul class="list-group list-group-flush">' +
                                            '<li class="list-group-item"><strong>Bow: </strong>' + score.bow.name + ' : ' + score.bow.type + '</li>' +
                                            '<li class="list-group-item"><strong>Number of ends: </strong>' + score.endsCount  + '</li>' +
                                            '<li class="list-group-item"><strong>Sum: </strong>' + score.sum + '</li>' +
                                            '<li class="list-group-item"><strong>Avg: </strong>' + score.avg + '</li>' +
                                            '<li class="list-group-item"><strong>Country: </strong>' + score.country + '</li>' +
                                            '<li class="list-group-item"><strong>City: </strong>' + score.city + '</li>' +
                                          '</ul>' +
                                          '<div class="card-body">' + score.comment + '</div>' +
                                        '</div></summary></br>');
                    details.append(scoreSummary);

                    var scoreDetails = jQuery('<table>')
                        .addClass('table')
                        .addClass('table-striped')
                        .addClass('table-bordered')
                        .append('<caption>Score details</caption>');

                    var scoreDetailsHeader = jQuery('<thead>').addClass('table-success');
                    var scoreDetailsHeaderTr = jQuery('<tr>')
                                .append('<th scope="col">End #</th>')
                                .append('<th scope="col">Sum</th>')
                                .append('<th scope="col">Avg</th>');

                    for (let r = 0; r < score.ends[0].rounds.length; r++) {
                        scoreDetailsHeaderTr.append('<th scope="col">Round #' + (r + 1) + ' score</th>');
                    };
                    scoreDetailsHeader.append(scoreDetailsHeaderTr);

                    var scoreDetailsBody = jQuery('<tbody>').addClass('table-group-divider');
                    jQuery.each(score.ends, function(e, end) {
                        var tr = jQuery('<tr>');
                        tr.append('<th scope="row">' + end.endNumber + '</th>')
                          .append('<td>' + end.sum + '</td>')
                          .append('<td>' + end.avg + '</td>');

                        jQuery.each(end.rounds, function(r, round) {
                            tr.append('<td>' + round.roundScore + '</td>')
                        }); //end of rounds

                        scoreDetailsBody.append(tr);

                    }); //end of ends
                    scoreDetails
                        .append(scoreDetailsHeader)
                        .append(scoreDetailsBody);

                    details.append(scoreDetails);
                    history.append(details);

                });// end of scores
                parentDiv.html(history);
            },
            error: function() {
                // Fail message
                var scoreAlertDiv = jQuery('<div id="scoreAlertDiv"></div>');
                parentDiv.append(scoreAlertDiv);
                showAlert("error", "<strong>It seems that Archery Logbook API service is not responding. Please try again later!</strong>", scoreAlertDiv);
            }
        });
    } //getScoresAsTables

    function showAlert(type, text, parentDiv) {
        if (type == 'error') {
            parentDiv.html('<div class="alert alert-danger alert-dismissible fade show" role="alert">' +
                text +
                '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>' +
                '</div>'
            );
        } else {
            parentDiv.html('<div class="alert alert-success alert-dismissible fade show" role="alert">' +
                text +
                '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>' +
                '</div>'
            );
        }
    } //showAlert


}) ( jQuery );
