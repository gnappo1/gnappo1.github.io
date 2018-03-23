---
layout: post
title:      "Mind Games in React"
date:       2018-03-23 07:39:47 +0000
permalink:  mind_games_in_react
---


![mp-games-demo](https://user-images.githubusercontent.com/25065500/37817031-7c8cc76c-2e32-11e8-89aa-cd329b8ae44b.gif)

My last portfolio project, a React-Redux frontend app with a Rails API backend is quite different than the other projects.
I developed a Quiz Apllication, light and easy-to-maintain, that uses CSS3 features to create a captivating layout.
The frontend side of the application is inside the client folder and the project has been started using this resource: https://www.fullstackreact.com/articles/how-to-get-create-react-app-to-work-with-your-rails-api/ and 
https://medium.com/superhighfives/a-top-shelf-web-stack-rails-5-api-activeadmin-create-react-app-de5481b7ec0b.

The rails API has namespaced routes and basic controllers to let my frontend access the API server for information to render on the page. CORS issues are solved on the server side setting up a proxy field in the package.json or using rack-cors gem and setting up the correct information in config/initializers/cors.rb file.
On the client-side I set the request headers in my client/action files to allow CORS as well.

To run the application in development run 'rake start'.
The app has also been deployed to heroku so it's up and running at https://mp-games.herokuapp.com/.

Many more quizzes will be added with time and hopefully get many people interested and involved! You will find many social icons around the website, so please make sure to share if you like what you see.
Upon quiz completion a pop-up page will report your total scores and let you share your results, if you feel you did a good job! 

The Contact Page has a form that lets you send emails directly to my gmail inbox. This way I can maintain a direct contact with the users and welcome any eventual inputs or suggestions!
For the implementation of a contact form directly on the client-side I follwed this guide: https://ciunkos.com/creating-contact-forms-with-nodemailer-and-react.

You can find the repo here: https://github.com/gnappo1/Mind-Games-React

