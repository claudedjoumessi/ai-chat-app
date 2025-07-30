import { ChatSidebar, ChatInput, ChatMessageBubble } from "@/components/chat";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "../ui/button";
import { Ellipsis, Upload } from "lucide-react";
import { type ChatMessage } from "@/hooks/useGroqChat";

type ChatSessionProps = {
  messages: ChatMessage[];
  onSend?: (message: ChatMessage) => void;
  isLoading?: boolean;
};

export default function ChatSession({ messages, onSend, isLoading }: ChatSessionProps) {
  return (
    <SidebarProvider>
      <ChatSidebar />
      <SidebarInset className="overflow-hidden" style={{ height: 'calc(100dvh - (8.5px * 2))'}}>
        <header className="absolute top-0 w-full flex h-16 shrink-0 items-center gap-2 rounded-t-md bg-[hsla(0,0%,4%,.85)] px-4 backdrop-blur-xs z-20">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <span className="text-md text-muted-foreground">
              Session {messages.length} Messages
            </span>

            <div className="absolute right-0 flex items-center gap-2 px-6 ml-auto">
              <Button
                variant={"ghost"}
                className="flex items-center gap-2 rounded-lg"
              >
                <Upload className="size-4 text-foreground" />
                <span className="text-md">Upload</span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant={"ghost"}
                    className="flex items-center aspect-square rounded-lg"
                  >
                    <Ellipsis className="size-4 text-foreground" />
                    <span className="sr-only">More options</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48" side="bottom" align="end">
                  <DropdownMenuItem>
                    <span>Settings</span>
                    <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Help</span>
                    <DropdownMenuShortcut>F1</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <span>Logout</span>
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        <main className="overflow-y-scroll h-full w-full relative flex justify-center rounded-b-2xl pt-20 mb-35 ">
          <section
            id="chatMessages"
            className="h-full flex justify-center w-full rounded-b-2xl"
          >
            <div
              id="chat"
              className="max-w-2xl h-full w-full flex flex-col gap-8 pb-5"
            >
              {messages.map((message, index) => (
                <ChatMessageBubble
                  key={index}
                  role={message.role}
                  content={message.content}
                />
              ))}
            </div>
          </section>
          <div className="max-w-2xl w-full fixed bottom-0 mb-5">
            <ChatInput onSend={onSend} props={{ autoFocus: true }} loading={isLoading} />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
