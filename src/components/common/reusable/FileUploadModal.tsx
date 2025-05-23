import React, { useState, useRef, useCallback } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  IconButton,
  useTheme,
  Chip,
  Tab,
  Tabs
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  Close as CloseIcon,
  CloudDownload as CloudDownloadIcon,
  FileCopy as FileCopyIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import downloadPreMadeTemplate from './ExcelTemplateGenerator';

interface FileUploadModalProps {
  open: boolean;
  onClose: () => void;
  onFileUpload: (file: File) => void;
  acceptedFileTypes?: string;
}

const FileUploadModal: React.FC<FileUploadModalProps> = ({
  open,
  onClose,
  onFileUpload,
  acceptedFileTypes = '.xlsx,.xls,.csv'
}) => {
  const theme = useTheme();
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  }, []);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  }, []);

  const handleFile = (file: File) => {
    // Check if file type is accepted
    if (!file.name.match(/\.(xlsx|xls|csv)$/i)) {
      alert('Invalid file format. Please upload Excel (.xlsx, .xls) or CSV (.csv) files.');
      return;
    }
    
    setSelectedFile(file);
  };

  const handleUploadClick = () => {
    if (!selectedFile) {
      fileInputRef.current?.click();
    } else {
      onFileUpload(selectedFile);
      onClose();
    }
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleDownloadTemplate = () => {
    downloadPreMadeTemplate();
  };

  const exampleTableData = [
    { 
      column: 'Nome Prodotto', 
      example: 'ALVITA GINOCCHIERA UNIVERSALE', 
      description: 'Nome esatto del prodotto' 
    },
    { 
      column: 'Quantità', 
      example: '2', 
      description: 'Quantità da ordinare (numero intero)' 
    },
    { 
      column: 'MINSAN', 
      example: '935281663', 
      description: 'Codice MINSAN del prodotto (opzionale)' 
    },
    { 
      column: 'EAN', 
      example: '5055382312321', 
      description: 'Codice EAN del prodotto (opzionale)' 
    }
  ];

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          overflow: 'hidden'
        }
      }}
    >
      <DialogTitle sx={{ 
        bgcolor: theme.palette.primary.main, 
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CloudUploadIcon />
          <Typography variant="h6">Upload Product File</Typography>
        </Box>
        <IconButton 
          onClick={onClose} 
          size="small" 
          sx={{ color: 'white' }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <Tabs 
        value={tabValue} 
        onChange={handleTabChange}
        variant="fullWidth"
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      >
        <Tab label="Upload File" />
        <Tab label="File Guidelines" />
        <Tab label="Example Format" />
      </Tabs>
      
      {tabValue === 0 && (
        <DialogContent>
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              p: 3
            }}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept={acceptedFileTypes}
              style={{ display: 'none' }}
              onChange={handleFileInputChange}
            />
            
            <Box
              sx={{
                width: '100%',
                height: 200,
                border: `2px dashed ${isDragging ? theme.palette.primary.main : theme.palette.grey[300]}`,
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: isDragging ? 'rgba(25, 118, 210, 0.04)' : theme.palette.grey[50],
                transition: 'all 0.2s ease-in-out',
                cursor: 'pointer',
                mb: 3
              }}
              onClick={handleFileClick}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {selectedFile ? (
                <Box sx={{ textAlign: 'center' }}>
                  <FileCopyIcon sx={{ fontSize: 48, color: theme.palette.primary.main, mb: 1 }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                    {selectedFile.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {(selectedFile.size / 1024).toFixed(2)} KB - {selectedFile.type || 'Unknown type'}
                  </Typography>
                  <Chip 
                    label="File Selected" 
                    color="success" 
                    size="small" 
                    sx={{ mt: 1 }}
                  />
                </Box>
              ) : (
                <>
                  <CloudUploadIcon sx={{ fontSize: 48, color: theme.palette.grey[400], mb: 1 }} />
                  <Typography variant="subtitle1">
                    Drag & Drop your file here
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    or click to select a file
                  </Typography>
                  <Button 
                    variant="outlined" 
                    size="small"
                    startIcon={<CloudUploadIcon />}
                  >
                    Select File
                  </Button>
                </>
              )}
            </Box>
            
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              width: '100%',
              gap: 1
            }}>
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                Accepted file types: Excel (.xlsx, .xls) or CSV (.csv)
              </Typography>
              
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                gap: 1,
                bgcolor: 'rgba(25, 118, 210, 0.08)',
                p: 1,
                borderRadius: 1,
                width: '100%',
                mt: 1
              }}>
                <InfoIcon color="primary" fontSize="small" />
                <Typography variant="body2">
                  Your file should contain at least <strong>Product Identifiers</strong> and either <strong>Quantity</strong> or <strong>Target Price</strong>
                </Typography>
              </Box>

              <Button
                variant="text"
                color="primary"
                size="small"
                startIcon={<CloudDownloadIcon />}
                onClick={handleDownloadTemplate}
                sx={{ mt: 2 }}
              >
                Download Template File
              </Button>
            </Box>
          </Box>
        </DialogContent>
      )}
      
      {tabValue === 1 && (
        <DialogContent>
          <Box sx={{ p: 1 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Guidelines for File Upload</Typography>
            
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'medium', color: theme.palette.primary.main }}>
              File Format
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Il file più semplice da caricare è un CSV con soltanto il nome del prodotto e la quantità:
            </Typography>
            
            <Box sx={{ 
              bgcolor: 'rgba(25, 118, 210, 0.08)', 
              p: 2, 
              borderRadius: 1,
              mb: 3,
              fontFamily: 'monospace',
              whiteSpace: 'pre'
            }}>
              Nome Prodotto,Quantità{'\n'}
              ALVITA GINOCCHIERA UNIVERSALE,2{'\n'}
              BIODERMA ATODERM INTENSIVE BAUME 500ML,1{'\n'}
              ZERODOL 20CPR 20MG,3{'\n'}
              ENTEROGERMINA 2 MILIARDI/5ML 10FL,5
            </Box>
            
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'medium', color: theme.palette.primary.main }}>
              Required Columns
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Il file deve contenere almeno una colonna con un identificativo del prodotto:
            </Typography>
            
            <Box component="ul" sx={{ pl: 2, mb: 3 }}>
              <Box component="li" sx={{ mb: 1 }}>
                <Typography variant="body2">
                  <strong>Identificativo Prodotto</strong> - Uno dei seguenti:
                </Typography>
                <Box component="ul" sx={{ pl: 3 }}>
                  <Box component="li">
                    <Typography variant="body2">
                      Nome Prodotto (es. "ALVITA GINOCCHIERA UNIVERSALE")
                    </Typography>
                  </Box>
                  <Box component="li">
                    <Typography variant="body2">
                      Codice EAN (es. "5055382312321")
                    </Typography>
                  </Box>
                  <Box component="li">
                    <Typography variant="body2">
                      Codice MINSAN (es. "935281663")
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Typography variant="body2">
                  <strong>Quantità</strong> - Numero di pezzi da ordinare (numero intero)
                </Typography>
              </Box>
            </Box>
            
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'medium', color: theme.palette.primary.main }}>
              Prodotti Disponibili
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              In questa versione demo, sono disponibili solo i seguenti prodotti:
            </Typography>
            
            <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: 'rgba(25, 118, 210, 0.08)' }}>
                    <TableCell><strong>Nome Prodotto</strong></TableCell>
                    <TableCell><strong>MINSAN</strong></TableCell>
                    <TableCell><strong>EAN</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>ALVITA GINOCCHIERA UNIVERSALE</TableCell>
                    <TableCell>935281663</TableCell>
                    <TableCell>5055382312321</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>BIODERMA ATODERM INTENSIVE BAUME 500ML</TableCell>
                    <TableCell>935281511</TableCell>
                    <TableCell>8058659018183</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>ZERODOL 20CPR 20MG</TableCell>
                    <TableCell>972462406</TableCell>
                    <TableCell>8032891460294</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>ENTEROGERMINA 2 MILIARDI/5ML 10FL</TableCell>
                    <TableCell>931842338</TableCell>
                    <TableCell>8023891025414</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            
            <Box sx={{ 
              p: 2, 
              bgcolor: 'rgba(25, 118, 210, 0.08)', 
              borderRadius: 2, 
              display: 'flex',
              alignItems: 'flex-start',
              gap: 1
            }}>
              <InfoIcon color="primary" sx={{ mt: 0.5 }} />
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                  Suggerimento
                </Typography>
                <Typography variant="body2">
                  Per un caricamento ottimale, assicurati che i nomi dei prodotti o i codici corrispondano esattamente ai prodotti nel nostro catalogo. Puoi scaricare un template precompilato usando il pulsante in basso.
                </Typography>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      )}
      
      {tabValue === 2 && (
        <DialogContent>
          <Box sx={{ p: 1 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Example File Format</Typography>
            
            <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: theme.palette.grey[100] }}>
                    {exampleTableData.map((item, index) => (
                      <TableCell key={index} sx={{ fontWeight: 'bold' }}>
                        {item.column}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    {exampleTableData.map((item, index) => (
                      <TableCell key={index}>{item.example}</TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'medium', color: theme.palette.primary.main }}>
              Excel/CSV Template
            </Typography>
            
            <Box sx={{ 
              p: 2, 
              bgcolor: theme.palette.grey[50], 
              borderRadius: 2,
              border: `1px solid ${theme.palette.grey[200]}`,
              mb: 2
            }}>
              <Typography variant="body2" sx={{ mb: 2 }}>
                You can use the template below to create your file. This includes all the necessary columns formatted correctly.
              </Typography>
              
              <Button
                variant="outlined"
                startIcon={<CloudDownloadIcon />}
                size="small"
                onClick={handleDownloadTemplate}
              >
                Download Template
              </Button>
            </Box>
            
            <Box sx={{ 
              p: 2, 
              bgcolor: 'rgba(25, 118, 210, 0.08)', 
              borderRadius: 2, 
              display: 'flex',
              alignItems: 'flex-start',
              gap: 1
            }}>
              <InfoIcon color="primary" sx={{ mt: 0.5 }} />
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                  Pro Tip
                </Typography>
                <Typography variant="body2">
                  For best results, ensure your product identifiers (EAN, MINSAN, or Product Name) exactly match the ones in your inventory to ensure proper matching.
                </Typography>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      )}
      
      <DialogActions sx={{ px: 3, py: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
        <Button 
          onClick={onClose} 
          variant="outlined"
        >
          Cancel
        </Button>
        
        <Button 
          onClick={handleUploadClick} 
          variant="contained" 
          color="primary"
          startIcon={<CloudUploadIcon />}
          disabled={tabValue !== 0}
        >
          {selectedFile ? 'Upload Selected File' : 'Select File'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FileUploadModal; 