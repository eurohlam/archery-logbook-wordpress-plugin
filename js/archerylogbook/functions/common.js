(function(jQuery) {

function showAlert(type, text, parentDiv) {
    if (type === 'error') {
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

//converts json from bootstable.js#TableToJson into `ends` json in accordance with archery-logbook API format
function tableJsonToEndsJson (scoreTableJson){
    var ends = [];
    Object.entries(JSON.parse(scoreTableJson)).forEach( row => {
        const [key, value] = row;
        if (key !== "0") { //ignoring headers
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
    return ends;
} // tableJsonToEndsJson

}) //jQuery