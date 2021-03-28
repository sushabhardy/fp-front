# Frontend for Filmy Profiles

This is a prototype webapp/app for filmy profiles.

* This project uses the following technologies:
  * Docker
  * ReactJS

<a href="https://standardjs.com"><img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg" alt="Standard - JavaScript Style Guide"></a>

## Getting Started

* Clone this repo.

* Install `Visual Studio Code` IDE for development.

* Install `ESlint ^2.1.13` visual studio code extension.

* Install `Docker` visual studio extension to work with Dockerfiles

* Install `Remote - Containers` visual studio extension to work with visual studio code for docker containers.

* Install Docker Desktop in your local system. (Then, make sure docker is running and docker cli is working)
  * [Windows](https://hub.docker.com/editions/community/docker-ce-desktop-windows)
  * [macOS](https://hub.docker.com/editions/community/docker-ce-desktop-mac)

## Building for web

* Run `docker pull sushabhardy/fp-fe` to pull latest image.

* Run `docker tag sushabhardy/fp-fe fp-fe_fp-fe` to clone image.

* Run `docker-compose up` to start the server.

* Open `Docker` image tab in the left status bar.

* You can see the container named `fp-fe_fp-fe` running. Right click that container and click on `Attach Visual Studio Code`.

* A new VSCode window will open. This is the VSCode running inside the container.

* To debug the app, go to `Run -> Start Debugging`. This will open a new chrome window. Change `url` to `http://localhost:8100` in `.vscode/launch.json` and refresh the chrome window.

* You can add breakpoints and update code to see the debugger in the VSCode.

## Building for Android

* Install the ionic CLI globally: `npm install -g @ionic/cli`

* [Download Android studio](https://developer.android.com/)

* Ensure `Android Emulator`, `Android SDK Build-Tools`, `Android SDK Platform-Tools`, `Android SDK Tools`, `Google Play Services` and `Intel x86 Emulator Accelerator (HAXM installer)` are installed in Android Studio.

* Run `ionic integrations enable capacitor` in a terminal from project root.

* Run `ionic capacitor add android` in a terminal from project root to add android to the project

* Run `ionic capacitor run android` in a terminal from project root to build the project and copy to android and run the android  studio.

* Wait for gradle process to finish.

* Once finished, choose the emulator and launch the app.

* Once a code change is done, run `ionic capacitor run android` to see the updated app in emulator.

## Building for iOS

* Install the ionic CLI globally: `npm install -g @ionic/cli`

* Run `xcode-select --install`

* Run `ionic capacitor add ios` in a terminal from project root to add ios to the project

* Run `ionic capacitor run ios` in a terminal from project root to open xcode

## Available scripts

* Run `npm run lint` to see if code style is followed and build passes.
* Run `npm test` for to see if all tests pass.


## Deployment

* Checkout `master` branch and change endpoints in `.env.production` file.
* Create build by running `ionic build`
* Upload contents of `build/` folder to AWS S3 bucket.