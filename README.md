archery-logbook-wordpress-plugin
=================================

## Overview

This is a Wordpress plugin that helps to build a user interface intended to interact with
[Archery Logbook REST API](https://github.com/eurohlam/archery-logbook)
The plugin provides a set of shortcodes that can be used in customized pages.

## Project

This plugin is a part of a free project [Archer's Log Book](https://roundkick.nz/).  
Archer's Log Book helps archers to manage their scores, bows and overall progress.

## Shortcodes

Shortcodes are implemented with using:

* [Bootstrap 5.2](https://getbootstrap.com/docs/5.2)
* [jQuery 3.3.1](https://api.jquery.com)
* [Chart.js 4.3.0](https://www.chartjs.org/docs/latest/)
* [Bootstable 1.1](https://github.com/t-edson/bootstable)

All required dependencies are imported as part of the plugin.

### Main shortcode

* `[archery_logbook_main]` - Enclosing main shortcode that shows the main container. All other shortcodes must be placed inside this one like in example below

        [archery_logbook_main]
           [archery_logbook_new_archer]
        [/archery_logbook_main]


### Shortcodes for adding new entities

* `[archery_logbook_new_club]` - shortcode that shows a form for adding a new archery club
* `[archery_logbook_new_archer]` - shortcode that shows a form for adding a new archer
* `[archery_logbook_new_bow]` - shortcode that shows a form for adding a new bow
* `[archery_logbook_new_distance_settings]` - shortcode that shows a form for adding a new distance settings for certain bow
* `[archery_logbook_new_score]` - shortcode that shows a form for adding a new score

### Shortcodes for representing data

* `[archery_logbook_bows]` - shortcode that shows a list of bows that belongs to current archer
* `[archery_logbook_scores_history]` - shortcode that shows a history of scores for current archer
* `[archery_logbook_scores_progress]` - shortcode that shows line charts for average score progress
