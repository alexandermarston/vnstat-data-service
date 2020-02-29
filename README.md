
# vnStat Data Service

A NodeJS service that exposes data from vnStat through a JSON Web API

## Getting started
Install all dependencies using the NPM package manager:

```bash
$ npm install
```

With the dependencies installed, you can run the service

```bash
$ npm run start
```

# REST API

The REST API is described below.

## Get a list of interfaces

### Request

`GET /interfaces`

    curl -i -H 'Accept: application/json' http://localhost:3000/interfaces

### Response

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 488
    Date: Sat, 29 Feb 2020 19:41:59 GMT
    Connection: keep-alive

    [{
        "id": "eth0",
        "nick": "",
        "created": {
            "date": {
                "year": 2020,
                "month": 2,
                "day": 29
            }
        },
        "updated": {
            "date": {
                "year": 2020,
                "month": 2,
                "day": 29
            },
            "time": {
                "hour": 20,
                "minute": 40
            }
        }
    }]

## Get statistics

### Request

`GET /interfaces`

    curl -i -H 'Accept: application/json' http://localhost:3000/statistics/eth0/hour

### Response

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 488
    Date: Sat, 29 Feb 2020 19:44:16 GMT
    Connection: keep-alive

    [{
        "id": 2,
        "date": {
            "year": 2020,
            "month": 2,
            "day": 29
        },
        "time": {
            "hour": 19,
            "minute": 0
        },
        "rx": 20384176,
        "tx": 3530639
        },
    {
        "id": 5,
        "date": {
            "year": 2020,
            "month": 2,
            "day": 29
        },
        "time": {
            "hour": 20,
            "minute": 0
        },
        "rx": 1965874,
        "tx": 2045613
    }]
