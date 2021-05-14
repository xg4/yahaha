import Chat, { Bubble, MessageProps, useMessages } from '@chatui/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useCurrentUserQuery } from '../generated/graphql';
import useSocket from '../hooks/useSocket';

export default function Container() {
  const { query } = useRouter();

  const { messages, appendMsg } = useMessages([]);

  const { id } = query;

  const { data } = useCurrentUserQuery();

  const socket = useSocket({
    message(data: any) {
      appendMsg({
        type: 'text',
        content: { text: data.content },
        user: {
          avatar: data.avatar,
        },
      });
    },
    welcome(data: any) {
      appendMsg({
        position: 'center',
        type: 'system',
        content: {
          text: (
            <>
              <Link href={'/im/' + data.id}>
                <a>{data.id}</a>
              </Link>{' '}
              加入
            </>
          ),
        },
      });
    },
  });

  useEffect(() => {
    socket.emit('join', id);
  }, [id]);

  function renderMessageContent(msg: MessageProps) {
    const { content } = msg;
    return <Bubble content={content.text} />;
  }

  function handleSend(type: string, val: string) {
    if (type === 'text' && val.trim()) {
      socket.send(
        {
          id: id,
          content: val,
        },
        () => {
          appendMsg({
            type: 'text',
            content: { text: val },
            user: {
              avatar: data?.currentUser?.image ?? undefined,
            },
            position: 'right',
          });
        },
      );
    }
  }

  return (
    <div style={{ height: '100vh' }}>
      <Chat
        navbar={{ title: `${id}` }}
        messages={messages}
        renderMessageContent={renderMessageContent}
        onSend={handleSend}
      />
    </div>
  );
}
