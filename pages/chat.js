// pages/Chat.js
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import VoiceRecorder from '../components/VoiceRecorder';
import { useAudioManager } from '../components/AudioManager';
import { toast } from 'react-hot-toast';

export default function Chat() {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [myLanguage, setMyLanguage] = useState('en');
  const [expandedMessage, setExpandedMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [currentPlayingMessageId, setCurrentPlayingMessageId] = useState(null);
  const chatEndRef = useRef(null);
  const { playAudio, stopAllAudio, isPlaying } = useAudioManager();

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://healthtranslate.onrender.com';

  const languages = [
    { name: 'English', code: 'en' },
    { name: 'Spanish', code: 'es' },
    { name: 'French', code: 'fr' },
    { name: 'Arabic', code: 'ar' },
    { name: 'Urdu', code: 'ur' },
    { name: 'Chinese', code: 'zh' },
    { name: 'Hindi', code: 'hi' },
    { name: 'Portuguese', code: 'pt' },
  ];

  // Language mapping for display names
  const languageNames = {
    'en': 'English',
    'es': 'Spanish',
    'fr': 'French',
    'ar': 'Arabic',
    'ur': 'Urdu',
    'zh': 'Chinese'
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      stopAllAudio(); // Stop audio before redirecting
      router.push('/auth');
      return;
    }
    setUserName(user.username);

    setMessages([
      {
        id: 1,
        text: 'Welcome to Healthcare Chat! How can I assist you today?',
        isSystem: true,
        time: new Date().toLocaleTimeString(),
        translations: {},
        lang: 'en',
      },
    ]);

    // Cleanup function to stop audio when component unmounts
    return () => {
      stopAllAudio();
    };
  }, [router, stopAllAudio]);

  // Add cleanup for route changes
  useEffect(() => {
    const handleRouteChange = () => {
      stopAllAudio();
      setIsSpeaking(false);
      setCurrentPlayingMessageId(null);
    };

    router.events.on('routeChangeStart', handleRouteChange);
    router.events.on('beforeHistoryChange', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
      router.events.off('beforeHistoryChange', handleRouteChange);
    };
  }, [router, stopAllAudio]);

  const handleSignOut = () => {
    stopAllAudio(); // Stop any playing audio
    setIsSpeaking(false);
    setCurrentPlayingMessageId(null);
    localStorage.removeItem('user');
    router.push('/auth');
  };

  useEffect(() => {
    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, [messages]);

  const handleVoiceTranscript = async (transcript) => {
    if (transcript.trim()) {
      await sendMessage(true, transcript);
    }
  };

  const sendMessage = async (isVoiceNote = false, voiceText = '') => {
    const messageText = voiceText || input;
    if (!messageText.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: messageText,
      isMe: true,
      isVoiceNote,
      time: new Date().toLocaleTimeString(),
      translations: {},
      lang: myLanguage,
      sender: userName,
    };
    setMessages(prev => [...prev, newMessage]);
    setInput('');

    try {
      setIsLoading(true);
      const response = await axios.post(`${API_URL}/provider-response`, {
        text: messageText,
        lang: myLanguage,
      });
      const providerMessage = {
        id: Date.now() + 1,
        text: response.data.response,
        isMe: false,
        time: new Date().toLocaleTimeString(),
        translations: {},
        lang: myLanguage,
        sender: 'Provider',
      };
      setMessages(prev => [...prev, providerMessage]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          text: 'Error: Could not get provider response.',
          isSystem: true,
          time: new Date().toLocaleTimeString(),
          translations: {},
          lang: 'en',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const toggleMessageOptions = (id) => {
    setExpandedMessage(expandedMessage === id ? null : id);
  };

  const handleTranslate = async (messageId, targetLang) => {
    const message = messages.find(msg => msg.id === messageId);
    if (!message || message.translations[targetLang] || message.lang === targetLang) return;

    try {
      setIsLoading(true);
      const response = await axios.post(`${API_URL}/translate`, {
        text: message.text,
        source_lang: message.lang,
        target_lang: targetLang,
      }, {
        headers: { Authorization: `Bearer mock-token` },
      });
      const translated = response.data.translated_text;
      if (translated && translated !== 'Translation failed') {
        setMessages(prev =>
          prev.map(msg =>
            msg.id === messageId
              ? { ...msg, translations: { ...msg.translations, [targetLang]: translated } }
              : msg
          )
        );
      } else {
        throw new Error('Translation failed');
      }
    } catch (error) {
      console.error('Translation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Audio playback control function
  const toggleAudio = async (text, lang, messageId) => {
    try {
      setIsLoadingAudio(true);
      // Stop any currently playing audio
      stopAllAudio();
      setCurrentPlayingMessageId(messageId);
      
      console.log('Making TTS request:', { text, lang });
      const response = await axios.post(
        `${API_URL}/text-to-speech`,
        { text, lang },
        { timeout: 30000 }
      );

      // Play the audio using Web Speech API
      await playAudio(response.data);
    } catch (error) {
      console.error('TTS error:', error);
      let errorMessage = 'Text-to-speech failed';
      
      if (error.response) {
        errorMessage = error.response.data?.detail || error.message;
      } else {
        errorMessage = error.message;
      }

      console.error('Detailed error:', errorMessage);
      toast.error(errorMessage);
      setCurrentPlayingMessageId(null);
    } finally {
      setIsLoadingAudio(false);
    }
  };

  const AudioButton = ({ text, lang, messageId, isTranslation = false }) => {
    const isThisPlaying = currentPlayingMessageId === messageId && isPlaying;
    const isThisLoading = isLoadingAudio && currentPlayingMessageId === messageId;
    const languageName = languages.find(l => l.code === lang)?.name || languageNames[lang] || lang;
    const label = isTranslation ? `${languageName}` : `Original (${languageName})`;

    const handlePlayPause = () => {
      if (isThisPlaying) {
        // If this audio is playing, stop it
        stopAllAudio();
        setCurrentPlayingMessageId(null);
      } else {
        // If this is a new audio or was stopped, start it
        toggleAudio(text, lang, messageId);
      }
    };

    return (
      <div className="flex items-center gap-1">
        <Button
          size="sm"
          variant={isThisPlaying ? "accent" : "primary"}
          onClick={handlePlayPause}
          className={`
            flex items-center gap-2 px-3 py-1.5 min-w-[140px] justify-center
            ${isTranslation ? 'ml-2' : ''}
            hover:shadow-md transition-all duration-200
          `}
          disabled={isLoadingAudio && !isThisPlaying}
          isLoading={isThisLoading}
          title={isThisPlaying ? "Pause" : "Play"}
        >
          <span 
            className={`
              text-xl font-bold transition-all duration-200
              ${isThisPlaying ? 'scale-110' : 'hover:scale-110'}
            `}
            aria-label={isThisPlaying ? "Pause" : "Play"}
          >
            {isThisPlaying ? '⏸' : '▶'}
          </span>
          <span className="text-sm font-medium whitespace-nowrap">
            {label}
          </span>
        </Button>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar onSignOut={handleSignOut} /> {/* Removed userName prop */}
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 bg-blue-600">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-semibold text-white">Healthcare Translation Chat</h1>
                <p className="text-blue-100 text-sm">Connected as {userName}</p>
              </div>
              <div className="flex items-center space-x-4">
                <select
                  value={myLanguage}
                  onChange={(e) => setMyLanguage(e.target.value)}
                  className="block w-40 rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="h-[calc(100vh-400px)] overflow-y-auto px-6 py-4">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.isMe ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`rounded-lg p-4 max-w-[80%] space-y-2 ${
                      message.isMe
                        ? 'bg-blue-600 text-white'
                        : 'bg-white shadow-md'
                    }`}
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex items-start justify-between gap-3">
                        <p className={`${message.isMe ? 'text-white' : 'text-gray-800'} flex-1`}>
                          {message.text}
                        </p>
                        <div className="flex-shrink-0">
                          <AudioButton 
                            text={message.text} 
                            lang={message.lang} 
                            messageId={`${message.id}-original`}
                          />
                        </div>
                      </div>

                      {message.translations && Object.entries(message.translations).map(([lang, text]) => (
                        <div
                          key={lang}
                          className="flex items-start justify-between gap-3 border-t pt-2 border-opacity-20"
                        >
                          <p className={`${message.isMe ? 'text-white' : 'text-gray-800'} flex-1`}>
                            {text}
                          </p>
                          <div className="flex-shrink-0">
                            <AudioButton 
                              text={text} 
                              lang={lang} 
                              messageId={`${message.id}-${lang}`}
                              isTranslation={true}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-end gap-2 mt-2 pt-2 border-t border-opacity-20">
                      <Button
                        size="sm"
                        variant={message.isMe ? 'secondary' : 'primary'}
                        onClick={() => toggleMessageOptions(message.id)}
                        className="text-sm"
                      >
                        Translate
                      </Button>
                    </div>

                    {expandedMessage === message.id && (
                      <div className="mt-2 pt-2 border-t border-opacity-20 grid grid-cols-2 gap-2">
                        {languages
                          .filter((lang) => lang.code !== message.lang)
                          .map((lang) => (
                            <Button
                              key={lang.code}
                              size="sm"
                              variant="secondary"
                              onClick={() => handleTranslate(message.id, lang.code)}
                              disabled={isLoading || message.translations[lang.code]}
                              className="text-sm"
                            >
                              {lang.name}
                            </Button>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 px-6 py-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  rows="3"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <Button
                  onClick={() => sendMessage()}
                  disabled={isLoading || !input.trim()}
                >
                  {isLoading ? <ClipLoader size={20} color="#ffffff" /> : 'Send'}
                </Button>
                <VoiceRecorder
                  onTranscript={handleVoiceTranscript}
                  language={myLanguage}
                  isDisabled={isLoading}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
