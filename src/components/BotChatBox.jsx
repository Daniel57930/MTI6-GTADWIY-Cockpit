import React, { useEffect, useRef, useState } from 'react';
import botClient from '../services/botClient';

/**
 * BotChatBox — persistent chat widget with text + voice.
 * - auto-starts microphone if user allows and `micEnabled` pref is true
 * - has an on/off toggle for the mic
 * - sends text commands to botClient.sendCommand(command)
 * - displays bot responses
 */
export default function BotChatBox({ position = 'bottom-right' }) {
  const [messages, setMessages] = useState([]); // { from: 'user'|'bot', text }
  const [input, setInput] = useState('');
  const [listening, setListening] = useState(false);
  const [micEnabled, setMicEnabled] = useState(() => {
    try { return JSON.parse(localStorage.getItem('botchat_mic_enabled')) ?? true; } catch { return true; }
  });
  const recognitionRef = useRef(null);
  const mountedRef = useRef(true);
  const containerRef = useRef(null);

  useEffect(() => {
    mountedRef.current = true;
    // init speech recognition if available
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recog = new SpeechRecognition();
      recog.lang = 'en-US';
      recog.interimResults = false;
      recog.onresult = (ev) => {
        const transcript = Array.from(ev.results).map(r => r[0].transcript).join('');
        pushUserMessage(transcript);
        handleSend(transcript);
      };
      recog.onerror = (e) => {
        console.warn('SpeechRecognition error', e);
        stopListening();
      };
      recog.onend = () => {
        // if micEnabled and still should be listening, restart to keep continuous
        if (mountedRef.current && micEnabled && listening) {
          startListening();
        } else {
          setListening(false);
        }
      };
      recognitionRef.current = recog;
    }

    // connect to bot backend (websocket)
    botClient.connect((evt) => {
      // handle bot pushed messages (if any)
      if (evt && evt.type === 'bot:message' && evt.text) {
        pushBotMessage(evt.text);
      }
    });

    return () => {
      mountedRef.current = false;
      stopListening();
      botClient.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // persist mic preference
    try { localStorage.setItem('botchat_mic_enabled', JSON.stringify(micEnabled)); } catch {}
    if (micEnabled && recognitionRef.current && !listening) {
      startListening();
    } else if (!micEnabled && listening) {
      stopListening();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [micEnabled]);

  function pushUserMessage(text) {
    setMessages(m => [...m, { from: 'user', text }]);
    // scroll to bottom
    setTimeout(() => containerRef.current?.scrollTo?.({ top: containerRef.current.scrollHeight, behavior: 'smooth' }), 50);
  }
  function pushBotMessage(text) {
    setMessages(m => [...m, { from: 'bot', text }]);
    setTimeout(() => containerRef.current?.scrollTo?.({ top: containerRef.current.scrollHeight, behavior: 'smooth' }), 50);
  }

  function startListening() {
    if (!recognitionRef.current) return;
    try {
      recognitionRef.current.start();
      setListening(true);
    } catch (e) {
      // may throw if already started
      console.warn('startListening failed', e);
      setListening(false);
    }
  }
  function stopListening() {
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch {}
    }
    setListening(false);
  }

  async function handleSend(text) {
    if (!text || !text.trim()) return;
    const trimmed = text.trim();
    setInput('');
    pushUserMessage(trimmed);

    // Send to bot backend
    try {
      pushBotMessage('Processing...'); // optimistic placeholder
      const res = await botClient.sendCommand({ type: 'command', text: trimmed });
      // Replace the last 'Processing...' with response
      setMessages(prev => {
        const copy = [...prev];
        const idx = copy.map(m => m.text).lastIndexOf('Processing...');
        if (idx >= 0) copy.splice(idx, 1);
        copy.push({ from: 'bot', text: (res && (res.text || res.result && res.result.summary)) || (typeof res === 'string' ? res : 'No response') });
        return copy;
      });
    } catch (err) {
      console.error('Command failed', err);
      setMessages(prev => [...prev, { from: 'bot', text: 'Error: ' + (err.message || 'failed') }]);
    }
  }

  return (
    <div style={outerStyle(position)}>
      <div style={headerStyle}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <strong style={{ color: '#dfefff' }}>Bots</strong>
          <button
            aria-pressed={micEnabled}
            onClick={() => setMicEnabled(p => !p)}
            title="Toggle microphone (persists)"
            style={micEnabled ? micBtnOn : micBtnOff}
          >
            {micEnabled ? (listening ? '🎤 On' : '🔊 Ready') : '🔇 Off'}
          </button>
        </div>
      </div>

      <div ref={containerRef} style={messagesStyle}>
        {messages.map((m, i) => (
          <div key={i} style={m.from === 'user' ? userMsgStyle : botMsgStyle}>
            <div style={{ fontSize: 13 }}>{m.text}</div>
          </div>
        ))}
      </div>

      <div style={inputRowStyle}>
        <input
          aria-label="Bot message"
          placeholder="Tell your bots: search the web for X, scrape URL Y, or run task..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleSend(input); }}
          style={inputStyle}
        />
        <button onClick={() => handleSend(input)} style={sendBtnStyle}>Send</button>
      </div>
    </div>
  );
}

/* Styles */
const outerStyle = (position) => ({
  position: 'fixed',
  zIndex: 1400,
  width: 360,
  maxWidth: 'calc(100% - 24px)',
  height: 420,
  background: '#071023',
  border: '1px solid rgba(255,255,255,0.06)',
  borderRadius: 10,
  display: 'flex',
  flexDirection: 'column',
  ...(position === 'bottom-right' ? { right: 18, bottom: 18 } : { right: 18, top: 18 }),
  boxShadow: '0 10px 30px rgba(0,0,0,0.6)'
});
const headerStyle = { padding: '10px 12px', borderBottom: '1px solid rgba(255,255,255,0.03)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' };
const messagesStyle = { padding: 12, flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8 };
const inputRowStyle = { display: 'flex', gap: 8, padding: 12, borderTop: '1px solid rgba(255,255,255,0.02)' };
const inputStyle = { flex: 1, padding: '8px 10px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)', color: '#eaf2ff' };
const sendBtnStyle = { padding: '8px 12px', borderRadius: 8, background: '#3282b8', color: '#071023', border: 'none', fontWeight: 'bold', cursor: 'pointer' };
const micBtnOn = { padding: '6px 8px', borderRadius: 8, background: '#51cf66', border: 'none', color: '#072' };
const micBtnOff = { padding: '6px 8px', borderRadius: 8, background: '#222', border: '1px solid rgba(255,255,255,0.04)', color: '#aaa' };
const userMsgStyle = { alignSelf: 'flex-end', background: 'linear-gradient(90deg,#0f375b,#163a5d)', color: '#fff', padding: 8, borderRadius: 8, maxWidth: '85%' };
const botMsgStyle = { alignSelf: 'flex-start', background: 'rgba(255,255,255,0.03)', color: '#eaf2ff', padding: 8, borderRadius: 8, maxWidth: '85%' };
