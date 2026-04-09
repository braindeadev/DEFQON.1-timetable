import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from "@mui/material";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { BEIGE, CRIMSON } from "../../styles/palette";

export function SettingsDialog({ open, onClose, onClearClick }) {
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: "rgba(16, 4, 4, 0.95)",
          color: BEIGE,
          border: `1px solid ${CRIMSON}55`,
          backdropFilter: "blur(4px)"
        }
      }}
    >
      <DialogTitle sx={{ fontFamily: "'Bebas Neue', 'Anton', sans-serif", letterSpacing: 1 }}>
        Settings
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 1, minWidth: { xs: 250, sm: 300 } }}>
          
          <Box>
            <Typography variant="body2" sx={{ color: "rgba(212, 180, 131, 0.7)", mb: 1 }}>
              Manage Favorites
            </Typography>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<DeleteSweepIcon />}
              onClick={() => {
                onClose(); // Suljetaan asetukset ensin
                onClearClick(); // Avataan olemassa oleva ClearDialog-varmistus
              }}
              sx={{
                color: CRIMSON,
                borderColor: `${CRIMSON}55`,
                "&:hover": { borderColor: CRIMSON, backgroundColor: "rgba(192, 25, 42, 0.1)" }
              }}
            >
              Clear All Favorites
            </Button>
          </Box>
          
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: BEIGE }}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}