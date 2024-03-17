import { AdaptivityProvider, AppRoot, ConfigProvider, useAppearance } from '@vkontakte/vkui';
import { MainPage } from '@/pages/main';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@vkontakte/vkui/dist/vkui.css';
import { useState } from 'react';
import { useInsets } from '@vkontakte/vk-bridge-react';

function Application() {
  const vkBridgeAppearance = useAppearance() || undefined;
  const vkBridgeInsets = useInsets() || undefined;
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ConfigProvider appearance={vkBridgeAppearance}>
      <AdaptivityProvider>
        <AppRoot safeAreaInsets={vkBridgeInsets}>
          <QueryClientProvider client={queryClient}>
            <MainPage />
          </QueryClientProvider>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
}

export default Application;
