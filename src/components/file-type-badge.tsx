import { Badge } from '@/components/badge';

interface FileTypeBadgeProps {
  type: string;
}

function FileTypeBadge(props: FileTypeBadgeProps) {
  const { type } = props;

  switch (type) {
    case 'application/pdf':
      return <Badge variant="yellow">PDF</Badge>;
    case 'application/zip':
      return <Badge variant="purple">Zip/Archive</Badge>;
    case 'image/png':
      return <Badge variant="blue">PNG</Badge>;
    case 'image/jpg':
    case 'image/jpeg':
      return <Badge variant="blue">JPG</Badge>;
    case 'text/plain':
      return <Badge variant="green">Text</Badge>;
    case 'text/html':
      return <Badge variant="green">HTML</Badge>;
    case 'application/octet-stream':
      return <Badge variant="gray">Binary Data</Badge>;
    case '':
      return <Badge variant="gray">Unknown</Badge>;
    default:
      return <Badge variant="gray">{type}</Badge>;
  }
}

export { FileTypeBadge };
