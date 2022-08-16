# BEQUEST ADDRESS BOOK

This is a very simple and lean app with minimal dependencies bootsrapped with create-react-app.

## Important Libraries used 
    - Material UI
    - Axios
    - Formik
    - Yup


## How to run project
In the project directory, first install packages by running `yarn` command. You can afterwards run:
### `yarn start`
To run the app in the development mode.

## Structure 
Because this is a very simple app, I avoided the use of any other state management methods like `context` or `redux`. I simply used native react hooks and a few custom hooks I wrote.

**Folder Tree**

bequest-address-book
├── README.md
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
│   │   ├── AddressDetail.tsx
│   │   ├── AddressListItem.tsx
│   │   ├── AddressModal.tsx
│   │   ├── EmptyState.tsx
│   │   ├── FloatingActionButton.tsx
│   │   ├── Loader.tsx
│   │   ├── Notification.tsx
│   │   ├── SearchBox.tsx
│   │   ├── __tests__
│   │   └── index.ts
│   ├── hooks
│   │   ├── __tests__
│   │   ├── index.ts
│   │   ├── useAddressForm.ts
│   │   └── useServices.ts
│   ├── index.css
│   ├── index.tsx
│   ├── logo.svg
│   ├── react-app-env.d.ts
│   ├── reportWebVitals.ts
│   ├── serializers
│   │   └── addressLookup.ts
│   ├── setupTests.ts
│   └── shared
│       ├── constants.ts
│       └── types.ts
├── tree.md
├── tsconfig.json
└── yarn.lock


## TODO
- [ ] Write unit tests for custom hooks
- [ ] Write unit tests for components
- [ ] Integration tests





