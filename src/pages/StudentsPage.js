import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "../api";
import { handleApiError } from "../utils/errorHandler";
import { useSnackbar } from "notistack";
import StudentModal from "../components/StudentModal";

const StudentPage = () => {
  const [students, setStudents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const response = await api.get("/student", {
          params: {
            page: page + 1, // Assuming page is 1-based for the backend
            pageSize: rowsPerPage,
            search: searchTerm,
          },
        });

        setStudents(response.data.students || []);
        setTotalCount(response.data.totalCount || 0);
      } catch (error) {
        handleApiError(error, enqueueSnackbar);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [page, rowsPerPage, searchTerm, enqueueSnackbar]);

  console.log("students", students);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0); // Reset to the first page when search term changes
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Students
      </Typography>
      <Box
        mb={2}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width={"100%"}
          gap={2}
        >
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              endAdornment: <SearchIcon />,
            }}
            sx={{ maxWidth: 300 }}
          />
          <Button
            onClick={handleOpenModal}
            variant="contained"
            size="small"
            color="primary"
            startIcon={<AddIcon />}
          >
            Add Student
          </Button>
        </Box>
      </Box>
      <Paper>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 600 }}>Name</TableCell>
                <TableCell style={{ fontWeight: 600 }}>Date of Birth</TableCell>
                <TableCell style={{ fontWeight: 600 }}>Class</TableCell>
                <TableCell style={{ fontWeight: 600 }}>Guardian Name</TableCell>
                <TableCell style={{ fontWeight: 600 }}>
                  Guardian Contact
                </TableCell>
                <TableCell style={{ fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <CircularProgress size={24} />
                  </TableCell>
                </TableRow>
              ) : (
                students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{`${student.firstName} ${student.lastName}`}</TableCell>
                    <TableCell>
                      {new Date(student.dateOfBirth).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{student.class}</TableCell>
                    <TableCell>{student.guardianName}</TableCell>
                    <TableCell>{student.guardianContact}</TableCell>
                    <TableCell>
                      <IconButton color="primary" size="small">
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton color="secondary" size="small">
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
              {students.length === 0 && !loading && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No students found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {students.length > 0 && (
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={totalCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
          />
        )}
      </Paper>
      <StudentModal
        open={modalOpen}
        onClose={handleCloseModal}
        // onSubmit={handleCreateStudent}
        loading={loading}
      />
    </Box>
  );
};

export default StudentPage;
