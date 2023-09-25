import React from "react";
import BackButton from "./BackButton";
import LoginButton from "./LoginButton";

const Actions = (props: any) => {
  const actions = props.actions;
  if (actions == "home") return <BackButton />;
  else return <LoginButton />;
};

export default Actions;
