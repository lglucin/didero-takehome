import type { TextProps } from '@/components/text';
import { Text } from '@/components/text';

type HeadingProps = TextProps;

/**
 To be used for all heading elements
 */
function Heading(props: HeadingProps): JSX.Element {
  const { weight = 'semibold', variant = 'primary', ...rest } = props;
  return <Text variant={variant} weight={weight} {...rest} />;
}

export { Heading, type HeadingProps };
