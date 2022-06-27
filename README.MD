# Where's My Money

##### Track your spending history

### Introduction

- Using React, Node.js, Express & MongoDB to build a full-stack MERN Application.
- The app is called "Where's My Money", a simple app for record and search for your spending history.

Project in action - [Where's My Money](https://wmm-276.herokuapp.com/landing)

#### Features

- Create expense with timestamp on spending, user-defined category.
- Expenses pagination
- Search expenses history
- Reports based on timeline and categories.
- User profile page with customize profile picture.

  ![Dashboard image](https://res.cloudinary.com/dbvndh29t/image/upload/v1656322606/where%27s-my-money/dashboard_oo98go.png)

#### Run the app locally

```sh
npm run install-dependencies
```

- rename file .env.temp to .env
- set up values for MONGO_URI, JWT_SECRET, JWT_LIFETIME,
- set up values for CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET for connecting to Cloudinary service

```sh
npm start
```

- visit url http://localhost:3000/

#### Screenshot of the project

- Create new expenses with user-defined category.
  ![Add expense page image](https://res.cloudinary.com/dbvndh29t/image/upload/v1656322606/where%27s-my-money/create-new-expense_ejmuqd.png)
- Reports based on your history of spending.
  ![Report page image](https://res.cloudinary.com/dbvndh29t/image/upload/v1656323328/where%27s-my-money/report_mqthtm.png)

- Search for expenses in the past
  ![Search page image](https://res.cloudinary.com/dbvndh29t/image/upload/v1656322606/where%27s-my-money/search-expense_idipba.png)
