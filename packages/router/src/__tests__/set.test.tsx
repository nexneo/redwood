import React from 'react'

import { render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { Route, Router } from '../router'
import { Set } from '../Set'

// SETUP
const ChildA = () => <h1>ChildA</h1>
const ChildB = () => <h1>ChildB</h1>
const ChildC = () => <h1>ChildC</h1>
const GlobalLayout: React.FC = ({ children }) => (
  <div>
    <h1>Global Layout</h1>
    {children}
    <footer>This is a footer</footer>
  </div>
)
const CustomWrapper: React.FC = ({ children }) => (
  <div>
    <h1>Custom Wrapper</h1>
    {children}
    <p>Custom Wrapper End</p>
  </div>
)
const BLayout = ({ children }) => (
  <div>
    <h1>Layout for B</h1>
    {children}
  </div>
)

test('wraps components in other components', async () => {
  const TestSet = () => (
    <Router useAuth={window.__REDWOOD__USE_AUTH}>
      <Set wrap={[CustomWrapper, GlobalLayout]}>
        <Route path="/" page={ChildA} name="childa" />
        <Set wrap={BLayout}>
          <Route path="/" page={ChildB} name="childb" />
        </Set>
      </Set>
      <ChildC />
    </Router>
  )

  const screen = render(<TestSet />)

  await waitFor(() => screen.getByText('ChildB'))

  expect(screen.container).toMatchInlineSnapshot(`
    <div>
      <div>
        <h1>
          Custom Wrapper
        </h1>
        <div>
          <h1>
            Global Layout
          </h1>
          <h1>
            ChildA
          </h1>
          <div
            aria-atomic="true"
            aria-live="assertive"
            id="redwood-announcer"
            role="alert"
            style="position: absolute; top: 0px; width: 1px; height: 1px; padding: 0px; overflow: hidden; clip: rect(0px, 0px, 0px, 0px); white-space: nowrap; border: 0px;"
          />
          <div>
            <h1>
              Layout for B
            </h1>
            <h1>
              ChildB
            </h1>
            <div
              aria-atomic="true"
              aria-live="assertive"
              id="redwood-announcer"
              role="alert"
              style="position: absolute; top: 0px; width: 1px; height: 1px; padding: 0px; overflow: hidden; clip: rect(0px, 0px, 0px, 0px); white-space: nowrap; border: 0px;"
            />
          </div>
          <footer>
            This is a footer
          </footer>
        </div>
        <p>
          Custom Wrapper End
        </p>
      </div>
      <h1>
        ChildC
      </h1>
    </div>
  `)
})
