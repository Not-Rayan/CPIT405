function About() {
  const styles = {
    container: {
      maxWidth: '700px',
      margin: '0 auto',
      padding: '50px 20px',
    },
    title: {
      fontSize: '28px',
      fontWeight: 'bold',
      marginBottom: '20px',
      color: '#222',
    },
    text: {
      fontSize: '16px',
      lineHeight: '1.8',
      color: '#555',
      marginBottom: '15px',
    },
    list: {
      paddingLeft: '25px',
      lineHeight: '2',
      color: '#555',
      fontSize: '15px',
    },
    badge: {
      display: 'inline-block',
      marginTop: '30px',
      backgroundColor: '#2c7be5',
      color: '#fff',
      padding: '8px 18px',
      borderRadius: '20px',
      fontSize: '13px',
    },
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>About This App</h1>
      <p style={styles.text}>
        This is a Recipe Search App built as part of CPIT-405 Lab 9.
        It allows users to search for recipes using the Spoonacular API and
        view detailed information including ingredients and instructions.
      </p>
      <p style={styles.text}>
        <strong>Technologies used:</strong>
      </p>
      <ul style={styles.list}>
        <li>React 18</li>
        <li>React Router DOM v6</li>
        <li>Spoonacular API</li>
        <li>useState & useEffect Hooks</li>
        <li>Vite</li>
      </ul>
      <span style={styles.badge}>CPIT-405 | React Examples</span>
    </div>
  )
}

export default About
