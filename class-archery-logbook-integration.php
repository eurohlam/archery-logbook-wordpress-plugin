<?php
if (!defined('ABSPATH')) exit;

class Archery_Logbook_Integration {

  public function __construct() {
  }

  public function milliseconds() {
      date_default_timezone_set("Pacific/Auckland");
      $mt = explode(' ', microtime());
      return ((int)$mt[1]) * 1000 + ((int)round($mt[0] * 1000));
  }

  public function prepare_archery_logbook_parameters($accessKey, $secret, $path, $data) {

      $nonce = $this->milliseconds();
      $timestamp = $this->milliseconds();

      $dataKeyName = 'data';

      // Set up some dummy parameters. Sort alphabetically.
      $parameterMap = array(
          'key' => $accessKey,
          'nonce' => $nonce,
          'timestamp' => $timestamp,
          $dataKeyName => $data
      );
      ksort($parameterMap);

      // Build the signature string from the parameters.
      $signatureString = $path;
      foreach ($parameterMap as $key => $value) {
          if ($key === 'signature') {
              continue;
          }
          $signatureString .= "$key=$value;";
      }
      // Create the HMAC SHA-256 Hash from the signature string.
      $signatureHex = hash_hmac('sha256', $signatureString, $secret, false);

      $resultMap = array(
          'key' => $accessKey,
          'nonce' => $nonce,
          'timestamp' => $timestamp,
          $dataKeyName => $data,
          'signature' => $signatureHex
      );

      return $resultMap;
  }

  public function send_request($url, $method, $requestParams) {
      $curl = curl_init();

      $params = array(
              CURLOPT_RETURNTRANSFER => 1,
              CURLOPT_HTTPHEADER => array('Content-type: application/json'),
              CURLOPT_URL => $url,
              CURLOPT_POST => true,
              CURLOPT_SSL_VERIFYHOST => false,//to ignore self-signed cert
              CURLOPT_SSL_VERIFYPEER => false,//to ignore self-signed cert
              CURLOPT_VERBOSE => 1,
              CURLOPT_TIMEOUT, 300
          );
      curl_setopt_array($curl, $params);
      switch ($method) {
        case "POST":
            curl_setopt($curl, CURLOPT_POST, true);
            curl_setopt($curl, CURLOPT_POSTFIELDS, $requestParams);
            break;
        case "GET":
            curl_setopt($curl, CURLOPT_HTTPGET, true);
            break;
        case "PUT":
            curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'PUT'); //(CURLOPT_PUT, true) does not work for some reason. Probably beacuse of older version of PHP
            curl_setopt($curl, CURLOPT_POSTFIELDS, $requestParams);
            break;
        case "DELETE":
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "DELETE");
            break;
        default:
            break;
      }
        //curl_setopt($ch, CURLOPT_USERPWD, $user . ':' . $secret);
      $result = null;
      $error = null;
      try {
          $result = curl_exec($curl);
          if (!$result) {
              $errno = curl_errno($curl);
              $error = curl_error($curl);
              if ($errno != 0) {
                  error_log('Backend Error: code=' . $errno . ' ErrorMessage: ' . $error);
              }
          }

          curl_close($curl);
      } catch (HttpException $ex) {
            error_log('HTTP Error: ' . $ex);
      }
      return array(
          'response' => $result,
          'error' => $error);
  }

}

?>
