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
        var longbowModel = jQuery("input#longbowModel").val();
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
        bowData.longbowModel = longbowModel;


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



    /*** jQuery Functions ***/

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
    } //submitDistanceSettings

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
                                        '<div class="btn-toolbar justify-content-between">' +
                                           '<button class="btn btn-outline-warning btn-sm" data-bs-toggle="modal" data-bs-target="#editBowModal' + bow.id + '"><span class="bi bi-pencil-square"> Edit</span></button>' +
                                           '<button class="btn btn-outline-danger btn-sm" data-bs-toggle="modal" data-bs-target="#deleteBowModal' + bow.id + '"><span class="bi bi-trash"> Delete</span></button>' +
                                        '</div>' +
                                    '</div>' +
                                          '<ul class="list-group list-group-flush">' +
                                            '<li class="list-group-item"><strong>Type: </strong>' + bow.type + '</li>' +
                                            '<li class="list-group-item"><strong>Poundage: </strong>' + bow.poundage  + '</li>' +
                                            '<li class="list-group-item"><strong>Level: </strong>' + bow.level + '</li>';
                    if ((bow.type === 'RECURVE') || (bow.type == 'BAREBOW')) {
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
                    if (bow.type === 'LONGBOW') {
                        bowSummary = bowSummary +
                                            '<li class="list-group-item"><strong>Longbow model: </strong>' + bow.longbowModel + '</li>';
                    }
                    bowSummary = bowSummary + '</ul>' +
                                        '</div>' +
                                        '<!-- Edit Bow Modal -->' +
                                        '<div class="modal fade" id="editBowModal' + bow.id + '" tabindex="-1" aria-labelledby="modelLabel' + bow.id + '" aria-hidden="true">' +
                                        '  <div class="modal-dialog modal-dialog-centered">' +
                                        '    <div class="modal-content">' +
                                        '      <div class="modal-header bg-warning">' +
                                        '        <h1 class="modal-title fs-5" id="modelLabel' + bow.id + '"><span class="bi bi-exclamation-triangle"> EDIT BOW</span></h1>' +
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
                                        '                   <select id="bowLevel'+ bow.id + '" class="form-select">' +
                                        '                       <option value="BEGINNER"' + (bow.level == "BEGINNER" ? ' selected ' : '') + '>Beginner</option>' +
                                        '                       <option value="INTERMEDIATE"'+ (bow.level == "INTERMEDIATE" ? ' selected ' : '') + '>Intermediate</option>' +
                                        '                       <option value="ADVANCED"'+ (bow.level == "ADVANCED" ? ' selected ' : '') + '>Advanced</option>' +
                                        '                   </select>' +
                                        '                   <label for="bowLevel' + bow.id + '">Bow level</label>' +
                                        '                </div>';
                    if ((bow.type == "RECURVE") || (bow.type == "BAREBOW")) {
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
                    } else if (bow.type == "LONGBOW") {
                        bowSummary = bowSummary +
                                        '                <div class="form-floating mb-3">' +
                                        '                   <input id="longbowModel' + bow.id + '" class="form-control" type="text" placeholder="Longbow model" value="' + bow.longbowModel + '"/>' +
                                        '                   <label for="longbowModel' + bow.id + '">Longbow model</label>' +
                                        '                </div>';
                    };
                    bowSummary = bowSummary +
                                        '             </div>' +
                                        '          </div>' +
                                        '      </div>' +
                                        '      <div id="editBowAlertDiv"></div>' +
                                        '      <div class="modal-footer">' +
                                        '        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>' +
                                        '        <button type="submit" id="btnUpdateBow' + bow.id + '" class="btn btn-success" data-bs-dismiss="modal">Update bow</button>' +
                                        '      </div>' +
                                        '     </form>' +
                                        '    </div>' +
                                        '  </div>' +
                                        '</div>' +
                                        '<!-- End of Edit Bow Modal -->' +
                                        '<!-- Delete Bow Modal -->' +
                                        '<div class="modal fade" id="deleteBowModal' + bow.id + '" tabindex="-1" aria-labelledby="modelLabel' + bow.id + '" aria-hidden="true">' +
                                        '  <div class="modal-dialog modal-dialog-centered">' +
                                        '    <div class="modal-content">' +
                                        '      <div class="modal-header bg-danger text-white">' +
                                        '        <h1 class="modal-title fs-5" id="modelLabel' + bow.id + '"><span class="bi bi-exclamation-octagon"> DELETE BOW</span></h1>' +
                                        '        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>' +
                                        '      </div>' +
                                        '      <form id="deleteBowForm' + bow.id + '">' +
                                        '      <div class="modal-body text-danger-emphasis text-center">' +
                                        '          <p>You are about to delete the bow: </p>' +
                                        '          <h4>' + bow.name + " : " + bow.type + " : " + bow.poundage + '</h4>' +
                                        '          <p>Do you confirm the deletion?</p>' +
                                        '      </div>' +
                                        '      <div id="deleteBowAlertDiv"></div>' +
                                        '      <div class="modal-footer">' +
                                        '        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>' +
                                        '        <button type="submit" id="btnDeleteBow' + bow.id + '" class="btn btn-success" data-bs-dismiss="modal">Delete bow</button>' +
                                        '      </div>' +
                                        '     </form>' +
                                        '    </div>' +
                                        '  </div>' +
                                        '</div>' +
                                        '<!-- End of Delete Bow Modal -->' +
                                        '<script>jQuery(document).ready(function(){	' +
                                        '    jQuery("#editBowForm' + bow.id +'").submit(function(event){' +
                                        '        jQuery("#btnUpdateBow' + bow.id + '").attr("disabled", true);' +
                                        '        var bowName = jQuery("input#bowName' + bow.id + '").val();' +
                                        '        var bowType = "' + bow.type + '";' +
                                        '        var poundage = jQuery("input#poundage' + bow.id + '").val();' +
                                        '        var bowLevel = jQuery("select#bowLevel' + bow.id + '").val();' +
                                        '        var limbsModel = jQuery("input#limbsModel' + bow.id + '").val();' +
                                        '        var riserModel = jQuery("input#riserModel' + bow.id + '").val();' +
                                        '        var compoundModel = jQuery("input#compoundModel' + bow.id + '").val();' +
                                        '        var traditionalModel = jQuery("input#traditionalModel' + bow.id + '").val();' +
                                        '        var longbowModel = jQuery("input#longbowModel' + bow.id + '").val();' +
                                        '        jQuery.fn.updateBow(' + archerId + ', ' + bow.id + ', bowName, bowType, bowLevel, poundage, riserModel, limbsModel, compoundModel, traditionalModel, longbowModel);' +
                                        '        jQuery("#btnUpdateBow' + bow.id + '").attr("disabled", false);' +
                                        '        return false;' +
                                        '    });' +
                                        '    jQuery("#deleteBowForm' + bow.id +'").submit(function(event){' +
                                        '        jQuery("#btnDeleteBow' + bow.id + '").attr("disabled", true);' +
                                        '        jQuery.fn.deleteBow(' + archerId + ', ' + bow.id + ');' +
                                        '        jQuery("#btnDeleteBow' + bow.id + '").attr("disabled", false);' +
                                        '        return false;' +
                                        '    });' +
                                        '});</script>' +
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
                                '<td>' + settings.isTested + '</td>' +
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
                    '        event.preventDefault();' +
                    '        jQuery("#btnSubmitDistanceSettings' + bow.id + '").attr("disabled", true);' +
                    '        var distance = jQuery("input#distance' + bow.id + '").val();' +
                    '        var sight = jQuery("input#sight' + bow.id + '").val();' +
                    '        var isTested = jQuery("input#isTested' + bow.id + '").is(":checked");' +
                    '        jQuery.fn.submitDistanceSettings(' + archerId + ', ' + bow.id + ', distance, sight, isTested);' +
                    '        jQuery("#btnSubmitDistanceSettings' + bow.id + '").attr("disabled", false);' +
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
                    .attr({'required': 'true'})
                    .append('<option value="" selected>Select the bow</option>');
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

    jQuery.fn.updateBow = function(archerId, bowId, bowName, bowType, bowLevel, poundage, riserModel, limbsModel, compoundModel, traditionalModel, longbowModel) {
        //prepare json data
        var bowData = {};
        bowData.id = bowId;
        bowData.name = bowName;
        bowData.type = bowType;
        bowData.level = bowLevel;
        bowData.poundage = poundage;
        bowData.riserModel = riserModel;
        bowData.limbsModel = limbsModel;
        bowData.compoundModel = compoundModel;
        bowData.traditionalModel = traditionalModel;
        bowData.longbowModel = longbowModel;

        var requestJson = JSON.stringify(bowData);
        console.log("Archery Logbook API updateBow request: \n" + requestJson);
        showAlert("success", "<strong>Connecting to Archery Logbook API service. Please, wait for a moment ...</strong>", jQuery('div#editBowAlertDiv'));

        jQuery.ajax({
            url: "/wp-admin/admin-ajax.php",
            type: "POST",
            dataType: "JSON",
            data: {
                'action': 'archery_logbook_send_request',
                'request': requestJson,
                'method': 'POST',
                'path': '/archers/' + archerId + '/bows/' + bowId + "/"
            },
            cache: false,
            success: function(data) {
                console.log("Archery Logbook API response: " + JSON.stringify(data));
                showAlert("success", "<strong>New settings have been added</strong>", jQuery('div#editBowAlertDiv'));
                window.location.reload();
            },
            error: function() {
                console.log("Error happened");
                // Fail message
                showAlert("error", "<strong>It seems that Archery Logbook API service is not responding. Please try again later</strong>", jQuery('div#editBowAlertDiv'));
            }
        });
    } //updateBow

    jQuery.fn.deleteBow = function(archerId, bowId) {
        console.log("Archery Logbook API deleteBow: " + bowId);
        showAlert("success", "<strong>Connecting to Archery Logbook API service. Please, wait for a moment ...</strong>", jQuery('div#deleteBowAlertDiv'));

        jQuery.ajax({
            url: "/wp-admin/admin-ajax.php",
            type: "POST",
            dataType: "JSON",
            data: {
                'action': 'archery_logbook_send_request',
                'request': '',
                'method': 'DELETE',
                'path': '/archers/' + archerId + '/bows/' + bowId
            },
            cache: false,
            success: function(data) {
                console.log("Archery Logbook API response: " + JSON.stringify(data));
                showAlert("success", "<strong>The bow has been deleted</strong>", jQuery('div#deleteBowAlertDiv'));
                window.location.reload();
            },
            error: function() {
                console.log("Error happened");
                // Fail message
                showAlert("error", "<strong>It seems that Archery Logbook API service is not responding. Please try again later</strong>", jQuery('div#deleteBowAlertDiv'));
            }
        });
    } //deleteBow

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
        var ends = [];
        Object.entries(JSON.parse(scoreTableJson)).forEach( row => {
            const [key, value] = row;
            if (key != "0") { //ignoring headers
                var end = {
                    "endNumber": key,
                    "shots" : []
                };
                value.forEach( (column, idx) => {
                    if (column.trim() && (idx < 6)) {
                        var shot = {
                            "shotNumber": (idx + 1),
                            "shotScore": column
                        };
                        end.shots.push(shot);
                    }
                });
                ends.push(end);
            }
        });
        roundJson.ends = ends;

        //validate score data

        if (ends.length == 0) {
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
                'path': '/archers/' + archerId + '/rounds/'
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
                                            '<li class="list-group-item"><strong>Bow: </strong>' + round.bow.name + ' : ' + round.bow.type + '</li>' +
                                            '<li class="list-group-item"><strong>Number of arrows: </strong>' + round.shotsCount  + '</li>' +
                                            '<li class="list-group-item"><strong>Target face: </strong>' + round.targetFace  + '</li>' +
                                            '<li class="list-group-item"><strong>Sum: </strong>' + round.sum + '</li>' +
                                            '<li class="list-group-item"><strong>Avg: </strong>' + round.avg + '</li>' +
                                            '<li class="list-group-item"><strong>Country: </strong>' + round.country + '</li>' +
                                            '<li class="list-group-item"><strong>City: </strong>' + round.city + '</li>' +
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
                    };
                    roundDetailsHeader.append(roundDetailsHeaderTr);

                    var roundDetailsBody = jQuery('<tbody>').addClass('table-group-divider');
                    jQuery.each(round.ends, function(e, end) {
                        var tr = jQuery('<tr align="center">');
                        tr.append('<th scope="row">' + end.endNumber + '</th>')
                          .append('<td>' + end.sum + '</td>')
                          .append('<td>' + end.avg + '</td>');

                        jQuery.each(end.shots, function(r, shot) {
                            if (shot.shotScore == "10") {
                                tr.append('<td class="bg-warning text-success"><strong>' + shot.shotScore + '</strong></td>')
							} else if (shot.shotScore == "9") {
                                tr.append('<td class="bg-warning text-success">' + shot.shotScore + '</td>')
							} else if (shot.shotScore == "8" || shot.shotScore == "7") {
                                tr.append('<td class="bg-danger text-white">' + shot.shotScore + '</td>')
							} else if (shot.shotScore == "6" || shot.shotScore == "5") {
                                tr.append('<td class="bg-primary text-white">' + shot.shotScore + '</td>')
							} else if (shot.shotScore == "4" || shot.shotScore == "3") {
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
                        };
                        paginationNav = paginationNav +
                        '  <li class="page-item active"><a class="page-link link-dark bg-success" href="#">' + (page + 1) + '</a></li>';
                    };
                    for (let i = (page + 1); (i <= 4) && (i < data.totalPages); i++) {
                        paginationNav = paginationNav +
                        '  <li class="page-item"><a class="page-link link-dark" href="#" onClick="jQuery.fn.getRoundsAsTables(' + archerId + ',jQuery(\'#roundsHistoryDiv\'),' + i + ')">' + (i + 1) + '</a></li>';
                    };

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
                    };

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
                console.log("Archery Logbook API getRounds response: " + JSON.stringify(data));

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
                            if (match == round.distance) {
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
