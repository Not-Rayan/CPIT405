import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const location = useLocation()

  const navStyle = {
    backgroundColor: '#0caf40',
    padding: '20px 50px',
    
    display: 'flex',
    gap: '10px',
  }

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    padding: '6px 1px',
    borderRadius: '4px',
    fontSize: '14px',
  }

  const activeLinkStyle = {
    ...linkStyle,
    backgroundColor: 'rgba(255,255,255,0.2)',
  }

  return (
    <nav style={navStyle}>
      <Link
        to="/"
        style={location.pathname === '/' ? activeLinkStyle : linkStyle}
      >
        Home
      </Link>
      <Link
        to="/about"
        style={location.pathname === '/about' ? activeLinkStyle : linkStyle}
      >
        About us
      </Link>
    </nav>
  )
}

export default Navbar
