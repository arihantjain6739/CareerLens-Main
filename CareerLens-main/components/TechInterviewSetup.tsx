import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Mic, Eye, MessageSquare, Users, CheckCircle, Settings, HelpCircle } from 'lucide-react';

const TechInterviewSetup: React.FC = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const rafRef = useRef<number | null>(null);

  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [micEnabled, setMicEnabled] = useState(false);
  const [selectedCamera, setSelectedCamera] = useState('');
  const [selectedMic, setSelectedMic] = useState('');
  const [devices, setDevices] = useState<{ cameras: MediaDeviceInfo[]; mics: MediaDeviceInfo[] }>({ cameras: [], mics: [] });
  const [agreed, setAgreed] = useState(false);
  const [connectionSpeed, setConnectionSpeed] = useState('Strong (54 Mbps)');
  const [browser, setBrowser] = useState('Chrome v122 (Supported)');
  const [permissions, setPermissions] = useState<'Unknown' | 'Granted' | 'Needed'>('Unknown');

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [micLevel, setMicLevel] = useState(0); // 0..1

  // progress state: camera, mic, consent
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Get available devices
    navigator.mediaDevices
      .enumerateDevices()
      .then(deviceList => {
        const cameras = deviceList.filter(device => device.kind === 'videoinput');
        const mics = deviceList.filter(device => device.kind === 'audioinput');
        setDevices({ cameras, mics });
        if (cameras.length > 0 && !selectedCamera) setSelectedCamera(cameras[0].deviceId);
        if (mics.length > 0 && !selectedMic) setSelectedMic(mics[0].deviceId);
      })
      .catch(err => {
        console.error('Error getting devices:', err);
      });

    // Detect browser
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Chrome')) {
      setBrowser('Chrome (Supported)');
    } else if (userAgent.includes('Firefox')) {
      setBrowser('Firefox (Supported)');
    } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
      setBrowser('Safari (Supported)');
    } else {
      setBrowser('Unknown');
    }

    // Check connection (simplified)
    if ((navigator as any).connection) {
      const conn = (navigator as any).connection;
      const effectiveType = conn.effectiveType || 'unknown';
      setConnectionSpeed(`Strong (${effectiveType})`);
    }

    // Ensure cleanup on unmount
    return () => {
      stopStream();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // update progress whenever camera/mic/agreed change
  useEffect(() => {
    let p = 0;
    if (cameraEnabled) p += 33;
    if (micEnabled) p += 33;
    if (agreed) p += 34;
    setProgress(p);
  }, [cameraEnabled, micEnabled, agreed]);

  // Restart preview when selected devices change
  useEffect(() => {
    if (!selectedCamera && !selectedMic) return;
    startPreview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCamera, selectedMic]);

  const startPreview = async () => {
    stopStream(); // clear previous tracks / audio context
    try {
      const constraints: MediaStreamConstraints = {
        video: selectedCamera ? { deviceId: { exact: selectedCamera } } : true,
        audio: selectedMic ? { deviceId: { exact: selectedMic }, echoCancellation: true, noiseSuppression: true } : false,
      };

      const s = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(s);

      // attach to video (muted to avoid echo) for preview
      if (videoRef.current) {
        videoRef.current.srcObject = s;
        videoRef.current.muted = true;
      }

      const hasVideo = s.getVideoTracks().length > 0;
      const hasAudio = s.getAudioTracks().length > 0;
      setCameraEnabled(hasVideo);
      setMicEnabled(hasAudio);
      setPermissions(hasVideo || hasAudio ? 'Granted' : 'Needed');

      // Setup audio analyzer to show mic activity if audio present
      if (hasAudio) {
        try {
          const AudioCtx = (window as any).AudioContext || (window as any).webkitAudioContext;
          if (!audioContextRef.current) audioContextRef.current = new AudioCtx();
          const ctx = audioContextRef.current;
          analyserRef.current = ctx.createAnalyser();
          analyserRef.current.fftSize = 256;
          const source = ctx.createMediaStreamSource(s);
          audioSourceRef.current = source;
          source.connect(analyserRef.current);
          startMeter();
        } catch (err) {
          console.warn('Audio analyzer not available:', err);
        }
      }
    } catch (err) {
      console.error('Error accessing media devices:', err);
      setPermissions('Needed');
      setCameraEnabled(false);
      setMicEnabled(false);
    }
  };

  const stopStream = () => {
    // stop media tracks
    if (stream) {
      stream.getTracks().forEach(track => {
        try {
          track.stop();
        } catch (e) {
          /* ignore */
        }
      });
      setStream(null);
    }

    // stop visual preview
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraEnabled(false);
    setMicEnabled(false);

    // stop audio analyzer
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (audioSourceRef.current) {
      try {
        audioSourceRef.current.disconnect();
      } catch (e) {}
      audioSourceRef.current = null;
    }
    if (analyserRef.current) {
      analyserRef.current.disconnect();
      analyserRef.current = null;
    }
    if (audioContextRef.current) {
      try {
        audioContextRef.current.close();
      } catch (e) {}
      audioContextRef.current = null;
    }
    setMicLevel(0);
    setPermissions('Needed');
  };

  const startMeter = () => {
    const analyser = analyserRef.current;
    if (!analyser) return;
    const data = new Uint8Array(analyser.frequencyBinCount);

    const loop = () => {
      analyser.getByteTimeDomainData(data);
      // compute RMS normalized 0..1
      let sum = 0;
      for (let i = 0; i < data.length; i++) {
        const v = data[i] - 128;
        sum += v * v;
      }
      const rms = Math.sqrt(sum / data.length) / 128;
      setMicLevel(prev => {
        // smooth
        const next = Math.max(rms, prev * 0.8);
        return next;
      });
      rafRef.current = requestAnimationFrame(loop);
    };
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(loop);
  };

  // Toggle camera without affecting mic and vice-versa
  const toggleCamera = async () => {
    if (cameraEnabled) {
      stream?.getVideoTracks().forEach(t => t.stop());
      if (videoRef.current) videoRef.current.srcObject = null;
      setCameraEnabled(false);
    } else {
      // request only video (keep existing audio device if any)
      try {
        const constraints: MediaStreamConstraints = {
          video: selectedCamera ? { deviceId: { exact: selectedCamera } } : true,
          audio: false,
        };
        const s = await navigator.mediaDevices.getUserMedia(constraints);
        // attach video tracks to existing stream if present
        if (stream) {
          s.getVideoTracks().forEach(t => stream.addTrack(t));
          setStream(stream);
          if (videoRef.current) videoRef.current.srcObject = stream;
        } else {
          setStream(s);
          if (videoRef.current) videoRef.current.srcObject = s;
        }
        setCameraEnabled(s.getVideoTracks().length > 0);
      } catch (err) {
        console.error('Error enabling camera:', err);
      }
    }
  };

  const toggleMic = async () => {
    if (micEnabled) {
      stream?.getAudioTracks().forEach(t => t.stop());
      // disconnect analyzer
      if (audioSourceRef.current) {
        try {
          audioSourceRef.current.disconnect();
        } catch (e) {}
        audioSourceRef.current = null;
      }
      if (analyserRef.current) {
        try {
          analyserRef.current.disconnect();
        } catch (e) {}
        analyserRef.current = null;
      }
      if (audioContextRef.current) {
        try {
          audioContextRef.current.close();
        } catch (e) {}
        audioContextRef.current = null;
      }
      setMicEnabled(false);
      setMicLevel(0);
    } else {
      // request audio only and merge with existing stream
      try {
        const s = await navigator.mediaDevices.getUserMedia({
          audio: selectedMic ? { deviceId: { exact: selectedMic }, echoCancellation: true, noiseSuppression: true } : true,
          video: false,
        });
        if (stream) {
          s.getAudioTracks().forEach(t => stream.addTrack(t));
          setStream(stream);
          if (videoRef.current) videoRef.current.srcObject = stream;
        } else {
          setStream(s);
          if (videoRef.current) videoRef.current.srcObject = s;
        }
        const hasAudio = s.getAudioTracks().length > 0;
        setMicEnabled(hasAudio);
        setPermissions(hasAudio ? 'Granted' : 'Needed');

        // setup analyzer on the new stream (prefer newly obtained one)
        try {
          const AudioCtx = (window as any).AudioContext || (window as any).webkitAudioContext;
          if (!audioContextRef.current) audioContextRef.current = new AudioCtx();
          const ctx = audioContextRef.current;
          analyserRef.current = ctx.createAnalyser();
          analyserRef.current.fftSize = 256;
          const source = ctx.createMediaStreamSource(stream || s);
          audioSourceRef.current = source;
          source.connect(analyserRef.current);
          startMeter();
        } catch (err) {
          console.warn('Audio analyzer not available after toggle:', err);
        }
      } catch (err) {
        console.error('Error enabling mic:', err);
        setPermissions('Needed');
      }
    }
  };

  const handleStartInterview = () => {
    if (!agreed) {
      alert('Please agree to the privacy terms to continue.');
      return;
    }
    // Stop local preview before navigating so interview page can request fresh permissions if needed
    stopStream();
    navigate('/tech-interview-session');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Camera className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">CareerReady AI</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Settings className="h-5 w-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <HelpCircle className="h-5 w-5 text-gray-600" />
              </button>
              <button
                onClick={() => {
                  stopStream();
                  navigate('/');
                }}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* small controls for toggling */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-3">
          <button onClick={toggleCamera} className={`px-3 py-1 rounded ${cameraEnabled ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>
            {cameraEnabled ? 'Camera On' : 'Camera Off'}
          </button>
          <button onClick={toggleMic} className={`px-3 py-1 rounded ${micEnabled ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>
            {micEnabled ? 'Mic On' : 'Mic Off'}
          </button>
          <button onClick={startPreview} className="px-3 py-1 rounded bg-blue-600 text-white">
            Restart Preview
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold text-gray-900">Get Ready for your Interview</h1>
            <span className="text-sm font-semibold text-blue-600">{progress}% Complete</span>
          </div>
           <p className="text-sm text-gray-600 mb-4">Step 3 of 4: Interview Setup</p>
           {/* Progress Bar */}
           <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${progress}%` }}
            />
           </div>
         </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Camera Setup */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Camera className="h-5 w-5 text-green-600" />
                  <h2 className="text-lg font-semibold text-gray-900">Camera Preview</h2>
                </div>
                <span className="flex items-center space-x-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                  <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                  <span>Live</span>
                </span>
              </div>

              {/* Video Preview */}
              <div className="relative bg-gray-900 rounded-lg overflow-hidden mb-4" style={{ aspectRatio: '16/9' }}>
                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                <div className="absolute inset-0 border-2 border-dashed border-gray-400 rounded-lg m-4 flex items-center justify-center pointer-events-none">
                  <span className="text-white text-sm bg-black bg-opacity-50 px-3 py-1 rounded">Ideally, position your face here</span>
                </div>

                {/* Mic indicator */}
                <div className="absolute bottom-4 right-4 flex items-center space-x-3">
                  <button className="p-2 bg-gray-800 bg-opacity-75 rounded-full hover:bg-opacity-100">
                    <Mic className="h-4 w-4 text-white" />
                  </button>
                  <div className="flex items-end gap-1 h-6">
                    {[0, 1, 2, 3, 4].map(i => {
                      const level = micLevel;
                      const height = Math.max(3, Math.round((level * 100) / (i + 2)));
                      const opacity = Math.min(1, level * 3 - i * 0.2);
                      return (
                        <div
                          key={i}
                          style={{ width: 4, height: `${height}px`, background: '#3b82f6', opacity: opacity > 0.1 ? opacity : 0.15, borderRadius: 2 }}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Device Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Camera Source</label>
                  <select
                    value={selectedCamera}
                    onChange={(e) => setSelectedCamera(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {devices.cameras.length === 0 && <option value="">No camera found</option>}
                    {devices.cameras.map(camera => (
                      <option key={camera.deviceId} value={camera.deviceId}>
                        {camera.label || 'Camera'}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Microphone Source</label>
                  <select
                    value={selectedMic}
                    onChange={(e) => setSelectedMic(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {devices.mics.length === 0 && <option value="">No microphone found</option>}
                    {devices.mics.map(mic => (
                      <option key={mic.deviceId} value={mic.deviceId}>
                        {mic.label || 'Microphone'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="text-sm text-gray-500 mb-4">
                Permissions: {permissions} • Camera: {cameraEnabled ? 'On' : 'Off'} • Mic: {micEnabled ? 'On' : 'Off'}
              </div>

              {/* Tip */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start space-x-3">
                <svg className="w-6 h-6 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-amber-900">Tip:</p>
                  <p className="text-sm text-amber-800">Ensure you are in a quiet environment with good lighting. Your background should be neutral if possible.</p>
                </div>
              </div>
            </div>

            {/* System Check */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col items-center">
                <CheckCircle className="h-6 w-6 text-green-600 mb-2" />
                <p className="text-xs font-medium text-gray-500 mb-1">CONNECTION</p>
                <p className="text-sm font-semibold text-gray-900">{connectionSpeed}</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col items-center">
                <CheckCircle className="h-6 w-6 text-green-600 mb-2" />
                <p className="text-xs font-medium text-gray-500 mb-1">BROWSER</p>
                <p className="text-sm font-semibold text-gray-900">{browser}</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col items-center">
                <CheckCircle className="h-6 w-6 text-green-600 mb-2" />
                <p className="text-xs font-medium text-gray-500 mb-1">SYSTEM</p>
                <p className="text-sm font-semibold text-gray-900">{permissions}</p>
              </div>
            </div>
          </div>

          {/* Right Column - Evaluation Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <div className="flex items-center space-x-2 mb-6">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Eye className="h-5 w-5 text-blue-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">How the AI evaluates you</h2>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                    <Eye className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Confidence Analysis</h3>
                    <p className="text-sm text-gray-600">AI tracks eye contact consistency and posture stability.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
                    <MessageSquare className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Answer Relevance</h3>
                    <p className="text-sm text-gray-600">Measures how well you stay on topic and the depth of your knowledge.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-orange-100 rounded-lg flex-shrink-0">
                    <Users className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Speaking Skills</h3>
                    <p className="text-sm text-gray-600">Analyzes clarity, pace, tone, and use of filler words (um, uh, like).</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-600">
                    I understand my video will be processed securely for analysis purposes only and will not be shared publicly.
                  </span>
                </label>
              </div>

              <button
                onClick={handleStartInterview}
                disabled={!agreed || !cameraEnabled}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center space-x-2 transition-colors"
              >
                <span>Start Interview</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechInterviewSetup;
