# Company-Tracker-MERN-Stack
A basic MERN Stack Application
`Phase 1 — APIs`

Company Fields
1) Company Name
2) Company Address
3) Coordinates (latlong based on company address, fetched dynamically)

User Fields
1) First name
2) Last name
3) Email
4) Designation
5) Date of Birth
6) Active (Boolean)

Endpoints
Companies
1. List companies
2. Get a specific company by ID
3. Create a company
4. Update a company
5. Add / remove users to / from a company
6. Delete a company
Users
1. List users
2. Get a specific user by ID
3. Create a user
4. Update a user
5. Deactivate a user (sets to active=false)
6. Delete a user

`Phase 2 — UI`
Operations Supported
1. Create and manage companies
1. On the company detail page, show the company address plotted on the map based
on your stored coordinates
2. Create and manage users under companies
3. Migrating a user to another company

`Also please configure and add the follwing in .env file to run the app successfully`

Server

PORT
MONGO_USERNAME
MONGO_PASSWORD
MONGO_APP

FrontEnd
REACT_APP_MAPBOX_TOKEN
