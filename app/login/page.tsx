import AppBar from "@/components/AppBar/AppBar";
import LoginTabs from "@/components/Login/LoginTabs";

export default function LoginPage() {
  return (
    <main>
      <AppBar showSearch={false} actions="home" />
      <div className="min-h-[calc(100vh-57px)] max-h-max pt-[max(8vh,10px)] pb-[max(6vh,10px)] w-full flex justify-center">
        <LoginTabs />
      </div>
    </main>
  );
}
