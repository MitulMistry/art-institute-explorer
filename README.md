# Art Institute Explorer
![screenshot](readme_aic_explorer.jpg)

### A full-stack art exploration tool using [Rails][rails], [React][react], and [Redux][redux].

AIC Explorer is a web application to explore and save artworks from the [Art Institute of Chicago][aic] and use them to create custom collections. It's built with a [Ruby on Rails][rails] back end to make API calls and store data, and a [React][react]/[Redux][redux] front end to provide an API interface. 

## Demo App
You can see a demo version of this application deployed to [Railway][railway] here: https://art-institute-explorer.up.railway.app/

## Functionality
AIC Explorer leverages the [Art Institute of Chicago API][aic-public-api], a comprehensive API that makes data on all of the museum's artworks publically accessible (with documentation available [here][aic-api-documentation], along with its [GitHub page][aic-api-github]). Using this API, the application allows users to browse and search through the museum's artworks, save artworks to their account, and use artworks to create collections which can then be shared and commented upon by other users.

The application relies on the external API to provide data including images for artworks which are then displayed on the front end. Data for artworks is only stored in the database when users choose to save an artwork or add it to a collection.

### Features
* **Browse Artworks** - Look through the most popular artworks from the [Art Institute of Chicago][aic].
* **Search Artworks** - Type custom searches to query the AIC and find artworks that you're looking for.
* **Examine Artworks** - Get more detailed information about a particular artwork through its show page.
* **Save Artworks** - Save an artwork to your account for later use.
* **Add Artworks to Collections** - Create custom collections of artworks to share with other users.
* **Add Comments to Collections** - Leave a comment and allow users to discuss a collection.
* **Like Collections** - Like a collection and see a collection's popularity.
* **Examine Users** - Get more information about a particular user and their saved artworks and created collections through their show page.

## Application Info
The application uses an MVC (Model, View, Controller) paradigm using the Rails back end. Instead of Rails templates, it uses [Jbuilder][jbuilder] templates to serialize data from the model layer and respond with JSON that can be consumed ascynchronously by the front end. Authentication is handled using [BCrypt][bcrypt] for Ruby. External API requests are handled by the [Faraday][faraday] gem.

[React][react] is used to create a single-page, responsive, JavaScript based front end. [Redux][redux] is used to keep a central store for the application's state and store data received from the back end. [React Router][react-router] is used for front end routing, [Redux Thunk][redux-thunk] is used to assist in Redux actions and API calls, and [Framer Motion][framer-motion] is used for animations. [Font Awesome][font-awesome] is used for icons and buttons.

## Wiki
Initial planning for the application was documented on this GitHub repository's [wiki][wiki]. Here, you can find info on the [database schema][wiki-database-schema], [back end routes][wiki-back-end-routes], [front end routes][wiki-front-end-routes], and a sample [Redux state shape][wiki-redux-state-shape].

## Project Structure
[`Gemfile`](Gemfile) - Rails related back-end dependencies.

[`package.json`](package.json) - Front end dependencies for Webpacker (React, Redux, etc).

### Back End
[`/config/routes.rb`](/config/routes.rb) - Back end routes are defined here.

[`/app/controllers`](/app/controllers) - Rails controllers are configured to function as an internal API for the front end to interface with. These controllers are responsible for managing users, authentication, creating resources (such as Artworks and Collections) and perpetuating data using the PostgreSQL database.

[`/db`](/db) - Database migrations, seeds, and schema can be found in this directory.

[`/app/models`](/app/models) - Models for application resources (such as Users, Artworks, and Collections) are defined in this directory. In the files, relationships (such as has_many or belongs_to) are defined, as well as data validations and class or instance methods used to perform various tasks (such as returning data).

[`/app/views`](/app/views) - From here, [JBuilder][jbuilder] templates will be called from the controllers and serialize data for the models, returning JSON responses to the client.

[`/spec`](/spec) - Back end tests written using [RSpec][rspec] are stored here.

### Front End
All front end files are stored under [`/app/javascript/packs`](/app/javascript/packs).

[`index.jsx`](/app/javascript/packs/index.jsx) - This is the entrypoint file for the front end of the application. It loads the React application and sets up the Redux [store](/app/javascript/packs/store/store.js). The file is loaded by [`application.js`](/app/javascript/packs/application.js) to be compiled by Webpack, along with all other imported files.

[`/components`](/app/javascript/packs/components) - All React components are stored in separate directories and allow for a modular approach to constructing the front end pages.

[`/reducers`](/app/javascript/packs/reducers) - The Redux reducers take data and apply it to the Redux store. They also initialize a state for the store.

[`/actions`](/app/javascript/packs/actions) - Redux actions are used to submit data to the store.

