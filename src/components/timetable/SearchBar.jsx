import React, { useMemo } from 'react';
import { Autocomplete, TextField, Box, Typography } from '@mui/material';
import { getAllArtists } from '../../utils/searchUtils';
import { BEIGE } from '../../styles/palette';

export function SearchBar({ onSelectEvent }) {
  const options = useMemo(() => getAllArtists(), []);

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option.label}
      onChange={(event, newValue) => {
        if (newValue) {
          onSelectEvent(newValue);
        }
      }}
      renderOption={(props, option) => (
        <Box component="li" {...props} key={`${option.day}-${option.stage}-${option.label}`}>
          <Box>
            <Typography variant="body1" sx={{ color: BEIGE }}>{option.label}</Typography>
            <Typography variant="caption" sx={{ color: 'rgba(212, 180, 131, 0.7)' }}>
              {option.day} • {option.stage} ({option.start} - {option.end})
            </Typography>
          </Box>
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search Artist..."
          variant="outlined"
          size="small"
          sx={{
            backgroundColor: 'rgba(0,0,0,0.6)',
            borderRadius: 1,
            input: { color: BEIGE },
            label: { color: BEIGE },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'rgba(192, 25, 42, 0.5)' },
              '&:hover fieldset': { borderColor: '#C0192A' },
              '&.Mui-focused fieldset': { borderColor: '#C0192A' },
            },
          }}
        />
      )}
      sx={{ width: { xs: '100%', sm: 300 } }}
    />
  );
}