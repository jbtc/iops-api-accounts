# Accounts API
The Account's API handles the account, users, and customizations.
 
# Routes
Overview of routes and a brief description of their intended behavior

## Setup / Registration
> Helper endpoint to setup an account, user, and basic account claims

Verb    | URL  | Description      
------- | ---- | -----------
POST    | /v1/registrations | Registers a new organization and primary account


## Accounts
> The account information, which is a collection of services and users

Verb    | URL  | Description      
------- | ---- | -----------
GET     | /v1/accounts/:id | Retrieves and Account by it's Id
POST    | /v1/accounts | Creates a new account
PUT     | /v1/accounts/:id | Updates an Account by it's Id
DELETE  | /v1/accounts/:id | Delete an Account


## Users
> The users of the system

Verb    | URL  | Description      
------- | ---- | -----------
GET     | /v1/users | Queries all the users across all systems
GET     | /v1/users/:id | Get's a single user
POST    | /v1/users | Create's a new user
PUT     | /v1/users/:id | Updates a user
DELETE  | /v1/users/:id | Delete's a user
GET     | /v1/accounts/:id/users | Get's all the account's users
GET     | /v1/accounts/:accountId/users/:id | Get's a single user
POST    | /v1/accounts/:id/users | Creates an assigns a user to an account
DELETE  | /v1/accounts/:id/users/:id | Removes a user from an organization, but doesn't delete the user

## Claims
> The permissions that a system, account, or user can participate in

Verb    | URL  | Description      
------- | ---- | -----------
GET     | /v1/claims | All system claims
GET     | /v1/claims/:id | System claim by Id
POST    | /v1/claims | New system claim
PUT     | /v1/claims/:id | Update a system claim
DELETE  | /v1/claims/:id | Delete a system claim
GET     | /v1/users/:userId/claims | User's claims
POST    | /v1/users/:userId/claims | Add a claim to a user
DELETE  | /v1/users/:userId/claims/:id | Remove a claim from a user
GET     | /v1/accounts/:accountId/claims | Account specific claims
POST    | /v1/accounts/:accountId/claims | Create an account specific claim
DELETE  | /v1/accounts/:accountId/claims/:id | Remove an account specific claim
GET     | /v1/accounts/:accountId/users | Get's all the account's users
GET     | /v1/accounts/:accountId/users/:id | Get's a single user
POST    | /v1/accounts/:id/users | Creates an assigns a user to an account
DELETE  | /v1/accounts/:id/users/:id | Removes a user from an organization, but doesn't delete the user