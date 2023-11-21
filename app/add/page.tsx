import Add from "@/components/Add/Add";
import AppBar from "@/components/AppBar/AppBar";
import { Suspense } from "react";

export default function AddPage() {
  return (
    <main>
      <AppBar showSearch={true} actions="login" />
      <div className="min-h-[80vh] h-fit w-full flex items-center">
        <div className="max-w-6xl mx-auto">
          <Suspense>
            <Add />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
