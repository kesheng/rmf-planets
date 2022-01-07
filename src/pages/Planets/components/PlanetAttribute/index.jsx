import React, { useEffect, useState } from "react";

export default ({ title, value, children }) => {
  return (
    <div>
      <div>{title}</div>
      {value ? <div>{value}</div> : <div>{children}</div>}
    </div>
  );
};
