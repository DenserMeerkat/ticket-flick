import AppBar from "@/components/AppBar/AppBar";

export default function NotFoundPage(props: any) {
  return (
    <main>
      <AppBar showSearch={true} actions="home" />
      <div className="h-max min-h-[calc(100vh-8rem)] flex items-center justify-center">
        <div className="flex items-center border rounded-md">
          <p className="p-2">404</p>
          <div className="h-10 w-[1px] bg-zinc-300 dark:bg-zinc-800"></div>
          <p className="p-2">Movie Not Found</p>
        </div>
      </div>
    </main>
  );
}
