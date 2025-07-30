import React from 'react';

export type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};
export const useGroqChat = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const sendMessage = async (
    chatHistory: ChatMessage[],
    onChunk: (text: string) => void
  ) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8000/chat/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: chatHistory }),
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) throw new Error('No stream');

      let done = false;
      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        const chunk = decoder.decode(value);

        // Parse SSE lines
        chunk.split('\n\n').forEach((line) => {
          if (line.startsWith('data: ')) {
            const data = line.replace('data: ', '');
            if (data === '[DONE]') return;
            onChunk(data);
          }
        });
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading, error };
};
