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
        console.log("Archery Logbook API request: " + requestJson);
        showAlert("success", "<strong>Connecting to Archery Logbook API service. Please, wait for a moment ...</strong>");

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
                // Enable button
                jQuery("#btnAddArcher").attr("disabled", false);

            },
            error: function() {
                // Fail message
                showAlert("error", "<strong>It seems that Archery Logbook API service is not responding. Please try again later</strong>");
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
        var traditionaldModel = jQuery("input#traditionalModel").val();


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
        console.log("Archery Logbook API request: " + requestJson);
        showAlert("success", "<strong>Connecting to Archery Logbook API service. Please, wait for a moment ...</strong>");

        jQuery.ajax({
            url: "/wp-admin/admin-ajax.php",
            type: "POST",
            dataType: "JSON",
            data: {
                'action': 'archery_logbook_send_request',
                'request': requestJson,
                'path': '/archers/1/bows/' //TODO: archerId
            },
            cache: false,
            success: function(data) {
                console.log("Archery Logbook API response: " + JSON.stringify(data));
                // Enable button
                jQuery("#btnAddBow").attr("disabled", false);
            },
            error: function() {
                // Fail message
                showAlert("error", "<strong>It seems that Archery Logbook API service is not responding. Please try again later</strong>");
                // Enable button
                jQuery("#btnAddBow").attr("disabled", false);
            },
        });
    }); //newBowForm submit


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
                showAlert("error", "<strong>It seems that Archery Logbook API service is not responding. Please try again later!</strong>");
                return false;
            },
        });
    }

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
                showAlert("error", "<strong>It seems that Archery Logbook API service is not responding. Please try again later!</strong>");
                return false;
            },
        });
    }

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
                    select.append('<option value="' + bow.id + '">' + bow.name + '</option>');
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
                showAlert("error", "<strong>It seems that Archery Logbook API service is not responding. Please try again later!</strong>");
                return false;
            },
        });
    }

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

                jQuery.each(data, function (s, score) {
                    var details = jQuery('<details>');
                    var scoreSummary = jQuery('<summary><table class="table table-sm">' +
                                '<caption>Score summary</caption>' +
                                '<thead><tr>' +
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
                        .addClass('table-primary')
                        .addClass('table-bordered')
                        .append('<caption>Score details</caption>');

                    var scoreDetailsHeader = jQuery('<thead>');
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

                    parentDiv.html(details);
                });// end of scores

                return true;
            },
            error: function() {
                // Fail message
                showAlert("error", "<strong>It seems that Archery Logbook API service is not responding. Please try again later!</strong>");
                return false;
            },
        });
    }

    function showAlert(type, text) {
        if (type == 'error') {
            jQuery('#success').html("<div class='alert alert-danger'>");
            jQuery('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>");
            jQuery('#success > .alert-danger').append(text);
            jQuery('#success > .alert-danger').append('</div>');
        } else {
            jQuery('#success').html("<div class='alert alert-success'>");
            jQuery('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>");
            jQuery('#success > .alert-success').append(text);
            jQuery('#success > .alert-success').append('</div>');
        }
    } //showAlert


}) ( jQuery );
