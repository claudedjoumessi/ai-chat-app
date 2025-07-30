import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import {
  Plus,
  Paperclip,
  CloudDownload,
  Settings2,
  ImagePlus,
  Globe,
  Terminal,
  Mic,
  AudioLines,
} from "lucide-react";
import { type ChatMessage } from "@/hooks/useGroqChat";

type ChatInputProps = {
  onSend?: (message: ChatMessage) => void;
  loading?: boolean;
  // Additional props for the textarea
  props?: React.ComponentProps<"textarea">;
};

const ChatInput = ({ onSend, loading, props }: ChatInputProps) => {
  const [textAreaVal, setTextAreaVal] = React.useState("");
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

  const initialMessage: ChatMessage = {
    role: "user",
    content: textAreaVal,
  };

  const handleSend = () => {
    if (textAreaVal.trim() === "") return;
    setTextAreaVal("");
    textAreaRef.current?.focus();

    onSend?.(initialMessage);
  };

  return (
    <>
      <div className="w-full h-full flex">
        <textarea
          ref={textAreaRef}
          id="chat-input"
          value={textAreaVal}
          className="w-full h-30 pt-5 px-5 rounded-3xl focus:outline-none resize-none space bg-neutral-900"
          placeholder="Ask something..."
          onChange={(e) => setTextAreaVal(e.target.value)}
          onKeyUp={(e) => {
            e.key === "Enter" && (e.preventDefault(), handleSend());
          }}
          {...props}
        />
      </div>
      <div className="absolute bottom-2.5 mx-4 my-1 flex gap-0.5 items-center">
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center justify-center rounded-lg size-9"
              >
                <Plus className="size-4 text-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-60 shadow-md"
              side="bottom"
              align="start"
            >
              <DropdownMenuItem>
                <Paperclip className="size-4" />
                <span>Add photos and files</span>
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="flex items-center gap-2">
                  <CloudDownload className="size-4" />
                  <span>Add from exteranal apps</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem className="gap-3">
                      <img
                        src="/assets/images/google-drive-icon.svg"
                        alt=""
                        className="size-5"
                      />
                      <span>Connect to Google Drive</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-3">
                      <img
                        src="/assets/images/microsoft-onedrive-icon.svg"
                        alt=""
                        className="size-5"
                      />
                      <span>Connect to Microsoft OneDrive</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center justify-center gap-2 rounded-lg"
              >
                <Settings2 className="size-4 text-foreground" />
                <span className="text-md">Connect with Tools</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-60 shadow-md"
              side="bottom"
              align="start"
            >
              <DropdownMenuItem>
                <ImagePlus />
                <span>Create an image</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Globe />
                <span>Search the web</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Terminal />
                <span>Canvas</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="absolute end-0 bottom-2.5 flex items-center gap-1 mx-5 my-1">
        <div id="voice-input">
          <Button
            disabled
            variant="ghost"
            className="flex items-center gap-2 rounded-lg h-full aspect-square"
          >
            <span className="sr-only">Voice Input</span>
            <Mic />
          </Button>
        </div>
        <div id="">
          <Button
            variant="ghost"
            className="flex items-center gap-2 rounded-lg h-full aspect-square"
            disabled={loading}
          >
            <span className="sr-only">Voice Input</span>
            <AudioLines />
          </Button>
        </div>
      </div>
    </>
  );
};

export default ChatInput;
