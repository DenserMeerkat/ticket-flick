import AppBar from "@/components/AppBar/AppBar";

export default function Home() {
  return (
    <main>
      <AppBar showSearch={true} actions="login" />
      <div className="min-h-[80vh] h-fit w-full flex items-center">
        <div className="max-w-7xl mx-auto">Add Page</div>
      </div>
    </main>
  );
}
