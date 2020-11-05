# E-Shop E-commerce app

## Demo Website

- 👉 Heroku :https://eshopreact.herokuapp.com/

![1](https://user-images.githubusercontent.com/51638952/98250307-f2d0a600-1f7f-11eb-818f-87c090ab460d.png)

![2](https://user-images.githubusercontent.com/51638952/98250321-f6642d00-1f7f-11eb-92c6-dd6aa840a297.png)

![3](https://user-images.githubusercontent.com/51638952/98250349-fd8b3b00-1f7f-11eb-994b-ee8618be907d.png)



## Features:
- Responsive Web design
- Product search
- Products filters
- Product pagination and pagination with scroll
- Product reviews and ratings
- Full featured shopping cart
- Payment with Paypal 
- User profile with wishlist and orders
- Admin mangemnet for Products and Orders and User details

## Usage

### ES Modules in Node

Be sure to have Node v14.6+, as i used EcmaScript modules in backend.
Or you can install babel and configure it by : 
  ```
  npm i @babel/cli @babel/core @babel/node @babel/preset-env --save-dev
```
-- Create .babelrc  config file in root directory and add :
  ```
 {
    "presets" : [
        [
            "@babel/preset/env"
        ]
    ]
  }
```
and edit package.json in script
  ```
 "start" :  babel-node server/server.js"
```

### Env Variables

Create a .env file in then root directory 

```
NODE_ENV = development
PORT = 5000
DATABASE = add mongodb uri
JWT_SECRET = anything
PAYPAL_CLIENT_ID = add paypal client id
```

### Install Dependencies (frontend & backend)

```
npm install
cd client
npm install



