# Event organizer
## About
This is simple web application for organizing personal events.
It is consisted of two separated applications. Backend application is implemented as REST API, in Clojure, using [compojure](https://github.com/weavejester/compojure).
Frontend application is implemented in [Angular](https://angular.io/). Database used for storing entities is PostgreSQL.

Application is consisted of two entities, User and Event entity. User can have multiple Events like shown on image bellow.

![alt text](event-organizer-uml.jpg?raw=true)

At first run you are encountered with login screen, if you do not have account, you will have to register with unique username and email.
After that you are redirected to login screen to sign in with previously created account. After that calendar view is displayed. Now you can start adding and deleting events. Enjot :)


## Prerequisites
For purposes of this project you will need [PostgreSQL 10.12](https://www.postgresql.org/download/) version (which was run on Ubuntu 10.12-0ubuntu0.18.04.1), [Node js 13.5.0](https://nodejs.org/en/download/), [Node package manager 6.13.4](https://www.npmjs.com/get-npm) and [Angular CLI 8.3.21](https://cli.angular.io/). Detailed versions of all necessary tools are listed in prerequisites.txt file.

## Installation
We have to be sure that event-organizer database is present. If we dont see database, we should create it manually with next command.
```bash
createdb event-organizer
```
Username and password for database are in core.clj file.
Now let us first run database script. 
**Database is populated with some predefined users. If you don't want to include them, just comment lines 139,140 and 141 in script "event-organizer.sql".**
```bash
psql -U [username] -d event-organizer -a -f event-organizer.sql
```

After setting databse and installing all prerequisites you can clone project into desired directory.
```bash
cd Documents
git clone https://github.com/milosnikic/event-organizer.git
```
### Frontend application
In my case, new directory will be created inside Documents folder.
After cloning repository, you should navigate into Frontend application and run npm install command to install all angular dependencies.

```bash
cd event-organizer/EventOranizer-SPA
npm install
```

After all dependencies have been installed, now you should be able to run Frontend application with following command.

```bash
ng serve -o
```
which will open application in new browser window on port 4200.
### Backend application
We have to navigate to leiningen project and run Backend application.
```bash
cd event-organizer/EventOrganizer.API/event-organizer
lein run
```
