import { useState } from 'react'

function Home() {
  const [longUrl, setLongUrl] = useState('')
  const [shortCode, setShortCode] = useState('')
  const [result, setResult] = useState('')
  const [error, setError] = useState('')

  const handleShorten = () => {
    setError('')
    setResult('')

    if (!longUrl || !shortCode) {
      setError('Please fill in all fields!')
      return
    }

    if (!longUrl.startsWith('http://') && !longUrl.startsWith('https://')) {
      setError('Please enter a valid URL starting with http:// or https://')
      return
    }

    setResult(`https://cpt405.co/${shortCode}`)
  }

  const handleReset = () => {
    setLongUrl('')
    setShortCode('')
    setResult('')
    setError('')
  }

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '40px 20px',
    minHeight: 'calc(100vh - 50px)',
    backgroundColor: '#f0f0f0',
  }

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '40px',
    width: '100%',
    maxWidth: '550px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  }

  const titleStyle = {
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '30px',
    color: '#333',
  }

  const labelStyle = {
    display: 'block',
    fontWeight: 'bold',
    marginBottom: '6px',
    fontSize: '14px',
    color: '#333',
  }

  const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '14px',
    marginBottom: '20px',
    outline: 'none',
  }

  const buttonStyle = {
    display: 'block',
    margin: '0 auto 20px auto',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '10px 30px',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
  }

  const resetButtonStyle = {
    display: 'block',
    margin: '0 auto',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    padding: '8px 20px',
    borderRadius: '4px',
    fontSize: '14px',
    cursor: 'pointer',
  }

  const resultBoxStyle = {
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '12px',
    textAlign: 'center',
    color: '#007bff',
    fontSize: '16px',
    backgroundColor: '#f8f9fa',
    marginTop: '10px',
    wordBreak: 'break-all',
  } 

  const errorStyle = {
    color: 'red',
    fontSize: '13px',
    textAlign: 'center',
    marginBottom: '15px',
  }

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Link Shrinker</h2>

        <label style={labelStyle}>Long URL:</label>
        <input
          type="text"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder="https://example.com/very-long-url"
          style={inputStyle}
        />

        <label style={labelStyle}>Enter short code:</label>
        <input
          type="text"
          value={shortCode}
          onChange={(e) => setShortCode(e.target.value)}
          placeholder="mylink"
          style={inputStyle}
        />

        {error && <p style={errorStyle}>{error}</p>}

        <button style={buttonStyle} onClick={handleShorten}>
          Shorten
        </button>

        {result && (
          <div>
            <label style={labelStyle}>Short URL</label>
            <div style={resultBoxStyle}>{result}</div>

            <br />
            <button style={resetButtonStyle} onClick={handleReset}>
              Reset
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
