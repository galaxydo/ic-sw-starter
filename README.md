# ic-sw-starter

## Overview

This template shows an alternative way to build blockchain apps on Internet Computer, featuring separation of concerns, state representation, templating engine, and thread separation for calls and queries.

### Separation of Concerns

All business logic of the application should be on the backend. This is fulfilled here by the service worker, which acts as an intermediary between the frontend and the actual smart contract. This service worker implements the missing layer which is usually done by a real backend. It performs real routing and server-side-rendering but inside of the browser service worker, which is actually hosted on the chain.

### State Representation

The Hypertext Markup itself represents the state of the application. This means that the structure and layout of the application are defined and controlled by the HTML code.

### Templating Engine

The Preact templating engine is used in this guide. Preact is a fast, lightweight JavaScript library that is similar to React. It provides a simple and efficient way to create interactive UIs.

### Thread Separation

Separate threads are used for calls and queries. This ensures that the application can handle multiple requests simultaneously without blocking or slowing down the user interface.


## Structure

1. **Index.html**: This is the entry point of the application. It contains a root div where the app will be rendered and a script tag that points to the main JavaScript file.

2. **Main.js**: This script registers a service worker. Service workers are scripts that your browser runs in the background, separate from a web page, opening the door to features that don't need a web page or user interaction. In this case, the service worker is used to handle routing and server-side rendering.

3. **Service Worker**: The service worker implements routing and server-side rendering within the client-side. It isolates all the business logic interacting with the backend and wraps its responses in HTML hypertext markup. This is important because it's impossible to do on the side of the actual IC backend, hence the need for this service worker proxy.

4. **Routes**: The service worker defines routes for the application. Each route is associated with a handler function that returns a JSX fragment. The JSX fragments are then rendered to HTML strings and returned as responses to fetch events.

5. **HTMX**: HTMX allows you to access AJAX, CSS Transitions, WebSockets and Server Sent Events directly in HTML, using attributes, so you can build modern user interfaces with the simplicity and power of hypertext. In this case, it's used in the Index page to handle form submission and update a section of the page with the server's response.

6. **Preact**: Preact is a fast, lightweight JavaScript library that is similar to React. It's used here to define the components of the application and render them to HTML strings.

By following this structure, you can build efficient, scalable, and robust blockchain apps.
