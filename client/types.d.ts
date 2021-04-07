interface Message {
  id: string;
  from: string;
  to: string;
  content: string;

  loading?: boolean;
}
