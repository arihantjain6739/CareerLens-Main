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
    // TODO: send feedback to backend
    console.log("feedback", { ratings, comments, recordings });
    sessionStorage.removeItem("interview_recordings");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Interview Feedback</h2>
          <p className="text-sm text-gray-600 mb-4">Review your recorded answers and provide feedback.</p>

          <div className="space-y-4 mb-4">
            {recordings.length === 0 ? (
              <div className="text-sm text-gray-500">No recordings found.</div>
            ) : (
              recordings.map((r, i) => (
                <div key={i} className="p-3 border rounded">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">Question {r.questionIndex + 1}</div>
                    <a href={r.blobUrl} download={`answer-q${r.questionIndex + 1}.webm`} className="text-sm text-blue-600">Download</a>
                  </div>
                  <audio controls src={r.blobUrl} className="w-full" />
                  <div className="mt-3 flex items-center gap-3">
                    <div className="text-sm text-gray-600">Self-rating:</div>
                    {[1,2,3,4,5].map(n => (
                      <button
                        key={n}
                        onClick={() => setRating(i, n)}
                        className={`px-2 py-1 rounded ${ratings[i] === n ? "bg-blue-600 text-white" : "bg-gray-100"}`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Comments</label>
            <textarea value={comments} onChange={(e) => setComments(e.target.value)} className="w-full p-2 border rounded" rows={4} />
          </div>

          <div className="mt-4 flex justify-end gap-3">
            <button onClick={() => { sessionStorage.removeItem("interview_recordings"); navigate("/"); }} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
            <button onClick={handleSubmitFeedback} className="px-4 py-2 bg-blue-600 text-white rounded">Submit Feedback</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewFeedback;