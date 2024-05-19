# ic-sw-starter

## Overview

This template shows an alternative way to build blockchain apps on Internet Computer, moving business logic layer on the edge with Service Worker running in browser, fulfilling the role of backend which intercepts frontend POST requests and executes Calls and Queries to IC Canisters, responds with "Server-Side-Rendered" React templates, it supports HTMX.

## Structure

1. **Index.html**: Its served only once when user opens an app first time.

2. **Main.js**: It registers a service worker which handles all the further requests, and reloads the page.

3. **Index.tsx**: When page is reloaded with Service Worker registered, it handles the rendering of / index page and intercepts following POST requests matching regexp router patterns.
