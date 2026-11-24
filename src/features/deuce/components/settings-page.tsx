import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileViewPage from '@/features/profile/components/profile-view-page';
import TeamView from '@/features/workspaces/components/team-view';
import WorkspacesView from '@/features/workspaces/components/workspaces-view';

export default function SettingsPage() {
  const [tab, setTab] = useState('profile');
  return (
    <div className='flex flex-col gap-2 p-4 md:px-6'>
      <h1 className='text-2xl font-semibold tracking-tight'>Settings</h1>
      <Tabs value={tab} onValueChange={(v) => setTab(String(v))}>
        <TabsList>
          <TabsTrigger value='profile'>Profile</TabsTrigger>
          <TabsTrigger value='workspaces'>Workspaces</TabsTrigger>
          <TabsTrigger value='team'>Team</TabsTrigger>
        </TabsList>
        <TabsContent value='profile' className='-mx-4'><ProfileViewPage /></TabsContent>
        <TabsContent value='workspaces' className='-mx-4 md:-mx-6'><WorkspacesView /></TabsContent>
        <TabsContent value='team' className='-mx-4 md:-mx-6'><TeamView /></TabsContent>
      </Tabs>
    </div>
  );
}
