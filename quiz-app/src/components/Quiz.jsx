import { useState } from 'react'

const Quiz = ({ 
  questions, 
  userAnswers, 
  setUserAnswers, 
  flaggedQuestions, 
  setFlaggedQuestions, 
  onSubmit 
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)

  const handleAnswerSelect = (questionIndex, answer) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }))
  }

  const toggleFlag = (questionIndex) => {
    setFlaggedQuestions(prev => {
      const newSet = new Set(prev)
      if (newSet.has(questionIndex)) {
        newSet.delete(questionIndex)
      } else {
        newSet.add(questionIndex)
      }
      return newSet
    })
  }

  const goToQuestion = (index) => {
    setCurrentQuestion(index)
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const getAnsweredCount = () => {
    return Object.keys(userAnswers).length
  }

  const canSubmit = () => {
    return getAnsweredCount() === questions.length
  }

  if (!questions || questions.length === 0) {
    return <div className="loading">加载题目中...</div>
  }

  const question = questions[currentQuestion]

  return (
    <div className="quiz">
      <div className="quiz-header">
        <div className="progress-info">
          <span>题目 {currentQuestion + 1} / {questions.length}</span>
          <span>已答题: {getAnsweredCount()} / {questions.length}</span>
        </div>
        <button 
          onClick={() => toggleFlag(currentQuestion)}
          className={`flag-btn ${flaggedQuestions.has(currentQuestion) ? 'flagged' : ''}`}
        >
          {flaggedQuestions.has(currentQuestion) ? '🚩 已标记' : '🏳️ 标记'}
        </button>
      </div>

      <div className="question-navigation">
        {questions.map((_, index) => (
          <button
            key={index}
            onClick={() => goToQuestion(index)}
            className={`nav-btn ${
              index === currentQuestion ? 'current' : ''
            } ${
              userAnswers[index] ? 'answered' : ''
            } ${
              flaggedQuestions.has(index) ? 'flagged' : ''
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <div className="question-content">
        <h3 className="question-text">{question.question}</h3>
        
        <div className="options">
          {['A', 'B', 'C', 'D'].map(option => (
            <label key={option} className="option">
              <input
                type="radio"
                name={`question-${currentQuestion}`}
                value={option}
                checked={userAnswers[currentQuestion] === option}
                onChange={() => handleAnswerSelect(currentQuestion, option)}
              />
              <span className="option-text">
                <strong>{option}:</strong> {question.options[option]}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="quiz-controls">
        <button 
          onClick={prevQuestion} 
          disabled={currentQuestion === 0}
          className="control-btn"
        >
          上一题
        </button>
        
        <button 
          onClick={nextQuestion} 
          disabled={currentQuestion === questions.length - 1}
          className="control-btn"
        >
          下一题
        </button>
        
        <button 
          onClick={onSubmit}
          disabled={!canSubmit()}
          className="submit-btn"
        >
          提交答案 ({getAnsweredCount()}/{questions.length})
        </button>
      </div>
    </div>
  )
}

export default Quiz