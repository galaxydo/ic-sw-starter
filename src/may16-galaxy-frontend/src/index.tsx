import { h } from 'preact'
import { render } from 'preact-render-to-string'

// import { get, post, compile, routes } from '@jreusch/router-node'

import { pathToRegexp, match, parse, compile } from "path-to-regexp";


import { Index, Count } from './pages/Index'

// .agent

import { Actor, HttpAgent } from "@dfinity/agent";

const urlParams = new URLSearchParams(location.search);
console.log(urlParams)
const { CANISTER_ID_MAY16_GALAXY_BACKEND, DFX_NETWORK } = Object.fromEntries(urlParams);

// export const canisterId =
//   'bw4dl-smaaa-aaaaa-qaacq-cai';

import { idlFactory } from "declarations/may16-galaxy-backend/may16-galaxy-backend.did.js";

const agent = new HttpAgent({
  // host: 'http://127.0.0.1:4943/',
  verifyQuerySignatures: false
});

if (DFX_NETWORK !== "ic") {
  agent.fetchRootKey().catch((err) => {
    console.warn(
      "Unable to fetch root key. Check to ensure that your local replica is running"
    );
    console.error(err);
  });
}

const backend = Actor.createActor(idlFactory, {
  agent,
  canisterId: CANISTER_ID_MAY16_GALAXY_BACKEND,
});

console.log(backend)

// .worker


/// <reference lib="webworker" />
export type { }

declare const self: ServiceWorkerGlobalScope

self.addEventListener('error', console.error)

// these 2 event listeners make sure the browser replaces the server worker
// as soon as possible if it detects an update.
self.addEventListener('install', event => {
  event.waitUntil(self.skipWaiting())
})

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim())
})


// state - we use a local variable here, which roughly translates to a session variable.
// IndexedDB is also available in service workers if you need to persist stuff.
let count = 0

// const greetHandler = async (params, req) => {
//   console.log('third', params)
//   await new Promise(resolve => setTimeout(resolve, 1000))
//   console.log('fourth', req)
//   const result: string = await backend!.greet('May17')
//   return <h1>{result}</h1>
// }

// const greet = post('/greet', greetHandler)

// router. see @jreusch/router-node
// const router = compile(
//   // how to get the method/pathname
//   (req: Request) => req.method,
//   (req: Request) => new URL(req.url).pathname,

//   // actual routes. we return JSX fragments here.
//   get('/', (params, req) => <Index count={count} />),
//   post('/increment', (params, req) => <Count count={++count} />),
//   post('/decrement', (params, req) => <Count count={--count} />),
// )

// const asyncRouter = routes(greet)

function renderResponse(vdom) {
  const html = '<!DOCTYPE html>\n' + render(vdom)
  const response = new Response(html, {
    headers: {
      'Content-Type': 'text/html'
    }
  })
  return response
}

//.routes

const IndexRoute = () => <Index count={count} />

const GreetRoute = async (request) => {
  if (request.method !== 'POST') {
    return 'wrong method'
  }

  const formData = await request.formData();
  const body = {};
  for (const entry of formData.entries()) {
    body[entry[0]] = entry[1];
  }

  const name = body['name'];

  const result = await backend?.greet(name);
  return `${result}`
}

const routes = {
  "/": IndexRoute,
  "/greet": GreetRoute,
};

self.addEventListener('fetch', async event => {
  const url = new URL(event.request.url);

  if (url.hostname !== location.hostname) {
    return;
  }

  const route = Object.keys(routes).find(route => match(route, { decode: decodeURIComponent })(url.pathname));

  if (route) {
    const handler = async (r) => routes[route](r);
    event.respondWith(handler(event.request).then(renderResponse));
  }

  return false;
});

//.end
