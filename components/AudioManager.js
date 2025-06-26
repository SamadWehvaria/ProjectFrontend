import { useState, useEffect, useCallback } from 'react';

export const useAudioManager = () => {
  const [synth, setSynth] = useState(null);
  const [voices, setVoices] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentUtterance, setCurrentUtterance] = useState(null);

  useEffect(() => {
    // Initialize speech synthesis
    if (typeof window !== 'undefined') {
      const speechSynth = window.speechSynthesis;
      setSynth(speechSynth);

      // Load voices
      const loadVoices = () => {
        const availableVoices = speechSynth.getVoices();
        setVoices(availableVoices);
      };

      loadVoices();
      speechSynth.onvoiceschanged = loadVoices;

      // Cleanup function
      return () => {
        speechSynth.cancel(); // Stop any ongoing speech
        setIsPlaying(false);
        setIsPaused(false);
        setCurrentUtterance(null);
        speechSynth.onvoiceschanged = null;
      };
    }
  }, []);

  const stopAllAudio = useCallback(() => {
    if (synth) {
      synth.cancel();
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentUtterance(null);
    }
  }, [synth]);

  const pauseAudio = useCallback(() => {
    if (synth && isPlaying) {
      synth.pause();
      setIsPlaying(false);
      setIsPaused(true);
    }
  }, [synth, isPlaying]);

  const resumeAudio = useCallback(() => {
    if (synth && isPaused) {
      synth.resume();
      setIsPlaying(true);
      setIsPaused(false);
    }
  }, [synth, isPaused]);

  const playAudio = useCallback(async (audioData) => {
    try {
      if (!synth) {
        throw new Error('Speech synthesis not available');
      }

      stopAllAudio();

      const utterance = new SpeechSynthesisUtterance(audioData.text);
      utterance.lang = audioData.lang;

      // Try to find a voice for the language
      const languageVoices = voices.filter(voice => voice.lang.startsWith(audioData.lang.split('-')[0]));
      if (languageVoices.length > 0) {
        utterance.voice = languageVoices[0];
      }

      utterance.onend = () => {
        setIsPlaying(false);
        setIsPaused(false);
        setCurrentUtterance(null);
      };
      
      utterance.onerror = (error) => {
        console.error('Speech synthesis error:', error);
        setIsPlaying(false);
        setIsPaused(false);
        setCurrentUtterance(null);
      };

      setCurrentUtterance(utterance);
      setIsPlaying(true);
      setIsPaused(false);
      synth.speak(utterance);
    } catch (error) {
      console.error('Error playing audio:', error);
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentUtterance(null);
      throw error;
    }
  }, [synth, voices, stopAllAudio]);

  return {
    playAudio,
    stopAllAudio,
    pauseAudio,
    resumeAudio,
    isPlaying,
    isPaused
  };
}; 