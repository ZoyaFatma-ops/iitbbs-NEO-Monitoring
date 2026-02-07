import { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, Hash, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import supabase from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

const CommunityChat = () => {
    const { session } = useAuth();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const messagesEndRef = useRef(null);

    // Scroll to bottom of chat
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        let isSubscribed = true;
        let channel = null;

        // Fetch initial messages
        const fetchMessages = async () => {
            try {
                const { data, error } = await supabase
                    .from('messages')
                    .select('*')
                    .order('created_at', { ascending: true })
                    .limit(50);

                if (error) throw error;
                if (isSubscribed) {
                    setMessages(data || []);
                }
            } catch (error) {
                console.error('Error fetching messages:', error);
                if (isSubscribed) {
                    toast.error('Failed to load messages: ' + error.message);
                }
            } finally {
                if (isSubscribed) {
                    setLoading(false);
                }
            }
        };

        fetchMessages();

        // Subscribe to real-time changes with a small delay to avoid race conditions
        const setupRealtimeSubscription = () => {
            if (!isSubscribed) return;

            console.log('Setting up Supabase Realtime subscription...');
            channel = supabase
                .channel('messages-realtime-' + Date.now())
                .on(
                    'postgres_changes',
                    {
                        event: 'INSERT',
                        schema: 'public',
                        table: 'messages',
                    },
                    (payload) => {
                        if (!isSubscribed) return;
                        console.log('New message received via realtime:', payload);
                        setMessages((prev) => {
                            // Prevent duplicates if we already added it optimistically
                            const exists = prev.some(msg => msg.id === payload.new.id);
                            if (exists) {
                                console.log('Message already exists, skipping duplicate');
                                return prev;
                            }
                            return [...prev, payload.new];
                        });
                    }
                )
                .subscribe((status, err) => {
                    if (!isSubscribed) return;
                    console.log('Subscription status:', status, err || '');
                    setIsConnected(status === 'SUBSCRIBED');

                    if (status === 'SUBSCRIBED') {
                        console.log('Successfully subscribed to messages channel');
                    }
                    if (status === 'CHANNEL_ERROR') {
                        console.error('Realtime channel error:', err);
                        toast.error('Realtime connection failed. Please check if Realtime is enabled in your Supabase project.');
                    }
                    if (status === 'TIMED_OUT') {
                        console.error('Realtime connection timed out - retrying...');
                        // Retry after timeout
                        setTimeout(() => {
                            if (isSubscribed && channel) {
                                supabase.removeChannel(channel);
                                setupRealtimeSubscription();
                            }
                        }, 2000);
                    }
                });
        };

        // Small delay to let React Strict Mode cleanup finish
        const timeoutId = setTimeout(setupRealtimeSubscription, 100);

        return () => {
            isSubscribed = false;
            clearTimeout(timeoutId);
            if (channel) {
                console.log('Cleaning up Supabase channel...');
                supabase.removeChannel(channel);
            }
        };
    }, []);

    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (!newMessage.trim() || !session?.user) return;

        setSending(true);
        try {
            const { data, error } = await supabase
                .from('messages')
                .insert([
                    {
                        content: newMessage.trim(),
                        user_id: session.user.id,
                        user_email: session.user.email,
                    },
                ])
                .select()
                .single();

            if (error) throw error;

            // Optimistically add message to UI
            setMessages((prev) => [...prev, data]);
            setNewMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
            toast.error('Failed to send: ' + error.message);
        } finally {
            setSending(false);
        }
    };

    const formatTime = (timestamp) => {
        return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const getUserColor = (email) => {
        const colors = ['cyan', 'purple', 'green', 'yellow', 'red', 'blue'];
        let hash = 0;
        for (let i = 0; i < email.length; i++) {
            hash = email.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colors[Math.abs(hash) % colors.length];
    };

    return (
        <Card className="bg-white/5 border-white/10 backdrop-blur-md h-[calc(100vh-180px)] min-h-[500px] flex flex-col">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-cyan-400" />
                        Community Chat
                    </CardTitle>
                    <Badge
                        variant="outline"
                        className={`border-opacity-50 gap-1 ${isConnected
                            ? 'bg-green-500/20 border-green-500 text-green-400'
                            : 'bg-red-500/20 border-red-500 text-red-400'
                            }`}
                    >
                        <span className="relative flex h-2 w-2">
                            {isConnected && (
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            )}
                            <span className={`relative inline-flex rounded-full h-2 w-2 ${isConnected ? 'bg-green-500' : 'bg-red-500'
                                }`}></span>
                        </span>
                        {isConnected ? 'Live' : 'Offline'}
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col min-h-0">
                <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                    <Button
                        size="sm"
                        variant="default"
                        className="whitespace-nowrap bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                    >
                        <Hash className="w-3 h-3 mr-1" />
                        General
                    </Button>
                </div>

                <Separator className="bg-white/10 mb-4" />

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2 custom-scrollbar">
                    {loading ? (
                        <div className="flex justify-center items-center h-full">
                            <Loader2 className="w-6 h-6 text-cyan-400 animate-spin" />
                        </div>
                    ) : messages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-2">
                            <MessageSquare className="w-8 h-8 opacity-20" />
                            <p>No messages yet. Start the conversation!</p>
                        </div>
                    ) : (
                        messages.map((msg) => {
                            const isCurrentUser = session?.user?.id === msg.user_id;
                            const userColor = getUserColor(msg.user_email);

                            return (
                                <div
                                    key={msg.id}
                                    className={`flex items-start gap-3 ${isCurrentUser ? 'flex-row-reverse' : ''}`}
                                >
                                    <Avatar className="w-8 h-8 border border-white/10">
                                        <AvatarFallback className={`bg-${userColor}-500/20 text-${userColor}-400 text-xs font-bold`}>
                                            {msg.user_email.charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className={`flex-1 min-w-0 flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'}`}>
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <span className="text-white text-sm font-medium">
                                                {msg.user_email.split('@')[0]}
                                            </span>
                                            <span className="text-gray-600 text-xs">
                                                {formatTime(msg.created_at)}
                                            </span>
                                        </div>
                                        <div
                                            className={`p-3 rounded-lg text-sm max-w-[85%] break-words ${isCurrentUser
                                                ? 'bg-cyan-500/20 text-cyan-50 border border-cyan-500/30 rounded-tr-none'
                                                : 'bg-white/10 text-gray-300 border border-white/5 rounded-tl-none'
                                                }`}
                                        >
                                            {msg.content}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <form onSubmit={handleSendMessage} className="relative mt-auto">
                    <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="pr-20 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-cyan-500/50"
                        disabled={sending}
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                        <Button
                            type="submit"
                            size="sm"
                            disabled={!newMessage.trim() || sending}
                            className={`h-7 w-7 p-0 ${newMessage.trim()
                                ? 'bg-cyan-500 hover:bg-cyan-600 text-black'
                                : 'bg-white/10 text-gray-500 hover:bg-white/20'
                                }`}
                        >
                            {sending ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                                <Send className="w-3 h-3" />
                            )}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default CommunityChat;
