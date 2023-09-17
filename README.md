# eCommerce-Application

Hello and welcome to the project, which is, in a sense, our graduation work.
All materials that you can find here are used for non-commercial purposes. If you are the copyright holder of something that is here, and against our use of it, please contact us and we will immediately remove / replace the specified material. Thank you!

## Quick start.

1. Clone the repository with the command

   `git clone https://github.com/fedorenksei/eCommerce-Application`

2. Change branch to development

   `git checkout develop`

3. Go to the directory with the project

   `cd ecommerce-application`

4. Download the required dependencies with the

   `npm i`

5. Run the project with the command

   `npm run start`

## Technologies stack

- React, react-hook-form, react-icons
- Redux,
- Storybook,
- Jest,
- React testing library,
- TailwindCSS, clsx,
- Eslint,
- Prettier,
- Husky with lint-staged.

## Scripts

The project uses the following scripts:

- "start" - to start the project
- "build" - to build the bundle
- "lint" - to check for ESLint errors
- "lint-fix" - to autofix files with ESLint
- "preview" - to deploy a static site
- "storybook" - to run storybook
- “build-storybook” – to build the storybook bud
- "test" - to run jest tests
- “coverage” – to run jest tests with coverage analysis
- "format" - to format all project files located in the src folder
- "prepare" - To automatically have Git hooks enabled after install.

## Rules and conventions

### ESLint rules

- 'eslint:recommended', - basic rules for JS
- 'plugin:@typescript-eslint/recommended', - extension of base rules for TS
- 'plugin:react/recommended', - basic React rules
- 'plugin:jsx-a11y/recommended', - basic rules for JSX part of React syntax
- 'plugin:react/jsx-runtime', - Plugin to correctly validate JSX syntax in recent versions of React
- 'plugin:react-hooks/recommended', - basic rules for using React hooks
- 'plugin:storybook/recommended', - basic rules for writing stories
- 'prettier' - rules for avoiding conflicts between Prettier and ESLint.

### Task management

For task management, we use [Trello](https://trello.com/b/HoYECeHA/ecommerce)

### Git flow

Development is carried out in the develop branch, which is created from the main branch. The main branch remains empty, merging any pull requests, as well as direct work in it is strictly prohibited.
When developing additional functionality, you need to create a new branch from the develop branch.

The branch name must follow the following format:

_project_abbreviation-trello_card_number-feature_name_

Name example:

**EC-1.1-environment-configuration**

Further development is carried out in the created branch. During development, the following commit format is defined:

_commit_type[trello_checkpoint_number]: a brief description of what was done._

Commit example:

**feat[5.1]: add storybook to project**

### Tests convention

The project defines a requirement for writing a test. The file with the test must be located in the folder with the rest of the component files and have the name **component-name.test.tsx.**

### Stories convention

The project defines a requirement for writing stories for components. The stories file should be located in the folder with the rest of the component files and named **component-name.stories.ts.**
