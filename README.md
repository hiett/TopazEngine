#Topaz Engine

The Topaz Engine is a framework for quickly and easily creating large scale data logging systems.

Please note this is currently in deep development and not stable.

**Installation**

Once you have cloned the repo, `cd` into the main folder and run `npm install`. Once this has completed, enter the `frontend` folder and also run `npm install`. 

The program is made up of two sub programs.
- Front end: A React App that uses SocketIO to communicate with the backend.
- Back end: A Node app that talks to the database, houses the requests, and does data management.

For any requests, you can use **either** sockets or web requests. More documentation to come soon on this.

**Starting the Program(s)**

Run `npm start` in both the main folder and the front end folder. In the future, a single script
will be created.

**Notes**

- The backend server runs on port `8081` for development, and the front end runs on `3000`. This is for development
and it is planned in the long term to combine these into one.
- In the case that you wish to run the project without the front end, simply only run the backend app.
However, be sure **not** to delete the frontend folder as it contains some shared assets that are required for the backend to run.
