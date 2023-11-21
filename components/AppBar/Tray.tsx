import React, { Suspense } from "react";
import Search from "./elements/Search";
import Actions from "./elements/Actions";
import Reset from "./elements/Reset";
import TicketSheet from "./elements/TicketSheet";

const Tray = (props: any) => {
  const showSearch = props.showSearch;
  const actions = props.actions;
  return (
    <div
      className={
        "flex gap-0.5 min-[400px]:gap-1 sm:gap-1.5 lg:gap-2 items-center"
      }
    >
      <Reset />
      {showSearch && <Search />}
      <Suspense>
        <TicketSheet />
      </Suspense>
      <Actions actions={actions} />
    </div>
  );
};

export default Tray;
