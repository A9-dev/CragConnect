# CragConnect - Rock Climbing Social Media

This is a social media app built for rock climbers to organise and talk about rock climbing.

## Features

- Posts
- News feed
- Event sharing
- Fitness plans (strength and flexibility)
- Fitness tracking and leaderboards
- User profiles and organisation profiles

## Features that _will_ be added

- More tests

## Features that _might_ be added

- Messaging/Links to a way to contact other users in profile
- Notifications
- Tailorable fitness plans
- User authentication

## Installation

To install the required dependencies, please run the following command (from the root directory):

```bash
cd client && npm i && cd .. && cd server && npm i && cd ..
```

## Configuration

To configure the environment variables, please create a `.env` file in the `server` directory and add the following variables:

```env
PORT=your_port
ATLAS_URI=your_mongodb_uri
```

To configure the environment variables for the client, please create a `.env` file in the `client` directory and add the following variables:

```env
VITE_SERVER_URL=http://localhost:same_port_as_server
```

## Build the client

To build the client, please run the following command (from the root directory):

```bash
cd client && npm run build && cd ..
```

## Run

To run the program please run either of the following commands (from the root directory):

1. Requires built client:

```bash
cd server && npm start
```

2. Doesn't require built client (in separate terminals from the root directory):

```bash
cd client && npm run dev

```

```bash
cd server && npm start
```

Then, go to http://localhost:5000

## Lines of code

```bash
cloc --exclude-dir=node_modules,build --not-match-f='(package\.json|package-lock\.json)' .
```

### Output:

```
-------------------------------------------------------------------------------
Language                     files          blank        comment           code
-------------------------------------------------------------------------------
JSX                             29            219             60           2808
JavaScript                       4            138            156           1285
JSON                             5              2              0            306
Markdown                         2             39              0             92
YAML                             1              7              0             23
HTML                             1              0              0             13
TypeScript                       2              2              4             10
-------------------------------------------------------------------------------
SUM:                            44            407            220           4537
-------------------------------------------------------------------------------
```
