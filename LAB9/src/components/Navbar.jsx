import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const location = useLocation()

  const navStyle = {
    backgroundColor: '#1a1a2e',
    padding: '12px 30px',
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
  }

  const linkStyle = {
    color: '#ccc',
    textDecoration: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    fontSize: '14px',
    transition: 'background 0.2s',
  }

  const activeLinkStyle = {
    ...linkStyle,
    color: '#fff',
    backgroundColor: 'rgba(255,255,255,0.15)',
  }

  return (
    <nav style={navStyle}>
      <Link to="/" style={location.pathname === '/' ? activeLinkStyle : linkStyle}>
        Home
      </Link>
      <Link to="/about" style={location.pathname === '/about' ? activeLinkStyle : linkStyle}>
        About
      </Link>
    </nav>
  )
}

export default Navbar
