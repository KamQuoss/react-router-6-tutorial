import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Expenses from './routes/expenses';
import Invoices from './routes/invoices';
import Invoice from './routes/invoice';
import './main.css';

let rootElement = document.getElementById('app');
ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="expenses" element={<Expenses />} />
        <Route path="invoices" element={<Invoices />}>
          {/* clicking invice from path=":invoiceId" gives a blank spot where was Invice element */}
          <Route
          // Notice it has the index prop instead of a path. That's because the index route shares the path of the parent. That's the whole point--it doesn't have a path.
            index 
            element={
              <main style={{ padding: '1rem' }}>
                <p>Select an invoice</p>
              </main>
            }
          />
          {/* The <Route> adds a second layer of route nesting when it matches: <App><Invoices><Invoice /></Invoices></App>.
        Because the <Route> is nested the UI will be nested too.*/}
          <Route path=":invoiceId" element={<Invoice />} />
        </Route>
      </Route>
      {/* if something does not math any Route (Route is not defined above) show element 
      The "*" has special meaning here. It will match only when no other routes do.
      */}
      <Route
        path="*"
        element={
          <main style={{ padding: '1rem' }}>
            <p>There's nothing here!</p>
          </main>
        }
      />
    </Routes>
  </BrowserRouter>,
  rootElement
);

/*
NOTES

1. When routes have children it does two things:
It nests the URLs ("/" + "expenses" and "/" + "invoices")
It will nest the UI components for shared layout when the child route matches:
inside parent element must be shown where nested routes element must be showed by adding <Outlet />

2. What is an index route?
Index routes render in the parent routes outlet at the parent route's path.
Index routes match when a parent route matches but none of the other children match.
Index routes are the default child route for a parent route.
Index routes render when the user hasn't clicked one of the items in a navigation list yet.

*/
