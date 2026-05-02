import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

// ضع هنا الـ API Key الخاص بك من spoonacular.com
const API_KEY = '8dc27d1d54ec41f1955ec27a6201bf0d'

function RecipeDetail() {
  const { id } = useParams()
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchRecipeDetail = async () => {
      setLoading(true)
      setError(null)
      try {
        const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
        const response = await fetch(url)
        if (!response.ok) throw new Error('فشل في جلب تفاصيل الوصفة')
        const data = await response.json()
        setRecipe(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchRecipeDetail()
  }, [id])

  // إزالة HTML tags من النص
  const stripHtml = (html) => {
    const tmp = document.createElement('div')
    tmp.innerHTML = html
    return tmp.textContent || tmp.innerText || ''
  }

  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '30px 20px',
    },
    backLink: {
      display: 'inline-block',
      marginBottom: '20px',
      color: '#2c7be5',
      textDecoration: 'none',
      fontSize: '14px',
    },
    title: {
      fontSize: '26px',
      fontWeight: 'bold',
      marginBottom: '20px',
      color: '#222',
    },
    image: {
      width: '100%',
      maxHeight: '350px',
      objectFit: 'cover',
      borderRadius: '8px',
      marginBottom: '20px',
    },
    summary: {
      fontSize: '15px',
      lineHeight: '1.7',
      color: '#444',
      marginBottom: '25px',
    },
    sectionTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      marginBottom: '12px',
      marginTop: '25px',
      color: '#222',
    },
    ingredientList: {
      listStyle: 'disc',
      paddingLeft: '25px',
      lineHeight: '2',
      color: '#444',
      fontSize: '15px',
    },
    instructionList: {
      listStyle: 'decimal',
      paddingLeft: '25px',
      lineHeight: '2',
      color: '#444',
      fontSize: '15px',
    },
    message: {
      textAlign: 'center',
      padding: '60px',
      color: '#666',
      fontSize: '16px',
    },
    error: {
      textAlign: 'center',
      padding: '40px',
      color: '#e74c3c',
    },
  }

  if (loading) return <p style={styles.message}>Loading recipe details...</p>
  if (error) return <p style={styles.error}>⚠️ {error}</p>
  if (!recipe) return null

  // استخراج خطوات التعليمات
  const steps =
    recipe.analyzedInstructions &&
    recipe.analyzedInstructions[0] &&
    recipe.analyzedInstructions[0].steps
      ? recipe.analyzedInstructions[0].steps
      : []

  return (
    <div style={styles.container}>
      <Link to="/" style={styles.backLink}>← Back to Search</Link>

      <h1 style={styles.title}>{recipe.title}</h1>

      {recipe.image && (
        <img src={recipe.image} alt={recipe.title} style={styles.image} />
      )}

      {recipe.summary && (
        <p style={styles.summary}>{stripHtml(recipe.summary)}</p>
      )}

      {recipe.extendedIngredients && recipe.extendedIngredients.length > 0 && (
        <>
          <h2 style={styles.sectionTitle}>Ingredients</h2>
          <ul style={styles.ingredientList}>
            {recipe.extendedIngredients.map((ing, index) => (
              <li key={index}>{ing.original}</li>
            ))}
          </ul>
        </>
      )}

      {steps.length > 0 && (
        <>
          <h2 style={styles.sectionTitle}>Instructions</h2>
          <ol style={styles.instructionList}>
            {steps.map((step) => (
              <li key={step.number}>{step.step}</li>
            ))}
          </ol>
        </>
      )}
    </div>
  )
}

export default RecipeDetail
