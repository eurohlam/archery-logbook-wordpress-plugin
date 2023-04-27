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
            },
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

                // Enable button
                jQuery("#btnAddBow").attr("disabled", false);
            },
            error: function() {
                // Fail message
                showAlert("error", "<strong>It seems that Archery Logbook API service is not responding. Please try again later</strong>", jQuery('div#newDistanceAlertDiv'));
                // Enable button
                jQuery("#btnAddBow").attr("disabled", false);
            },
        });
    }); //newDistanceSettingsForm submit

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
                return true;
            },
            error: function() {
                // Fail message
                var clubAlertDiv = jQuery('<div id="clubAlertDiv"></div>');
                parentDiv.append(clubAlertDiv);
                showAlert("error", "<strong>It seems that Archery Logbook API service is not responding. Please try again later!</strong>", clubAlertDiv);
                return false;
            },
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
                return true;
            },
            error: function() {
                // Fail message
                var archerAlertDiv = jQuery('<div id="archerAlertDiv"></div>');
                parentDiv.append(archerAlertDiv);
                showAlert("error", "<strong>It seems that Archery Logbook API service is not responding. Please try again later!</strong>", archerAlertDiv);
                return false;
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

                var accordionDiv = jQuery('<div>')
                    .addClass('accordion')
                    .attr({'id': 'bowsDetails'});

                jQuery.each(data, function (i, bow) {
                    var bowHeadingId = 'bowHeading' + bow.id;
                    var bowCollapseId = 'bowCollapse' + bow.id;
                    var accordionItem = jQuery('<div>')
                        .addClass('accordion-item')
                        .append('<h2 class="accordion-header>" id="' + bowHeadingId + '">' +
                           '<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#' + bowCollapseId + '" aria-expanded="false" aria-controls="' + bowCollapseId +'">' +
                               bow.name + " : " + bow.type + " : " + bow.poundage +
                            '</button>' +
                           '</h2>');
                    var accordionItemBody = '<div id="' + bowCollapseId + '" class="accordion-collapse collapse" aria-labelledby="' + bowHeadingId + '" data-bs-parent="#bowsDetails">' +
                        '<div class="accordion-body">' +
                           '<p><strong>Type: </strong>' + bow.type + '</p>' +
                           '<p><strong>Poundage: </strong>' + bow.poundage + '</p>' +
                           '<p><strong>Level: </strong>' + bow.level + '</p>';
                    if (bow.type === 'RECURVE') {
                        accordionItemBody = accordionItemBody +
                           '<p><strong>Riser model: </strong>' + bow.riserModel + '</p>' +
                           '<p><strong>Limbs model: </strong>' + bow.limbsModel + '</p>';
                    }
                    if (bow.type === 'COMPOUND') {
                        accordionItemBody = accordionItemBody +
                           '<p><strong>Compound model: </strong>' + bow.compoundModel + '</p>';
                    }
                    if (bow.type === 'TRADITIONAL') {
                        accordionItemBody = accordionItemBody +
                           '<p><strong>Traditional model: </strong>' + bow.traditionalModel + '</p>';
                    }
                    if (Array.isArray(bow.distanceSettingsList) && bow.distanceSettingsList.length > 0) {
                        var settingsTable = '<table class="table table-sm table-striped-columns">' +
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
                        accordionItemBody = accordionItemBody + settingsTable;
                    }

                    accordionItemBody = accordionItemBody + '</div></div>';

                    accordionItem.append(jQuery(accordionItemBody));
                    accordionDiv.append(accordionItem);
                });


                parentDiv.html(accordionDiv);
                return true;
            },
            error: function() {
                // Fail message
                var bowAlertDiv = jQuery('<div id="bowAlertDiv"></div>');
                parentDiv.append(bowAlertDiv);
                showAlert("error", "<strong>It seems that Archery Logbook API service is not responding. Please try again later!</strong>", bowAlertDiv);
                return false;
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
                    .append('<label for="bowList">Bow name</label>');
                parentDiv.html(div);
                return true;
            },
            error: function() {
                // Fail message
                var bowAlertDiv = jQuery('<div id="bowDropdownAlertDiv"></div>');
                parentDiv.append(bowAlertDiv);
                showAlert("error", "<strong>It seems that Archery Logbook API service is not responding. Please try again later!</strong>", bowAlertDiv);
                return false;
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
                return true;
            },
            error: function() {
                // Fail message
                showAlert("error", "<strong>It seems that Archery Logbook API service is not responding. Please try again later!</strong>", jQuery('div#newScoreAlertDiv'));
                return false;
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
                    var details = jQuery('<details>');
                    var scoreSummary = jQuery('<summary><table class="table table-sm table-striped-columns">' +
                                '<caption>Score summary</caption>' +
                                '<thead class="table-success"><tr>' +
                                '<th scope="col">Match</th>' +
                                '<th scope="col">Country</th>' +
                                '<th scope="col">City</th>' +
                                '<th scope="col">Date</th>' +
                                '<th scope="col">Number of ends</th>' +
                                '<th scope="col">Sum</th>' +
                                '<th scope="col">Avg</th>' +
                                '<th scope="col">Comment</th>' +
                                '</tr></thead>' +
                                '<tbody class="table-group-divider"><tr>' +
                                '<th scope="row">' + score.match + '</th>' +
                                '<td>' + score.country + '</td>' +
                                '<td>' + score.city + '</td>' +
                                '<td>' + new Date(score.scoreDate).toLocaleString() + '</td>' +
                                '<td>' + score.endsCount + '</td>' +
                                '<td>' + score.sum + '</td>' +
                                '<td>' + score.avg + '</td>' +
                                '<td>' + score.comment + '</td>' +
                                '</tr></tbody></table></summary>');
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

                return true;
            },
            error: function() {
                // Fail message
                var scoreAlertDiv = jQuery('<div id="scoreAlertDiv"></div>');
                parentDiv.append(scoreAlertDiv);
                showAlert("error", "<strong>It seems that Archery Logbook API service is not responding. Please try again later!</strong>", scoreAlertDiv);
                return false;
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
