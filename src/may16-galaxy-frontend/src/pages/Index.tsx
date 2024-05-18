import { h } from 'preact'
import Page from './Page'

import logo from '../logo2.svg';

export function Index(props: { count: number }) {
    return <Page title="Galaxy Index">
      <main>
        <img src={logo} alt="xxx Logo" />
        <br />
        <br />
        <form hx-post="/greet" hx-target="#greeting">
          <label for="name">Enter your name: &nbsp;</label>
          <input name="name" id="name" alt="Name" type="text" />
          <button type="submit">Submit</button>
        </form>
        <section id="greeting">this.greeting</section>
      </main>
    </Page>
}

// a separate template for the Count piece that we can render separately and swap in using htmx
export function Count(props: { count: number }) {
    return <span id="count">
        Clicked {props.count} times
    </span>
}
