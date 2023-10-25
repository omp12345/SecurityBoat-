# Getting Started with Create Taskmanagement app



In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [https://taskmanagement-omp12345.vercel.app/] to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://taskmanagement-omp12345.vercel.app/) for more information.



If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).



### Deployment

This section has moved here: [https://taskmanagement-omp12345.vercel.app/]

##githubRepo:https://github.com/omp12345/SecurityBoat-
##Routes:
:userRoutes
:taskRoutes
:adminRoutes

##userRoutes has three end poiny 
/api/user/register
/api/user/login
/api/user/logout

##taskRoutes
/api/task/tasks >>>>for get and post http request
api/task/task/:id >>>>for delete and patch  http request
##admiRoutes
/admin/admintask >>>>for admin authorised 
admin can show your data
admin can delete or update for all users taks
##Authorization
for authorization 
i have used jsonwebtoken
(RS256)
## for authentixcation 
 i have used  jsonweb token 
 ## for relationship  for user and task routes and for security 
 i have used jsonwebtoken 
 ## for hashing 
 #i used bcrypt for hashing password



## github :https://github.com/omp12345/SecurityBoat-
## web:https://taskmanagement-omp12345.vercel.app/






