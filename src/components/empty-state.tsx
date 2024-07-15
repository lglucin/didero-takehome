import { Heading } from '@/components/heading';
import { Loader as LoaderPrimitive } from '@/components/loader';
import { Stack } from '@/components/stack';
import { Text } from '@/components/text';
import { HEADER_HEIGHT } from '@/utils';

function Container(props: LoaderProps & React.PropsWithChildren) {
  const { headerMultiplier = 1 } = props;
  return (
    <Stack
      align="center"
      className="bg-white dark:bg-gray-950"
      justify="center"
      style={{ height: `calc(100vh - ${HEADER_HEIGHT * headerMultiplier}px` }}
      width="full"
    >
      {props.children}
    </Stack>
  );
}

interface LoaderProps {
  headerMultiplier?: number;
}

function Loader(props: LoaderProps) {
  return (
    <Container {...props}>
      <LoaderPrimitive />
    </Container>
  );
}

interface EmptyStateProps {
  description?: React.ReactNode;
  heading: React.ReactNode;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

function EmptyStateBase(props: EmptyStateProps) {
  const { description, heading, icon, children } = props;
  return (
    <Stack align="center" gap="6" width="full">
      <Heading className="[&>svg]:w-12 [&>svg]:h-12 [&>svg>path]:stroke-[3px]">
        {icon}
      </Heading>
      <Stack align="center" gap="1.5" width="full">
        <Heading align="center" size="2xl">
          {heading}
        </Heading>
        {description ? (
          <Text align="center" className="max-w-xs" leading="relaxed" size="sm">
            {description}
          </Text>
        ) : null}
      </Stack>
      {children}
    </Stack>
  );
}

function FullHeightEmptyState(props: EmptyStateProps & LoaderProps) {
  const { headerMultiplier, ...rest } = props;
  return (
    <Container headerMultiplier={headerMultiplier}>
      <EmptyStateBase {...rest} />
    </Container>
  );
}

const EmptyState = Object.assign(FullHeightEmptyState, {
  Loader,
  Base: EmptyStateBase,
});

export { EmptyState };
