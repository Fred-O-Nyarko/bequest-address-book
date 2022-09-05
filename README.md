# BEQUEST ADDRESS BOOK

This is a very simple and lean app with minimal dependencies bootsrapped with create-react-app.

Project is hosted on **Netlify**. View [here](https://thunderous-cupcake-b07e7a.netlify.app/)

## Important Libraries used 
    - Material UI
    - Formik
    - Yup
    - Redux Toolkit
    - Others
      - restcountries api (https://restcountries.com): for fetching country data.
      - getAddress.io (https://getaddress.io): for fetching address data for UK addresses.

## How to run project
In the project directory, first install packages by running `yarn` command. You can afterwards run:
### `yarn start`
To run the app in the development mode.

## Structure 
I used Redux Toolkit and RTK-query (comes with Redux Toolkit). 
I used RTK-query for data fetching and caching, hence had no more use for axios for now.
The structure is as follows:
- Slices: Contains all the redux slices; a collection of Redux reducer logic and actions for a single feature in the app.
- Api: Contains all the api calls and endpoints using RTK query. It also auto-generated hooks for each endpoint.(very cool feature)
- Hooks: Which basically extended the existing hooks provided by react-redux.
- Store: Contains the store and the root reducer + some basic middlewares.

NB: I decided not to store the api data in redux store, but rather in the cache provided by RTK-query. 
This is because the data is not used anywhere else in the app. 
I simply allowed RTK to handle the caching and fetching of data.

**Folder Tree**
```
bequest-address-book
├── README.md
├── cypress
│   ├── downloads
│   ├── e2e
│   │   ├── addAddressTest.spec.cy.ts
│   │   └── searchByPostcodeTest.spec.cy.ts
│   ├── fixtures
│   │   └── example.json
│   └── support
│       ├── commands.ts
│       ├── component-index.html
│       ├── component.ts
│       └── e2e.ts
├── cypress.config.ts
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── App.tsx
│   ├── assets
│   │   ├── empty.svg
│   │   └── icons
│   │       └── search.svg
│   ├── components
│   │   ├── __tests__
│   │   │   ├── __snapshots__
│   │   │   │   ├── elements.test.tsx.snap
│   │   │   │   └── modules.test.tsx.snap
│   │   │   ├── elements.test.tsx
│   │   │   └── modules.test.tsx
│   │   ├── elements
│   │   │   ├── EmptyState.tsx
│   │   │   ├── FloatingActionButton.tsx
│   │   │   ├── Loader.tsx
│   │   │   ├── Notification.tsx
│   │   │   ├── SearchBox.tsx
│   │   │   └── index.ts
│   │   ├── index.ts
│   │   └── modules
│   │       ├── address
│   │       │   ├── AddAddress.tsx
│   │       │   ├── Address.tsx
│   │       │   ├── AddressDetail.tsx
│   │       │   ├── AddressList.tsx
│   │       │   └── components
│   │       │       └── AddressListItem.tsx
│   │       ├── country
│   │       ├── index.ts
│   │       └── postcode
│   │           └── PostcodeSearchBox.tsx
│   ├── hooks
│   │   ├── __tests__
│   │   │   ├── useAddressForm.test.tsx
│   │   │   └── useDebounce.test.ts
│   │   ├── index.ts
│   │   ├── useAddressForm.ts
│   │   └── useDebounce.ts
│   ├── index.css
│   ├── index.tsx
│   ├── logo.svg
│   ├── react-app-env.d.ts
│   ├── redux
│   │   ├── apis
│   │   │   ├── addresses.ts
│   │   │   ├── countries.ts
│   │   │   └── index.ts
│   │   ├── hooks.ts
│   │   ├── index.ts
│   │   ├── slices
│   │   │   ├── addressList.ts
│   │   │   ├── index.ts
│   │   │   └── settings.ts
│   │   └── store.ts
│   ├── reportWebVitals.ts
│   ├── setupTests.ts
│   └── shared
│       ├── constants.ts
│       ├── index.ts
│       ├── types.ts
│       └── utils.ts
├── tsconfig.json
├── yarn-error.log
└── yarn.lock
```

## TODO
- [ ] Fix some minor broken tests
- [ ] More test coverage (Redux)





