import { ReactComponent as Empty } from "src/assets/empty.svg";
const EmptyState = ({ message }: { message: string }) => {
  return (
    <div
      className="flex flex-col items-center gap-8 w-full"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem",
      }}
    >
      <Empty
        className="h-48 mt-10"
        style={{
          height: "12rem",
          marginTop: "3rem",
        }}
      />
      <div className="text-center text-lg">{message}</div>
    </div>
  );
};

export default EmptyState;
