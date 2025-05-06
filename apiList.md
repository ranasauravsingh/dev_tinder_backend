# DevTinder APIs

## authRouter
- POST /signUp
- POST /login
- POST /logout

## profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## connectionRequestRouter
<!-- send status ["interested", "ignored"] -->
- POST /request/send/:status/:userId

<!-- send status ["accepted", "rejected"] -->
- POST /request/review/:status/:userId

## userRouter
- GET /user/connections
- GET /user/requests
- GET /user/feed - Gets you the profile of other users on platform

Status: ignored, interested, accepted, rejected
