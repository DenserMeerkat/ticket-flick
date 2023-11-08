"use client";
import React, { useContext } from "react";
import BackButton from "./BackButton";
import { LoginButton, LogoutButton } from "./LoginButtons";
import { AppStateContext } from "@/components/utils/AppStateContext";

const Actions = (props: any) => {
  const state = useContext(AppStateContext);
  const exists = state!.activeUser;
  const actions = props.actions;
  if (exists) return <LogoutButton />;
  if (actions == "home") return <BackButton />;
  else return <LoginButton />;
};

export default Actions;
