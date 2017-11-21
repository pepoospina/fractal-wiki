># Fractal-wiki

[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](http://www.gnu.org/licenses/gpl-3.0)
[![Gitter](https://badges.gitter.im/metacurrency/holochain.svg)](https://gitter.im/metacurrency/holochain?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge)

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

### UI Development

Fractal wiki UI is built with Vue.  To work on the UI in dev mode you can go into the `app` directory and run:

``` bash
npm install
npm run dev
```

This is configured to proxy the http requests over to the running localhost:4141 holochain instance.

To build the UI so it can be served directly by the holochain instance: `cd` to the `app` directory, run
``` bash
npm run build
```

this will move the output files to the `ui` directory.

### Tests
To run all the stand alone tests:

``` shell
hcdev test
```

## Contribute
We welcome pull requests and issue tickets.  Find us on [gitter](https://gitter.im/metacurrency/holochain) to chat.

Contributors to this project are expected to follow our [development protocols & practices](https://github.com/metacurrency/holochain/wiki/Development-Protocols).


## License
[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](http://www.gnu.org/licenses/gpl-3.0)

Copyright (C) 2017, The MetaCurrency Project (Eric Harris-Braun, Arthur Brock, et. al.)

This program is free software: you can redistribute it and/or modify it under the terms of the license provided in the LICENSE file (GPLv3).  This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

**Note:** We are considering other 'looser' licensing options (like MIT license) but at this stage are using GPL while we're getting the matter sorted out.
