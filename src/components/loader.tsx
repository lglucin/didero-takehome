import { LoadingIcon } from '@/assets';
import { cn } from '@/utils';

function Loader(props: React.SVGAttributes<SVGElement>) {
  const { className, ...rest } = props;
  return <LoadingIcon className={cn('animate-spin', className)} {...rest} />;
}

export { Loader };
