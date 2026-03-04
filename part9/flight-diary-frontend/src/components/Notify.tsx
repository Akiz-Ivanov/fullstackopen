type NotifyProps = {
  message: string | null;
};

const Notify = ({ message }: NotifyProps) => {
  if (!message) return null;

  return <strong style={{ color: "red" }}>{message}</strong>;
};

export default Notify;
