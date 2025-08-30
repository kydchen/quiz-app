import React, { useState } from 'react';

const WrongAnswersReview = ({ wrongAnswers, onBack, onClearWrongAnswers }) => {
  const [expandedQuestions, setExpandedQuestions] = useState(new Set());
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const toggleExpanded = (questionId) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(questionId)) {
      newExpanded.delete(questionId);
    } else {
      newExpanded.add(questionId);
    }
    setExpandedQuestions(newExpanded);
  };

  const groupedWrongAnswers = wrongAnswers.reduce((acc, item) => {
    if (!acc[item.chapter]) {
      acc[item.chapter] = [];
    }
    acc[item.chapter].push(item);
    return acc;
  }, {});

  if (wrongAnswers.length === 0) {
    return (
      <div className="wrong-answers-review">
        <div className="review-header">
          <h2>错题复习</h2>
          <button onClick={onBack} className="back-button">
            返回章节选择
          </button>
        </div>
        <div className="no-wrong-answers">
          <p>🎉 太棒了！你还没有错题记录。</p>
        </div>
      </div>
    );
  }

  return (
    <div className="wrong-answers-review">
      <div className="review-header">
        <h2>错题复习</h2>
        <div className="header-buttons">
          <button onClick={() => setShowConfirmDialog(true)} className="clear-button">
            清空错题集
          </button>
          <button onClick={onBack} className="back-button">
            返回章节选择
          </button>
        </div>
      </div>
      
      <div className="review-stats">
        <p>总错题数：{wrongAnswers.length}</p>
        <p>涉及章节：{Object.keys(groupedWrongAnswers).length}</p>
      </div>

      {showConfirmDialog && (
        <div className="confirm-dialog-overlay">
          <div className="confirm-dialog">
            <h3>确认清空</h3>
            <p>确定要清空所有错题记录吗？此操作不可恢复</p>
            <div className="dialog-buttons">
              <button 
                onClick={() => {
                  onClearWrongAnswers();
                  setShowConfirmDialog(false);
                }} 
                className="confirm-button"
              >
                确认
              </button>
              <button 
                onClick={() => setShowConfirmDialog(false)} 
                className="cancel-button"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="wrong-answers-list">
        {Object.entries(groupedWrongAnswers).map(([chapter, questions]) => (
          <div key={chapter} className="chapter-group">
            <h3 className="chapter-title">{chapter} ({questions.length}题)</h3>
            
            {questions.map((item, index) => {
              const questionId = `${chapter}-${index}`;
              const isExpanded = expandedQuestions.has(questionId);
              
              return (
                <div key={questionId} className="wrong-question-item">
                  <div 
                    className="question-summary"
                    onClick={() => toggleExpanded(questionId)}
                  >
                    <div className="question-preview">
                      <span className="question-number">第 {item.questionIndex + 1} 题</span>
                      <span className="question-text-preview">
                        {item.question.question.length > 50 
                          ? item.question.question.substring(0, 50) + '...' 
                          : item.question.question}
                      </span>
                    </div>
                    <div className="expand-icon">
                      {isExpanded ? '▼' : '▶'}
                    </div>
                  </div>
                  
                  {isExpanded && (
                    <div className="question-details">
                      <div className="question-content">
                        <h4>题目：</h4>
                        <p>{item.question.question}</p>
                      </div>
                      
                      <div className="options-content">
                        <h4>选项：</h4>
                        <div className="options-grid">
                          {['A', 'B', 'C', 'D'].map(option => (
                            <div 
                              key={option} 
                              className={`option-item ${
                                option === item.question.answer ? 'correct' : ''
                              } ${
                                option === item.userAnswer ? 'user-selected' : ''
                              }`}
                            >
                              <span className="option-label">{option}.</span>
                              <span className="option-text">{item.question.options[option]}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="answer-analysis">
                        <div className="answer-info">
                          <p><strong>你的答案：</strong> 
                            <span className="user-answer">{item.userAnswer || '未选择'}</span>
                          </p>
                          <p><strong>正确答案：</strong> 
                            <span className="correct-answer">{item.question.answer}</span>
                          </p>
                        </div>
                        
                        {item.question.explanation && (
                          <div className="explanation">
                            <h4>解析：</h4>
                            <p>{item.question.explanation}</p>
                          </div>
                        )}
                      </div>
                      
                      <div className="error-info">
                        <p className="error-count">错误次数：{item.errorCount}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WrongAnswersReview;