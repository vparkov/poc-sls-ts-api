# Demo API

## Before you start

1. Supported OS - **MacOS**, **Linux**. **Windows** users will need to either use a VM or consider switching to **Linux**.
2. Make sure you have installed Docker.
3. Make sure you have installed node. Prefarrably ^v17.8.0.

## Commands for local development

Run the project locally. This will build docker image with dynamodb offline, will start the DynamoDB GUI in the browser(<http://localhost:8882/>) and will execute database migrations and seeds:

```console
npm run dev
```

Run a migration:

```console
npm run db:migrate
```

Seed the database:

```console
npm run db:seed
```

## Standards

1. **Code style**:

   * Husky uses lint-staged and the defined eslintrc to check the code before commmit.
   * Husky hooks configuration is in .huskyrc.json and the lint-staged on is in .lintstagedrc.json
   * The eslint configuration that is used to check the code style is in .eslintrc.json

2. **Commitlint** is being used to reject bad commit messages. Convetion can be found here -> <https://www.conventionalcommits.org/en/v1.0.0/> and <https://nitayneeman.com/posts/understanding-semantic-commit-messages-using-git-and-angular/>, <https://kapeli.com/cheat_sheets/Conventional_Commits.docset/Contents/Resources/Documents/index/>

| Syntax          | Section                  | Description                                                                                               |
| --------------- | ------------------------ | --------------------------------------------------------------------------------------------------------- |
| ```feat:```     | Features                 | New feature for the user, not a new feature for build script                                              |
| ```fix:```      | Bug Fixes                | Bug fix for the user, not a fix to a build script                                                         |
| ```docs:```     | Documentation            | Changes to the documentation                                                                              |
| ```style:```    | Styles                   | Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)    |
| ```refactor:``` | Code Refactoring         | A code change that neither fixes a bug nor adds a feature, eg. renaming a variable                        |
| ```perf:```     | Performance Improvements | A code change that improves performance                                                                   |
| ```test:```     | Tests                    | Adding missing tests, refactoring tests; no production code change                                        |
| ```build:```    | Builds                   | Changes that affect the build system or external dependencies (example scopes: serverless.yml, db tables) |
| ```ci:```       | Continuous Integrations  | Changes to our CI configuration files and scripts (example scopes: GitHub Actions)                        |
| ```chore:```    | Chores                   | Other changes that don't modify src or test files                                                         |
| ```revert:```   | Reverts                  | Reverts a previous commit                                                                                 |
| ```deps:```     | Dependencies             | Updating dependencies                                                                                     |

**Commit Message Structure**:

```console
<type>[optional scope]: <description>

[optional body]

[optional footer]

A commit that has the text BREAKING CHANGE: at the beginning of its optional body or footer section introduces a breaking API change
```

**Specification**:

* The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in this document are to be interpreted as described in [RFC 2119](https://www.ietf.org/rfc/rfc2119.txt).

* Commits MUST be prefixed with a type, which consists of a noun, feat, fix, etc., followed by a colon and a space.
* The type feat MUST be used when a commit adds a new feature to your application or library.
* The type fix MUST be used when a commit represents a bug fix for your application.
* An optional scope MAY be provided after a type. A scope is a phrase describing a section of the codebase enclosed in parenthesis, e.g., fix(parser):
* A description MUST immediately follow the type/scope prefix. The description is a short description of the code changes, e.g., fix: array parsing issue when multiple spaces were contained in string.
* A longer commit body MAY be provided after the short description, providing additional contextual information about the code changes. The body MUST begin one blank line after the description.
* A footer MAY be provided one blank line after the body. The footer SHOULD contain additional issue references about the code changes (such as the issues it fixes, e.g., Fixes #13).
* Breaking changes MUST be indicated at the very beginning of the footer or body section of a commit. A breaking change MUST consist of the uppercase text BREAKING CHANGE, followed by a colon and a space.
* A description MUST be provided after the BREAKING CHANGE:, describing what has changed about the API, e.g., BREAKING CHANGE: environment variables now take precedence over config files.
* The footer MUST only contain BREAKING CHANGE, external links, issue references, and other meta-information.
* Types other than feat and fix MAY be used in your commit messages.

### Not added yet

* `npm audit` - checks packages for vulnurabilities
* `npm outdated` - checks outdated packages
* check and update packages in package.json:
* `npm i -g npm-check-updates`
* `ncu -u`
Note that husky needs to stay at 4.3.8 - `"husky": "4.3.8"`

### Common problems

1. serverless = "An error occurred: ApiGatewayResourceTimeslotTimeslotVar - Resource handler returned message: "A sibling ({id}) of this resource already has a variable path part"
Comment out the endpoints, do a full deployment. Uncomment the endpoints and do another one. This will delete the endpoints from the api gateway and recreate them. **Note that this happens very rarely.**
<https://github.com/serverless/serverless/issues/3785/>

### TODO

Add this to the husky config

```json
{
  "hooks": {
    "pre-commit": "lint-staged",
    "pre-push": "npm test --NODE_ENV=test",
    "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
  }
}

{
  "hooks": {
    "pre-commit": "npm pre-commit",
    "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
  }
}

{
  "hooks": {
    "pre-commit": "npm lint-staged",
    "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
  }
}
```

Git Flow - rebase
