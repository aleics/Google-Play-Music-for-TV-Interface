Google Play Music API for a SmartTV
========================================

This is the final Bachelor's project developed in the 'Fachhochschule Köln' in Cologne, Germany.
The project aim is to create a Google Music API for a specific SmartTV Box. 

This project has been developed by:
 - [Aleix Casanovas](http://github.com/aleics)

Description
-----------
This API have to connect with Google to authentificate the user, and get all the information about him. This information will be displayed in the interface (songs, albums, artists, playlists,etc). The user will be able to play every song that he will have on the official Google Music application.

Requeriments of the user
------------------------
The user has to fulfill a number of requirements:
 - Google Account.
 - Logged in Google Music.
 - Android device associated

If the user doesn't meet these requeriments, the functionality of the application could not be possible.

Procedure
=========
Authentification
----------------
This API will connect with Google Music to authentificate the user. After the authentification the user would be able to see all the songs, playlist and information that have on Google Music.

The Authentification will be a POST with these specifications:

 - Type: POST
 - Host: www.google.com
 - Path: /accounts/ClientLogin
 - Headers:
       - Content-type: application/x-www-form-urlencoded
 - Body:
       - accountType: HOSTED_OR_GOOGLE
       - Email: email of the user
       - Passwd: password of the user
       - service: sj

Here you have one example using curl:

    >> curl -d accountType=GOOGLE \ -d Email=jondoe@gmail.com \ -d Passwd=north23AZ \ -d service=sj \          https://www.google.com/accounts/ClientLogin

The response of this Authentification will be a json file with the **Auth**, **SID** and **LSID**. This three variables will be saved on the server and used to get access in every connection with Google in the future.


Lists
-----
The next step of the connection is the request of the lists of the Tracks, Playlists, etc. To do this we will have to do a GET connection. The different lists will be get it using different urls. Thiese are the different possible connections to get the different lists:

  - /tracks: Get the list of all the tracks.
  - /playlists: Get the list of all the playlists.
  - /plentries: Get the list of all the tracks of every playlist.

To do this connection we will have to send the request with these especifications:
 
 - Type: GET
 - Host: www.google.com
 - Path: /accounts/ClientLogin
 - Headers:
       - Authorization: GoogleLogin auth="YOUR_AUTH_TOKEN"

auth will be the Auth number that we saved in the authentif-ication step.

Here you have one example using curl:

    >> curl --header "Authorization: GoogleLogin auth=YOUR_AUTH_TOKEN" \ https://www.googleapis.com/sj/v1beta1/tracks

The response of the list request will be a json file with all the information of every list (track id, playlist id, album's photo url, etc).
