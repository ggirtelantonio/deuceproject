import { createFileRoute } from '@tanstack/react-router';
import ChatViewPage from '@/features/chat/components/chat-view-page';

export const Route = createFileRoute('/_authenticated/dashboard/chat')({
  head: () => ({
    meta: [
      { title: 'Chat | DEUCE' },
      { name: 'description', content: 'Team messenger with conversations and message history.' },
      { property: 'og:title', content: 'Chat | DEUCE' },
      { property: 'og:description', content: 'Team messenger with conversations and message history.' },
      { name: 'robots', content: 'noindex, nofollow' }
    ]
  }),
  component: () => (
    <ChatViewPage />
  )
});
