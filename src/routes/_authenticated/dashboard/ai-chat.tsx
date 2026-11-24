import { createFileRoute } from '@tanstack/react-router';
import PageContainer from '@/components/layout/page-container';
import { AiChatDemo } from '@/features/ai-chat/components/ai-chat-demo';

export const Route = createFileRoute('/_authenticated/dashboard/ai-chat')({
  head: () => ({
    meta: [
      { title: 'AI Chat | DEUCE' },
      { name: 'description', content: 'Scripted AI chat demo with reasoning and tool calls.' },
      { property: 'og:title', content: 'AI Chat | DEUCE' },
      { property: 'og:description', content: 'Scripted AI chat demo with reasoning and tool calls.' },
      { name: 'robots', content: 'noindex, nofollow' }
    ]
  }),
  component: () => (
    <PageContainer>
      <AiChatDemo />
    </PageContainer>
  )
});
