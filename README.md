# CragConnect - Rock Climbing Social Media

## Description

This is a social media app built for rock climbers to organise and talk about rock climbing.

## Features

- Posts
- News feed
- Event sharing
- Fitness plans (strength and flexibility)
- Fitness tracking and leaderboards
- User profiles and organisation profiles

## Features that _will_ be added

- User authentication
- Climbing Parnter Matching

## Features that _might_ be added

- Messaging
- Notifications
- Tailorable fitness plans

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
