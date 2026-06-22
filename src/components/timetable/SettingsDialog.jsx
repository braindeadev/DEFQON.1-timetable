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
  dialogActionBtnSx,
  selectSx,
  menuItemSx,
  dialogDescSx,
  dialogLabelSx,
  dialogSectionHeaderSx
} from "../../styles/stageRowStyles";
import { CRIMSON, BEIGE, BEIGE_L, FONT, WHITE, BLACK, MENU_BG } from "../../styles/palette";
import { encodeFavorites, decodeFavorites } from "../../utils/shareUtils";

export const SettingsDialog = ({ 
  open, 
  onClose, 
  favorites, 
  onClearClick, 
  onImportFavorites
}) => {
  const [importText, setImportText] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [selectedDays, setSelectedDays] = useState({
    Thursday: true,
    Friday: true,
    Saturday: true,
    Sunday: true
  });

  const allSelected = Object.values(selectedDays).every(v => v);

  const handleToggleAll = () => {
    const nextVal = !allSelected;
    setSelectedDays({
      Thursday: nextVal,
      Friday: nextVal,
      Saturday: nextVal,
      Sunday: nextVal
    });
  };

  const handleToggleDay = (day) => {
    if (allSelected) {
      setSelectedDays({
        Thursday: day === "Thursday",
        Friday: day === "Friday",
        Saturday: day === "Saturday",
        Sunday: day === "Sunday"
      });
    } else {
      setSelectedDays(prev => ({
        ...prev,
        [day]: !prev[day]
      }));
    }
  };

  const activeDaysSet = new Set(Object.keys(selectedDays).filter(k => selectedDays[k]));
  const countInSelectedDays = favorites.filter(id => {
    const day = id.split("-")[0];
    return activeDaysSet.has(day);
  }).length;

  const handleCopyLink = () => {
    const activeDays = new Set(Object.keys(selectedDays).filter(k => selectedDays[k]));
    const compressedData = encodeFavorites(favorites, activeDays);
    const url = `${window.location.origin}${window.location.pathname}?favs=${compressedData}`;
    
    navigator.clipboard.writeText(url).then(() => {
      setSnackbar({ open: true, message: `Copied share link with ${countInSelectedDays} favorites!`, severity: "success" });
    });
  };

  const handleImport = () => {
    try {
      let importedFavs = [];
      let inputVal = importText.trim();

      // If full URL was pasted, extract 'favs' query param
      if (inputVal.includes("?favs=")) {
        const url = new URL(inputVal);
        const favsParam = url.searchParams.get("favs");
        if (favsParam) inputVal = favsParam;
      }

      // Try decoding old format (JSON array in base64 starts with '[' when decoded)
      try {
        const rawDecode = atob(inputVal.replace(/-/g, '+').replace(/_/g, '/'));
        if (rawDecode.trim().startsWith("[")) {
          importedFavs = JSON.parse(rawDecode);
        }
      } catch (e) {
        // Not old format, proceed to new format
      }

      // Try decoding using new bitmask compression
      if (importedFavs.length === 0) {
        importedFavs = decodeFavorites(inputVal);
      }

      if (Array.isArray(importedFavs) && importedFavs.length > 0) {
        onImportFavorites(importedFavs);
        setSnackbar({ open: true, message: `Successfully imported ${importedFavs.length} favorites!`, severity: "success" });
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
      PaperProps={{ sx: { ...dialogPaperSx, width: "100%", maxWidth: "500px", overflow: "hidden" } }}
    >
      {/* Top beige triangles pointing down */}
      <Box sx={{
        width: "100%",
        height: "12px",
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="12"><path d="M0 0 L10 12 L20 0 Z" fill="%23BC9B5E" fill-opacity="0.8"/></svg>')`,
        backgroundRepeat: "repeat-x",
        backgroundPosition: "top left",
        flexShrink: 0
      }} />

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
        <Box sx={{ mt: 4, mb: 4 }}>
          <Typography sx={dialogSectionHeaderSx(false)}>
            SHARE FAVORITES
          </Typography>
          
          <Typography sx={dialogDescSx}>
            Select which days to include in the share link:
          </Typography>

          {/* Toggle buttons for each day */}
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
            <Button
              variant={allSelected ? "contained" : "outlined"}
              size="small"
              onClick={handleToggleAll}
              sx={{
                fontFamily: FONT,
                fontSize: "0.85rem",
                letterSpacing: "0.05em",
                py: 0.5,
                px: 1.5,
                borderRadius: "4px",
                color: allSelected ? WHITE : `${BEIGE}cc`,
                borderColor: allSelected ? CRIMSON : `${CRIMSON}44`,
                backgroundColor: allSelected ? CRIMSON : "rgba(13, 1, 1, 0.4)",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: allSelected ? `${CRIMSON}dd` : "rgba(145, 1, 1, 0.15)",
                  borderColor: CRIMSON,
                }
              }}
            >
              All
            </Button>

            {Object.keys(selectedDays).map((day) => (
              <Button
                key={day}
                variant={selectedDays[day] ? "contained" : "outlined"}
                size="small"
                onClick={() => handleToggleDay(day)}
                sx={{
                  fontFamily: FONT,
                  fontSize: "0.85rem",
                  letterSpacing: "0.05em",
                  py: 0.5,
                  px: 1.5,
                  borderRadius: "4px",
                  color: selectedDays[day] ? WHITE : `${BEIGE}cc`,
                  borderColor: selectedDays[day] ? CRIMSON : `${CRIMSON}44`,
                  backgroundColor: selectedDays[day] ? CRIMSON : "rgba(13, 1, 1, 0.4)",
                  "&:hover": {
                    backgroundColor: selectedDays[day] ? `${CRIMSON}dd` : "rgba(145, 1, 1, 0.15)",
                    borderColor: CRIMSON,
                  }
                }}
              >
                {day}
              </Button>
            ))}
          </Box>

          <Button
            variant="contained"
            fullWidth
            startIcon={<ShareIcon />}
            disabled={countInSelectedDays === 0}
            onClick={handleCopyLink}
            sx={dialogActionBtnSx(false)}
          >
            COPY SHARE LINK ({countInSelectedDays})
          </Button>
        </Box>

        {/* IMPORT SECTION */}
        <Box sx={{ mb: 4 }}>
          <Typography sx={dialogSectionHeaderSx(false)}>
            IMPORT
          </Typography>
          
          <Typography sx={dialogDescSx}>
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
              background: "rgba(0, 0, 0, 0.6)",
              borderRadius: "4px",
              "& .MuiOutlinedInput-root": {
                color: BEIGE,
                fontFamily: FONT,
                fontSize: "1.1rem",
                letterSpacing: "0.05em",
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
          <Typography sx={dialogSectionHeaderSx(true)}>
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
            DEFQON.1 TIMETABLE BY ME!
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

      {/* Bottom beige triangles pointing up */}
      <Box sx={{
        width: "100%",
        height: "12px",
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="12"><path d="M0 12 L10 0 L20 12 Z" fill="%23BC9B5E" fill-opacity="0.8"/></svg>')`,
        backgroundRepeat: "repeat-x",
        backgroundPosition: "bottom left",
        flexShrink: 0
      }} />
    </Dialog>
  );
};
