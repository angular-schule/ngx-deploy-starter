# @angular-schule/ngx-deploy-starter

**Deploy your Angular app to the file system directly from the Angular CLI! 🚀**

> **Warning:**  
> This is a sample project that helps you to implement your own deployment builder (`ng deploy`) for the Angular CLI.
> The actual "deployment" is only a simple copy to another folder in the file system.
>
> **Learn more at
> https://github.com/angular-schule/ngx-deploy-starter**

## Usage

Add `@angular-schule/ngx-deploy-starter` to your project.

```bash
ng add @angular-schule/ngx-deploy-starter
```

Deploy your project to the file system.

```
ng deploy [options]
```

## Options

The following options are also available.

#### --build-target <a name="build-target"></a>

- **optional**
- Default: `undefined` (string)
- Example:
  - `ng deploy` – Angular project is built in `production` mode
  - `ng deploy --build-target=test` – Angular project is using the build configuration `test` (this configuration must exist in the `angular.json` file)

If no `buildTarget` is set, the `production` build of the default project will be chosen.
The `buildTarget` simply points to an existing build configuration for your project, as specified in the `configurations` section of `angular.json`.
Most projects have a default configuration and a production configuration (commonly activated by using the `--prod` flag) but it is possible to specify as many build configurations as needed.

This is equivalent to calling the command `ng build --configuration=XXX`.
This command has no effect if the option `--no-build` is active.

**⚠️ BREAKING CHANGE (v1)**

This option was called `--configuration` in previous versions.

BEFORE (_does not work_):

```
ng deploy --configuration=test
```

NOW:

```
ng deploy --build-target=test
```

#### --no-build

- **optional**
- Default: `false` (string)
- Example:
  - `ng deploy` – Angular project is build in production mode before the deployment
  - `ng deploy --no-build` – Angular project is NOT build

Skip build process during deployment.
This can be used when you are sure that you haven't changed anything and want to deploy with the latest artifact.
This command causes the `--build-target` setting to have no effect.

#### --target-dir

- **optional**
- Default: `/example-folder` (string)
- Example:
  - `ng deploy` -- App is "deployed" to the example folder (if existing)
  - `ng deploy --target=/var/www/html` -- App is "deployed" to another folder

> **This is one of the options you can freely choose according to your needs.**

#### --base-href

- **optional**
- Default: `undefined` (string)
- Example:
  - `ng deploy` -- `<base href="/">` remains unchanged in your `index.html`
  - `ng deploy --base-href=/the-repositoryname/` -- `<base href="/the-repositoryname/">` is added to your `index.html`

Specifies the base URL for the application being built.
Same as `ng build --base-href=/XXX/`

> **This is an example how to override the workspace set of options.**

## License <a name="license"></a>

Code released under the [MIT license](LICENSE).

<hr>

## 🚀 Powered by [ngx-deploy-starter](https://github.com/angular-schule/ngx-deploy-starter)
