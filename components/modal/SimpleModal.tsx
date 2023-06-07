import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

interface Prop extends React.HTMLProps<HTMLDivElement> {
  open: boolean;
}

export function SimpleModal({ open, children }: Prop) {
  return (
    <Dialog open={open}>
      <DialogContent sx={{ background: "transparent" }}>
        {children}
      </DialogContent>
    </Dialog>
  );
}
