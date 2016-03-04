# A Twist of Fate
League of legends inspired online card game with written with Node and React.

To run application `node app.js`

For automated service management install upstart
`sudo apt-get install upstart` 
then copy the config file into `/etc/init`

`cp -i /your/app/directory/a-twist-of-fate.conf /etc/init/a-twist-of-fate.conf`

you can then run the service use the following commands:

``` 
sudo start a-twist-of-fate
sudo restart a-twist-of-fate
sudo stop a-twist-of-fate 
```

