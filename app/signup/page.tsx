import AppBar from "@/components/AppBar/AppBar";
import SignUpCard from "@/components/SignUp/SignUpCard";

export default function Home() {
  return (
    <main>
      <AppBar showSearch={false} actions="login" />
      <div className="min-h-[calc(100vh-57px)] max-h-max pt-[max(6vh,10px)] pb-[max(6vh,10px)] w-full flex justify-center">
        <div className="max-w-md mx-auto flex justify-cente">
          <SignUpCard />
        </div>
      </div>
    </main>
  );
}
