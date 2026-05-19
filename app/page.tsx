"use client";

import { useEffect, useMemo, useState, startTransition } from "react";

import Link from "next/link";

import { Box, Typography, Button } from "@mui/material";

import { useTheme } from "@mui/material/styles";

import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";

import { useGetFeedsQuery } from "./redux/api/api";

import ThemeToggle from "./components/ThemeToggle";

interface Feed {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface WebSocketMessage {
  type: string;
  data: Feed;
}

export default function HomePage() {
  const theme = useTheme();

  const [page, setPage] = useState<number>(0);

  const [pageSize, setPageSize] = useState<number>(5);

  // RTK QUERY
  const { data, currentData, isFetching, refetch } = useGetFeedsQuery(
    {
      page: page + 1,
      limit: pageSize,
    },
    {
      refetchOnMountOrArgChange: true,

      refetchOnFocus: true,

      refetchOnReconnect: true,
    },
  );

  // KEEP OLD DATA WHILE FETCHING
  const feeds = currentData?.feeds || data?.feeds || [];
  console.log(currentData);

  const totalCount = currentData?.totalCount || data?.totalCount || 0;

  // WEBSOCKET
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:5001");

    ws.onopen = () => {
      console.log("WebSocket Connected");
    };

    ws.onmessage = (event: MessageEvent) => {
      const message: WebSocketMessage = JSON.parse(event.data);

      if (message.type === "NEW_FEED" && page === 0) {
        refetch();
      }
    };

    ws.onclose = () => {
      console.log("WebSocket Closed");
    };

    return () => {
      ws.close();
    };
  }, [refetch, page]);

  // TABLE COLUMNS
  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: "title",

        headerName: "Title",

        flex: 1,
      },

      {
        field: "description",

        headerName: "Description",

        flex: 2,
      },

      {
        field: "createdAt",

        headerName: "Created At",

        flex: 1.5,

        valueFormatter: (value) => new Date(value).toLocaleString(),
      },
    ],
    [],
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",

        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(to right, #141e30, #243b55)"
            : "linear-gradient(to right, #f5f7fa, #c3cfe2)",

        p: 5,
      }}
    >
      {/* HEADER */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography
          variant="h4"
          color={theme.palette.mode === "dark" ? "white" : "black"}
          fontWeight="bold"
        >
          Realtime Feeds
        </Typography>

        <Box display="flex" gap={2}>
          <ThemeToggle />

          <Link href="/admin">
            <Button variant="contained">Go To Admin</Button>
          </Link>
        </Box>
      </Box>

      {/* TABLE */}
      <Box
        sx={{
          height: 600,

          width: "100%",

          backgroundColor: theme.palette.background.paper,

          borderRadius: 4,

          overflow: "hidden",

          boxShadow: "0px 10px 30px rgba(0,0,0,0.3)",
        }}
      >
        <DataGrid
          rows={feeds}
          columns={columns}
          getRowId={(row) => row._id}
          loading={isFetching}
          pagination
          paginationMode="server"
          rowCount={totalCount}
          pageSizeOptions={[5, 10, 20]}
          paginationModel={{
            page,
            pageSize,
          }}
          onPaginationModelChange={(model: GridPaginationModel) => {
            startTransition(() => {
              setPage(model.page);

              setPageSize(model.pageSize);
            });
          }}
          sx={{
            border: "none",

            "& .MuiDataGrid-columnHeaders": {
              backgroundColor:
                theme.palette.mode === "dark" ? "#1e293b" : "#f4f4f4",

              fontSize: "16px",

              fontWeight: "bold",
            },

            "& .MuiDataGrid-cell": {
              fontSize: "14px",
            },

            "& .MuiDataGrid-footerContainer": {
              backgroundColor:
                theme.palette.mode === "dark" ? "#1e293b" : "#fafafa",
            },
          }}
        />
      </Box>
    </Box>
  );
}
