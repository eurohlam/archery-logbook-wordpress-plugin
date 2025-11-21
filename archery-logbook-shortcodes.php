<?php
function archery_logbook_shortcodes_init()
{

    /** Enclosing main shortcode that shows the main container form.
     *  All other shortcodes must be placed inside this one.
     */
    function archery_logbook_main_shortcode($atts = [], $content = null)
    {
        $form = '<head>
            <link rel="stylesheet" href="' . plugin_dir_url(__FILE__) . 'css/bootstrap.min.css">
            <link rel="stylesheet" href="' . plugin_dir_url(__FILE__) . 'css/bootstrap-icons.css">
            </head>
            <section id="archery_logbook_section">'
            . do_shortcode($content) .
            '</section>
            <script type="text/javascript" src="' . plugin_dir_url(__FILE__) . 'js/bootstrap.bundle.min.js"></script>
            <script type="text/javascript" src="' . plugin_dir_url(__FILE__) . 'js/archerylogbook.bundle.min.js"></script>';
        return $form;
    }
    add_shortcode('archery_logbook_main', 'archery_logbook_main_shortcode');


    /**
     * Shortcode that shows a form for a new club
	 */
    function archery_logbook_new_club_shortcode($atts = [], $content = null)
    {
        $form = '<div class="container">
                <form id="newArcheryClubForm">
                    <div class="row mb-3">
                        <div class="col-md">
                            <div class="form-floating">
                                <input id="clubName" class="form-control" required type="text" placeholder="Club name"/>
                                <label for="clubName">Club name</label>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md mb-3">
                            <div class="form-floating">
                                <input id="country" class="form-control" type="text" placeholder="Country"/>
                                <label for="country">Country</label>
                            </div>
                        </div>
                        <div class="col-md mb-3">
                            <div class="form-floating">
                                <input id="city" class="form-control" type="text" placeholder="City"/>
                                <label for="city">City</label>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-md">
                            <div class="form-floating">
                                <input id="url" class="form-control" type="url" placeholder="Website URL"/>
                                <label for="url">Website URL</label>
                            </div>
                        </div>
                    </div>
                    <div id="clubAlertDiv"></div>
                    <div class="row mb-3">
                       <div class="form-group col">
                          <button id="btnAddClub" class="btn btn-outline-success btn-lg" type="submit">Add Club</button>
                       </div>
                    </div>
                </form>
            </div>';
        return $form;
    }
    add_shortcode('archery_logbook_new_club', 'archery_logbook_new_club_shortcode');


    /**
     * Shortcode that shows a form for a new archer
	 */
    function archery_logbook_new_archer_shortcode($atts = [], $content = null)
    {
        $form = '<form id="newArcherForm">
                <div class="row">
                     <div class="col-md mb-3">
                         <div class="form-floating">
                            <input id="firstName" class="form-control" required type="text" placeholder="First name"/>
                            <label for="firstName">First Name</label>
                        </div>
                     </div>
                     <div class="col-md mb-3">
                        <div class="form-floating">
                            <input id="lastName" class="form-control" type="text" placeholder="Last name">
                            <label for="lastName">Last Name</label>
                        </div>
                     </div>
               </div>
               <div class="row mb-3">
                     <div class="col-md">
                         <div class="form-floating">
                            <input id="email" class="form-control" required type="email" placeholder="email"/>
                            <label for="email">Email</label>
                        </div>
                     </div>
                </div>
               <div class="row mb-3">
                     <div class="col-md">
                         <div class="form-floating">
                            <input id="clubName" class="form-control" type="text" placeholder="Club name"/>
                            <label for="clubName">Club name</label>
                        </div>
                     </div>
                </div>
                <div class="row mb-3">
                    <div class="col">
                        <div class="card">
                            <div class="card-header">Account</div>
                            <div class="card-body">
                                 <div class="form-floating mb-3">
                                    <input id="username" class="form-control" required type="text" placeholder="Username" />
                                    <label for="username">Username</label>
                                 </div>
                                 <div class="form-floating">
                                    <input id="password" class="form-control" required type="password" placeholder="Password"/>
                                    <label for="password">Password</label>
                                 </div>
                             </div>
                        </div>
                     </div>
                </div>
                <div id="archerAlertDiv"></div>
                <div class="row mb-3">
                   <div class="form-group col">
                      <button id="btnAddArcher" class="btn btn-outline-success btn-lg" type="submit">Add Archer</button>
                   </div>
                </div>
            </form>
            </div>';
        return $form;
    }
    add_shortcode('archery_logbook_new_archer', 'archery_logbook_new_archer_shortcode');

    /**
	 *  Shortcode that shows a form for a new bow
	 */
    function archery_logbook_new_bow_shortcode($atts = [], $content = null)
    {
        $user_id = get_current_user_id();
        $newBow = '<div class="container">
            <form id="newBowForm">
               <input type="hidden" id="archerId" value="' . $user_id . '"/>
               <div class="row mb-3">
                   <div class="col-md">
                      <div class="form-floating">
                        <input id="bowName" class="form-control" required type="text" placeholder="Bow name"/>
                        <label for="bowName">Bow name<span style="color:red">*</span></label>
                      </div>
                   </div>
                </div>
                <div class="row">
                    <div class="col-md mb-3">
                        <div class="form-floating">
                            <select id="bowLevel" class="form-select" required>
                              <option value="" selected>Select a bow level</option>
                              <option value="BEGINNER">Beginner</option>
                              <option value="INTERMEDIATE">Intermediate</option>
                              <option value="ADVANCED">Advanced</option>
                            </select>
                            <label for="bowLevel">Bow level<span style="color:red">*</span></label>
                        </div>
                    </div>
                    <div class="col-md mb-3">
                        <div class="form-floating">
                            <input id="poundage" class="form-control" required type="text" pattern="\d{1,3}|\d{2}-\d{2}" title= "Format: [ddd] or [dd]-[dd]" placeholder="Poundage"/>
                            <label for="poundage">Poundage<span style="color:red">*</span></label>
                        </div>
                    </div>
                 </div>
                 <div class="row mb-3">
                     <div class="col"><div class="card">
                     <div class="card-header">Bow type</div>
                     <div class="card-body">
                         <div class="row">
                             <div class="col btn-group-vertical list-group">
                                 <div class="form-check">
                                     <input type="radio" class="form-check-input active" name="bowTypeGroup" value="RECURVE" id="radioRecurve" autocomplete="off" data-bs-toggle="list" href="#recurveTab" role="tab" checked>
                                     <label for="radioRecurve">Recurve</label>
                                 </div>
                                 <div class="form-check">
                                     <input type="radio" class="form-check-input" name="bowTypeGroup" value="BAREBOW" id="radioBarebow" autocomplete="off" data-bs-toggle="list" href="#recurveTab" role="tab">
                                     <label for="radioBarebow">Barebow</label>
                                 </div>
                                 <div class="form-check">
                                     <input type="radio" class="form-check-input" name="bowTypeGroup" value="COMPOUND" id="radioCompound" autocomplete="off" data-bs-toggle="list" href="#compoundTab" role="tab">
                                     <label for="radioCompound">Compound</label>
                                 </div>
                                 <div class="form-check">
                                     <input type="radio" class="form-check-input" name="bowTypeGroup" value="TRADITIONAL" id="radioTraditional" autocomplete="off" data-bs-toggle="list" href="#traditionalTab" role="tab">
                                     <label for="radioTraditional">Traditional</label>
                                 </div>
                                 <div class="form-check">
                                     <input type="radio" class="form-check-input" name="bowTypeGroup" value="LONGBOW" id="radioLongbow" autocomplete="off" data-bs-toggle="list" href="#longbowTab" role="tab">
                                     <label for="radioLongbow">Longbow</label>
                                 </div>
                              </div>
                              <div class="col">
                                  <div class="tab-content" id="bowType-tabContent">
                                      <div class="tab-pane fade show active" id="recurveTab" role="tabpanel">
                                          <div class="row form-floating mb-2">
                                              <input id="riserModel" class="form-control" type="text" placeholder="Riser model"/>
                                              <label for="riserModel">Riser model</label>
                                          </div>
                                          <div class="row form-floating">
                                              <input id="limbsModel" class="form-control" type="text" placeholder="Limbs model"/>
                                              <label for="limbsModel">Limbs model</label>
                                          </div>
                                      </div>
                                     <!-- toggled div-->
                                     <div class="tab-pane fade" id="compoundTab" role="tabpanel">
                                          <div class="row form-floating">
                                              <input id="compoundModel" class="form-control" type="text" placeholder="Compound bow model"/>
                                              <label for="compoundModel">Bow model</label>
                                          </div>
                                      </div>
                                      <div class="tab-pane fade" id="traditionalTab" role="tabpanel">
                                           <div class="row form-floating">
                                               <input id="traditionalModel" class="form-control" type="text" placeholder="Traditional bow model"/>
                                               <label for="traditionalModel">Bow model</label>
                                           </div>
                                       </div>
                                       <div class="tab-pane fade" id="longbowTab" role="tabpanel">
                                            <div class="row form-floating">
                                                <input id="longbowModel" class="form-control" type="text" placeholder="Longbow model"/>
                                                <label for="longbowModel">Bow model</label>
                                            </div>
                                        </div>
                                   </div>
                             </div>
                         </div>
                    </div>
                </div></div>
                </div>
                <div id="newBowAlertDiv"></div>
                <div class="row mb-3">
                   <div class="col">
                      <button id="btnAddBow" class="btn btn-outline-success btn-lg" type="submit">Add Bow</button>
                   </div>
                </div>
            </form>
            </div>';
        return $newBow;
    }
    add_shortcode('archery_logbook_new_bow', 'archery_logbook_new_bow_shortcode');


    /**
     * Shortcode that shows a form for a bow distance settings
	 */
    function archery_logbook_new_distance_settings_shortcode($atts = [], $content = null)
    {
        $user_id = get_current_user_id();
        $form = '<div class="container">
            <form id="newDistanceSettingsForm">
                <input type="hidden" id="archerId" value="' . $user_id . '"/>
                <div id="bowListDiv" class="row mb-3">
                    //bow list here generated by js
                </div>
                <div class="row mb-3">
                    <div class="col">
                        <div class="card">
                            <div class="card-header">Distance settings</div>
                            <div class="card-body">
                                 <div class="form-floating mb-3">
                                    <input id="distance" class="form-control" required type="number" placeholder="Distance" />
                                    <label for="distance">Distance<span style="color:red">*</span></label>
                                 </div>
                                 <div class="form-floating mb-3">
                                    <input id="sight" class="form-control" required type="text" placeholder="Sight"/>
                                    <label for="sight">Sight<span style="color:red">*</span></label>
                                 </div>
                                 <div class="mb-3">
                                    <input id="isTested" class="form-check-input" type="checkbox" placeholder="Is tested?"/>
                                    <label for="isTested">Is tested?</label>
                                 </div>
                             </div>
                        </div>
                     </div>
                </div>
                <div id="newDistanceAlertDiv"></div>
                <div class="row mb-3">
                   <div class="col">
                      <button id="btnAddDistanceSettings" class="btn btn-outline-success btn-lg" type="submit">Add Distance Settings</button>
                   </div>
                </div>
            </form>
        </div>
            <script>
                jQuery(document).ready(function () {
                    jQuery.fn.getBowsAsDropdown(' . $user_id . ', jQuery("div#bowListDiv"));
                });
            </script>';
        return $form;
    }
    add_shortcode('archery_logbook_new_distance_settings', 'archery_logbook_new_distance_settings_shortcode');


    /**
     * Shortcode that shows a form for a new round
	 */
    function archery_logbook_new_round_shortcode($atts = [], $content = null)
    {
        $user_id = get_current_user_id();
        $form = '<div class="container">
            <form id="newRoundForm">
                <div class="row">
                    <div class="col-md mb-3" id="roundBowListDiv">
                        //bow list here generated by js
                    </div>
                </div>
                <div class="row">
                    <div class="col-md mb-3">
                        <div class="form-floating">
                            <input id="roundDistance" class="form-control" required type="text" placeholder="Distance" />
                            <label for="roundDistance">Distance<span style="color:red">*</span></label>
                        </div>
                    </div>
                    <div class="col-md mb-3">
                        <div class="form-floating">
                            <select id="roundTargetFace" class="form-select" required>
                              <option value="" selected>Select a target face</option>
                              <option value="122cm">122 cm</option>
                              <option value="80cm">80 cm</option>
                              <option value="60cm">60 cm</option>
                              <option value="40cm">40 cm</option>
                              <option value="Multi-spot">Multi-spot</option>
                            </select>
                            <label for="roundTargetFace">Target face<span style="color:red">*</span></label>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md mb-3">
                        <div class="form-floating">
                            <input id="roundCountry" class="form-control" type="text" placeholder="Country" />
                            <label for="roundCountry">Country</label>
                        </div>
                    </div>
                    <div class="col-md mb-3">
                        <div class="form-floating">
                            <input id="roundCity" class="form-control" type="text" placeholder="City" />
                            <label for="roundCity">City</label>
                        </div>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-md">
                        <div class="form-floating">
                            <input id="roundComment" class="form-control" type="text" placeholder="Comment" />
                            <label for="roundComment">Comment</label>
                        </div>
                    </div>
                </div>
                <div id="roundDiv" class="row mb-3 table-responsive">
                <table id="newRoundTable" class="table table-bordered table-striped">
                    <thead class="table-success">
                        <tr>
                            <th>Shot #1</th>
                            <th>Shot #2</th>
                            <th>Shot #3</th>
                            <th>Shot #4</th>
                            <th>Shot #5</th>
                            <th>Shot #6</th>
                            <th>Sum</th>
                        </tr>
                      </thead>
                      <tbody>
                      </tbody>
                </table>
                 <button class="btn btn-outline-success" id="btnAddEnd" type="button"><i class="bi bi-plus-circle"></i> Add New End</button>
                </div>

                <div id="newRoundAlertDiv"></div>
                <div class="row mb-3">
                   <div class="col">
                      <button id="btnAddRound" class="btn btn-outline-success btn-lg" type="submit">Submit New Round</button>
                   </div>
                </div>
            </form>
        </div>
            <script>
                jQuery(document).ready(function () {
                    jQuery.fn.getBowsAsDropdown(' . $user_id . ', jQuery("div#roundBowListDiv"));

                    jQuery("#newRoundTable").SetEditable({
                        columnsEd: "0,1,2,3,4,5",
                        onEdit: function(row){
                            var cols = $(row).find("td");
                            var sum = 0;
                            var colIdx = 0;
                            cols.each(function() {
                                if ((colIdx < 6) && $(this).html()) {
                                    sum = sum + parseInt($(this).html());
                                }
                                if (colIdx == 6) {
                                    $(this).attr("name", "sum");
                                    $(this).html("<strong>" + sum + "</strong>");
                                }
                                colIdx++;
                            });
                        }
                    });

                    jQuery("#btnAddEnd").click(function() {
                        rowAddNewAndEdit("newRoundTable");
                    });

                    jQuery("#newRoundForm").submit(function(event) {
                        event.preventDefault();
                        var json = TableToJson("newRoundTable");
                        var bowId = jQuery("select#bowList").val();
                        var distance = jQuery("input#roundDistance").val();
                        var targetFace = jQuery("select#roundTargetFace").val();
                        var country = jQuery("input#roundCountry").val();
                        var city = jQuery("input#roundCity").val();
                        var comment = jQuery("input#roundComment").val();
                        jQuery.fn.postNewRound(' . $user_id .', bowId, distance, targetFace, json, country, city, comment);
                    });
                });
            </script>
            <script type="text/javascript" src="' . plugin_dir_url(__FILE__) . 'js/jquery.min.js"></script>
            <script type="text/javascript" src="' . plugin_dir_url(__FILE__) . 'js/bootstable.js"></script>';
        return $form;
    }
    add_shortcode('archery_logbook_new_round', 'archery_logbook_new_round_shortcode');

    /**
     * Shortcode that shows a history of rounds
	 */
    function archery_logbook_rounds_history_shortcode($atts = [], $content = null)
    {
        $user_id = get_current_user_id();
        $form = '<script>
            jQuery(document).ready(function () {
                    jQuery.fn.getRoundsAsTables(' . $user_id . ',jQuery("#roundsHistoryDiv"));
            });
            </script>
            <script type="text/javascript" src="' . plugin_dir_url(__FILE__) . 'js/jquery.min.js"></script>
            <script type="text/javascript" src="' . plugin_dir_url(__FILE__) . 'js/bootstable.js"></script>
            <div id="roundsHistoryDiv" class="container"></div>';
        return $form;
    }
    add_shortcode('archery_logbook_rounds_history', 'archery_logbook_rounds_history_shortcode');


    /**
     * Shortcode that shows a list of bows for archer
     */
    function archery_logbook_bows_shortcode($atts = [], $content = null)
    {
        $user_id = get_current_user_id();
        $form = '<script>
            jQuery(document).ready(function () {
                    jQuery.fn.getBowsWithDetails(' . $user_id . ',jQuery("#bowsDetailsDiv"));
            });
            </script>
            <script type="text/javascript" src="' . plugin_dir_url(__FILE__) . 'js/jquery.min.js"></script>
            <script type="text/javascript" src="' . plugin_dir_url(__FILE__) . 'js/bootstable.js"></script>
            <div id="bowsDetailsDiv"></div>';
        return $form;
    }
    add_shortcode('archery_logbook_bows', 'archery_logbook_bows_shortcode');

    /**
     * Shortcode that shows a progress of scores
     */
    function archery_logbook_scores_progress_shortcode($atts = [], $content = null)
    {
        $user_id = get_current_user_id();
        $form = '<script>
            jQuery(document).ready(function () {
                    jQuery.fn.getScoresProgress(' . $user_id . ',jQuery("#scoresProgressDiv"));
            });
            </script>
            <script type="text/javascript" src="' . plugin_dir_url(__FILE__) . 'js/jquery.min.js"></script>
            <script type="text/javascript" src="' . plugin_dir_url(__FILE__) . 'js/bootstable.js"></script>
            <script type="text/javascript" src="' . plugin_dir_url(__FILE__) . 'js/chart/chart.umd.js"></script>
            <div id="scoresProgressDiv" class="container"></div>';
        return $form;
    }
    add_shortcode('archery_logbook_scores_progress', 'archery_logbook_scores_progress_shortcode');

    /**
     * Shortcode that shows a form for a new competition
	 */
    function archery_logbook_new_competition_shortcode($atts = [], $content = null)
    {
        $user_id = get_current_user_id();
        $form = '<div class="container">
            <form id="newCompetitionForm">
                <div class="row">
                    <div class="col-md mb-3">
                        <div class="form-floating">
                            <select id="competitionType" class="form-select" required>
                                <option value="" selected>Select a competition type</option>
                                <option value="WA1440">WA1440</option>
                                <option value="WA720">WA720</option>
                                <option value="Canadian 1200">Canadian 1200</option>
                                <option value="Short Canadian 1200">Short Canadian 1200</option>
                                <option value="Canadian 900">Canadian 900</option>
                                <option value="Short Canadian 900">Short Canadian 900</option>
                                <option value="Burton">Burton</option>
                                <option value="Short Burton">Short Burton</option>
                                <option value="Silver Fern">Silver Fern</option>
                            </select>
                          <label for="competitionType">Competition type<span style="color:red">*</span></label>
                        </div>
                    </div>
                    <div class="col-md mb-3">
                        <div class="form-floating">
                            <input id="ageClass" class="form-control" type="text" placeholder="Age class" />
                            <label for="ageClass">Age class</label>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md mb-3" id="competitionBowListDiv">
                        //bow list here generated by js
                    </div>
                </div>
                <div class="row">
                    <div class="col-md mb-3">
                        <div class="form-floating">
                            <input id="competitionCountry" class="form-control" type="text" placeholder="Country" />
                            <label for="competitionCountry">Country</label>
                        </div>
                    </div>
                    <div class="col-md mb-3">
                        <div class="form-floating">
                            <input id="competitionCity" class="form-control" type="text" placeholder="City" />
                            <label for="compeitionCity">City</label>
                        </div>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-md">
                        <div class="form-floating">
                            <input id="competitionComment" class="form-control" type="text" placeholder="Comment" />
                            <label for="competitionComment">Comment</label>
                        </div>
                    </div>
                </div>

                <div class="row mb-3">
                    <div id="roundsDiv"></div>
                    <button class="btn btn-outline-secondary btn-lg" id="btnAddRound" type="button"><i class="bi bi-plus-circle"></i> Add New Round</button>
                </div>

                <div id="newCompetitionAlertDiv"></div>
                <div class="row mb-3">
                   <div class="col">
                      <button id="btnAddCompetition" class="btn btn-outline-success btn-lg" type="submit">Submit New Competition</button>
                   </div>
                </div>
            </form>
        </div>
            <script>
                jQuery(document).ready(function () {
                    jQuery.fn.getBowsAsDropdown(' . $user_id . ', jQuery("div#competitionBowListDiv"));
                    var roundNumber = 1;
                    jQuery.fn.addNewRoundTableForCompetition(roundNumber, jQuery("div#roundsDiv"));

                    jQuery("#btnAddRound").click(function() {
                        roundNumber++;
                        jQuery.fn.addNewRoundTableForCompetition(roundNumber, jQuery("div#roundsDiv"));
                    });

                    jQuery("#newCompetitionForm").submit(function(event) {
                        event.preventDefault();
                        var competitionType = jQuery("select#competitionType").val();
                        var ageClass = jQuery("input#ageClass").val();
                        var bowId = jQuery("select#bowList").val();
                        var country = jQuery("input#competitionCountry").val();
                        var city = jQuery("input#competitionCity").val();
                        var competitionComment = jQuery("input#competitionComment").val();

                        var rounds = [];
                        for (let i=1; i<=roundNumber; i++) {
                            var scores = TableToJson("newRoundTable" + i);
                            var distance = jQuery("input#roundDistance" + i).val();
                            var targetFace = jQuery("select#roundTargetFace" + i).val();
                            var comment = jQuery("input#roundComment" +i).val();
                            var round = {
                                "distance": distance,
                                "targetFace": targetFace,
                                "comment": comment,
                                "scores": scores
                            };
                            rounds.push(round);
                        }
                        jQuery.fn.postNewCompetition(' . $user_id .', competitionType, ageClass, bowId, country, city, competitionComment, rounds);
                    });
                });
            </script>
            <script type="text/javascript" src="' . plugin_dir_url(__FILE__) . 'js/jquery.min.js"></script>
            <script type="text/javascript" src="' . plugin_dir_url(__FILE__) . 'js/bootstable.js"></script>';
        return $form;
    }
    add_shortcode('archery_logbook_new_competition', 'archery_logbook_new_competition_shortcode');

    /**
     * Shortcode that shows a history of competitions
	 */
    function archery_logbook_competitions_history_shortcode($atts = [], $content = null)
    {
        $user_id = get_current_user_id();
        $form = '<script>
            jQuery(document).ready(function () {
                    jQuery.fn.getCompetitionsAsTables(' . $user_id . ',jQuery("#competitionsHistoryDiv"));
            });
            </script>
            <script type="text/javascript" src="' . plugin_dir_url(__FILE__) . 'js/jquery.min.js"></script>
            <script type="text/javascript" src="' . plugin_dir_url(__FILE__) . 'js/bootstable.js"></script>
            <div id="competitionsHistoryDiv" class="container"></div>';
        return $form;
    }
    add_shortcode('archery_logbook_competitions_history', 'archery_logbook_competitions_history_shortcode');

    /**
     * Shortcode that shows the main dashboard
     */
    function archery_logbook_dashboard_shortcode($atts = [], $content = null)
    {
        $user_id = get_current_user_id();
        $user_info = get_userdata($user_id);
        $first_name = $user_info->first_name ? $user_info->first_name : $user_info->display_name;
        
        $dashboard = '
        <style>
            :root {
                --primary-color: #198754;
                --secondary-color: #0d6efd;
                --danger-color: #dc3545;
                --warning-color: #ffc107;
                --dark-color: #212529;
                --light-bg: #f8f9fa;
            }

            .dashboard-header {
                background: linear-gradient(135deg, var(--primary-color) 0%, #20c997 100%);
                color: white;
                padding: 2rem 0;
                margin-bottom: 2rem;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                border-radius: 12px;
            }

            .stat-card {
                border: none;
                border-radius: 12px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                transition: transform 0.3s ease, box-shadow 0.3s ease;
                height: 100%;
            }

            .stat-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 4px 16px rgba(0,0,0,0.12);
            }

            .stat-icon {
                width: 60px;
                height: 60px;
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.8rem;
            }

            .stat-icon.success {
                background: linear-gradient(135deg, #198754 0%, #20c997 100%);
                color: white;
            }

            .stat-icon.primary {
                background: linear-gradient(135deg, #0d6efd 0%, #0dcaf0 100%);
                color: white;
            }

            .stat-icon.warning {
                background: linear-gradient(135deg, #ffc107 0%, #fd7e14 100%);
                color: white;
            }

            .stat-icon.danger {
                background: linear-gradient(135deg, #dc3545 0%, #fd7e14 100%);
                color: white;
            }

            .action-card {
                border: none;
                border-radius: 12px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                transition: transform 0.3s ease, box-shadow 0.3s ease;
                text-align: center;
                padding: 1.5rem;
                cursor: pointer;
                background: white;
                text-decoration: none;
                display: block;
            }

            .action-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 4px 16px rgba(0,0,0,0.12);
            }

            .action-icon {
                font-size: 2.5rem;
                margin-bottom: 0.5rem;
                color: var(--primary-color);
            }

            .section-title {
                font-weight: 600;
                margin-bottom: 1.5rem;
                color: var(--dark-color);
                position: relative;
                padding-bottom: 0.5rem;
            }

            .section-title::after {
                content: "";
                position: absolute;
                left: 0;
                bottom: 0;
                width: 60px;
                height: 3px;
                background: var(--primary-color);
                border-radius: 2px;
            }

            .recent-round-card {
                border: none;
                border-radius: 12px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                margin-bottom: 1rem;
                transition: transform 0.2s ease;
            }

            .recent-round-card:hover {
                transform: translateX(5px);
            }

            .round-badge {
                padding: 0.35rem 0.75rem;
                border-radius: 20px;
                font-size: 0.875rem;
                font-weight: 500;
            }

            .chart-container {
                background: white;
                border-radius: 12px;
                padding: 1.5rem;
                box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                min-height: 400px;
            }

            .bow-card {
                border: none;
                border-radius: 12px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                transition: transform 0.3s ease;
            }

            .bow-card:hover {
                transform: scale(1.02);
            }

            .badge-bow-type {
                padding: 0.5rem 1rem;
                border-radius: 20px;
                font-size: 0.875rem;
            }

            .activity-item {
                padding: 1rem;
                border-left: 3px solid var(--primary-color);
                background: white;
                border-radius: 8px;
                margin-bottom: 1rem;
                box-shadow: 0 1px 4px rgba(0,0,0,0.05);
            }

            .activity-icon {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                background: var(--light-bg);
                color: var(--primary-color);
            }

            @media (max-width: 768px) {
                .dashboard-header {
                    padding: 1rem 0;
                }
                
                .stat-card {
                    margin-bottom: 1rem;
                }
            }
        </style>

        <!-- Dashboard Header -->
        <div class="dashboard-header">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-md-12">
                        <h1 class="display-5 fw-bold mb-2">
                            <i class="bi bi-speedometer2"></i> Dashboard
                        </h1>
                        <p class="lead mb-0">Welcome back, ' . esc_html($first_name) . '! Track your progress and improve your skills.</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Main Content -->
        <div class="container mb-5">

            <!-- Statistics Cards -->
            <div class="row mb-4" id="dashboardStats">
                <div class="col-lg-3 col-md-6 mb-3">
                    <div class="card stat-card">
                        <div class="card-body">
                            <div class="d-flex align-items-center">
                                <div class="stat-icon success me-3">
                                    <i class="bi bi-graph-up-arrow"></i>
                                </div>
                                <div>
                                    <h6 class="text-muted mb-1">Total Rounds</h6>
                                    <h3 class="mb-0 fw-bold" id="totalRounds">...</h3>
                                    <small class="text-muted" id="roundsThisMonth">Loading...</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-3 col-md-6 mb-3">
                    <div class="card stat-card">
                        <div class="card-body">
                            <div class="d-flex align-items-center">
                                <div class="stat-icon primary me-3">
                                    <i class="bi bi-calculator"></i>
                                </div>
                                <div>
                                    <h6 class="text-muted mb-1">Average Score</h6>
                                    <h3 class="mb-0 fw-bold" id="avgScore">...</h3>
                                    <small class="text-muted" id="avgImprovement">Loading...</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-3 col-md-6 mb-3">
                    <div class="card stat-card">
                        <div class="card-body">
                            <div class="d-flex align-items-center">
                                <div class="stat-icon warning me-3">
                                    <i class="bi bi-trophy"></i>
                                </div>
                                <div>
                                    <h6 class="text-muted mb-1">Competitions</h6>
                                    <h3 class="mb-0 fw-bold" id="totalCompetitions">...</h3>
                                    <small class="text-muted">Loading...</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-3 col-md-6 mb-3">
                    <div class="card stat-card">
                        <div class="card-body">
                            <div class="d-flex align-items-center">
                                <div class="stat-icon danger me-3">
                                    <i class="bi bi-arrow-bar-right"></i>
                                </div>
                                <div>
                                    <h6 class="text-muted mb-1">Total Bows</h6>
                                    <h3 class="mb-0 fw-bold" id="totalBows">...</h3>
                                    <small class="text-muted">Loading...</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Quick Actions -->
            <div class="row mb-4">
                <div class="col-12">
                    <h4 class="section-title">Quick Actions</h4>
                </div>
                <div class="col-lg-2 col-md-4 col-6 mb-3">
                    <a href="#" class="action-card" data-action="new-round">
                        <div class="action-icon">
                            <i class="bi bi-plus-circle-fill"></i>
                        </div>
                        <h6 class="mb-0">Add Round</h6>
                    </a>
                </div>
                <div class="col-lg-2 col-md-4 col-6 mb-3">
                    <a href="#" class="action-card" data-action="new-bow">
                        <div class="action-icon">
                            <i class="bi bi-arrow-bar-right"></i>
                        </div>
                        <h6 class="mb-0">Add Bow</h6>
                    </a>
                </div>
                <div class="col-lg-2 col-md-4 col-6 mb-3">
                    <a href="#" class="action-card" data-action="new-competition">
                        <div class="action-icon">
                            <i class="bi bi-trophy-fill"></i>
                        </div>
                        <h6 class="mb-0">Competition</h6>
                    </a>
                </div>
                <div class="col-lg-2 col-md-4 col-6 mb-3">
                    <a href="#" class="action-card" data-action="bows">
                        <div class="action-icon">
                            <i class="bi bi-list-ul"></i>
                        </div>
                        <h6 class="mb-0">My Bows</h6>
                    </a>
                </div>
                <div class="col-lg-2 col-md-4 col-6 mb-3">
                    <a href="#" class="action-card" data-action="history">
                        <div class="action-icon">
                            <i class="bi bi-clock-history"></i>
                        </div>
                        <h6 class="mb-0">History</h6>
                    </a>
                </div>
                <div class="col-lg-2 col-md-4 col-6 mb-3">
                    <a href="#" class="action-card" data-action="progress">
                        <div class="action-icon">
                            <i class="bi bi-graph-up"></i>
                        </div>
                        <h6 class="mb-0">Progress</h6>
                    </a>
                </div>
            </div>

            <!-- Score Progress Chart -->
            <div class="row mb-4">
                <div class="col-12">
                    <h4 class="section-title">Score Progress</h4>
                </div>
                <div class="col-12">
                    <div class="chart-container">
                        <canvas id="dashboardScoreChart"></canvas>
                    </div>
                </div>
            </div>

            <!-- Recent Rounds -->
            <div class="row mb-4">
                <div class="col-12">
                    <h4 class="section-title">Recent Rounds</h4>
                </div>
                <div class="col-12" id="recentRoundsContainer">
                    <div class="text-center">
                        <div class="spinner-border text-success" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- My Bows -->
            <div class="row mb-4">
                <div class="col-12">
                    <h4 class="section-title">My Bows</h4>
                </div>
                <div class="col-12" id="myBowsContainer">
                    <div class="text-center">
                        <div class="spinner-border text-success" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <script>
            jQuery(document).ready(function() {
                jQuery.fn.loadDashboardData(' . $user_id . ');
            });
        </script>
        <script type="text/javascript" src="' . plugin_dir_url(__FILE__) . 'js/chart/chart.umd.js"></script>
        ';
        
        return $dashboard;
    }
    add_shortcode('archery_logbook_dashboard', 'archery_logbook_dashboard_shortcode');

}
