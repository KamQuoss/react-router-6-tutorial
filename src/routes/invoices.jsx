import {
  useLocation,
  NavLink,
  Outlet,
  useSearchParams,
} from 'react-router-dom';
import { getInvoices } from '../data';

function QueryNavLink({ to, ...props }) {
  let location = useLocation();
  return <NavLink to={to + location.search} {...props} />;
}

export default function Invoices() {
  let invoices = getInvoices();
  let [searchParams, setSearchParams] = useSearchParams();
  // działa jak stan, więc używaj jak hook stanu!
  // czyli w komponentach kontrolowanych value jest odpowiedzinikem serach params
  // nastawia parametry w urlu po znaku zapytania np: /invoices/1995?filter=santa

  return (
    <div style={{ display: 'flex' }}>
      <nav
        style={{
          borderRight: 'solid 1px blue',
          padding: '1rem',
        }}
      >
        {/* {invoices.map((invoice) => (
          //<a href="/invoices/1995" style="display: block; margin: 1rem 0px;">Santa Monica</a>
          // this links to not existing page
          <Link
            to={`/invoices/${invoice.number}`} // this is where link goes to
            style={{ display: 'block', margin: '1rem 0' }} // stylink for a element
            key={invoice.number} // key for react reason
          >
            {invoice.name}
          </Link>
        ))} */}
        <input
          value={searchParams.get('filter') || ''}
          onChange={(event) => {
            let filter = event.target.value;
            // if (filter) {
            //   setSearchParams({ filter });
            // } else {
            //   setSearchParams({});
            // }

            // if we wont to persist info aboute search params, we must replace them
            if (filter) {
              setSearchParams({ filter }, { replace: true });
            } else {
              setSearchParams({}, { replace: true });
            }
          }}
        />

        {invoices
          // dołożyliśmy filtr, żeby pokazywał wartości pobrane z inputa -> wstawione do search params
          .filter((invoice) => {
            let filter = searchParams.get('filter');
            if (!filter) return true;
            let name = invoice.name.toLowerCase();
            return name.startsWith(filter.toLowerCase());
          })
          // .map((invoice) => (
          //   <NavLink
          //     style={({ isActive }) => {
          //       return {
          //         display: 'block',
          //         margin: '1rem 0',
          //         color: isActive ? 'red' : '',
          //       };
          //     }}
          //     to={`/invoices/${invoice.number}`}
          //     key={invoice.number}
          //   >
          //     {invoice.name}
          //   </NavLink>
          // ))}

          // lets replace NavLink with custom QuerryNavLink
          .map((invoice) => (
            <QueryNavLink
              key={invoice.number}
              style={({ isActive }) => {
                return {
                  display: 'block',
                  margin: '1rem 0',
                  color: isActive ? 'red' : '',
                };
              }}
              to={`/invoices/${invoice.number}`}
            >
              {invoice.name}
            </QueryNavLink>
          ))}
      </nav>
      <Outlet />
    </div>
  );
}
