##App usage:
The application is intended for quickly grabbing and annotating a screen image.
After initializing, the app runs in the background. To grab an screen image, use
`Cmd+Alt+P` and the current screen will show up in the app window. Currently, the
only editing tool available is for marking red rectangles and is active by default.
There are two buttons in the right menu bar: "undo" and "save".

Currently working on more editing tools and UI design. Check back soon for updates!


##Installation:
```
git clone https://github.com/phonofidelic/screen-markup-electron.git 
cd screen-markup-electron
npm install
```

##Running local development environment:
`npm run dev` to run create-react-app scripts and webpack dev server.
`npm run electron` to run electron app.

##Packaging as an iOS app:
`npm run dist`
The packaged app will be available as a file named ScreenMarkup in dist/mac

##Guides and discussions used in development:
HTML Canvas as a javascript class:
https://simonsarris.com/making-html5-canvas-useful/

electron-canvas-to-buffer:
https://github.com/mattdesl/electron-canvas-to-buffer
https://discuss.atom.io/t/native-image-examples/26648/4

Packaging:
https://medium.com/@kitze/%EF%B8%8F-from-react-to-an-electron-app-ready-for-production-a0468ecb1da3
https://medium.com/how-to-electron/a-complete-guide-to-packaging-your-electron-app-1bdc717d739f