(function(jQuery) {

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
                                            '<li class="list-group-item"><i class="bi bi-arrow-bar-right"></i><strong class="text-secondary"> Type: </strong><strong class="text-dark">' + bow.type + '</strong></li>' +
                                            '<li class="list-group-item"><i class="bi bi-backpack4"></i><strong class="text-secondary"> Poundage: </strong><strong class="text-dark">' + bow.poundage  + '</strong></li>' +
                                            '<li class="list-group-item"><i class="bi bi-bar-chart"></i><strong class="text-secondary"> Level: </strong><strong class="text-dark">' + bow.level + '</strong></li>';
                    if ((bow.type === "RECURVE") || (bow.type === "BAREBOW")) {
                        bowSummary = bowSummary +
                                            '<li class="list-group-item"><i class="bi bi-tag"></i><strong class="text-secondary"> Riser model: </strong><strong class="text-dark">' + bow.riserModel + '</strong></li>' +
                                            '<li class="list-group-item"><i class="bi bi-tag"></i><strong class="text-secondary"> Limbs model: </strong><strong class="text-dark">' + bow.limbsModel + '</strong></li>';
                    }
                    if (bow.type === "COMPOUND") {
                        bowSummary = bowSummary +
                                            '<li class="list-group-item"><i class="bi bi-tag"></i><strong class="text-secondary"> Compound model: </strong><strong class="text-dark">' + bow.compoundModel + '</strong></li>';
                    }
                    if (bow.type === "TRADITIONAL") {
                        bowSummary = bowSummary +
                                            '<li class="list-group-item"><i class="bi bi-tag"></i><strong class="text-secondary"> Traditional model: </strong><strong class="text-dark">' + bow.traditionalModel + '</strong></li>';
                    }
                    if (bow.type === "LONGBOW") {
                        bowSummary = bowSummary +
                                            '<li class="list-group-item"><i class="bi bi-tag"></i><strong class="text-secondary"> Longbow model: </strong><strong class="text-dark">' + bow.longbowModel + '</strong></li>';
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
                                        '                       <option value="BEGINNER"' + (bow.level === "BEGINNER" ? ' selected ' : '') + '>Beginner</option>' +
                                        '                       <option value="INTERMEDIATE"'+ (bow.level === "INTERMEDIATE" ? ' selected ' : '') + '>Intermediate</option>' +
                                        '                       <option value="ADVANCED"'+ (bow.level === "ADVANCED" ? ' selected ' : '') + '>Advanced</option>' +
                                        '                   </select>' +
                                        '                   <label for="bowLevel' + bow.id + '">Bow level</label>' +
                                        '                </div>';
                    if ((bow.type === "RECURVE") || (bow.type === "BAREBOW")) {
                        bowSummary = bowSummary +
                                        '                <div class="form-floating mb-3">' +
                                        '                   <input id="riserModel' + bow.id + '" class="form-control" type="text" placeholder="Riser model" value="' + bow.riserModel + '"/>' +
                                        '                   <label for="riserModel' + bow.id + '">Riser model</label>' +
                                        '                </div>' +
                                        '                <div class="form-floating mb-3">' +
                                        '                   <input id="limbsModel' + bow.id + '" class="form-control" type="text" placeholder="Limbs model" value="' + bow.limbsModel + '"/>' +
                                        '                   <label for="limbsModel' + bow.id + '">Limbs model</label>' +
                                        '                </div>';
                    } else if (bow.type === "COMPOUND") {
                        bowSummary = bowSummary +
                                        '                <div class="form-floating mb-3">' +
                                        '                   <input id="compoundModel' + bow.id + '" class="form-control" type="text" placeholder="Compound bow model" value="' + bow.compoundModel + '"/>' +
                                        '                   <label for="compoundModel' + bow.id + '">Compound bow model</label>' +
                                        '                </div>';
                    } else if (bow.type === "TRADITIONAL") {
                        bowSummary = bowSummary +
                                        '                <div class="form-floating mb-3">' +
                                        '                   <input id="traditionalModel' + bow.id + '" class="form-control" type="text" placeholder="Traditional bow model" value="' + bow.traditionalModel + '"/>' +
                                        '                   <label for="traditionalModel' + bow.id + '">Traditional bow model</label>' +
                                        '                </div>';
                    } else if (bow.type === "LONGBOW") {
                        bowSummary = bowSummary +
                                        '                <div class="form-floating mb-3">' +
                                        '                   <input id="longbowModel' + bow.id + '" class="form-control" type="text" placeholder="Longbow model" value="' + bow.longbowModel + '"/>' +
                                        '                   <label for="longbowModel' + bow.id + '">Longbow model</label>' +
                                        '                </div>';
                    }
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

                    var distanceSettingsModal = '<button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#bowModal' + bow.id + '">' +
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
                    details.append(jQuery(distanceSettingsModal));
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
                'method': 'PUT',
                'path': '/archers/' + archerId + '/bows/' + bowId
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
                'method': 'PATCH',
                'path': '/archers/' + archerId + '/bows/' + bowId
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


}) //jQuery