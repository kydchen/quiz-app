import { useState, useEffect } from 'react'
import './App.css'
import ChapterSelection from './components/ChapterSelection'
import Quiz from './components/Quiz'
import Results from './components/Results'
import WrongAnswersReview from './components/WrongAnswersReview'

function App() {
  const [currentView, setCurrentView] = useState('chapters') // 'chapters', 'quiz', 'results', 'wrongReview'
  const [selectedChapter, setSelectedChapter] = useState(null)
  const [quizData, setQuizData] = useState([])
  const [userAnswers, setUserAnswers] = useState({})
  const [flaggedQuestions, setFlaggedQuestions] = useState(new Set())
  const [wrongAnswers, setWrongAnswers] = useState(() => {
    const saved = localStorage.getItem('wrongAnswers')
    try {
      const parsed = saved ? JSON.parse(saved) : []
      return Array.isArray(parsed) ? parsed : []
    } catch (error) {
      console.warn('Invalid wrongAnswers data in localStorage, resetting to empty array')
      return []
    }
  })

  // Save wrong answers to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wrongAnswers', JSON.stringify(wrongAnswers))
  }, [wrongAnswers])

  const startQuiz = async (chapter) => {
    try {
      const response = await fetch(`/Quiz/${chapter}.json`)
      const data = await response.json()
      const questions = data[chapter]
      
      // Randomly select 10 questions
      const shuffled = [...questions].sort(() => 0.5 - Math.random())
      const selected = shuffled.slice(0, 10)
      
      setSelectedChapter(chapter)
      setQuizData(selected)
      setUserAnswers({})
      setFlaggedQuestions(new Set())
      setCurrentView('quiz')
    } catch (error) {
      console.error('Error loading quiz data:', error)
    }
  }

  const submitQuiz = () => {
    // Update wrong answers with detailed information
    const newWrongAnswers = [...wrongAnswers]
    
    quizData.forEach((question, index) => {
      const userAnswer = userAnswers[index]
      if (userAnswer && userAnswer !== question.answer) {
        // Check if this question already exists in wrong answers
        const existingIndex = newWrongAnswers.findIndex(
          item => item.question.question === question.question && item.chapter === selectedChapter
        )
        
        if (existingIndex >= 0) {
          // Update existing wrong answer
          newWrongAnswers[existingIndex].errorCount += 1
          newWrongAnswers[existingIndex].lastAttempt = new Date().toISOString()
          newWrongAnswers[existingIndex].userAnswer = userAnswer
        } else {
          // Add new wrong answer
          newWrongAnswers.push({
            question: question,
            chapter: selectedChapter,
            questionIndex: index,
            userAnswer: userAnswer,
            errorCount: 1,
            lastAttempt: new Date().toISOString()
          })
        }
      }
    })
    
    setWrongAnswers(newWrongAnswers)
    setCurrentView('results')
  }

  const backToChapters = () => {
    setCurrentView('chapters')
    setSelectedChapter(null)
    setQuizData([])
    setUserAnswers({})
    setFlaggedQuestions(new Set())
  }

  const showWrongAnswersReview = () => {
    setCurrentView('wrongReview')
  }

  const clearWrongAnswers = () => {
    setWrongAnswers([])
    localStorage.removeItem('wrongAnswers')
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>题库练习系统</h1>
        {currentView !== 'chapters' && (
          <button onClick={backToChapters} className="back-btn">
            返回章节选择
          </button>
        )}
      </header>
      
      <main className="app-main">
        {currentView === 'chapters' && (
          <ChapterSelection 
            onSelectChapter={startQuiz} 
            wrongAnswers={wrongAnswers}
            onShowWrongAnswers={showWrongAnswersReview}
          />
        )}
        
        {currentView === 'quiz' && (
          <Quiz 
            questions={quizData}
            userAnswers={userAnswers}
            setUserAnswers={setUserAnswers}
            flaggedQuestions={flaggedQuestions}
            setFlaggedQuestions={setFlaggedQuestions}
            onSubmit={submitQuiz}
          />
        )}
        
        {currentView === 'results' && (
          <Results 
            questions={quizData}
            userAnswers={userAnswers}
            flaggedQuestions={flaggedQuestions}
            onBackToChapters={backToChapters}
          />
        )}
        
        {currentView === 'wrongReview' && (
          <WrongAnswersReview 
            wrongAnswers={wrongAnswers}
            onBack={backToChapters}
            onClearWrongAnswers={clearWrongAnswers}
          />
        )}
      </main>
    </div>
  )
}

export default App
