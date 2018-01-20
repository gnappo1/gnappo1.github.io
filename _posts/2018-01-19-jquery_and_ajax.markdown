---
layout: post
title:      "JQUERY AND AJAX""
date:       2018-01-20 01:29:20 +0000
permalink:  jquery_and_ajax
---


Lemme tell you guys, I don’t know if it was because of the Christmas vacations but it took me quite a while to wrap this project up.
Now the app is totally AJAX automated, forms for new resources are loaded and submitted without page refresh, instances can also be edited and deleted asynchronously.
I included a random button to load any quote’s show page and insert it into the DOM.
New resources are plainly created taking the JSON response and appending it to a certain div tag and through the creation of Javascript Model Objects and Handlebars templates.
One thing it definitely took me some time to figure out, is that you can’t bind click events to elements that are added to the DOM with AJAX on a second moment. Instead, you bind the click event to the entire page or simply just the body, to listen to any possible node later on added to the DOM.
Here’s a link to my repo, check it out!

[Repo](https://github.com/gnappo1/TheoremsCheck/)



