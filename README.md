# anonshare


Anonshare is a public/p2p  message-sharing website, where you can send or create a new post and specify if the post is private or public. If the post is private, depending on the settings provided (if a password is provided) the viewer will be required to enter the password to unlock the message. Users will be able to like public posts (if the reaction is enabled).




## Features
* [ ] Create Public / Private post
  * [ ] if a post is private, it won't be shown on the frontend but users can still access it if they have the username, but if a password is set, the user will need the password to unlock the message.
* [ ] liking a public post
* [ ] save posts to a reader device 
* [ ] delete from client/server depending on specified parameters


## Contributing
This project is fully open source. If you have an idea you want to contribute, see a bug, or want to add patches, you can fork the repo and send a pull request once you are happy with your modifications. Please add a descriptive commit message.
<br>

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/JSaretin/anonshare)


<br>

## Notice
You might wonder why am not using firebase in the frontend and subscribing to the Firebase transaction, am doing that to reduce database reads (I might change that to make the interaction more smooth for public posts)


## License
The MIT License 

