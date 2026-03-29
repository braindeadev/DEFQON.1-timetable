import React from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  dialogPaperSx, dialogTitleSx, dialogContentSx,
  dialogCancelBtnSx, dialogConfirmBtnSx,
} from "../../styles/stageRowStyles";
import { CRIMSON } from "../../styles/palette";

export const ClearDialog = ({ open, onClose, onConfirm }) => (
  <Dialog open={open} onClose={onClose} PaperProps={{ sx: dialogPaperSx }}>
    <DialogTitle sx={dialogTitleSx}>
      Clear All Favorites
      <IconButton
        onClick={onClose}
        sx={{ position: "absolute", right: 8, top: 8, color: `${CRIMSON}88` }}
      >
        <CloseIcon />
      </IconButton>
    </DialogTitle>
    <DialogContent sx={dialogContentSx}>
      Are you sure you want to clear all favorite events? This action cannot be undone.
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} sx={dialogCancelBtnSx}>Cancel</Button>
      <Button variant="outlined" onClick={onConfirm} sx={dialogConfirmBtnSx}>Clear All</Button>
    </DialogActions>
  </Dialog>
);
