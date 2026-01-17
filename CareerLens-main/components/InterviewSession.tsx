import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Recording {
    questionIndex: number;
    blobUrl: string;
    blob?: Blob;
}

const DEFAULT_AI_QUESTIONS = [
    "Tell me about yourself and your background.",
    "Why are you interested in this role and our company?",
    "Describe a challenging problem you solved and how you approached it.",
    "How do you prioritize tasks when working on multiple projects?",
    "Do you have any questions for me about the role or team?"
];

const InterviewSession: React.FC = () => {
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
    const [questionTimer, setQuestionTimer] = useState<number>(60);
    const timerRef = useRef<number | null>(null);
    const [mediaError, setMediaError] = useState<string | null>(null);
    const [AI_QUESTIONS, setAI_QUESTIONS] = useState<string[]>(DEFAULT_AI_QUESTIONS);

    useEffect(() => {
        const fetchHRQuestions = async (count = 10) => {
            try {
                const API_BASE = (import.meta.env.VITE_API_URL as string) || 'http://localhost:5000';
                const res = await fetch(`${API_BASE}/api/hrquestions/random?count=${count}`);
                if (!res.ok) return;
                const body = await res.json();
                if (!body || !Array.isArray(body.data) || body.data.length === 0) return;
                const qs: string[] = body.data.map((d: any) => d.question).filter(Boolean);
                if (qs.length) setAI_QUESTIONS(qs);
            } catch (err) {
                console.error('Error fetching HR questions', err);
            }
        };
        fetchHRQuestions(10);
    }, []);

    useEffect(() => {
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
                    videoRef.current.play().catch(() => { });
                }
                setCameraEnabled(s.getVideoTracks().length > 0);
                setMicEnabled(s.getAudioTracks().length > 0);
                setMediaError(null);
                speakQuestion(0);
            } catch (err: any) {
                setMediaError(err?.message || "Permission denied or no devices available.");
            }
        };
        start();
        return () => { mounted = false; stopAllMedia(); };
    }, []);

    useEffect(() => {
        clearQuestionTimer();
        setQuestionTimer(60);
        timerRef.current = window.setInterval(() => {
            setQuestionTimer((t) => {
                if (t <= 1) {
                    clearQuestionTimer();
                    if (isRecording) stopRecording();
                    if (currentQ < AI_QUESTIONS.length - 1) handleNext();
                    return 0;
                }
                return t - 1;
            });
        }, 1000);
        return () => clearQuestionTimer();
    }, [currentQ, isRecording]);

    const clearQuestionTimer = () => {
        if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    };

    const speakQuestion = (index: number) => {
        try {
            const text = AI_QUESTIONS[index];
            if ("speechSynthesis" in window) {
                window.speechSynthesis.cancel();
                const u = new SpeechSynthesisUtterance(text);
                u.lang = "en-US";
                window.speechSynthesis.speak(u);
            }
        } catch (e) { }
    };

    const startRecording = async () => {
        const s = streamRef.current;
        if (!s) { setMediaError("No media stream available."); return; }
        recordedChunksRef.current = [];
        try {
            const audioTracks = s.getAudioTracks();
            if (!audioTracks.length) { setMediaError("No audio track available."); return; }
            const audioStream = new MediaStream(audioTracks);
            let mimeType = "";
            if (typeof MediaRecorder !== "undefined") {
                if (MediaRecorder.isTypeSupported?.("audio/webm;codecs=opus")) mimeType = "audio/webm;codecs=opus";
                else if (MediaRecorder.isTypeSupported?.("audio/webm")) mimeType = "audio/webm";
                else if (MediaRecorder.isTypeSupported?.("audio/ogg")) mimeType = "audio/ogg";
            }
            const questionAtStart = currentQ;
            const mr = new MediaRecorder(audioStream, mimeType ? { mimeType } : {});
            mediaRecorderRef.current = mr;

            mr.ondataavailable = (ev: BlobEvent) => {
                if (ev.data?.size > 0) recordedChunksRef.current.push(ev.data);
            };

            mr.onstop = () => {
                const chunks = recordedChunksRef.current.slice();
                const blob = new Blob(chunks.length ? chunks : [], { type: chunks[0]?.type || "audio/webm" });
                const url = URL.createObjectURL(blob);
                setRecordings((r) => [...r, { questionIndex: questionAtStart, blobUrl: url, blob }]);
                recordedChunksRef.current = [];
            };

            mr.start();
            setIsRecording(true);
            setMediaError(null);
        } catch (err) {
            setMediaError("Recording not supported by this browser.");
        }
    };

    const stopRecording = () => {
        try { if (mediaRecorderRef.current?.state !== "inactive") mediaRecorderRef.current?.stop(); } catch (e) { }
        setIsRecording(false);
    };

    const handleNext = () => {
        clearQuestionTimer();
        setQuestionTimer(60);
        if (currentQ < AI_QUESTIONS.length - 1) {
            setCurrentQ((i) => { const next = i + 1; speakQuestion(next); return next; });
        }
    };

    const handlePrev = () => {
        clearQuestionTimer();
        setQuestionTimer(60);
        if (currentQ > 0) {
            setCurrentQ((i) => { const prev = i - 1; speakQuestion(prev); return prev; });
        }
    };

    const stopAllMedia = () => {
        try { if (mediaRecorderRef.current?.state !== "inactive") mediaRecorderRef.current?.stop(); } catch (e) { }
        streamRef.current?.getTracks().forEach((t) => { try { t.stop(); } catch (e) { } });
        streamRef.current = null;
        if (videoRef.current) videoRef.current.srcObject = null;
        try { window.speechSynthesis.cancel(); } catch (e) { }
        clearQuestionTimer();
    };

    const handleEndInterview = () => {
        try {
            const payload = recordings.map(r => ({ questionIndex: r.questionIndex, blobUrl: r.blobUrl }));
            sessionStorage.setItem("interview_recordings", JSON.stringify(payload));
        } catch (e) { }
        stopAllMedia();
        navigate("/interview-feedback");
    };

    const toggleRecord = () => { isRecording ? stopRecording() : startRecording(); };
    const progressPercent = Math.round(((currentQ + 1) / AI_QUESTIONS.length) * 100);

    return (
        <div className="min-h-screen bg-black p-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                    <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="text-lg font-semibold text-white">Live Preview</h2>
                                <p className="text-sm text-neutral-400">Your camera & mic are live for this interview.</p>
                            </div>
                            <div className="text-sm text-neutral-400">
                                Camera: {cameraEnabled ? "On" : "Off"} • Mic: {micEnabled ? "On" : "Off"}
                            </div>
                        </div>

                        <div className="bg-neutral-950 rounded-lg overflow-hidden" style={{ aspectRatio: "16/9" }}>
                            <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                        </div>

                        {mediaError && (
                            <div className="mt-3 text-sm text-red-400">
                                {mediaError} <button onClick={() => window.location.reload()} className="underline ml-2 text-neutral-300">Retry</button>
                            </div>
                        )}

                        <div className="mt-4 flex items-center justify-between flex-wrap gap-3">
                            <div className="flex items-center gap-3">
                                <button onClick={toggleRecord} className={`px-4 py-2 rounded-lg font-medium transition-all ${isRecording ? "bg-white text-black" : "bg-neutral-800 text-white border border-neutral-700"}`}>
                                    {isRecording ? "Stop Recording" : "Record Answer"}
                                </button>
                                <div className="text-sm text-neutral-400">
                                    Time: <span className="font-mono text-white">{String(questionTimer).padStart(2, "0")}s</span>
                                </div>
                                <div className="text-sm text-neutral-500">Q {currentQ + 1} / {AI_QUESTIONS.length}</div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button onClick={handlePrev} disabled={currentQ === 0} className="px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-neutral-300 disabled:opacity-50 transition-all">Prev</button>
                                <button onClick={handleNext} disabled={currentQ === AI_QUESTIONS.length - 1} className="px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-neutral-300 disabled:opacity-50 transition-all">Next</button>
                                <button onClick={handleEndInterview} className="px-3 py-2 bg-white text-black rounded-lg font-medium transition-all hover:bg-neutral-200">End Interview</button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-6">
                        <h3 className="font-semibold text-white mb-3">Recorded Answers</h3>
                        {recordings.length === 0 ? (
                            <p className="text-sm text-neutral-500">No recordings yet. Use "Record Answer" when answering each question.</p>
                        ) : (
                            <ul className="space-y-3">
                                {recordings.map((r, idx) => (
                                    <li key={idx} className="flex items-center justify-between border border-neutral-700 rounded-lg p-3 bg-neutral-800">
                                        <div>
                                            <div className="text-sm font-medium text-white">Q{r.questionIndex + 1}</div>
                                            <audio controls src={r.blobUrl} className="mt-2" />
                                        </div>
                                        <a href={r.blobUrl} download={`answer-q${r.questionIndex + 1}.webm`} className="text-sm text-neutral-400 hover:text-white transition-colors">Download</a>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                <aside className="space-y-4">
                    <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-6 sticky top-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full bg-neutral-700 flex items-center justify-center text-white text-lg font-semibold">AI</div>
                            <div>
                                <div className="font-semibold text-white">AI Interviewer</div>
                                <div className="text-sm text-neutral-500">Simulated interviewer</div>
                            </div>
                        </div>

                        <div className="border border-neutral-700 rounded-lg p-4 mb-4 bg-neutral-800">
                            <div className="text-sm text-neutral-400 mb-2 font-medium">Current Question</div>
                            <div className="text-sm text-white">{AI_QUESTIONS[currentQ]}</div>
                        </div>

                        <div className="mb-4">
                            <div className="text-xs text-neutral-500 mb-1">Progress</div>
                            <div className="w-full bg-neutral-700 h-1.5 rounded-full">
                                <div className="h-1.5 bg-white rounded-full transition-all" style={{ width: `${progressPercent}%` }} />
                            </div>
                            <div className="text-xs text-neutral-500 mt-1">{progressPercent}%</div>
                        </div>

                        <div className="space-y-2">
                            <button onClick={() => speakQuestion(currentQ)} className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-neutral-300 hover:bg-neutral-700 transition-all">
                                Replay Question
                            </button>
                            <button onClick={handleNext} disabled={currentQ === AI_QUESTIONS.length - 1} className="w-full px-3 py-2 bg-white text-black rounded-lg font-medium disabled:opacity-50 transition-all">
                                Ask Next Question
                            </button>
                        </div>
                    </div>

                    <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-6">
                        <h4 className="font-semibold text-white mb-3">Tips</h4>
                        <ul className="text-sm text-neutral-400 list-disc list-inside space-y-1">
                            <li>Speak clearly and concisely.</li>
                            <li>Use examples to support your answers.</li>
                            <li>Keep answers around 45–60 seconds.</li>
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default InterviewSession;