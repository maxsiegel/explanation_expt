if you don't have php installed, make sure to do so. on macOS if you have homebrew, you can just `brew install php`

Run in main experiment directory: 

locally:
    php -S 127.0.0.1:8000 -t .

on a server:
    php -S 0.0.0.0:8000 -t .


then if running locally, go to http://127.0.0.1:8000
if on a remote server, http://<server ip or url>:8000

