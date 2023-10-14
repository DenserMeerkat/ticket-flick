import React from "react";
import ThemeSwitcher from "./elements/ThemeSwitcher";
import GitHubLink from "./elements/Github";
import Search from "./elements/Search";
import Actions from "./elements/Actions";

const Tray = (props: any) => {
  const showSearch = props.showSearch;
  const actions = props.actions;
  return (
    <div
      className={
        "flex gap-0.5 min-[400px]:gap-1 sm:gap-1.5 lg:gap-2 items-center"
      }
    >
      {showSearch && <Search />}
      <Actions actions={actions} />
    </div>
  );
};

export default Tray;
