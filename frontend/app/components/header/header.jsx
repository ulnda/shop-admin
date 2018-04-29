import { Navbar, Nav, NavItem} from 'react-bootstrap';

export default class Header extends Component {
  render() {
    return <Navbar inverse>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="/home">Shop Admin</a>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <NavItem href="/vacancies">
          Vacancies
        </NavItem>
        <NavItem href="/goods">
          Goods
        </NavItem>
        <NavItem href="/news">
          News
        </NavItem>
      </Nav>
      <Nav pullRight>
        <NavItem href="/login">
          Login
        </NavItem>
        <NavItem href="/profile">
          Profile
        </NavItem>
        <NavItem href="/logout">
          Logout
        </NavItem>
      </Nav>
    </Navbar>;
  }
}
