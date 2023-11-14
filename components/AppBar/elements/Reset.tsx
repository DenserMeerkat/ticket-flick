"use client";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import React from "react";

const Reset = () => {
  function resetSession() {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <Button variant={"ghost"} className="px-3" onClick={resetSession}>
      <RotateCcw className="h-4 w-4" />
    </Button>
  );
};

export default Reset;