[`/util`](/app/javascript/packs/util) - Utility functions are stored here, mostly used to assist in making API requests to the Rails back end.

[`/styles`](/app/javascript/packs/styles) - Default [Sass][sass] stylesheets are kept here, while the stylesheets for individual React components are stored in their respective component directories. All stylesheets have to be loaded into Webpacker using the [manifest file](/app/javascript/packs/styles/application.scss).

## Install Instructions
To build the application, install back end dependencies from the [Gemfile][gemfile] via [Bundler][bundler] by running `bundle install`. [Ruby][ruby] version 3.1.2 was used to develop the application and is specified in the [Gemfile][gemfile] as well as the [.ruby-version][ruby-version-file] file.

Since the application uses [PostgreSQL][postgresql], you need to have it installed locally on your machine with a user that has table creation privileges. You can get further instructions [here][postgres-local-setup].

Create the database with `bundle exec rails db:create` and run migrations with `bundle exec rails db:migrate`, then run `bundle exec rails db:seed` to populate the database.

To run the application in development mode after installation, run `bundle exec rails s`.

Front end dependencies are managed by [Yarn][yarn] with the [package.json][package.json] file, so you must have Yarn installed. Dependencies are built by [Webpack][webpack] via the [Webpacker][webpacker] gem. Run `yarn install` to install front end dependencies. Custom JavaScript code for React/Redux is located in the [`app/javascript/packs`][js-directory] directory where front end assets are imported.

## Testing
The back end test suite is developed using [RSpec][rspec] via the [rspec-rails gem][rspec-rails] with [shoulda-matchers][shoulda-matchers]. Model factories are set up with [FactoryBot][factory-bot]. Since the application is dependant on an external API, the test suite utilizes [VCR][vcr] to record and replay responses for tests.

Tests are located under the [`/spec`][spec-directory] folder. Test coverage includes requests, models, and routing. In order to run tests, run `bundle exec rspec` followed by an optional folder or file under the [`/spec`][spec-directory] directory (for example, if you only want to test models, run `bundle exec rspec spec/models`).

## License
This project is open source under the terms of the [MIT License][mit].

[aic]: https://www.artic.edu/
[aic-public-api]: https://www.artic.edu/open-access/public-api
[aic-api-documentation]: https://api.artic.edu/docs/
[aic-api-github]: https://github.com/art-institute-of-chicago/data-aggregator
[rails]: http://rubyonrails.org/
[react]: https://reactjs.org/
[redux]: https://redux.js.org/
[railway]: https://railway.app/
[bundler]: http://bundler.io/
[jbuilder]: https://github.com/rails/jbuilder
[bcrypt]: https://github.com/bcrypt-ruby/bcrypt-ruby
[faraday]: https://lostisland.github.io/faraday/
[react-router]: https://reactrouter.com/
[redux-thunk]: https://github.com/reduxjs/redux-thunk
[framer-motion]: https://www.framer.com/motion/
[font-awesome]: https://fontawesome.com/
[rspec]: https://rspec.info/
[sass]: https://sass-lang.com/
[wiki]: https://github.com/MitulMistry/art-institute-explorer/wiki
[wiki-database-schema]: https://github.com/MitulMistry/art-institute-explorer/wiki/Database-Schema
[wiki-back-end-routes]: https://github.com/MitulMistry/art-institute-explorer/wiki/Back-End-Routes
[wiki-front-end-routes]: https://github.com/MitulMistry/art-institute-explorer/wiki/Front-End-Routes
[wiki-redux-state-shape]: https://github.com/MitulMistry/art-institute-explorer/wiki/Redux-State-Shape
[gemfile]: https://github.com/MitulMistry/art-institute-explorer/blob/master/Gemfile
[ruby]: https://www.ruby-lang.org/
[ruby-version-file]: https://github.com/MitulMistry/art-institute-explorer/blob/master/.ruby-version
[postgresql]: https://www.postgresql.org/
[postgres-local-setup]: https://devcenter.heroku.com/articles/heroku-postgresql#local-setup
[webpack]: https://webpack.js.org/
[webpacker]: https://github.com/rails/webpacker
[yarn]: https://yarnpkg.com/en/
[package.json]: https://github.com/MitulMistry/art-institute-explorer/blob/master/package.json
[js-directory]: https://github.com/MitulMistry/art-institute-explorer/blob/master/app/javascript/packs
[rspec-rails]: https://github.com/rspec/rspec-rails
[shoulda-matchers]: https://github.com/thoughtbot/shoulda-matchers
[factory-bot]: https://github.com/thoughtbot/factory_bot_rails
[vcr]: https://github.com/vcr/vcr
[spec-directory]: /spec
[mit]: http://opensource.org/licenses/MIT