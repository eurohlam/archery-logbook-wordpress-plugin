<?php
/**
 * Plugin Name: Archery Logbook Integration
 * Plugin URI: https://wordpress.org/plugins/
 * Description: Integration with Archery Logbook REST API
 * Version: 1.0.0
 * Author: Roundkick.Studio, eurohlam
 * Author URI: https://roundkick.studio
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 * License: GPLv2 or later
Archery Logbook Integration is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 2 of the License, or
any later version.
Archery Logbook Integration is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.
You should have received a copy of the GNU General Public License
along with Archery Logbook Integration. If not, see http://www.gnu.org/licenses/gpl-2.0.txt.
 */

if (!defined('ABSPATH')) exit;

include_once 'class-archery-logbook-integration.php';
include_once 'archery-logbook-shortcodes.php';

define('ARCHERY_LOGBOOK_INT_VERSION', '1.0.0');

if (!class_exists('WP_Archery_Logbook_Int')) {
	class WP_Archery_Logbook_Int {
		/**
		* Plugin's options
		*/
	 	private $options_group = 'archery_logbook_int';
	 	private $url_option = 'archery_logbook_url';
		private $accessKey_option = 'archery_logbook_access_key';
		private $secret_option = 'archery_logbook_secret';

		const DB_MESSAGE_TABLE = 'archery_message_log';

		static function activate() {
		   	global $wpdb;

			$sql = "CREATE TABLE IF NOT EXISTS ". WP_Archery_Logbook_Int::DB_MESSAGE_TABLE." (
			  id int(11) NOT NULL AUTO_INCREMENT,
			  time datetime DEFAULT '0000-00-00 00:00:00' NOT NULL,
			  endpoint varchar(20) NOT NULL,
			  request longtext CHARACTER SET utf8 NOT NULL,
			  response longtext CHARACTER SET utf8 NOT NULL,
			  filepath varchar(50),
			  PRIMARY KEY (id)
			) DEFAULT CHARSET=utf8;";

			require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
			dbDelta( $sql );

			$dir_path = wp_upload_dir()['basedir'] . '/archery_logbook_int';
			if(!file_exists($dir_path)) wp_mkdir_p($dir_path);
        }

		static function deactivate() {
			//nothing so far
		}

		static function uninstall() {
		   	global $wpdb;
			delete_option( 'archery_logbook_url' );
			delete_option( 'archery_logbook_access_key' );
			delete_option( 'archery_logbook_secret' );

			$sql = "DROP TABLE IF EXISTS ".WP_Archery_Logbook_Int::DB_MESSAGE_TABLE;

			$wpdb->query( $sql );
        }

		function __construct() {
			add_action('admin_menu', array( $this, 'archery_logbook_menu'));
			add_action('wp_ajax_archery_logbook_send_request', array( $this,'archery_logbook_send_request'));
			add_action('wp_ajax_archery_logbook_get_data', array( $this,'archery_logbook_get_data'));
			add_action('init', 'archery_logbook_shortcodes_init');
		}


		/**
		* Send GET request to Archery Logbook API
		*/
		function archery_logbook_get_data() {
		   	global $wpdb;

			$accessKey = get_option($this->accessKey_option);
			$secret = get_option($this->secret_option);
			$url = get_option($this->url_option);
			$request = stripcslashes($_POST['request']);
			$path = $_POST['path'];

			if (!empty($accessKey) && !empty($secret) && !empty($url) && !empty($path)) {
				$archeryLogbookInt = new Archery_Logbook_Integration();
				$archeryLogbookRequest = $archeryLogbookInt->prepare_archery_logbook_parameters($accessKey, $secret, $path, $request);
				$result = $archeryLogbookInt->send_request($url . $path, "GET", $archeryLogbookRequest);

				$wpdb->insert(
		 			WP_Archery_Logbook_Int::DB_MESSAGE_TABLE,
					array(
					'time' => current_time( 'mysql' ),
					'endpoint' => $path,
					'request' => json_encode($archeryLogbookRequest),
					'response' => $result,
					)
				);

				echo $result;
			} else {
				error_log('Archery Logbook Integration plugin error: empty one or several required parameters - accessKey, secret, url or path. Please check settings of Archery Logbook Integration plugin');
				echo '{"Archery Logbook Integration plugin error": "empty one or several required parameters - accessKey, secret, url or path"}';
			}
			wp_die();
		}

		/**
		* Send POST/PUT request to Archery Logbook API
		*/
		function archery_logbook_send_request() {
		   	global $wpdb;

			$accessKey = get_option($this->accessKey_option);
			$secret = get_option($this->secret_option);
			$url = get_option($this->url_option);
			$request = stripcslashes($_POST['request']);
			$path = $_POST['path'];

			if (!empty($accessKey) && !empty($secret) && !empty($url) && !empty($path)) {
				$archeryLogbookInt = new Archery_Logbook_Integration();
				$archeryLogbookRequest = $request; //$archeryLogbookInt->prepare_archery_logbook_parameters($accessKey, $secret, $path, $request);
				$result = $archeryLogbookInt->send_request($url . $path, "POST", $archeryLogbookRequest);

				$wpdb->insert(
		 			WP_Archery_Logbook_Int::DB_MESSAGE_TABLE,
					array(
					'time' => current_time( 'mysql' ),
					'endpoint' => $path,
					'request' => $request,
					'response' => $result,
					)
				);

				echo $result;
			} else {
				error_log('Archery Logbook Integration plugin error: empty one or several required parameters - accessKey, secret, url or path. Please check settings of Archery Logbook Integration plugin');
				echo '{"Archery Logbook Integration plugin error": "empty one or several required parameters - accessKey, secret, url or path"}';
			}
			wp_die();
		}

		function archery_logbook_settings() {
			register_setting( $this->options_group, $this->url_option );
			register_setting( $this->options_group, $this->accessKey_option );
			register_setting( $this->options_group, $this->secret_option );
		}

		function archery_logbook_menu() {
		  	add_action('admin_init', array( $this,'archery_logbook_settings'));
			add_options_page('Archery Logbook Integration', 'Archery Logbook Integration', 'manage_options', 'archery-logbook-int', array( $this,'archery_logbook_options_page'));
		}


		/**
		* Admin options page
		*/
		function archery_logbook_options_page() {
			?>
		    <div class="wrap">
		        <h2>Archery Logbook Integration</h2>
		        <p>Integration with <a href="https://github.com/eurohlam/archery-logbook" target="_blank">Archery Logbook API</a></p>
		        <p>Version: <?php echo ARCHERY_LOGBOOK_INT_VERSION ?></p>
		        <div>
		            <form method="post" action="options.php">
		            <?php
						settings_fields($this->options_group);
						do_settings_sections($this->options_group);
					?>
						<table class="form-table">
			            	<tr valign="top">
								<th scope="row">Archery Logbook API URL</th>
								<td>
									<input type="url" class="regular-text" name="archery_logbook_url" value="<?php echo get_option($this->url_option) ?>" />
								</td>
							</tr>
							<tr valign="top">
								<th scope="row">Archery Logbook API Access Key</th>
								<td>
									<input type="text" class="regular-text" name="archery_logbook_access_key" value="<?php echo get_option($this->accessKey_option) ?>" />
								</td>
							</tr>
							<tr valign="top">
								<th scope="row">Archery Logbook API Secret Key</th>
								<td>
									<input type="text" class="regular-text" name="archery_logbook_secret" value="<?php echo get_option($this->secret_option) ?>" />
								</td>
							</tr>
						</table>
						<input type="hidden" name="page_options" value="archery_logbook_url,archery_logbookk_access_key,archery_logbook_secret" />
						<p class="submit">
							<input class="button-primary" type="submit" value="Save Changes" />
						</p>
					</form>
				</div>
			</div>
			<?php
		}

	} //end class WP_Archery_Logbook_Int
}


if (class_exists('WP_Archery_Logbook_Int')) {
	// Installation and uninstallation hooks
	register_activation_hook(__FILE__, array('WP_Archery_Logbook_Int', 'activate'));
	register_deactivation_hook(__FILE__, array('WP_Archery_Logbook_Int', 'deactivate'));
	register_uninstall_hook(__FILE__, array('WP_Archery_Logbook_Int', 'uninstall'));
	// instantiate the plugin class
	$wp_plugin = new WP_Archery_Logbook_Int();
}
?>
