(function(jQuery) {

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

}) //jQuery