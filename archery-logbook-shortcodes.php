<?php
function archery_logbook_shortcodes_init()
{

    /**
     * Shortcode that shows a form for a new club
	 */
    function archery_logbook_new_club_shortcode($atts = [], $content = null)
    {
        $form = '<head><link rel="stylesheet" href="/wp-content/plugins/archery-logbook/css/bootstrap.min.css"></head>
        <section id="archery_logbook_section">
            <div class="container">
                <form id="newArcheryClubForm">
                    <h3>ADD NEW ARCHERY CLUB</h3>
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
                    <div id="success"></div>
                    <div class="row mb-3">
                       <div class="form-group col">
                          <button id="btnAddClub" class="btn btn-outline-success btn-lg" type="submit">Add Club</button>
                       </div>
                    </div>
                </form>
            </div>
        </section>
            <script type="text/javascript" src="/wp-content/plugins/archery-logbook/js/bootstrap.bundle.min.js"></script>
            <script type="text/javascript" src="/wp-content/plugins/archery-logbook/js/archerylogbook.js"></script>';
        return $form;
    }
    add_shortcode('archery_logbook_new_club', 'archery_logbook_new_club_shortcode');


    /**
     * Shortcode that shows a form for a new archer
	 */
    function archery_logbook_new_archer_shortcode($atts = [], $content = null)
    {
        $form = '<head><link rel="stylesheet" href="/wp-content/plugins/archery-logbook/css/bootstrap.min.css"></head>
        <section id="archery_logbook_section">
            <div class="container">
            <form id="newArcherForm">
                <h3>ADD NEW ARCHER</h3>
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
                <div id="success"></div>
                <div class="row mb-3">
                   <div class="form-group col">
                      <button id="btnAddArcher" class="btn btn-outline-success btn-lg" type="submit">Add Archer</button>
                   </div>
                </div>
            </form>
            </div>
        </section>
            <script type="text/javascript" src="/wp-content/plugins/archery-logbook/js/bootstrap.bundle.min.js"></script>
            <script type="text/javascript" src="/wp-content/plugins/archery-logbook/js/archerylogbook.js"></script>';
        return $form;
    }
    add_shortcode('archery_logbook_new_archer', 'archery_logbook_new_archer_shortcode');

    /**
	 *  Shortcode that shows a form for a new bow
	 */
    function archery_logbook_new_bow_shortcode($atts = [], $content = null)
    {
        $newBow = '<head><link rel="stylesheet" href="/wp-content/plugins/archery-logbook/css/bootstrap.min.css"></head>
        <section id="archery_logbook_section">
            <div class="container">
            <form id="newBowForm">
               <h3>ADD NEW BOW</h3>
               <div class="row mb-3">
                   <div class="col-md">
                      <div class="form-floating">
                        <input id="bowName" class="form-control" required type="text" placeholder="Bow name"/>
                        <label for="bowName">Bow name</label>
                      </div>
                   </div>
                </div>
                <div class="row">
                    <div class="col-md mb-3">
                        <div class="form-floating">
                            <select id="bowLevel" class="form-select">
                              <option selected>Select a bow level</option>
                              <option value="BEGINNER">Beginner</option>
                              <option value="INTERMEDIATE">Intermediate</option>
                              <option value="ADVANCED">Advanced</option>
                            </select>
                            <label for="bowLevel">Bow level</label>
                        </div>
                    </div>
                    <div class="col-md mb-3">
                        <div class="form-floating">
                            <input id="poundage" class="form-control" required type="text" pattern="^[0-9]{2}-[0-9]{2}$" title= "Format: [ddd] or [dd]-[dd]" placeholder="Poundage"/>
                            <label for="poundage">Poundage</label>
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
                                     <input type="radio" class="form-check-input" name="bowTypeGroup" value="COMPOUND" id="radioCompound" autocomplete="off" data-bs-toggle="list" href="#compoundTab" role="tab">
                                     <label for="radioCompound">Compound</label>
                                 </div>
                                 <div class="form-check">
                                     <input type="radio" class="form-check-input" name="bowTypeGroup" value="TRADITIONAL" id="radioTraditional" autocomplete="off" data-bs-toggle="list" href="#traditionalTab" role="tab">
                                     <label for="radioTraditional">Traditional</label>
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
                                              <label for="compoundModel" >Compound bow model</label>
                                          </div>
                                      </div>
                                      <div class="tab-pane fade" id="traditionalTab" role="tabpanel">
                                           <div class="row form-floating">
                                               <input id="traditionalModel" class="form-control" type="text" placeholder="Traditional bow model"/>
                                               <label for="traditionalModel">Traditional bow model</label>
                                           </div>
                                       </div>
                                   </div>
                             </div>
                         </div>
                    </div>
                </div></div>
                </div>
                <div id="success"></div>
                <div class="row mb-3">
                   <div class="col">
                      <button id="btnAddBow" class="btn btn-outline-success btn-lg" type="submit">Add Bow</button>
                   </div>
                </div>
            </form>
            </div>
        </section>
                <script type="text/javascript" src="/wp-content/plugins/archery-logbook/js/bootstrap.bundle.min.js"></script>
                <script type="text/javascript" src="/wp-content/plugins/archery-logbook/js/archerylogbook.js"></script>';
        return $newBow;
    }
    add_shortcode('archery_logbook_new_bow', 'archery_logbook_new_bow_shortcode');


    /**
     * Shortcode that shows a form for a bow distance settings
	 */
    function archery_logbook_new_distance_settings_shortcode($atts = [], $content = null)
    {
        $form = '<head><link rel="stylesheet" href="/wp-content/plugins/archery-logbook/css/bootstrap.min.css"></head>
        <section id="archery_logbook_section">
        <div class="container">
            <form id="newDistanceSettingsForm">
                <h3>ADD NEW DISTANCE SETTINGS</h3>
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
                                    <label for="distance">Distance</label>
                                 </div>
                                 <div class="form-floating mb-3">
                                    <input id="sight" class="form-control" required type="text" placeholder="Sight"/>
                                    <label for="sight">Sight</label>
                                 </div>
                                 <div class="mb-3">
                                    <input id="isTested" class="form-check-input" type="checkbox" placeholder="Is tested?"/>
                                    <label for="isTested">Is tested?</label>
                                 </div>
                             </div>
                        </div>
                     </div>
                </div>
                <div id="success"></div>
                <div class="row mb-3">
                   <div class="col">
                      <button id="btnAddDistanceSettings" class="btn btn-outline-success btn-lg" type="submit">Add Distance Settings</button>
                   </div>
                </div>
            </form>
        </div>
    </section>
            <script>
                jQuery(document).ready(function () {
                    jQuery.fn.getBowsAsDropdown(1, jQuery("div#bowListDiv"));
                });
            </script>
            <script type="text/javascript" src="/wp-content/plugins/archery-logbook/js/bootstrap.bundle.min.js"></script>
            <script type="text/javascript" src="/wp-content/plugins/archery-logbook/js/archerylogbook.js"></script>';
        return $form;
    }
    add_shortcode('archery_logbook_new_distance_settings', 'archery_logbook_new_distance_settings_shortcode');


    /**
     * Shortcode that shows a form for a new score
	 */
    function archery_logbook_new_score_shortcode($atts = [], $content = null)
    {
        $form = '<head>
            <link rel="stylesheet" href="/wp-content/plugins/archery-logbook/css/bootstrap.min.css">
            <link rel="stylesheet" href="/wp-content/plugins/archery-logbook/css/bootstrap-icons.css">
        </head>
        <section id="archery_logbook_section">
        <div class="container">
            <!--<form id="newScoreForm">-->
                <h3>ADD NEW SCORE</h3>
                <div id="scoreDiv" class="row mb-3">
                <table id="newScoreTable" class="table table-bordered table-striped">
                    <thead class="table-success">
                        <tr>
                            <th>Round #1</th>
                            <th>Round #2</th>
                            <th>Round #3</th>
                            <th>Round #4</th>
                            <th>Round #5</th>
                            <th>Round #6</th>
                        </tr>
                      </thead>
                      <tbody>
                      </tbody>
                </table>
                 <button class="btn btn-outline-success" id="btnAddEnd"><i class="bi bi-plus-circle"></i> Add New End</button>
                </div>

                <div id="success"></div>
                <div class="row mb-3">
                   <div class="col">
                      <button id="btnAddScore" class="btn btn-outline-success btn-lg" type="submit">Add New Score</button>
                   </div>
                </div>
            <!--</form>-->
        </div>
    </section>
            <script>
                jQuery(document).ready(function () {
                    jQuery("#newScoreTable").SetEditable();

                    jQuery("#btnAddEnd").click(function() {
                        rowAddNewAndEdit("newScoreTable");
                    });

                    jQuery("#btnAddScore").click(function() {
                        var json = TableToJson("newScoreTable");
                        console.log(json); //TODO: add logic for storing new score
                    });
                });
            </script>
            <script type="text/javascript" src="/wp-content/plugins/archery-logbook/js/jquery.min.js"></script>
            <script type="text/javascript" src="/wp-content/plugins/archery-logbook/js/bootstrap.bundle.min.js"></script>
            <script type="text/javascript" src="/wp-content/plugins/archery-logbook/js/bootstable.js"></script>
            <script type="text/javascript" src="/wp-content/plugins/archery-logbook/js/archerylogbook.js"></script>';
        return $form;
    }
    add_shortcode('archery_logbook_new_score', 'archery_logbook_new_score_shortcode');
}
