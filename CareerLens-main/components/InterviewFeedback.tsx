import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Rec = { questionIndex: number; blobUrl: string };

const InterviewFeedback: React.FC = () => {
    const navigate = useNavigate();
    const [recordings, setRecordings] = useState<Rec[]>([]);
    const [ratings, setRatings] = useState<Record<number, number>>({});
    const [comments, setComments] = useState("");

    useEffect(() => {
        try {
            const raw = sessionStorage.getItem("interview_recordings");
            if (raw) setRecordings(JSON.parse(raw));
        } catch (e) {
            setRecordings([]);
        }
    }, []);

    const setRating = (idx: number, val: number) => {
        setRatings(prev => ({ ...prev, [idx]: val }));
    };

    const handleSubmitFeedback = () => {
        const avgRating = Object.values(ratings).length > 0
            ? Object.values(ratings).reduce((a, b) => a + b, 0) / Object.values(ratings).length
            : 3;

        const overallScore = Math.round(avgRating * 20);

        const mockReport = {
            overallScore,
            ratings,
            comments,
            recordingsCount: recordings.length,
            strengths: [
                "Demonstrated clear communication skills",
                "Provided structured responses to questions",
                "Showed confidence and professionalism",
                "Good use of examples to support answers"
            ],
            improvements: [
                "Consider providing more specific examples from past experience",
                "Work on maintaining consistent eye contact",
                "Practice answering common questions to improve fluency",
                "Try to keep answers concise and focused"
            ],
            categoryScores: {
                communication: Math.min(100, overallScore + Math.floor(Math.random() * 10 - 5)),
                technicalKnowledge: Math.min(100, overallScore + Math.floor(Math.random() * 10 - 5)),
                problemSolving: Math.min(100, overallScore + Math.floor(Math.random() * 10 - 5)),
                professionalism: Math.min(100, overallScore + Math.floor(Math.random() * 10 - 5))
            }
        };

        sessionStorage.setItem("interview_report", JSON.stringify(mockReport));
        sessionStorage.removeItem("interview_recordings");
        navigate("/interview-report");
    };

    return (
        <div className="min-h-screen bg-black p-6">
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-6">
                    <h2 className="text-xl font-semibold text-white mb-2">Interview Feedback</h2>
                    <p className="text-sm text-neutral-400 mb-6">Review your recorded answers and provide feedback.</p>

                    <div className="space-y-4 mb-6">
                        {recordings.length === 0 ? (
                            <div className="text-sm text-neutral-500">No recordings found.</div>
                        ) : (
                            recordings.map((r, i) => (
                                <div key={i} className="p-4 border border-neutral-700 rounded-xl bg-neutral-800">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="font-medium text-white">Question {r.questionIndex + 1}</div>
                                        <a href={r.blobUrl} download={`answer-q${r.questionIndex + 1}.webm`} className="text-sm text-neutral-400 hover:text-white transition-colors">Download</a>
                                    </div>
                                    <audio controls src={r.blobUrl} className="w-full" />
                                    <div className="mt-4 flex items-center gap-3">
                                        <div className="text-sm text-neutral-400">Self-rating:</div>
                                        {[1, 2, 3, 4, 5].map(n => (
                                            <button
                                                key={n}
                                                onClick={() => setRating(i, n)}
                                                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${ratings[i] === n ? "bg-white text-black" : "bg-neutral-700 text-neutral-300 hover:bg-neutral-600"}`}
                                            >
                                                {n}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm text-neutral-400 mb-2">Additional Comments</label>
                        <textarea
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                            className="w-full p-4 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500 transition-colors"
                            rows={4}
                            placeholder="Share your thoughts about your interview performance..."
                        />
                    </div>

                    <div className="flex justify-end gap-3">
                        <button
                            onClick={() => { sessionStorage.removeItem("interview_recordings"); navigate("/"); }}
                            className="px-4 py-2 bg-neutral-800 border border-neutral-700 text-neutral-300 rounded-lg hover:bg-neutral-700 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmitFeedback}
                            className="px-6 py-2 bg-white text-black rounded-lg font-medium hover:bg-neutral-200 transition-all"
                        >
                            Submit Feedback
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InterviewFeedback;