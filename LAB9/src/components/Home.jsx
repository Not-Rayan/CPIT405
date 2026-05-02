import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// ضع هنا الـ API Key الخاص بك من spoonacular.com
const API_KEY = '8dc27d1d54ec41f1955ec27a6201bf0d'

function Home() {
  const [query, setQuery] = useState('pasta')
  const [inputValue, setInputValue] = useState('pasta')
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!query) return

    const fetchRecipes = async () => {
      setLoading(true)
      setError(null)
      try {
        const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${query}&number=12`
        const response = await fetch(url)
        if (!response.ok) throw new Error('فشل في جلب الوصفات')
        const data = await response.json()
        setRecipes(data.results || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchRecipes()
  }, [query])

  const handleSearch = (e) => {
    e.preventDefault()
    setQuery(inputValue)
  }

  const styles = {
    container: {
      maxWidth: '1100px',
      margin: '0 auto',
      padding: '30px 20px',
      flex: 1,
    },
    searchBar: {
      display: 'flex',
      gap: '0',
      marginBottom: '30px',
    },
    input: {
      flex: 1,
      padding: '10px 15px',
      fontSize: '15px',
      border: '1px solid #ccc',
      borderRadius: '4px 0 0 4px',
      outline: 'none',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#2c7be5',
      color: '#fff',
      border: 'none',
      borderRadius: '0 4px 4px 0',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: 'bold',
      letterSpacing: '0.5px',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
      gap: '20px',
    },
    card: {
      textAlign: 'center',
    },
    cardImg: {
      width: '100%',
      height: '130px',
      objectFit: 'cover',
      borderRadius: '6px',
      display: 'block',
    },
    cardLink: {
      display: 'block',
      marginTop: '8px',
      color: '#2c7be5',
      textDecoration: 'none',
      fontSize: '14px',
      fontWeight: '500',
    },
    message: {
      textAlign: 'center',
      padding: '40px',
      color: '#666',
      fontSize: '16px',
    },
    error: {
      textAlign: 'center',
      padding: '30px',
      color: '#e74c3c',
      fontSize: '15px',
    },
  }

  return (
    <div style={styles.container}>
      <form onSubmit={handleSearch} style={styles.searchBar}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search for a recipe..."
          style={styles.input}
        />
        <button type="submit" style={styles.button}>SEARCH</button>
      </form>

      {loading && <p style={styles.message}>Loading recipes...</p>}
      {error && <p style={styles.error}>⚠️ {error}</p>}

      {!loading && !error && recipes.length === 0 && (
        <p style={styles.message}>No recipes found. Try another search!</p>
      )}

      {!loading && !error && (
        <div style={styles.grid}>
          {recipes.map((recipe) => (
            <div key={recipe.id} style={styles.card}>
              <img src={recipe.image} alt={recipe.title} style={styles.cardImg} />
              <Link to={`/recipe/${recipe.id}`} style={styles.cardLink}>
                {recipe.title}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Home
