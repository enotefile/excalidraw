@ECHO OFF
ECHO:
ECHO [notudspa]
ECHO:

start ngrok http http://localhost:3000 --region au --subdomain=notudspa --host-header localhost:3000

PAUSE