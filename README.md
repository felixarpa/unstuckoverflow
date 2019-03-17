<br>
<p align="center">
  <img alt="UnstuckOverflow" src="./client/public/unstuckoverflow-logo-without.png" width="50%"/>
</p>
<br>

[![HitCount](http://hits.dwyl.io/felixarpa/unstuckoverflow.svg)](http://hits.dwyl.io/felixarpa/unstuckoverflow)
[![GitHub stars](https://img.shields.io/github/stars/felixarpa/unstuckoverflow.svg)](https://GitHub.com/felixarpa/unstuckoverflow/stargazers/)
[![GitHub forks](https://img.shields.io/github/forks/felixarpa/unstuckoverflow.svg)](https://GitHub.com/felixarpa/unstuckoverflow/network/)
[![GitHub repo size in bytes](https://img.shields.io/github/repo-size/felixarpa/unstuckoverflow.svg)](https://github.com/felixarpa/unstuckoverflow)
[![GitHub contributors](https://img.shields.io/github/contributors/felixarpa/unstuckoverflow.svg)](https://GitHub.com/felixarpa/unstuckoverflow/graphs/contributors/)
[![GitHub license](https://img.shields.io/github/license/felixarpa/unstuckoverflow.svg)](https://github.com/felixarpa/unstuckoverflow/blob/master/LICENSE)

🤷‍♀️ Asking is faster than StackOverflow

## Inspiration
At some point, maybe years ago or maybe in a few years, we start working in a new company. Whenever that happens, it's very common to have doubts and some issues with our work, but our pride or our lack of knowledge on who to ask, make us spend hours in front of Google and StackOverflow looking for an answer.

## What it does
Our Chrome extension allows you to stay in contact with someone on your company who can help you whenever you are facing some *index out of bounds* errors 😉. 

It's easy, you register into our platform with your company email, a phone number and a list of tech skills. Whenever our extension detects you are spending too much time on StackOverflow, it will extract the purpose of your query and look for the most suitable member of your company who can help you out. 

Once the app finds a match, you'll get notified with you co-worker information and he will get a message with the topics of your query and your information.

## How we built it

Frontend and backend are very different components connected by API requests.

At frontend, there's a Chrome extension made with [React](https://reactjs.org/)

In the backend, we have a [Python 3.6+](https://www.python.org/downloads/release/python-372/) application which runs with [Flask](http://flask.pocoo.org/) and uses
[OpenAPI](https://swagger.io/docs/specification/about/) and 
[Connexion](https://connexion.readthedocs.io/en/latest/) library)
to generate a bunch of endpoints and connect the frontend with the backend.

In order to communicate with the users, we've used [Nexmo]'s API, which allow us to work with SMS technology 

All this system is finally deployed in a [Google Cloud VM](https://cloud.google.com/compute/docs/instances/) and
hosted in a free [.ga domain](http://www.my.ga/en/index.html?lang=en). Also, we have a [PostgreSQL](https://www.postgresql.org/) database container on Google Cloud.

## Challenges we ran into

As usually happens in a hackathon, it was our first time with some of the technologies we used.  We had never worked with Chrome extensions before and we didn't know how they worked and how where they made. 

We also had some troubles to get a domain from domain.com, so we ended up getting a free .ga domain.

However, one of the most challenging parts was deploying the web and creating a PostgreSQL database in Google Cloud Platform, as none of us have much experience with it.

## Accomplishments that we're proud of

We are proud of the project that we built. We have created a project that we think can help people and companies to work better.
Also, we've learned new technologies, which is always a nice thing.

## What we learned

We have learned a lot on how to create a Chrome extension, as none of us had no idea how this technology worked. We've also learned about Nexmo's API.

## What's next for UnstackOverflow

There are a lot of enhancements and next steps for UnstuckOverflow. One of them, for example, could be interesting to add the location of workers and find a match based on knowledge, but also proximity to the user.

## Requirements

1. docker-compose

## Usage

To run the whole stack, please execute the following from the root directory:

1. Run the server as a docker container with docker-compose

    ```bash
    docker-compose up -d --build
    ```

## Authors

- [Fèlix Arribas](https://github.com/felixarpa)
- [Víctor Pérez](https://github.com/victorpm5)
- [Albert Suàrez](https://github.com/AlbertSuarez)

## License

MIT © UnstuckOverflow
