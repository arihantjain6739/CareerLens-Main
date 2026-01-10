import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Question {
  id: number;
  question: string;
  options?: string[];
  correctAnswer: number;
  difficulty: 'easy' | 'medium' | 'hard';
  type?: 'mcq' | 'coding';
  code?: string;
  language?: string;
  examples?: { input: string; output: string; explanation?: string }[];
  constraints?: string[];
  starterCode?: string;
  testCases?: { input: string; output: string }[];
}

const TestAssessment: React.FC = () => {
  const navigate = useNavigate();
  // questions state - starts empty, will be populated by OpenAI
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  // answers will be synced when questions change
  const [answers, setAnswers] = useState<(number | null)[]>([]);

  const [showResults, setShowResults] = useState(false);
  const [userCode, setUserCode] = useState<string>('');
  const [codeSubmitted, setCodeSubmitted] = useState(false);
  const [testResults, setTestResults] = useState<{ passed: boolean; message: string } | null>(null);
  const [generating, setGenerating] = useState(false);

  // Added: timer state and auto-submit
  const TOTAL_TIME = 2 * 60 * 60; // 2 hours in seconds
  const [timeLeft, setTimeLeft] = useState<number>(TOTAL_TIME);
  const [autoSubmitted, setAutoSubmitted] = useState(false);

  React.useEffect(() => {
    if (showResults) return;
    const timerId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerId);
          setAutoSubmitted(true);
          setShowResults(true); // auto-submit when timer hits 0
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerId);
  }, [showResults]);

  // reset answers and editor when questions change
  useEffect(() => {
    setAnswers(new Array(questions.length).fill(null));
    setCurrentQuestion(0);
    const q0 = questions[0];
    if (q0?.type === 'coding') setUserCode(q0.starterCode || '');
    else setUserCode('');
    setSelectedAnswer(null);
    setTestResults(null);
    setCodeSubmitted(false);
  }, [questions]);

  // Generate questions using OpenAI API
  const fetchRandomQuestions = async (count = 10) => {
    try {
      setGenerating(true);
      const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const url = `${API_BASE}/api/openai/generate-questions`;
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: 'software engineering and programming',
          difficulty: 'mixed',
          count: count
        })
      });
      
      if (!res.ok) {
        const text = await res.text();
        console.error('Failed to generate questions', res.status, text);
        alert(`Failed to generate questions: ${res.status}`);
        return;
      }
      
      const body = await res.json();
      
      if (!body.questions || !Array.isArray(body.questions)) {
        console.error('Invalid response from OpenAI API', body);
        alert('Failed to generate questions. Invalid response format.');
        return;
      }
      
      const parsed: Question[] = body.questions.map((q: any, i: number) => ({
        id: q.id ?? i + 1,
        question: q.question ?? 'Question',
        options: q.options,
        correctAnswer: typeof q.correctAnswer === 'number' ? q.correctAnswer : 0,
        difficulty: q.difficulty ?? 'medium',
        type: q.type ?? (q.options ? 'mcq' : 'coding'),
        starterCode: q.starterCode,
        language: q.language ?? 'javascript',
        examples: q.examples,
        constraints: q.constraints,
        testCases: q.testCases,
      }));
      
      // Replace the component's initial four questions with the generated set
      setQuestions(parsed);
    } catch (err: any) {
      console.error('Error generating questions', err);
      alert('Error generating questions: ' + (err.message || err));
    } finally {
      setGenerating(false);
    }
  };

  // fetch on mount to replace initial questions with 10 from OpenAI
  useEffect(() => {
    fetchRandomQuestions(10);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleAnswer = (optionIndex: number) => {
    setSelectedAnswer(optionIndex);
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleCodeChange = (code: string) => {
    setUserCode(code);
  };

  const handleRunCode = () => {
    // Simulate running test cases
    const question = questions[currentQuestion];
    if (question && question.type === 'coding' && userCode.trim()) {
      // Simple validation - in real app, this would run actual tests
      const hasReturn = userCode.includes('return');
      const hasLogic = userCode.length > 50;

      if (hasReturn && hasLogic) {
        setTestResults({ passed: true, message: 'All test cases passed!' });
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = 1; // Mark as answered
        setAnswers(newAnswers);
      } else {
        setTestResults({ passed: false, message: 'Test cases failed. Check your solution.' });
      }
    }
  };

  const handleSubmitCode = () => {
    if (testResults?.passed) {
      setCodeSubmitted(true);
      if (currentQuestion < questions.length - 1) {
        handleNext();
      }
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      const nextQuestion = questions[currentQuestion + 1];
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(answers[currentQuestion + 1]);

      // Reset code editor state for next coding question
      if (nextQuestion && nextQuestion.type === 'coding') {
        setUserCode(nextQuestion.starterCode || '');
        setTestResults(null);
        setCodeSubmitted(false);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      const prevQuestion = questions[currentQuestion - 1];
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1]);

      // Reset code editor state
      if (prevQuestion.type === 'coding') {
        setUserCode(prevQuestion.starterCode || '');
        setTestResults(null);
        setCodeSubmitted(false);
      }
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const question = questions[currentQuestion];

  // Initialize code editor with starter code
  React.useEffect(() => {
    if (question && question.type === 'coding' && question.starterCode && !userCode) {
      setUserCode(question.starterCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestion, question]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'hard':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const answeredCount = answers.filter((a) => a !== null).length;

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / Math.max(questions.length, 1)) * 100);
    const confidence = Math.min(100, Math.max(20, Math.round(percentage * 0.9)));

    // Suggest roles based on score/percentage
    const suggestedRoles = (() => {
      if (percentage >= 85) return ['Senior Software Engineer', 'Senior Backend Engineer', 'Tech Lead'];
      if (percentage >= 65) return ['Software Engineer II', 'Full-stack Engineer', 'Backend Engineer'];
      if (percentage >= 40) return ['Junior Software Engineer', 'Associate Developer', 'QA Engineer'];
      return ['Intern', 'Associate Support Engineer'];
    })();

    const handleGoInterview = (role: string) => {
      // pass selected role to interviews route (via state)
      navigate('/tech-interviews', { state: { suggestedRole: role } });
    };

    // Export a simple HTML report (opens in new tab)
    const openReportWindow = () => {
      try {
        const score = calculateScore();
        const percent = Math.round((score / Math.max(questions.length, 1)) * 100);
        const now = new Date().toLocaleString();
        const rows = questions
          .map((q, i) => {
            const userAns = answers[i] == null ? 'Not answered' : (q.type === 'mcq' && q.options ? q.options[answers[i] as number] : (answers[i] === 1 ? 'Submitted code' : String(answers[i])));
            const correct = q.type === 'mcq' && q.options && typeof q.correctAnswer === 'number' ? q.options[q.correctAnswer] : (q.type === 'coding' ? 'Manual evaluation' : 'N/A');
            return `<tr><td style="padding:10px;border:1px solid #eee;vertical-align:top;"><strong>Q${i + 1}.</strong> ${escapeHtml(q.question)}</td><td style="padding:10px;border:1px solid #eee;vertical-align:top;"><div><strong>Your:</strong> ${escapeHtml(userAns)}</div><div style="margin-top:6px"><strong>Correct:</strong> ${escapeHtml(correct)}</div></td></tr>`;
          })
          .join('');

        const html = `<!doctype html><html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Assessment Report</title><style>body{font-family:Inter,Arial;background:#f7fafc;color:#0f172a} .wrap{max-width:900px;margin:28px auto;background:#fff;padding:20px;border-radius:8px} table{width:100%;border-collapse:collapse} th,td{border:1px solid #eee;padding:10px;text-align:left}</style></head><body><div class="wrap"><h2>Assessment Report</h2><div style="color:#6b7280">Generated: ${escapeHtml(now)} • Score: ${score}/${questions.length} (${percent}%)</div><table><thead><tr><th style="width:60%">Question</th><th>Response / Correct</th></tr></thead><tbody>${rows}</tbody></table></div></body></html>`;

        const win = window.open('', '_blank', 'noopener,noreferrer');
        if (!win) return alert('Pop-up blocked. Allow pop-ups to view report.');
        win.document.write(html);
        win.document.close();
      } catch (e) {
        console.error('openReportWindow error', e);
        alert('Unable to open report.');
      }
    };

    const escapeHtml = (v: any) => {
      if (v === null || v === undefined) return '';
      return String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    };

    // difficulty-based accuracy
    const difficultyStats: Record<string, { total: number; correct: number }> = {};
    questions.forEach((q, i) => {
      const diff = q.difficulty || 'medium';
      if (!difficultyStats[diff]) difficultyStats[diff] = { total: 0, correct: 0 };
      difficultyStats[diff].total++;
      const answered = answers[i];
      const isCorrect = q.type === 'mcq' ? typeof answered === 'number' && answered === q.correctAnswer : answered === 1;
      if (isCorrect) difficultyStats[diff].correct++;
    });

    const missed = questions
      .map((q, i) => {
        const answered = answers[i];
        const isCorrect = q.type === 'mcq' ? typeof answered === 'number' && answered === q.correctAnswer : answered === 1;
        return { index: i, q, answered, isCorrect };
      })
      .filter((r) => !r.isCorrect);

    const getAnswerText = (q: Question, answered: any) => {
      if (q.type === 'mcq') return answered == null ? 'Not answered' : q.options?.[answered] ?? String(answered);
      return answered === 1 ? 'Submitted (auto-graded pass)' : answered == null ? 'Not submitted' : 'Submitted';
    };

    // --- Improved UI block below ---
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <div>
                <div className="text-lg font-semibold text-gray-900">CareerReady</div>
                <div className="text-sm text-gray-500">Assessment Results</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={() => openReportWindow()} className="px-3 py-2 bg-white border rounded text-sm hover:bg-gray-50">Export Report</button>
              <button onClick={() => navigate('/')} className="px-3 py-2 bg-gray-800 text-white rounded text-sm">Back to Dashboard</button>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-6 py-8">
          <section className="grid md:grid-cols-3 gap-6 items-start mb-6">
            <div className="col-span-1 bg-white rounded-xl shadow p-6 flex flex-col items-center gap-4">
              <div className="relative">
                <svg className="w-36 h-36">
                  <circle cx="72" cy="72" r="62" stroke="#e6eefb" strokeWidth="18" fill="none" />
                  <circle
                    cx="72"
                    cy="72"
                    r="62"
                    stroke="#2563eb"
                    strokeWidth="18"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${(percentage / 100) * 389} 389`}
                    transform="rotate(-90 72 72)"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-3xl font-bold text-gray-900">{percentage}%</div>
                  <div className="text-xs text-gray-500">Overall Score</div>
                </div>
              </div>
              <div className="text-sm text-gray-600 text-center">
                <div className="font-semibold">{score} / {questions.length} correct</div>
                <div className="mt-1">Confidence: <span className="font-medium text-gray-800">{confidence}%</span></div>
                <div className="mt-2 text-xs text-gray-500">Answered: {answers.filter(a => a !== null).length}</div>
              </div>
              <div className="w-full">
                <button onClick={() => handleGoInterview(suggestedRoles[0])} className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg">Start Interview: {suggestedRoles[0]}</button>
              </div>
            </div>

            <div className="md:col-span-2 bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Performance Breakdown</h2>
                <div className="text-sm text-gray-500">Detailed by difficulty</div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                {Object.entries(difficultyStats).map(([diff, stats]) => {
                  const pct = stats.total ? Math.round((stats.correct / stats.total) * 100) : 0;
                  return (
                    <div key={diff} className="bg-gray-50 p-4 rounded-lg text-center">
                      <div className="text-sm text-gray-500 uppercase">{diff}</div>
                      <div className="text-2xl font-bold">{pct}%</div>
                      <div className="text-xs text-gray-500 mt-1">{stats.correct}/{stats.total} correct</div>
                    </div>
                  );
                })}
              </div>

              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Suggested Roles</h3>
                <div className="flex flex-wrap gap-2">
                  {suggestedRoles.map(r => (
                    <button key={r} onClick={() => handleGoInterview(r)} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-md border border-indigo-100 text-sm">
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Missed / Review ({missed.length})</h3>
                {missed.length === 0 ? (
                  <div className="text-sm text-green-700">Excellent — no missed evaluated items.</div>
                ) : (
                  <div className="space-y-3">
                    {missed.map(m => (
                      <details key={m.index} className="bg-white border rounded p-3">
                        <summary className="cursor-pointer font-medium text-gray-800">
                          Q{m.index + 1}: {m.q.question.split('\n')[0]}
                        </summary>
                        <div className="mt-2 text-sm text-gray-700">
                          <div><strong>Your answer:</strong> {getAnswerText(m.q, m.answered)}</div>
                          <div className="mt-1"><strong>Correct:</strong> {m.q.type === 'mcq' ? (m.q.options?.[m.q.correctAnswer] ?? '—') : 'Manual/code evaluation required'}</div>
                          {m.q.type === 'coding' && m.q.starterCode && (
                            <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-x-auto">{m.q.starterCode}</pre>
                          )}
                        </div>
                      </details>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow p-6">
              <h4 className="font-semibold mb-2">Suggested Focus Areas</h4>
              <ul className="list-disc list-inside text-sm text-gray-700">
                {Object.entries(difficultyStats).map(([diff, stats]) => {
                  const acc = stats.total ? (stats.correct / stats.total) * 100 : 0;
                  return acc < 60 ? <li key={diff}>Improve {diff} questions — accuracy {Math.round(acc)}%</li> : null;
                })}
                {missed.length > 0 && <li key="review">Review missed questions and related topics</li>}
                {missed.length === 0 && <li key="noop">Keep practicing to maintain performance</li>}
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h4 className="font-semibold mb-2">Next Steps</h4>
              <ol className="list-decimal list-inside text-sm text-gray-700 space-y-2">
                <li>Start interview prep for a suggested role or explore other roles above.</li>
                <li>Revisit missed concepts and retake targeted practice sets.</li>
                <li>Download the detailed report for sharing or record-keeping.</li>
              </ol>
            </div>
          </section>
        </main>
      </div>
    );
  }

  // Show loading state while questions are being fetched
  if (!question || questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600 font-medium">Loading questions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <span className="text-xl font-bold text-gray-900">CareerReady</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-600 font-medium">{formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Question {currentQuestion + 1} of {questions.length}</span>
            <span className="text-sm font-medium text-gray-600">{answeredCount} answered</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="prose prose-sm max-w-none">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{question.question.split('\n')[0]}</h2>
                <p className="text-gray-700 whitespace-pre-line leading-relaxed">{question.question.split('\n').slice(1).join('\n')}</p>
              </div>
            </div>
          </div>

          {/* Examples for Coding Questions */}
          {question.type === 'coding' && question.examples && (
            <div className="mb-6 space-y-4">
              {question.examples.map((example, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Example {idx + 1}:</p>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-semibold">Input:</span> <code className="bg-white px-2 py-1 rounded">{example.input}</code></p>
                    <p><span className="font-semibold">Output:</span> <code className="bg-white px-2 py-1 rounded">{example.output}</code></p>
                    {example.explanation && <p className="text-gray-600"><span className="font-semibold">Explanation:</span> {example.explanation}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Constraints for Coding Questions */}
          {question.type === 'coding' && question.constraints && (
            <div className="mb-6">
              <p className="text-sm font-semibold text-gray-700 mb-2">Constraints:</p>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                {question.constraints.map((constraint, idx) => <li key={idx}>{constraint}</li>)}
              </ul>
            </div>
          )}

          {/* Code Editor for Coding Questions */}
          {question.type === 'coding' ? (
            <div className="space-y-4">
              <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-900 px-4 py-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <span className="text-xs text-gray-400 ml-2">{question.language || 'javascript'}</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={handleRunCode} disabled={timeLeft === 0 || showResults} className="text-xs px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Run Code</button>
                    <button onClick={handleSubmitCode} disabled={!testResults?.passed || timeLeft === 0 || showResults} className="text-xs px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Submit</button>
                  </div>
                </div>
                <textarea value={userCode} onChange={(e) => handleCodeChange(e.target.value)} className="w-full h-64 p-4 bg-gray-900 text-gray-100 font-mono text-sm leading-relaxed focus:outline-none resize-none" spellCheck={false} placeholder="Write your solution here..." />
              </div>

              {/* Test Results */}
              {testResults && (
                <div className={`p-4 rounded-lg ${testResults.passed ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                  <div className="flex items-center gap-2">
                    {testResults.passed ? (
                      <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                    ) : (
                      <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                    )}
                    <span className={`font-semibold ${testResults.passed ? 'text-green-700' : 'text-red-700'}`}>{testResults.message}</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* MCQ Options */
            <div className="space-y-3">
              {question.options?.map((option, index) => (
                <button key={index} onClick={() => handleAnswer(index)} className={`w-full p-4 rounded-xl border-2 text-left transition-all hover:shadow-md ${selectedAnswer === index ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${selectedAnswer === index ? 'border-blue-600 bg-blue-600' : 'border-gray-300'}`}>
                      {selectedAnswer === index ? (
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      ) : (
                        <span className="text-gray-400 font-semibold">{String.fromCharCode(65 + index)}</span>
                      )}
                    </div>
                    <span className="font-medium text-gray-900">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Question Navigation */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            {questions.map((_, index) => (
              <button key={index} onClick={() => { setCurrentQuestion(index); setSelectedAnswer(answers[index]); }} className={`w-10 h-10 rounded-lg font-semibold transition-colors ${index === currentQuestion ? 'bg-blue-600 text-white' : answers[index] !== null ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}>{index + 1}</button>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button onClick={handlePrevious} disabled={currentQuestion === 0} className="bg-white text-gray-700 font-semibold py-3 px-6 rounded-xl border-2 border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Previous</button>

          {currentQuestion === questions.length - 1 ? (
            <button onClick={handleSubmit} disabled={showResults || timeLeft === 0} className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-xl hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed">Submit Assessment</button>
          ) : (
            <button onClick={handleNext} className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors">Next</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestAssessment;
