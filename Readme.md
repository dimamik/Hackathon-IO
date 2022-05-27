The app is deployed to https://vaporwiet.netlify.app/

# To run the server locally:

## Need to have:

- yarn & node installed

```shell
yarn
yarn watch
```

In different terminals:

```shell
yarn dev
```

# To run the frontend

## Need to have:

- yarn & node (version>=12.2.0)

```shell
yarn dev
```

# Deployment

## server

```
git subtree push --prefix server heroku master
```

## client

Run `yarn build` locally, then manually upload dir to netlify.
