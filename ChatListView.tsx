import React from 'react';
import { Persona, Message } from '../types';

interface Props {
  personas: Persona[];
  messages: Message[];
  setCurrentChatId: (id: string | null) => void;
  defaultAiAvatar: string;
  formatRelativeTime: (timestampMs: number | undefined) => string;
}

export const ChatListView = ({ personas, messages, setCurrentChatId, defaultAiAvatar, formatRelativeTime }: Props) => {
  const Row: React.FC<{ index: number; style: React.CSSProperties }> = ({ index, style }) => {
    const p = personas[index];
    const filtered = messages.filter(m => m.personaId === p.id);
    const lastMsg = filtered.pop();
    return (
      <div 
        style={style}
        onClick={() => setCurrentChatId(p.id)}
        className="flex items-center gap-3 p-3 border-b border-neutral-100 active:bg-neutral-50 cursor-pointer"
      >
        <img src={p.avatarUrl || defaultAiAvatar} className="w-12 h-12 rounded-xl object-cover" alt="avatar" />
        <div className="flex-1 overflow-hidden">
          <div className="flex justify-between items-center">
            <h3 className="text-[16px] font-medium text-neutral-900">
              {p.name}
              {p.isBlocked && <span className="ml-2 text-[10px] bg-red-100 text-red-500 px-1.5 py-0.5 rounded-full">已拉黑</span>}
            </h3>
            <span className="text-[12px] text-neutral-400">
              {lastMsg ? formatRelativeTime(lastMsg.createdAt) : ''}
            </span>
          </div>
          <p className="text-[13px] text-neutral-500 truncate mt-0.5">
            {lastMsg ? (
              lastMsg.msgType === 'transfer' ? '[转账]' : 
              lastMsg.msgType === 'music' ? '[音乐分享]' :
              lastMsg.msgType === 'xhsPost' ? '[小红书分享]' :
              lastMsg.msgType === 'listenTogether' ? '[一起听歌]' :
              lastMsg.text
            ) : '暂无消息'}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="absolute inset-0 overflow-y-auto">
      {personas.map((p, index) => (
        <Row key={p.id} index={index} style={{}} />
      ))}
    </div>
  );
};
