import clsx from 'clsx';
import dayjs from 'dayjs';
import React from 'react';

interface BubbleProps {
  children: React.ReactNode;
  className?: string;
}

function Bubble({ children, className }: BubbleProps) {
  return (
    <div
      style={{
        marginRight: '28%',
        minWidth: '1px',
      }}
      className={clsx(
        'max-w-2xl',
        'px-3 py-1.5 whitespace-pre-wrap break-words leading-relaxed select-text',
        className,
      )}
    >
      {children}
    </div>
  );
}

interface MessageProps {
  children: React.ReactNode;
  position?: 'left' | 'right' | 'center';
}

function Message({ children, position = 'left' }: MessageProps) {
  return (
    <div>
      <div className="text-center mb-2">
        <time className="p-1 text-xs inline-block text-gray-400">
          {dayjs().format('HH:mm')}
        </time>
      </div>
      <div
        className={clsx('flex items-start', {
          'flex-row-reverse': position == 'right',
        })}
      >
        <Bubble
          className={clsx('rounded-2xl bg-white shadow', {
            'bg-yellow-200 rounded-tr-sm': position == 'right',
            'rounded-tl-sm': position == 'left',
          })}
        >
          {children}
        </Bubble>
      </div>
    </div>
  );
}

export default function Chat() {
  return (
    <div className="bg-gray-100 flex flex-col h-screen">
      <header className="bg-white flex shadow-md h-11 z-10 px-1.5">
        <div style={{ flex: 2 }}>left</div>
        <div style={{ flex: 3 }} className="flex items-center justify-center">
          <h2 className="text-base text-center text-gray-800">yahaha</h2>
        </div>
        <div style={{ flex: 2 }} className="text-right">
          right
        </div>
      </header>
      <div className="flex flex-1 flex-col">
        <div className="overflow-y-scroll flex-1 h-full p-2">
          <Message>213</Message>
          <Message>213</Message>
          <Message>
            123123111231231112312311123123111231231112312311123123111231231112312311
          </Message>
          <Message>213</Message> <Message>213</Message>
          <Message>213</Message>
          <Message>213</Message>
          <Message position="right">213</Message>
          <Message position="right">213</Message>
          <Message position="right">213</Message>
          <Message position="right">213</Message> <Message>213</Message>
          <Message position="right">213</Message>
          <Message>213</Message>
          <Message>213</Message>
          <Message>213</Message>
          <Message>213</Message>
          <Message>213</Message>
        </div>
      </div>
      <div className="z-10 bg-gray-100">
        <div className="flex items-end p-2">
          <div className="flex-1">
            <textarea
              className="block w-full overflow-hidden resize-none py-2 pl-4 pr-8 break-all rounded-2xl"
              rows={1}
              placeholder="请输入..."
            ></textarea>
          </div>
          <div className="ml-2">
            <button className="rounded-full bg-yellow-500 text-white p-1.5 inline-block">
              <div className="h-6 w-6"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
