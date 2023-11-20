import AppBar from "@/components/AppBar/AppBar";
import Genre from "@/components/Genre/Genre";
import { Suspense } from "react";

export default function GenrePage() {
  return (
    <main>
      <AppBar showSearch={true} actions="login" />
      <div className="min-h-[80vh] h-fit w-full flex items-center">
        <div className="max-w-7xl mx-auto">
          <Suspense>
            <Genre />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
