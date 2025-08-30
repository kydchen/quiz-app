import { useState, useEffect } from 'react'

const ChapterSelection = ({ onSelectChapter, wrongAnswers, onShowWrongAnswers }) => {
  const [chapters, setChapters] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Generate chapter list (C1 to C10)
    const chapterList = Array.from({ length: 10 }, (_, i) => `C${i + 1}`)
    setChapters(chapterList)
    setLoading(false)
  }, [])

  const getWrongAnswerCount = (chapter) => {
    if (!Array.isArray(wrongAnswers)) return 0
    return wrongAnswers.filter(item => item.chapter === chapter).length
  }

  const getTotalWrongAttempts = (chapter) => {
    if (!Array.isArray(wrongAnswers)) return 0
    return wrongAnswers
      .filter(item => item.chapter === chapter)
      .reduce((total, item) => total + item.errorCount, 0)
  }

  if (loading) {
    return <div className="loading">加载中...</div>
  }

  return (
    <div className="chapter-selection">
      <h2>选择章节</h2>
      <div className="chapters-grid">
        {chapters.map(chapter => {
          const wrongCount = getWrongAnswerCount(chapter)
          const totalAttempts = getTotalWrongAttempts(chapter)
          
          return (
            <div key={chapter} className="chapter-card">
              <button 
                onClick={() => onSelectChapter(chapter)}
                className="chapter-btn"
              >
                <h3>{chapter}</h3>
                <div className="chapter-stats">
                  {wrongCount > 0 && (
                    <div className="wrong-stats">
                      <span className="wrong-count">错题: {wrongCount}</span>
                      <span className="wrong-attempts">错误次数: {totalAttempts}</span>
                    </div>
                  )}
                </div>
              </button>
            </div>
          )
        })}
      </div>
      
      {Array.isArray(wrongAnswers) && wrongAnswers.length > 0 && (
        <div className="wrong-answers-summary">
          <h3>错题统计</h3>
          <div className="summary-stats">
            <p>总错题数: {wrongAnswers.length}</p>
            <p>总错误次数: {wrongAnswers.reduce((total, item) => total + item.errorCount, 0)}</p>
          </div>
          <button 
            onClick={onShowWrongAnswers}
            className="review-wrong-btn"
          >
            复习错题
          </button>
        </div>
      )}
    </div>
  )
}

export default ChapterSelection