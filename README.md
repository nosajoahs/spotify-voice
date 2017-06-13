## Spotify Voice

  Spotify Voice will help any music lovers listen to music without lifting a finger. <br>
  It will use voice activation and the keyword "Play" followed by a song name to play that song. 

## File Storage

The Client files are inside the folder called 'angular'.<br>
The Server file are inside the folder called 'server'.<br>
The Database file is inside the folder called 'db'.

## Motivation

The problem many of us have is that if we are not at the computer, perhaps a bathroom or shower break <br>
or we are in bed and want to play some relaxing music, we would not want to get up from the comfort <br>
of our bed just to click a button. Likewise, if you are in a different room such as feeding your baby <br>
or you're busy eating greasy food you wouldn't want to grease your precious macbook or pc. Instead, you <br>
can say something like: "Play Flapper Girl" or "Play Flapper Girl by the Lumineers" <br>
and it will play that song for you with that artist or album. 


## Installation

1. Fork the repo.
2. Copy the clone link and paste it to a folder inside of your terminal.
3. Install node if you do not have it installed.
3. Go in the root folder and type npm install, which will install all the packages in <br>
package.json in a folder called node_modules
4. Go to Spotify's API here and make a test app which will generate you a client id and client secret
5. create a config.js file in the root folder with the following:

```
let keys = {
  client_id : 'INSERT CLIENT_ID HERE',
  client_secret : 'INSERT CLIENT_SECRET HERE',
}
module.exports = keys
```

5. Install mysql and configure it to run the server 
6. Type mysql -u root -p to get into mysql in the terminal
7. Create a database in mysql named spotifyVoice, with root as username and 1111 as the password
8. Finally, go to localhost:8888 in your browser window and you should be able to see the app running

## How to Use
To use the app, simply type in the textbox for a song or artist, or allow mic and talk into the app. <br>
For example, to play "Flapper Girl" by the Lumineers you can say:

"Play Flapper Girl Lumineers" and it will play that song for you. <br>

Note that the url's are only 30 seconds long due to spotify's API limitation.




## API Reference

The app uses spotify's api: https://developer.spotify.com/web-api/search-item/ <br>
and annyang voice control: https://github.com/TalAter/annyang


