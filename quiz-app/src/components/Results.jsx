import { useState } from 'react'

const Results = ({ questions, userAnswers, flaggedQuestions, onBackToChapters }) => {
  const [selectedQuestion, setSelectedQuestion] = useState(null)

  const getScore = () => {
    let correct = 0
    questions.forEach((question, index) => {
      if (userAnswers[index] === question.answer) {
        correct++
      }
    })
    return correct
  }

  const isCorrect = (index) => {
    return userAnswers[index] === questions[index].answer
  }

  const score = getScore()
  const percentage = Math.round((score / questions.length) * 100)

  const showQuestionDetail = (index) => {
    setSelectedQuestion(selectedQuestion === index ? null : index)
  }

  return (
    <div className="results">
      <div className="results-header">
        <h2>测验结果</h2>
        <div className="score-summary">
          <div className="score-circle">
            <span className="score-text">{score}/{questions.length}</span>
            <span className="percentage">{percentage}%</span>
          </div>
        </div>
      </div>

      <div className="results-list">
        {questions.map((question, index) => {
          const correct = isCorrect(index)
          const flagged = flaggedQuestions.has(index)
          const userAnswer = userAnswers[index]
          const correctAnswer = question.answer
          
          return (
            <div key={index} className={`result-item ${correct ? 'correct' : 'incorrect'}`}>
              <div className="result-header" onClick={() => showQuestionDetail(index)}>
                <div className="result-info">
                  <span className="question-number">题目 {index + 1}</span>
                  <span className={`result-status ${correct ? 'correct' : 'incorrect'}`}>
                    {correct ? '✓ 正确' : '✗ 错误'}
                  </span>
                  {flagged && <span className="flag-indicator">🚩 已标记</span>}
                </div>
                <button className="expand-btn">
                  {selectedQuestion === index ? '收起' : '展开'}
                </button>
              </div>
              
              {selectedQuestion === index && (
                <div className="result-details">
                  <div className="question-text">
                    <h4>题目:</h4>
                    <p>{question.question}</p>
                  </div>
                  
                  <div className="answers-section">
                    <div className="answer-row">
                      <strong>你的答案:</strong>
                      <span className={`answer ${correct ? 'correct' : 'incorrect'}`}>
                        {userAnswer}: {question.options[userAnswer]}
                      </span>
                    </div>
                    
                    {!correct && (
                      <div className="answer-row">
                        <strong>正确答案:</strong>
                        <span className="answer correct">
                          {correctAnswer}: {question.options[correctAnswer]}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="explanation">
                    <h4>解析:</h4>
                    <p>{question.explanation}</p>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="results-actions">
        <button onClick={onBackToChapters} className="back-btn">
          返回章节选择
        </button>
      </div>
    </div>
  )
}

export default Results