import { MessageSquare, Users, Send, Smile, Hash } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

// Mock messages
const mockMessages = [
    {
        id: '1',
        user: { name: 'AstroHunter', avatar: null, color: 'cyan' },
        message: 'Did anyone see the 2024 YR14 close approach data? Pretty close!',
        time: '2 min ago',
    },
    {
        id: '2',
        user: { name: 'NeoWatcher', avatar: null, color: 'purple' },
        message: 'Yeah, only 2.5 LD! Added it to my watchlist 🔭',
        time: '1 min ago',
    },
    {
        id: '3',
        user: { name: 'SpaceNerd42', avatar: null, color: 'green' },
        message: 'The velocity on that one is insane - 23 km/s!',
        time: 'Just now',
    },
];

const channels = [
    { id: 'general', name: 'General', unread: 3 },
    { id: 'hazardous', name: 'Hazardous Alerts', unread: 1 },
    { id: 'research', name: 'Research', unread: 0 },
];

const CommunityChat = () => {
    return (
        <Card className="bg-white/5 border-white/10 backdrop-blur-md h-full flex flex-col">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-cyan-400" />
                        Community Chat
                    </CardTitle>
                    <div className="flex items-center gap-2">
                        <Badge
                            variant="outline"
                            className="bg-green-500/20 border-green-500/50 text-green-400 gap-1"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            128 Online
                        </Badge>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col">
                {/* Channels */}
                <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                    {channels.map(channel => (
                        <Button
                            key={channel.id}
                            size="sm"
                            variant={channel.id === 'general' ? 'default' : 'ghost'}
                            className={`whitespace-nowrap ${channel.id === 'general'
                                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                                    : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            <Hash className="w-3 h-3 mr-1" />
                            {channel.name}
                            {channel.unread > 0 && (
                                <Badge className="ml-2 bg-red-500 text-white text-xs px-1.5 py-0">
                                    {channel.unread}
                                </Badge>
                            )}
                        </Button>
                    ))}
                </div>

                <Separator className="bg-white/10 mb-4" />

                {/* Messages */}
                <div className="flex-1 space-y-4 overflow-y-auto mb-4">
                    {mockMessages.map(msg => (
                        <div key={msg.id} className="flex items-start gap-3">
                            <Avatar className="w-8 h-8 border border-white/10">
                                <AvatarImage src={msg.user.avatar} />
                                <AvatarFallback className={`bg-${msg.user.color}-500/20 text-${msg.user.color}-400 text-xs font-bold`}>
                                    {msg.user.name.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-0.5">
                                    <span className="text-white text-sm font-medium">{msg.user.name}</span>
                                    <span className="text-gray-600 text-xs">{msg.time}</span>
                                </div>
                                <p className="text-gray-300 text-sm">{msg.message}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input */}
                <div className="relative">
                    <Input
                        placeholder="Type a message..."
                        className="pr-20 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                        <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-gray-500 hover:text-yellow-400">
                            <Smile className="w-4 h-4" />
                        </Button>
                        <Button size="sm" className="h-7 w-7 p-0 bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30">
                            <Send className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                {/* Coming Soon Overlay */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-xl flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-not-allowed">
                    <div className="text-center">
                        <Badge className="bg-purple-500/20 border border-purple-500/50 text-purple-400 mb-2">
                            Coming Soon
                        </Badge>
                        <p className="text-gray-400 text-sm">Real-time chat with Socket.io</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default CommunityChat;
