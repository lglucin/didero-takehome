'use client';


import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { Tooltip } from '@/components/tooltip';

const queryClient = new QueryClient();

function ThemeProvider(props: React.PropsWithChildren): JSX.Element {
  return <NextThemeProvider attribute="class" forcedTheme="light" {...props} />;
}

function QueryProvider(props: React.PropsWithChildren): JSX.Element {
  return <QueryClientProvider {...props} client={queryClient} />;
}

function Providers(props: React.PropsWithChildren) {
  return (
    <DndProvider
      backend={HTML5Backend}
      context={typeof window !== 'undefined' ? window : undefined}
    >
      <QueryProvider>
        <ThemeProvider>
          <Tooltip.Provider
            delayDuration={0}
            disableHoverableContent
            skipDelayDuration={0}
          >
            {props.children}
          </Tooltip.Provider>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryProvider>
    </DndProvider>
  );
}

export { Providers };
