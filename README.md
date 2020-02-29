# Noteful Client

Noteful app:

1. npm run build does not create a build folder for deployment to Zeit [package.json]

2. trying to GET with the app returns "Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at https://fathomless-shelf-77351.herokuapp.com//folders. (Reason: CORS header ‘Access-Control-Allow-Origin’ missing)." [config.js]

3. Deleting folders and notes will return an error in the console and won't history.push('/') [Note.js - line 34] and [NoteListMain.js - line 36]

4. "Delete Folder" still appears if the folder has notes. Should only appear if folder is empty. [NoteListMain.js - line 44]

Noteful server:

1. I can see the tables in the database with DBeaver just fine, but all attempts to connect to the deployed server's url endpoint come back with errors. I'm trying to run a GET request on Postman to the URL: https://fathomless-shelf-77351.herokuapp.com/api/folders, but I just get nondescript errors.
