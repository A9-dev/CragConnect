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

- Messaging/Links to a way to contact other users
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
IP_ADDR=your_ip_address (for the server)
```

## Run

To run the program please run the following command (from the root directory):

```bash
cd client && npm run dev & cd ../server && npm start
```

## Lines of code

```bash
cloc --exclude-dir=node_modules,build --not-match-f='(package\.json|package-lock\.json)' .
```

### Output:

```
-------------------------------------------------------------------------------
Language                     files          blank        comment           code
-------------------------------------------------------------------------------
JSX                             29            218             56           2770
JavaScript                       5            185            205           1594
JSON                             5              2              0            306
Markdown                         2             24              0             54
HTML                             2              0              0             26
YAML                             1              7              0             23
TypeScript                       2              2              4             10
-------------------------------------------------------------------------------
SUM:                            46            438            265           4783
-------------------------------------------------------------------------------
```
