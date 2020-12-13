# @angular-schule/ngx-deploy-starter: README for contributors

- [How to start ](#how-to-start)
- [Local development](#local-development)
  - [1. Angular CLI](#1-angular-cli)
  - [2. npm link](#2-npm-link)
  - [3. Adding to an Angular project -- ng add](#3-adding-to-an-angular-project----ng-add)
  - [4. Testing](#4-testing)
  - [5. Debugging](#5-debugging)
- [Publish to NPM](#publish-to-npm)
- [Usage of Prettier Formatter](#usage-of-prettier-formatter)

## How to start

tl;dr – execute this:

```
cd src
npm i
npm run build
npm test
```

## Local development

If you want to try the latest package locally without installing it from NPM, use the following instructions.
This may be useful when you want to try the latest non-published version of this library or you want to make a contribution.

Follow the instructions for [checking and updating the Angular CLI version](#angular-cli) and then link the package.

### 1. Optional: Latest Angular version

This builder requires the method `getTargetOptions()` from the Angular DevKit which was introduced [here](https://github.com/angular/angular-cli/pull/13825/files).
All Angular projects with Angular 9 and greater are supposed to be compatible. (Actually it works with some versions of 8.x too, but you want to be up to date anyway, don't you?)
Execute the next three steps, if your test project is still older.

1. Install the latest version of the Angular CLI.

   ```sh
   npm install -g @angular/cli
   ```

2. Run `ng version`, to make sure you have installed Angular v9.0.0 or greater.

3. Update your existing project using the command:

   ```sh
   ng update @angular/cli @angular/core
   ```

### 2. npm link

Use the following instructions to make `@angular-schule/ngx-deploy-starter` available locally via `npm link`.

1. Clone the project

   ```sh
   git clone https://github.com/angular-schule/ngx-deploy-starter.git
   cd ngx-deploy-starter
   ```

2. Install the dependencies

   ```sh
   cd src
   npm install
   ```

3. Build the project:

   ```sh
   npm run build
   ```

4. Create a local npm link:

   ```sh
   cd dist
   npm link
   ```

Read more about the `link` feature in the [official NPM documentation](https://docs.npmjs.com/cli/link).

### 3. Adding to an Angular project -- ng add

Once you have completed the previous steps to `npm link` the local copy of `@angular-schule/ngx-deploy-starter`, follow these steps to use it in a local Angular project.

1. Enter the project directory

   ```sh
   cd your-angular-project
   ```

2. Add the local version of `@angular-schule/ngx-deploy-starter`.

   ```sh
   npm link @angular-schule/ngx-deploy-starter
   ```

3. Now execute the `ng-add` schematic.

   ```sh
   ng add @angular-schule/ngx-deploy-starter
   ```

4. You can now deploy your angular app to GitHub pages.

   ```sh
   ng deploy
   ```

   Or with the old builder syntax:

   ```sh
   ng run your-angular-project:deploy
   ```

5. You can remove the link later by running `npm unlink`

6. We can debug the deployment with VSCode within `your-angular-project`, too.
   Go to `your-angular-project/node_modules/@angular-schule/ngx-deploy-starter/deploy/actions.js` and place a breakpoint there.
   Now you can debug with the following `launch.json` file:

   ```json
   {
     "version": "0.2.0",
     "configurations": [
       {
         "type": "node",
         "request": "launch",
         "name": "Debug ng deploy",
         "skipFiles": ["<node_internals>/**"],
         "program": "${workspaceFolder}/node_modules/@angular/cli/bin/ng",
         "cwd": "${workspaceFolder}",
         "sourceMaps": true,
         "args": ["deploy", "--no-build"]
       }
     ]
   }
   ```

### 4. Testing

Testing is done with [Jest](https://jestjs.io/).
To run the tests:

```sh
cd ngx-deploy-starter/src
npm test
```

### 5. Debugging

To debug your deployer you need to:

1. Place `debugger` statement, where you want your deployer stops.
2. Follow the steps of [npm link](#2-npm-link) described here. compile, link and install linked in a local project
3. Now, on the project that you linked the deployer, run it on debug mode using:
    - | Normal Command         | Command on Debug Mode                                                     |
      | :--------------------- | :------------------------------------------------------------------------ |
      | `ng deploy`            | `node --inspect-brk ./node_modules/@angular/cli/bin/ng deploy`            |
      | `ng add YOUR_DEPLOYER` | `node --inspect-brk ./node_modules/@angular/cli/bin/ng add YOUR_DEPLOYER` |

4. Use your favorite [Inspector Client](https://nodejs.org/de/docs/guides/debugging-getting-started/#inspector-clients) to debug

> This is the standard procedure to debug a NodeJs project. If you need more information you can read the official Docs of NodeJs to learn more about it.
>
> _https://nodejs.org/de/docs/guides/debugging-getting-started/_

## Publish to NPM

```
cd ngx-deploy-starter/src
npm run prettier
npm run build
npm run test
npm publish dist --access public
```

## Keeping track of all the forks

[ngx-deploy-starter](https://github.com/angular-schule/ngx-deploy-starter/) and
[angular-cli-ghpages](https://github.com/angular-schule/angular-cli-ghpages/) (both developed by Johannes Hoppe) are follow-up projects of the deprecated [ngx-gh demo](https://github.com/mgechev/ngx-gh).
This project was a follow-up of the deploy schematics from the [angularfire](https://github.com/angular/angularfire/) project.

To stay in sync with the stuff the Angular team is doing, you might want to keep an eye on the following files:

- [builder.ts](https://github.com/angular/angularfire/blob/master/src/schematics/deploy/builder.ts)
- [actions.ts](https://github.com/angular/angularfire/blob/master/src/schematics/deploy/actions.ts)
