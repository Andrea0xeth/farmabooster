# sixsteps - Pharmacy Management Dashboard

A comprehensive pharmacy management system with real-time product data integration.

## Features

- **Real Pharmaceutical Data**: Integration with pharmaceutical product databases for up-to-date information
- **Product Catalog**: Paginated and filterable product listing with:
  - Comprehensive search and filter functionality
  - Category and manufacturer filtering
  - In-stock availability filters
- **Supplier Price Comparison**: Automatically displays and compares prices from multiple suppliers
- **Purchase Order Creation**: Select products and create purchase orders (ODAs) with running total calculation

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/your-username/sixsteps.git
   cd sixsteps
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Set up the API integration
   - Follow the instructions in [API_SETUP.md](./API_SETUP.md) to configure your pharmaceutical data API connection

4. Start the development server
   ```
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Using Mock Data

The application is configured to use real pharmaceutical data by default, but will automatically fall back to mock data if API connection fails. This ensures the application remains functional for demonstration purposes even without API access.

## Available Scripts

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

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
