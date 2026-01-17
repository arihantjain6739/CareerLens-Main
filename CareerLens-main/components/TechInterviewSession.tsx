import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface TechQuestion {
  question: string;
  type?: 'conceptual' | 'coding';
  description?: string;
  constraints?: string[];
  examples?: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
  testCases?: Array<{
    input: string;
    expectedOutput: string;
    explanation?: string;
  }>;
  starterCode?: string;
  hints?: string[];
  difficulty?: string;
  tags?: string[];
}

const DEFAULT_TECH_QUESTIONS = [
  "Tell me about yourself and your background.",
  "Why are you interested in this role and our company?",
  "Describe a challenging problem you solved and how you approached it.",
  "How do you prioritize tasks when working on multiple projects?",
  "Do you have any questions for me about the role or team?"
];

const TechInterviewSession: React.FC = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [micEnabled, setMicEnabled] = useState(false);
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [questionTimer, setQuestionTimer] = useState<number>(60); // seconds per question
  const timerRef = useRef<number | null>(null);
  const [mediaError, setMediaError] = useState<string | null>(null);
  const [TECH_QUESTIONS, setTECH_QUESTIONS] = useState<TechQuestion[]>([]);
  const [questionsLoaded, setQuestionsLoaded] = useState(false);
  const [userCode, setUserCode] = useState<string>("");
  const [showHints, setShowHints] = useState(false);

  // fetch 10 random tech questions from backend
  useEffect(() => {
    const fetchTechQuestions = async (count = 10) => {
      try {
        const API_BASE = (import.meta.env.VITE_API_URL as string) || 'http://localhost:5000';
        const res = await fetch(`${API_BASE}/api/techquestions/random?count=${count}`);
        if (!res.ok) {
          console.error('Failed to fetch tech questions', res.status);
          return;
        }
        const body = await res.json();
        if (!body || !Array.isArray(body.data) || body.data.length === 0) return;
        
        // Map the fetched questions to TechQuestion type
        const questions: TechQuestion[] = body.data.map((d: any) => ({
          question: d.question,
          type: d.type || 'conceptual',
          description: d.description,
          constraints: d.constraints,
          examples: d.examples,
          testCases: d.testCases,
          starterCode: d.starterCode,
          hints: d.hints,
          difficulty: d.difficulty,
          tags: d.tags
        }));
        
        if (questions.length) {
          setTECH_QUESTIONS(questions);
          setQuestionsLoaded(true);
          setCurrentQ(0);
          // Initialize code editor with starter code if available
          if (questions[0]?.starterCode) {
            setUserCode(questions[0].starterCode);
          }
        }
      } catch (err) {
        console.error('Error fetching tech questions', err);
      }
    };

    fetchTechQuestions(10);
  }, []);

  useEffect(() => {
    // when media is ready and questions fetched, speak first fetched question
    let mounted = true;
    const start = async () => {
      try {
        const s = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (!mounted) {
          s.getTracks().forEach(t => t.stop());
          return;
        }
        streamRef.current = s;
        if (videoRef.current) {
          videoRef.current.srcObject = s;
          videoRef.current.muted = true;
          videoRef.current.play().catch(() => {});
        }
        setCameraEnabled(s.getVideoTracks().length > 0);
        setMicEnabled(s.getAudioTracks().length > 0);
        setMediaError(null);
      } catch (err: any) {
        console.error("Could not start media for interview:", err);
        setMediaError(err?.message || "Permission denied or no devices available.");
      }
    };
    start();

    return () => {
      mounted = false;
      stopAllMedia();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // trigger speak once both media is started (cameraEnabled true) and questions loaded
  useEffect(() => {
    if (questionsLoaded && cameraEnabled && TECH_QUESTIONS.length > 0) {
      setCurrentQ(0);
      try { speakQuestion(0); } catch (e) { /* ignore */ }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionsLoaded, cameraEnabled]);

  useEffect(() => {
    // per-question countdown
    clearQuestionTimer();
    setQuestionTimer(60);
    timerRef.current = window.setInterval(() => {
      setQuestionTimer((t) => {
        if (t <= 1) {
          clearQuestionTimer();
          if (isRecording) stopRecording(); // auto-stop recording when time runs out
          // auto-advance if not last
          if (currentQ < AI_QUESTIONS.length - 1) {
            handleNext();
          }
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearQuestionTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQ, isRecording]);

  const clearQuestionTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const speakQuestion = (index: number) => {
    try {
      const q = TECH_QUESTIONS[index];
      if (!q) return;
      const text = q.type === 'coding' ? `Coding Problem: ${q.question}. ${q.description}` : q.question;
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = "en-US";
        window.speechSynthesis.speak(u);
      }
    } catch (e) {}
  };

  // RECORDING: use audio-only stream (safer and more widely supported)
  const startRecording = async () => {
    const s = streamRef.current;
    if (!s) {
      setMediaError("No media stream available. Please allow camera & microphone.");
      return;
    }
    recordedChunksRef.current = [];
    try {
      const audioTracks = s.getAudioTracks();
      if (!audioTracks || audioTracks.length === 0) {
        setMediaError("No audio track available to record.");
        return;
      }

      // create audio-only stream so MediaRecorder focuses on audio
      const audioStream = new MediaStream(audioTracks);

      // choose supported mime type
      let mimeType = "";
      if (typeof MediaRecorder !== "undefined") {
        if (MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported("audio/webm;codecs=opus")) {
          mimeType = "audio/webm;codecs=opus";
        } else if (MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported("audio/webm")) {
          mimeType = "audio/webm";
        } else if (MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported("audio/ogg")) {
          mimeType = "audio/ogg";
        }
      }
      const options: MediaRecorderOptions = mimeType ? { mimeType } : {};
      const questionAtStart = currentQ;
      const mr = new MediaRecorder(audioStream as MediaStream, options);
      mediaRecorderRef.current = mr;

      mr.ondataavailable = (ev: BlobEvent) => {
        if (ev.data && ev.data.size > 0) {
          recordedChunksRef.current.push(ev.data);
        }
      };

      mr.onstop = () => {
        try {
          const chunks = recordedChunksRef.current.slice();
          const blob = new Blob(chunks.length ? chunks : [], { type: chunks.length ? chunks[0].type : "audio/webm" });
          const url = URL.createObjectURL(blob);
          setRecordings((r) => [...r, { questionIndex: questionAtStart, blobUrl: url, blob }]);
        } catch (e) {
          console.error("Error creating recording blob:", e);
        } finally {
          recordedChunksRef.current = [];
        }
      };

      mr.start();
      setIsRecording(true);
      setMediaError(null);
    } catch (err) {
      console.error("Recording failed:", err);
      setMediaError("Recording is not supported by this browser or permissions denied.");
    }
  };

  const stopRecording = () => {
    try {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
        mediaRecorderRef.current.stop();
      }
    } catch (e) {}
    setIsRecording(false);
  };

  const handleNext = () => {
    clearQuestionTimer();
    setQuestionTimer(60);
    setShowHints(false);
    if (currentQ < TECH_QUESTIONS.length - 1) {
      setCurrentQ((i) => {
        const next = i + 1;
        const nextQuestion = TECH_QUESTIONS[next];
        if (nextQuestion?.starterCode) {
          setUserCode(nextQuestion.starterCode);
        } else {
          setUserCode("");
        }
        speakQuestion(next);
        return next;
      });
    }
  };

  const handlePrev = () => {
    clearQuestionTimer();
    setQuestionTimer(60);
    setShowHints(false);
    if (currentQ > 0) {
      setCurrentQ((i) => {
        const prev = i - 1;
        const prevQuestion = TECH_QUESTIONS[prev];
        if (prevQuestion?.starterCode) {
          setUserCode(prevQuestion.starterCode);
        } else {
          setUserCode("");
        }
        speakQuestion(prev);
        return prev;
      });
    }
  };

  const stopAllMedia = () => {
    try {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
        mediaRecorderRef.current.stop();
      }
    } catch (e) {}
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => {
        try {
          t.stop();
        } catch (e) {}
      });
      streamRef.current = null;
    }
    if (videoRef.current) videoRef.current.srcObject = null;
    try {
      window.speechSynthesis.cancel();
    } catch (e) {}
    clearQuestionTimer();
  };

  // Save recordings to sessionStorage (blobUrl strings) then navigate to feedback page
  const handleEndInterview = () => {
    // persist recordings (questionIndex + blobUrl)
    try {
      const payload = recordings.map(r => ({ questionIndex: r.questionIndex, blobUrl: r.blobUrl }));
      sessionStorage.setItem("interview_recordings", JSON.stringify(payload));
    } catch (e) { /* ignore */ }

    stopAllMedia();
    navigate("/interview-feedback");
  };

  const toggleRecord = () => {
    if (isRecording) stopRecording();
    else startRecording();
  };

  const progressPercent = Math.round(((currentQ + 1) / TECH_QUESTIONS.length) * 100);
  const currentQuestion = TECH_QUESTIONS[currentQ] || { question: "Loading...", type: 'conceptual' };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-lg font-semibold">Live Preview</h2>
                <p className="text-sm text-gray-500">Your camera & mic are live for this interview.</p>
              </div>
              <div className="text-sm text-gray-600">
                Camera: {cameraEnabled ? "On" : "Off"} • Mic: {micEnabled ? "On" : "Off"}
              </div>
            </div>

            <div className="bg-black rounded overflow-hidden" style={{ aspectRatio: "16/9" }}>
              <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
            </div>

            {mediaError && (
              <div className="mt-3 text-sm text-red-600">
                {mediaError} <button onClick={() => window.location.reload()} className="underline ml-2">Retry</button>
              </div>
            )}

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleRecord}
                  className={`px-4 py-2 rounded font-medium ${isRecording ? "bg-red-600 text-white" : "bg-green-600 text-white"}`}
                >
                  {isRecording ? "Stop Recording" : "Record Answer"}
                </button>
                <div className="text-sm text-gray-600">
                  Time left: <span className="font-mono">{String(questionTimer).padStart(2, "0")}s</span>
                </div>
                <div className="text-sm text-gray-600">Question {currentQ + 1} / {TECH_QUESTIONS.length}</div>
              </div>

              <div className="flex items-center gap-2">
                <button onClick={handlePrev} disabled={currentQ === 0} className="px-3 py-2 bg-white border rounded disabled:opacity-50">Prev</button>
                <button onClick={handleNext} disabled={currentQ === TECH_QUESTIONS.length - 1} className="px-3 py-2 bg-white border rounded disabled:opacity-50">Next</button>
                <button onClick={handleEndInterview} className="px-3 py-2 bg-gray-200 rounded">End Interview</button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold mb-2">Recorded Answers</h3>
            {recordings.length === 0 ? (
              <p className="text-sm text-gray-500">No recordings yet. Use "Record Answer" when answering each question.</p>
            ) : (
              <ul className="space-y-2">
                {recordings.map((r, idx) => (
                  <li key={idx} className="flex items-center justify-between border rounded p-2">
                    <div>
                      <div className="text-sm font-medium">Q{r.questionIndex + 1}</div>
                      <audio controls src={r.blobUrl} className="mt-1" />
                    </div>
                    <div>
                      <a href={r.blobUrl} download={`answer-q${r.questionIndex + 1}.webm`} className="text-sm text-blue-600">Download</a>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <aside className="space-y-4">
          <div className="bg-white rounded-lg shadow p-4 sticky top-6 max-h-[calc(100vh-3rem)] overflow-y-auto">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-lg font-semibold">
                {currentQuestion.type === 'coding' ? '💻' : 'AI'}
              </div>
              <div>
                <div className="font-semibold">{currentQuestion.type === 'coding' ? 'Coding Challenge' : 'AI Interviewer'}</div>
                <div className="text-sm text-gray-500">
                  {currentQuestion.difficulty && (
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      currentQuestion.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                      currentQuestion.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {currentQuestion.difficulty}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Question Display */}
            <div className="border rounded p-3 mb-3 bg-gray-50">
              <div className="text-sm text-gray-700 mb-2 font-medium flex items-center justify-between">
                <span>Current Question</span>
                {currentQuestion.tags && currentQuestion.tags.length > 0 && (
                  <div className="flex gap-1 flex-wrap">
                    {currentQuestion.tags.slice(0, 2).map((tag, idx) => (
                      <span key={idx} className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="text-sm font-semibold text-gray-900 mb-2">{currentQuestion.question}</div>
              
              {currentQuestion.type === 'coding' && currentQuestion.description && (
                <div className="text-sm text-gray-700 mt-3 whitespace-pre-line">
                  {currentQuestion.description}
                </div>
              )}
            </div>

            {/* Constraints */}
            {currentQuestion.type === 'coding' && currentQuestion.constraints && currentQuestion.constraints.length > 0 && (
              <div className="mb-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
                <div className="text-sm font-semibold text-yellow-800 mb-2">Constraints</div>
                <ul className="text-xs text-yellow-900 space-y-1">
                  {currentQuestion.constraints.map((constraint, idx) => (
                    <li key={idx} className="flex items-start gap-1">
                      <span>•</span>
                      <span>{constraint}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Examples */}
            {currentQuestion.type === 'coding' && currentQuestion.examples && currentQuestion.examples.length > 0 && (
              <div className="mb-3">
                <div className="text-sm font-semibold text-gray-700 mb-2">Examples</div>
                {currentQuestion.examples.map((example, idx) => (
                  <div key={idx} className="mb-2 p-2 bg-blue-50 border border-blue-200 rounded text-xs">
                    <div className="font-mono mb-1">
                      <span className="font-semibold">Input:</span> {example.input}
                    </div>
                    <div className="font-mono mb-1">
                      <span className="font-semibold">Output:</span> {example.output}
                    </div>
                    {example.explanation && (
                      <div className="text-gray-600 mt-1">
                        <span className="font-semibold">Explanation:</span> {example.explanation}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Test Cases */}
            {currentQuestion.type === 'coding' && currentQuestion.testCases && currentQuestion.testCases.length > 0 && (
              <div className="mb-3">
                <div className="text-sm font-semibold text-gray-700 mb-2">Test Cases ({currentQuestion.testCases.length})</div>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {currentQuestion.testCases.map((testCase, idx) => (
                    <div key={idx} className="p-2 bg-green-50 border border-green-200 rounded text-xs">
                      <div className="font-semibold text-green-800 mb-1">Test Case {idx + 1}</div>
                      <div className="font-mono text-gray-700 mb-1">
                        <span className="font-semibold">Input:</span> {testCase.input}
                      </div>
                      <div className="font-mono text-gray-700">
                        <span className="font-semibold">Expected:</span> {testCase.expectedOutput}
                      </div>
                      {testCase.explanation && (
                        <div className="text-gray-600 mt-1">
                          {testCase.explanation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Hints */}
            {currentQuestion.type === 'coding' && currentQuestion.hints && currentQuestion.hints.length > 0 && (
              <div className="mb-3">
                <button
                  onClick={() => setShowHints(!showHints)}
                  className="w-full px-3 py-2 bg-purple-100 text-purple-700 rounded text-sm font-medium hover:bg-purple-200"
                >
                  {showHints ? 'Hide' : 'Show'} Hints ({currentQuestion.hints.length})
                </button>
                {showHints && (
                  <div className="mt-2 space-y-2">
                    {currentQuestion.hints.map((hint, idx) => (
                      <div key={idx} className="p-2 bg-purple-50 border border-purple-200 rounded text-xs text-purple-900">
                        <span className="font-semibold">Hint {idx + 1}:</span> {hint}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="mb-3">
              <div className="text-xs text-gray-500 mb-1">Progress</div>
              <div className="w-full bg-gray-200 h-2 rounded">
                <div className="h-2 bg-blue-600 rounded transition-all" style={{ width: `${progressPercent}%` }} />
              </div>
              <div className="text-xs text-gray-500 mt-1">{progressPercent}%</div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => speakQuestion(currentQ)}
                className="w-full px-3 py-2 bg-white border rounded"
              >
                Replay Question
              </button>
              <button
                onClick={() => handleNext()}
                disabled={currentQ === TECH_QUESTIONS.length - 1}
                className="w-full px-3 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
              >
                Ask Next Question
              </button>
            </div>
          </div>

          {currentQuestion.type !== 'coding' && (
            <div className="bg-white rounded-lg shadow p-4">
              <h4 className="font-semibold mb-2">Tips</h4>
              <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                <li>Speak clearly and concisely.</li>
                <li>Use examples to support your answers.</li>
                <li>Keep answers around 45–60 seconds.</li>
              </ul>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

export default TechInterviewSession;