import { FullHeight } from '@/components/full-height';
import { Loader } from '@/components/loader';
import { Stack } from '@/components/stack';

function FullHeightLoader() {
  return (
    <FullHeight asChild>
      <Stack
        align="center"
        className="bg-white dark:bg-gray-950"
        justify="center"
        width="full"
      >
        <Loader />
      </Stack>
    </FullHeight>
  );
}

export { FullHeightLoader };
