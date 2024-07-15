import { Heading } from '@/components/heading';
import { Stack } from '@/components/stack';

interface PageSectionProps {
  children: React.ReactNode;
  heading: string;
}

function PageSection(props: PageSectionProps) {
  const { children, heading } = props;
  return (
    <Stack gap="5" width="full">
      <Heading size="xl">{heading}</Heading>
      {children}
    </Stack>
  );
}

export { PageSection };
