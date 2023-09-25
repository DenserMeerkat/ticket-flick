import TooltipElement from "@/components/common/TooltipElement";
import { Button } from "@/components/ui/button";
import { githubRepo } from "@/lib/constants";
import { Github } from "lucide-react";
import Link from "next/link";

const GitHubLink = () => {
  return (
    <TooltipElement
      element={
        <Button size="icon" variant={"ghost"} asChild>
          <Link href={githubRepo} target="_blank">
            <Github className={"p-0.5"} />
          </Link>
        </Button>
      }
      tooltip={"GitHub"}
    ></TooltipElement>
  );
};
export default GitHubLink;
