import { ChatWelcome } from "@/components/chat";
import { type ChatMessage, useGroqChat } from "@/hooks/useGroqChat";
import ChatSession from "@/components/chat/ChatSession";
import React from "react";

const Chat = () => {
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [streamReply, setStreamReply] = React.useState<string>("");
  const { sendMessage } = useGroqChat();

  const handleSend = async (message: ChatMessage) => {
    const userMessage: ChatMessage = { role: "user", content: message.content };
    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    setIsLoading(true);
    setStreamReply("");

    let fullResponse = ""

    await sendMessage(newMessages, (chunk: string) => {
      fullResponse += chunk;
      setStreamReply(fullResponse);
    });
    // (streamReply)
      setMessages([
        ...newMessages,
        { role: "assistant", content: fullResponse },
      ]);
      setStreamReply("");
      setIsLoading(false);
    // }
  };

  return (
    <>
      {messages.length === 0 ? (
        <ChatWelcome onSend={handleSend} />
      ) : (
        <ChatSession
          messages={[
            ...messages,
            ...(isLoading && streamReply
              ? [{ role: "assistant" as const, content: streamReply }]
              : []),
          ]}
          onSend={handleSend}
          isLoading={isLoading}
        />
      )}
    </>
  );
};

export default Chat;
