import { Heading } from '@/components/heading';
import { Loader as BaseLoader } from '@/components/loader';
import { Stack } from '@/components/stack';
import { Text } from '@/components/text';
import { cn } from '@/utils';

interface RootProps extends React.TableHTMLAttributes<HTMLTableElement> {
  minWidthDisabled?: boolean;
}

function Root(props: RootProps) {
  const { className, minWidthDisabled, ...rest } = props;
  const minW = minWidthDisabled ? '' : 'min-w-[1000px]';
  return (
    <div className={cn(minW, className)}>
      <table
        className={cn('w-full', 'table-fixed', 'overflow-hidden')}
        {...rest}
      />
    </div>
  );
}

function Thead(props: React.HTMLAttributes<HTMLTableSectionElement>) {
  const { className, ...rest } = props;
  return <thead className={cn(className)} {...rest} />;
}

function Tbody(props: React.HTMLAttributes<HTMLTableSectionElement>) {
  const { className, ...rest } = props;
  return <tbody className={cn(className)} {...rest} />;
}

function Tr(props: React.TdHTMLAttributes<HTMLTableRowElement>) {
  const { className, ...rest } = props;
  return (
    <tr
      className={cn(
        'border-b',
        'border-gray-600/10',
        'dark:border-gray-400/10',
        className,
      )}
      {...rest}
    />
  );
}
interface ThProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  width?: number;
}

function Th(props: ThProps) {
  const { className, children, width } = props;
  return (
    <Heading asChild size="sm" weight="medium">
      <th
        className={cn(
          'p-2.5',
          'border-r',
          'border-gray-600/10',
          'dark:border-gray-400/10',
          'last:border-0',
          className,
        )}
        style={{ width: `${width}px` }}
      >
        <Stack
          align="center"
          className="min-w-0 [&>svg]:w-4.5 [&>svg]:h-4.5 [&>svg>path]:stroke-1 truncate"
          direction="row"
          gap="1"
          width="full"
        >
          {children}
        </Stack>
      </th>
    </Heading>
  );
}

export interface TableTdProps
  extends React.TdHTMLAttributes<HTMLTableCellElement> {
  noBorders?: boolean;
}
function Td(props: TableTdProps) {
  const { className, children, noBorders } = props;
  const borders = [
    'border-r',
    'last:border-0',
    'border-gray-600/10',
    'dark:border-gray-400/10',
  ];
  const classes = ['p-2.5', 'align-top', className];
  if (!noBorders) {
    classes.push(...borders);
  }
  return (
    <Text asChild size="sm">
      <td className={cn(...classes)}>{children}</td>
    </Text>
  );
}

function Loader() {
  return (
    <Stack align="center" className="pb-8" justify="center" width="full">
      <BaseLoader />
    </Stack>
  );
}

const Table = Object.assign(Root, { Tr, Th, Td, Thead, Tbody, Loader });

export { Table };
