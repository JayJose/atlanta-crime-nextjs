# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

Steps to recreate

1. Create a new project directory
   `mkdir directory-name`
   `cd directory-name`

2. Initialize the project
   `create

3. (Optional) Install yarn
   `sudo npm install -g yarn`

4. Install dependencies
   `yarn add @nivo/core`
   `yarn add @nivo/core`

create-react-app phoenix
cd phoenix
yarn add primereact primeicons
yarn add @nivo/core @nivo/calendar @nivo/colors @nivo/line d3-scale d3-time
yarn add @chakra-ui/react @emotion/react @emotion/styled framer-motion
yarn add recharts
@chakra-ui/icons
npm start

# Crime Map Atlanta

An interactive map of crimes in Atlanta, Georgia, USA.

## View the map

#### On the web

- TBD

#### On your local machine

1. Clone the respository `https://ark-brogramming@dev.azure.com/ark-brogramming/Streamlit/_git/crime-map-atl`
2. Move into the project directory `cd crime-map-atl`
3. Create and populate a `.env` file
   - See `env.example` for the required variables
4. Run `docker compose up --build`
5. Navigate to http://localhost:8501/
6. To shut down the running containers run `docker compose down --rmi all --volumes`

## Map generation process

1. Download data from the [Atlanta Police Department](https://www.atlantapd.org/i-want-to/crime-data-downloads)
2. Unzip downloaded data
3. Load data into a PostgreSQL database
4. Transform and enrich data using dbt
5. Display a map of crimes using Streamlit

## Resources

- [Group A and B offense listings] https://www.atlantapd.org/home/showpublisheddocument/2881/637062879602730000

TODO Fix container-to-container dependencies (depends_on ain't it)

Crimes
Crimes Against
Offense Category
Offense
