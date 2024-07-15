import type { TextProps } from '@/components/text';
import { Text } from '@/components/text';

type StrongProps = TextProps;

/**
  Used to bolden text
  */
function Strong(props: StrongProps): JSX.Element {
  const { children, ...rest } = props;
  return (
    <Text asChild variant="current" weight="semibold" {...rest}>
      <strong>{children}</strong>
    </Text>
  );
}

export { Strong, type StrongProps };
