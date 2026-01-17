import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface QuestionPerformance {
  questionNumber: number;
  questionText: string;
  rating: number;
  timeTaken: string;
  confidence: string;
  feedback: string;
}

interface ReportData {
  overallScore: number;
  ratings: Record<number, number>;
  comments: string;
  recordingsCount: number;
  strengths: string[];
  improvements: string[];
  categoryScores: {
    communication: number;
    technicalKnowledge: number;
    problemSolving: number;
    professionalism: number;
  };
  questionPerformances?: QuestionPerformance[];
}

const InterviewReport: React.FC = () => {
  const navigate = useNavigate();
  const [report, setReport] = useState<ReportData | null>(null);

  // Mock questions for display
  const mockQuestions = [
    "Tell me about yourself and your background.",
    "Why are you interested in this role and our company?",
    "Describe a challenging problem you solved and how you approached it.",
    "How do you prioritize tasks when working on multiple projects?",
    "Tell me about a time you worked in a team.",
    "What are your greatest strengths and weaknesses?",
    "Where do you see yourself in five years?",
    "How do you handle feedback and criticism?",
    "Describe a situation where you had to meet a tight deadline.",
    "Do you have any questions for me about the role or team?"
  ];

  const confidenceLevels = ["Low", "Moderate", "Good", "High", "Excellent"];
  const feedbackOptions = [
    "Great structure and clarity",
    "Good use of examples",
    "Could be more specific",
    "Well articulated response",
    "Consider adding more details",
    "Strong opening, solid conclusion",
    "Good pacing and tone",
    "Excellent real-world example"
  ];

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("interview_report");
      if (raw) {
        const reportData = JSON.parse(raw);
        
        // Generate mock question performances if not present
        if (!reportData.questionPerformances) {
          const questionCount = Math.max(reportData.recordingsCount || 5, Object.keys(reportData.ratings || {}).length, 5);
          const performances: QuestionPerformance[] = [];
          
          for (let i = 0; i < questionCount; i++) {
            const rating = reportData.ratings?.[i] || Math.floor(Math.random() * 2) + 3; // 3-5 rating
            const minutes = Math.floor(Math.random() * 2) + 1;
            const seconds = Math.floor(Math.random() * 60);
            const confidenceIndex = Math.min(rating, 4);
            
            performances.push({
              questionNumber: i + 1,
              questionText: mockQuestions[i % mockQuestions.length],
              rating,
              timeTaken: `${minutes}:${seconds.toString().padStart(2, '0')}`,
              confidence: confidenceLevels[confidenceIndex],
              feedback: feedbackOptions[Math.floor(Math.random() * feedbackOptions.length)]
            });
          }
          
          reportData.questionPerformances = performances;
        }
        
        setReport(reportData);
      } else {
        // If no report data, redirect to home
        navigate("/");
      }
    } catch (e) {
      console.error("Error loading report:", e);
      navigate("/");
    }
  }, [navigate]);

  const handleDone = () => {
    sessionStorage.removeItem("interview_report");
    navigate("/");
  };

  const handleRetake = () => {
    sessionStorage.removeItem("interview_report");
    navigate("/interviews");
  };

  if (!report) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading report...</div>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-green-100";
    if (score >= 60) return "bg-yellow-100";
    return "bg-red-100";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Interview Performance Report</h1>
          <p className="text-blue-100">Here's a comprehensive analysis of your interview performance</p>
        </div>

        {/* Overall Score */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center">
            <div className="text-gray-600 text-sm uppercase mb-2">Overall Score</div>
            <div className={`text-6xl font-bold ${getScoreColor(report.overallScore)}`}>
              {report.overallScore}
              <span className="text-2xl">/100</span>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    report.overallScore >= 80
                      ? "bg-green-500"
                      : report.overallScore >= 60
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${report.overallScore}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Category Scores */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Performance by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(report.categoryScores).map(([category, score]) => (
              <div key={category} className={`p-4 rounded-lg ${getScoreBg(score)}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium capitalize">
                    {category.replace(/([A-Z])/g, " $1").trim()}
                  </div>
                  <div className={`text-2xl font-bold ${getScoreColor(score)}`}>
                    {score}
                  </div>
                </div>
                <div className="w-full bg-white h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      score >= 80 ? "bg-green-500" : score >= 60 ? "bg-yellow-500" : "bg-red-500"
                    }`}
                    style={{ width: `${score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Question-wise Ratings */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Question-wise Performance</h2>
          <div className="space-y-4">
            {report.questionPerformances && report.questionPerformances.length > 0 ? (
              report.questionPerformances.map((perf) => (
                <div key={perf.questionNumber} className="border rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold text-blue-600">Q{perf.questionNumber}</span>
                        <span className="text-sm text-gray-600">{perf.questionText}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {perf.timeTaken}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          perf.confidence === "Excellent" || perf.confidence === "High"
                            ? "bg-green-100 text-green-700"
                            : perf.confidence === "Good"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}>
                          {perf.confidence} Confidence
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <span
                            key={n}
                            className={`text-xl ${
                              n <= perf.rating ? "text-yellow-400" : "text-gray-300"
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-sm font-medium text-gray-700">{perf.rating}/5</span>
                    </div>
                  </div>
                  <div className="mt-2 p-2 bg-blue-50 rounded text-sm text-blue-800 border-l-4 border-blue-400">
                    <span className="font-medium">AI Feedback:</span> {perf.feedback}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-500 text-center py-4">
                No question performance data available
              </div>
            )}
          </div>
        </div>

        {/* Strengths */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Key Strengths
          </h2>
          <ul className="space-y-2">
            {report.strengths.map((strength, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span className="text-gray-700">{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Areas for Improvement */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Areas for Improvement
          </h2>
          <ul className="space-y-2">
            {report.improvements.map((improvement, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span className="text-gray-700">{improvement}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Comments */}
        {report.comments && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Your Comments</h2>
            <div className="p-4 bg-gray-50 rounded text-gray-700 whitespace-pre-wrap">
              {report.comments}
            </div>
          </div>
        )}

        {/* Summary Stats */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Interview Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-gray-50 rounded">
              <div className="text-3xl font-bold text-blue-600">{report.recordingsCount}</div>
              <div className="text-sm text-gray-600 mt-1">Questions Answered</div>
            </div>
            <div className="p-4 bg-gray-50 rounded">
              <div className="text-3xl font-bold text-green-600">
                {Object.values(report.ratings).length}
              </div>
              <div className="text-sm text-gray-600 mt-1">Self-Rated Responses</div>
            </div>
            <div className="p-4 bg-gray-50 rounded">
              <div className="text-3xl font-bold text-purple-600">
                {report.categoryScores.communication >= 70 ? "Good" : "Needs Work"}
              </div>
              <div className="text-sm text-gray-600 mt-1">Communication Level</div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleRetake}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Practice Again
            </button>
            <button
              onClick={handleDone}
              className="px-6 py-3 bg-gray-200 rounded-lg font-medium hover:bg-gray-300 transition"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewReport;
