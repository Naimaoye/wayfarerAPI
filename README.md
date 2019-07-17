# wayfarerAPI
A public transportation booking server
## Required Features

- User can **sign up**
- User can **login**
- Admin can **create a trip**
- Admin can **cancel a trip**
- Both Admin and Users can **see all trips**
- Users *book a seat on a trip**
- An Admin **see all bookings** while user can **see all of his/her bookings**
- Users **delete their booking**

## Optional Features

- Users **get a list of filtered trips based on origin**
- Users **get a list of filtered trips based on destination**
- Users **change seats after booking**

## Technologies

- Node JS
- Express
- Mocha & Chai
- Joi
- ESLint
- Babel
- Travis CI
- Code Climate & Coveralls

## Requirements and Installation

To install and run this project you would need to have listed stack installed:

- Node.js

- To run:

```sh
git clone <https://github.com/Naimaoye/wayfarerAPI.git>
cd WayFarer-API
npm install
npm run start:dev
```

## Testing

```sh
npm test
```

## API-ENDPOINTS

- V1

`- POST /api/v1/auth/signup Create user account`

`- POST /api/api/v1/auth/signin Login a user`

`- POST /api/v1/trips Create a trip`

`- PATCH /api/v1/trips/<:trip_id> Cancel a trip`

`- GET /api/v1/trips See all trips`

`- POST /api/v1/bookings Book a seat on a trip`

`- GET /api/v1/bookings See all bookings`

`- DELETE /api/v1/bookings/<:booking_id> Delete their booking`

`- GET /api/v1/trips?origin=ikoyi Get a list of filtered trips based on origin`

`- GET /api/v1/trips?destination=ikoyi Get a list of filtered trips based on destination`

`- PATCH /api/v1/bookings/<:booking_id> Change seats after booking`


## Pivotal Tracker stories

[https://www.pivotaltracker.com/n/projects/2360337](https://www.pivotaltracker.com/n/projects/2360337)


## API

The API is currently in version 1 (v1) and is hosted at
[https://naimat-wayfarer.herokuapp.com/](https://naimat-wayfarer.herokuapp.com/)

## API Documentation

[https://way-farer-app.herokuapp.com/api-docs/](https://way-farer-app.herokuapp.com/api-docs/)

## Author

Oyewale Naimat