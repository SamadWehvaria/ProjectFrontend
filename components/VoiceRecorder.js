import React, { useState, useEffect, useRef } from 'react';
import Button from './Button';

const VoiceRecorder = ({ onTranscript, language, isDisabled }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [status, setStatus] = useState('ready'); // ready, listening, processing, error
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.webkitSpeechRecognition) {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onstart = () => {
        setStatus('listening');
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
        setStatus('ready');
      };

      recognitionRef.current.onerror = (event) => {
        setStatus('error');
        setIsRecording(false);
        console.error('Speech recognition error:', event.error);
      };

      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        
        if (event.results[0].isFinal) {
          onTranscript(transcript);
          stopRecording();
        }
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [onTranscript]);

  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = language;
    }
  }, [language]);

  const startRecording = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (error) {
        console.error('Failed to start recording:', error);
        setStatus('error');
      }
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
      setStatus('processing');
    }
  };

  return (
    <div className="relative inline-flex items-center">
      <Button
        onClick={isRecording ? stopRecording : startRecording}
        disabled={isDisabled || status === 'error'}
        variant={isRecording ? 'danger' : 'outline'}
        className="relative"
      >
        <span className="flex items-center">
          {/* Recording indicator */}
          {isRecording && (
            <span className="absolute -left-1 -top-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          )}
          
          {/* Icon */}
          <svg 
            className={`h-5 w-5 ${isRecording ? 'text-white' : 'text-gray-600'}`}
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            {isRecording ? (
              <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            ) : (
              <path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            )}
          </svg>

          {/* Status text */}
          <span className="ml-2">
            {status === 'ready' && !isRecording && 'Start Recording'}
            {status === 'listening' && 'Recording...'}
            {status === 'processing' && 'Processing...'}
            {status === 'error' && 'Try Again'}
          </span>
        </span>
      </Button>

      {/* Status indicator */}
      {status === 'listening' && (
        <div className="absolute -right-2 -top-2 flex items-center justify-center">
          <div className="animate-pulse flex space-x-1">
            <div className="h-2 w-2 bg-red-500 rounded-full"></div>
            <div className="h-2 w-2 bg-red-500 rounded-full"></div>
            <div className="h-2 w-2 bg-red-500 rounded-full"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceRecorder; 