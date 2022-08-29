# Beat store
## Frontend demonstration
### https://kbarwinski.github.io/beat-store-demo
# General info
Main goal of the app is to provide self-hosted alternative to platforms like Traktrain, Beatstars etc.
Most of the project's functionality is implemented, and could be expanded upon in the future along with bug fixes and possibly cleaner, more professional looking UI.

# Features
* Fetching of audio items info and corresponding static files through the REST API
* Playback of audio items through embedded music player (includes playlists, volume and time position's control)
* Music visualization
* Authorization and authentication of users through JWT
* Two user roles, owner and an author
* Registration of authors with the use of owner's generated invitation code
* Uploading, modifying and deleting user's owned audio items
* Basic order creation and fulfillment with the use of Stripe PaymentIntent API.

# Technologies used
## Frontend
* React 18.2
* Redux 4.2 w/ Redux Toolkit 1.8.3 & Redux Persist 6
* Styled Components 5.3.5
* Axios 0.27.2
* Stripe JS 1.35 & React Stripe JS 1.1
* Various community components e.g. react-howler 5.2
## Backend
* ASP.NET Core 6.0.202
* EntityFramework Core 6.0.5
* ASP.NET Core Identity 6.0.5
* Npgsql Entity Framework Core Provider 6.0.5
* AutoMapper 11
* Stripe.net 40.3
* AspNetCoreRateLimit 4.2
## Database
* PostgreSQL 14.4

# Preview of features outside of demo's scope
https://youtu.be/xmvKsTE1t2Y
