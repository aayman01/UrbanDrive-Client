/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useCallback } from 'react';
import { StreamChat } from 'stream-chat';
import {
  Chat,
  Channel,
  ChannelList,
  Window,
  MessageList,
  MessageInput,
  Thread,
  ChannelHeader,
} from 'stream-chat-react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import useAuth from '../../../Hooks/useAuth';

const SupportChat = () => {
  const [client, setClient] = useState<StreamChat | null>(null);
  const [activeChannel, setActiveChannel] = useState<any>(null);
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  // Add console logs to track state changes
  const handleChannelSelect = useCallback((channel: any) => {
    console.log('Selecting channel:', channel?.id);
    setActiveChannel(channel);
  }, []);

  useEffect(() => {
    console.log('Active channel changed:', activeChannel?.id);
  }, [activeChannel]);

  useEffect(() => {
    const initChat = async () => {
      // if (!user?.email?.includes('admin')) {
      //   console.error('Unauthorized access to support chat');
      //   return;
      // }

      const apiKey = import.meta.env.VITE_STREAM_API_KEY;
      if (!apiKey) {
        console.error('Stream API key is missing');
        return;
      }

      const chatClient = StreamChat.getInstance(apiKey);

      try {
        const response = await axiosPublic.post('/chat/admin-token');
        const { token } = response.data;

        await chatClient.connectUser(
          {
            id: 'support-agent',
            name: 'Customer Support',
            role: 'admin',
          },
          token
        );

        setClient(chatClient);
      } catch (error) {
        console.error('Error connecting to chat:', error);
      }
    };

    initChat();

    return () => {
      if (client) {
        setActiveChannel(null); // Clear active channel before disconnecting
        client.disconnectUser().then(() => {
          setClient(null);
        });
      }
    };
  }, [user]);

  if (!client) return (
    <div className="h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary border-opacity-75"></div>
    </div>
  );

  const filters = { 
    type: 'messaging',
    members: { $in: ['support-agent'] }
  };
  
  const sort = { last_message_at: 1 } as const;

  const CustomChannelPreview = ({ channel, setActiveChannel }: any) => {
    const customer = Object.keys(channel.state.members)
      .find(memberId => memberId !== 'support-agent');

    const lastMessage = channel.state.messages[channel.state.messages.length - 1];
    const isActive = channel === activeChannel;

    return (
      <div
        className={`p-4 hover:bg-slate-50 cursor-pointer transition-all duration-200 border-b border-slate-100 ${
          isActive ? 'bg-teal-50/70 hover:bg-teal-50/70 border-l-4 border-l-teal-600' : ''
        }`}
        onClick={() => {
          console.log('Channel clicked:', channel.id);
          setActiveChannel(channel);
        }}
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white font-bold text-sm shadow-sm">
            {customer?.charAt(0)?.toUpperCase() || '?'}
          </div>
          <div className="flex-1">
            <div className="font-bold text-sm text-slate-900">
              Customer: {customer}
            </div>
            <div className="text-xs text-slate-500 truncate mt-0.5">
              {lastMessage?.text || 'No messages yet'}
            </div>
          </div>
          {lastMessage?.created_at && (
            <div className="text-[11px] text-slate-400 font-medium">
              {new Date(lastMessage.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 font-poppins">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Support Concierge
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Direct real-time customer assistance and booking conflict resolution
        </p>
      </div>

      <div className="h-[calc(100vh-220px)] min-h-[600px] bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <Chat client={client} theme="messaging light">
          <div className="flex flex-col md:flex-row h-full">
            {/* Sidebar */}
            <div className={`${activeChannel ? 'hidden' : 'flex'} md:flex md:w-[360px] bg-slate-50/50 flex-col border-r border-slate-200/80`}>
              <div className="p-5 bg-white border-b border-slate-200/80">
                <h2 className="text-base font-bold text-slate-900">Active Inquiries</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {activeChannel ? `Chatting with: ${activeChannel.data?.name || 'Customer'}` : 'Select a ticket to respond'}
                </p>
              </div>
              <div className="flex-1 overflow-y-auto">
                <ChannelList 
                  filters={filters} 
                  sort={sort}
                  Preview={(previewProps) => (
                    <CustomChannelPreview 
                      {...previewProps} 
                      setActiveChannel={handleChannelSelect}
                    />
                  )}
                />
              </div>
            </div>

            {/* Chat Area */}
            <div className={`${activeChannel ? 'flex' : 'hidden'} md:flex flex-1 flex-col bg-white`}>
              {activeChannel ? (
                <Channel channel={activeChannel}>
                  <Window>
                    <div className="flex items-center p-4 border-b border-slate-200/80 bg-white">
                      <button 
                        className="md:hidden mr-4 text-slate-600 hover:text-slate-800 transition-colors"
                        onClick={() => setActiveChannel(null)}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <ChannelHeader />
                    </div>
                    <MessageList />
                    <MessageInput />
                  </Window>
                  <Thread />
                </Channel>
              ) : (
                <div className="h-full flex items-center justify-center bg-slate-50/30">
                  <div className="text-center p-8 max-w-sm">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-100">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">Support Workspace</h3>
                    <p className="text-xs text-slate-500">Select an ongoing inquiry from the queue to start responding.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Chat>
      </div>
    </div>
  );
};

export default SupportChat;
