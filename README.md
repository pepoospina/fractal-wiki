# Clutter

[![Code Status](https://img.shields.io/badge/Prototype-orange.svg)](https://github.com/Holochain/clutter#feature-roadmap-and-current-progress)

**Nestable card based wiki built on holochain**
Prototype of a wiki using a card-based model where cards can be nested in card.

## Installation

Prerequiste: [Install holochain](https://github.com/metacurrency/holochain/#installation) on your machine.
You can install fratal-wiki very simply with this:

``` shell
hcdev init -cloneExample=fractal-wiki

```

## Usage

To do a test run of fractal-wiki simply type

``` shell
cd fractal-wiki
hcdev web
```
you should see something like:

``` shell
Copying chain to: /home/bootstrap/.holochaindev
...
Serving holochain with DNA hash:QmZYxoxcqgCp6Xf6xVe8ptzPkmH8QMzxqp4r49QYpS2fEF on port:4141
```
Then simply point your browser to http://localhost:4141 access the UI.

### Development

Fractal wiki UI is built with Vue.  To work on the UI in dev mode you can go into the `app` directory and run:

``` bash
npm install
npm run dev

```
This is configured to proxy the http requests over to the running localhost:4141 holochain instance.


### Tests
To run all the stand alone tests:

``` shell
hcdev test
```

## Contribute
We welcome pull requests and issue tickets.  Find us on [gitter](https://gitter.im/metacurrency/holochain) to chat.

Contributors to this project are expected to follow our [development protocols & practices](https://github.com/metacurrency/holochain/wiki/Development-Protocols).
