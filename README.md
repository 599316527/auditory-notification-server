Auditory Notification Server
===================

Imagine that there is a device which connects a speaker in your team. Auditory notification would be played from this device once someone builds somthing successfully. The server gives your the ability to achieve the fantastic dream.

```
npm install
npm run start

curl -X POST http://localhost:3000/play \
  --data-urlencode name=Super_Mario_Level_Complete
```
