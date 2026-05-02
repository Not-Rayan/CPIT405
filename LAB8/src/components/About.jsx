function About() {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    padding: '40px 20px',
    backgroundColor: '#f0f0f0',
    minHeight: 'calc(100vh - 50px)',
  }

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '40px',
    width: '100%',
    maxWidth: '550px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    height: 'fit-content',
  }

  const titleStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
    borderBottom: '2px solid #007bff',
    paddingBottom: '10px',
  }

  const paragraphStyle = {
    fontSize: '15px',
    lineHeight: '1.7',
    color: '#555',
    marginBottom: '15px',
  }

  const featureStyle = {
    backgroundColor: '#f8f9fa',
    borderLeft: '4px solid #007bff',
    padding: '10px 15px',
    marginBottom: '10px',
    borderRadius: '0 4px 4px 0',
    fontSize: '14px',
    color: '#444',
  }

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>About "Rayan" Link Shrinker</h2>

        <p style={paragraphStyle}>
          Link Shrinker هو تطبيق ويب بسيط يتيح للمستخدمين تقصير الروابط الطويلة إلى روابط قصيرة وسهلة المشاركة. تم بناء هذا التطبيق باستخدام React و  ويتميز بواجهة مستخدم نظيفة وسهلة الاستخدام.
        </p>
      

        <h3 style={{ marginBottom: '12px', color: '#333', fontSize: '17px' }}>
          تواصل معنا:
        </h3>

        <a href='https://x.com/Ryan46004290' target='_blank' rel='noreferrer' style={{ ...featureStyle, display: 'block', textDecoration: 'none' }}>🔗 حسابنا على منصة أكس</a>
   
      </div>
    </div>
  )
}

export default About
