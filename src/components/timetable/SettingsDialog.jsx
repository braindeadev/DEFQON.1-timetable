import React, { useState } from "react";
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  Button, 
  Box, 
  Typography,
  IconButton,
  TextField,
  Snackbar,
  Alert
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import ShareIcon from "@mui/icons-material/Share";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { 
  dialogPaperSx, 
  dialogTitleSx, 
  dialogContentSx, 
  dialogActionBtnSx
} from "../../styles/stageRowStyles";
import { CRIMSON, BEIGE, FONT, WHITE, BLACK } from "../../styles/palette";

export const SettingsDialog = ({ open, onClose, favorites, onClearClick, onImportFavorites }) => {
  const [importText, setImportText] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const handleCopyLink = () => {
    // Pakataan suosikit URL-parametriin (base64)
    const data = btoa(JSON.stringify(favorites));
    const url = `${window.location.origin}${window.location.pathname}?favs=${data}`;
    
    navigator.clipboard.writeText(url).then(() => {
      setSnackbar({ open: true, message: "Share link copied to clipboard!", severity: "success" });
    });
  };

  const handleImport = () => {
    try {
      let jsonStr = importText;
      // Jos teksti näyttää URLilta, yritetään poimia parametri
      if (importText.includes("?favs=")) {
        const url = new URL(importText);
        const favsParam = url.searchParams.get("favs");
        if (favsParam) jsonStr = atob(favsParam);
      } else if (!importText.startsWith("[")) {
        // Oletetaan että se on suoraan base64-merkkijono
        jsonStr = atob(importText);
      }

      const parsed = JSON.parse(jsonStr);
      if (Array.isArray(parsed)) {
        onImportFavorites(parsed);
        setSnackbar({ open: true, message: `Successfully imported ${parsed.length} favorites!`, severity: "success" });
        setImportText("");
      } else {
        throw new Error("Invalid format");
      }
    } catch {
      setSnackbar({ open: true, message: "Invalid import data. Please check the link or code.", severity: "error" });
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      PaperProps={{ sx: { ...dialogPaperSx, width: "100%", maxWidth: "500px" } }}
    >
      <DialogTitle sx={dialogTitleSx}>
        SETTINGS
        <IconButton 
          onClick={onClose} 
          sx={{ 
            position: "absolute", 
            right: 16, 
            top: 16, 
            color: `${BEIGE}66`,
            "&:hover": { color: CRIMSON }
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ ...dialogContentSx, px: 3, textAlign: "left" }}>
        
        {/* SHARE SECTION */}
        <Box sx={{ mt: 1, mb: 4 }}>
          <Typography sx={{ 
            fontFamily: FONT, 
            fontSize: "1.1rem", 
            letterSpacing: "0.1em", 
            mb: 2,
            color: WHITE,
            borderBottom: `1px solid ${CRIMSON}44`,
            pb: 1
          }}>
            SHARE FAVORITES
          </Typography>
          
          <Typography sx={{ color: `${BEIGE}aa`, fontSize: "0.9rem", fontFamily: FONT, mb: 2 }}>
            Generate a link to share your selected favorite artists with friends.
          </Typography>

          <Button
            variant="contained"
            fullWidth
            startIcon={<ShareIcon />}
            disabled={favorites.length === 0}
            onClick={handleCopyLink}
            sx={dialogActionBtnSx(false)}
          >
            COPY SHARE LINK ({favorites.length})
          </Button>
        </Box>

        {/* IMPORT SECTION */}
        <Box sx={{ mb: 4 }}>
          <Typography sx={{ 
            fontFamily: FONT, 
            fontSize: "1.1rem", 
            letterSpacing: "0.1em", 
            mb: 2,
            color: WHITE,
            borderBottom: `1px solid ${CRIMSON}44`,
            pb: 1
          }}>
            IMPORT
          </Typography>
          
          <Typography sx={{ color: `${BEIGE}aa`, fontSize: "0.9rem", fontFamily: FONT, mb: 1.5 }}>
            Paste a shared link or import code below to load favorites.
          </Typography>

          <TextField
            fullWidth
            size="small"
            placeholder="Paste link or code here..."
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
            sx={{
              mb: 1.5,
              background: `${BLACK}88`,
              borderRadius: "4px",
              "& .MuiOutlinedInput-root": {
                color: BEIGE,
                fontFamily: FONT,
                "& fieldset": { borderColor: `${CRIMSON}44` },
                "&:hover fieldset": { borderColor: `${CRIMSON}88` },
                "&.Mui-focused fieldset": { borderColor: CRIMSON },
              },
            }}
          />

          <Button
            variant="contained"
            fullWidth
            startIcon={<FileDownloadIcon />}
            disabled={!importText.trim()}
            onClick={handleImport}
            sx={dialogActionBtnSx(false)}
          >
            IMPORT DATA
          </Button>
        </Box>
        
        {/* DANGER ZONE */}
        <Box sx={{ mb: 2 }}>
          <Typography sx={{ 
            fontFamily: FONT, 
            fontSize: "1.1rem", 
            letterSpacing: "0.1em", 
            mb: 2,
            color: CRIMSON,
            borderBottom: `1px solid ${CRIMSON}44`,
            pb: 1
          }}>
            DANGER ZONE
          </Typography>
          
          <Button
            variant="contained"
            fullWidth
            startIcon={<DeleteSweepIcon />}
            onClick={() => {
              if (window.confirm("Are you sure you want to clear all favorites?")) {
                onClearClick();
              }
            }}
            sx={dialogActionBtnSx(true)}
          >
            PURGE ALL FAVORITES
          </Button>
        </Box>

        <Box sx={{ textAlign: "center", opacity: 0.3, pt: 2 }}>
          <Typography sx={{ fontFamily: FONT, fontSize: "0.75rem", letterSpacing: "0.15em" }}>
            DEFQON.1 TIMETABLE v1.1 • BY SACRED OATH
          </Typography>
        </Box>
      </DialogContent>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={4000} 
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%', fontFamily: FONT }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Dialog>
  );
};
