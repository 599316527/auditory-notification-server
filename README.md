Auditory Notification Server
===================

Imagine that there is a device which connects a speaker in your team. Auditory notification would be played from this device once someone builds somthing successfully. The server gives your the ability to achieve the fantastic dream.

```
npm install
npm run start

curl -X POST http://localhost:3000/play \
  --data-urlencode name=Super_Mario_Level_Complete
```

**For Windows User**

`cmdmp3` is tested by me on Windows Server 2016 to play audio from command line. See details about it in this [blog](https://lawlessguy.wordpress.com/2015/06/27/update-to-a-command-line-mp3-player-for-windows/). Passing it with parameter `player` <small>(alias `p`)</small> to the server may solve the issue. 

```
npm run start -- -p "path\to\cmdmp3"
```
