import React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import type { ChatMessage } from "@/hooks/useGroqChat";

type ChatMessageBubbleProps = {
  isLoading?: boolean;
} & ChatMessage;

const ChatMessageBubble = ({
  role,
  content,
  isLoading,
}: ChatMessageBubbleProps) => {
  return (
    <div
      className={`${cn(
        "relative flex items-center py-1",
        role === "user" ? "justify-end" : "justify-start"
      )}`}
    >
      {role === "assistant" ? (
        <Avatar
          className={"h-full mt-7 absolute left-[-32px] flex items-start"}
        >
          <AvatarImage
            src="/assets/images/chatgpt-icon.svg"
            alt="Assistant Avatar"
            className="size-7"
          />
          <AvatarFallback>{"A"}</AvatarFallback>
        </Avatar>
      ) : (
        <></>
      )}
      <div
        className={`${cn(
          "px-5 py-2.5 rounded-2xl",
          role === "user" ? "bg-neutral-800 max-w-lg" : "max-w-xl"
        )}`}
      >
        <span>{content}</span>
      </div>
    </div>
  );
};

export default ChatMessageBubble;
