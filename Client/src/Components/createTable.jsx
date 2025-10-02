import * as React from "react";
import { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Copy, SquareArrowOutUpRight, Eye, Calendar } from "lucide-react";
import { Chip, Box } from "@mui/material";
import useUrl from "../Hooks/useUrl";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(() => ({
  borderBottom: "1px solid #e5e7eb",
  fontSize: 14,
}));

const HeaderTableCell = styled(StyledTableCell)(() => ({
  fontWeight: 600,
  color: "#374151",
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:last-child td, &:last-child th": {
    borderBottom: 0,
  },
}));

export default function CustomTable({ searchQuery = "" }) {
  const { fetchInitialData, initialData } = useUrl(); // Removed getDataofEach as it's not needed here
  const navigate = useNavigate();

  useEffect(() => {
    fetchInitialData();
  }, []);

  const handleCopy = (shortUrl) => {
    navigator.clipboard.writeText(shortUrl);
    toast.success("Short URL copied!");
  };

  const handleOpen = (shortUrl, originalUrl) => {
    if (originalUrl.startsWith("http://") || originalUrl.startsWith("https://")) {
      window.open(shortUrl, "_blank");
    } else {
      navigate("/error");
    }
  };

  const filteredData = initialData.filter((row) =>
    row.originalUrl.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <TableContainer component={Paper} sx={{ boxShadow: "none", border: "none" }}>
      <Table sx={{ minWidth: 700, borderCollapse: "separate", borderSpacing: 0 }}>
        <TableHead>
          <TableRow>
            <HeaderTableCell>Original URL</HeaderTableCell>
            <HeaderTableCell>Short Code</HeaderTableCell>
            <HeaderTableCell>Clicks</HeaderTableCell>
            <HeaderTableCell>Created</HeaderTableCell>
            <HeaderTableCell>Actions</HeaderTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.map((row) => {
            const shortCode = row.shortUrl.split("/").pop();
            return (
              <StyledTableRow key={row.shortUrl}>
                <StyledTableCell>
                  <a
                    href={row.originalUrl.startsWith("http") ? row.originalUrl : `https://${row.originalUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#000000", textDecoration: "none" }}
                  >
                    {row.originalUrl}
                  </a>
                </StyledTableCell>
                <StyledTableCell>
                  <Chip label={shortCode} variant="outlined" size="small" sx={{ fontWeight: 600 }} />
                </StyledTableCell>
                <StyledTableCell>
                  <Chip label={`${row.clicks} clicks`} color="default" size="small" />
                </StyledTableCell>
                <StyledTableCell>
                  <Box display="flex" alignItems="center" gap={1} sx={{ color: "text.secondary" }}>
                    <Calendar size={16} /> {row.createdAt}
                  </Box>
                </StyledTableCell>
                <StyledTableCell>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Copy size={18} style={{ cursor: "pointer" }} onClick={() => handleCopy(row.shortUrl)} />
                    <SquareArrowOutUpRight
                      size={18}
                      style={{ cursor: "pointer" }}
                      onClick={() => handleOpen(row.shortUrl, row.originalUrl)}
                    />
                    {/* THIS IS THE CORRECTED PART */}
                    <Eye
                      size={18}
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate(`/data/${shortCode}`)}
                    />
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}