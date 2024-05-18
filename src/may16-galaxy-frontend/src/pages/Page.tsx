import { h, Fragment, type ComponentChildren } from 'preact'

import stylesheet from '@/main.css?url'

export default function Page(props: {
    title: string
    children: ComponentChildren
}) {
   return <>
    <head lang="en">
        <meta charSet="UTF-8" />
        <title>{props.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href={stylesheet} rel="stylesheet" />
        <script src="/htmx.min.js"></script>
        <script type="module" src="/may16.js"></script>
    </head>
    <body>
        {props.children}
    </body>
    </>
}
