# Solana Grassroot Project Frontend

This is an Expo project and so to get this up and running, make sure to have installed Expo CLI (See https://reactnative.dev/docs/environment-setup for installation guide)

Next, install dependencies `npm install` or `yarn`

You need to make a slight change the following file:

`{project_folder}/node_modules/rn-material-ui-textfield/src/components/label/index.js` on line 82.

Replace `lineHeight: fontSize,` with `lineHeight: (style && style.lineHeight) || fontSize,`.

Now, you can run `npm start`, `yarn start` or `expo start`

After this, Expo starts a metro server and opens a webpage. In this webpage you get a QR code you can scan in the Expo Client App (You can download this on your app store Android or iOS)..
