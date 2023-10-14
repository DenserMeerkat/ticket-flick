"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, MonitorSmartphone } from "lucide-react";
import { Toggle } from "../ui/toggle";

const ThemeButtons = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  console.log(systemTheme, theme);

  const ToggleButton = (props: any) => {
    const themeName = props.themeName;
    const isActive = props.isActive;
    const Icon = props.Icon;
    return (
      <Toggle
        className="rounded-full data-[state=on]:bg-zinc-200 data-[state=on]:dark:bg-zinc-800"
        size={"xs"}
        aria-label={`${themeName} Theme Toggle`}
        pressed={isActive}
        onPressedChange={(value) => {
          setTheme(themeName.toLowerCase());
        }}
      >
        <Icon className="h-4 w-5 " />
      </Toggle>
    );
  };

  const renderThemeChanger = () => {
    if (!mounted) {
      return;
    }
    return (
      <div className="border rounded-full flex sm:gap-0.5 p-0.5 sm:p-1">
        <ToggleButton
          themeName="Light"
          Icon={Sun}
          isActive={theme === "light"}
        />
        <ToggleButton
          themeName="System"
          Icon={MonitorSmartphone}
          isActive={theme === "system"}
        />
        <ToggleButton
          themeName="Dark"
          Icon={Moon}
          isActive={theme === "dark"}
        />
      </div>
    );
  };

  return <div>{renderThemeChanger()}</div>;
};

export default ThemeButtons;
