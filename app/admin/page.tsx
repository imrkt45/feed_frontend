"use client";

import { useState } from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";

import {
  useTheme,
} from "@mui/material/styles";

import {
  useCreateFeedMutation,
} from "../redux/api/api";

import ThemeToggle from "../components/ThemeToggle";

export default function AdminPage() {
  const theme = useTheme();

  const [title, setTitle] =
    useState<string>("");

  const [description, setDescription] =
    useState<string>("");

  const [
    createFeed,
    { isLoading },
  ] = useCreateFeedMutation();

  const submitHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      await createFeed({
        title,
        description,
      }).unwrap();

      setTitle("");

      setDescription("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",

        background:
          theme.palette.mode ===
          "dark"
            ? "linear-gradient(to right, #141e30, #243b55)"
            : "linear-gradient(to right, #f5f7fa, #c3cfe2)",

        display: "flex",

        justifyContent: "center",

        alignItems: "center",

        p: 3,

        position: "relative",
      }}
    >
      <Box
        position="absolute"
        top={20}
        right={20}
      >
        <ThemeToggle />
      </Box>

      <Card
        sx={{
          width: "100%",

          maxWidth: 600,

          borderRadius: 4,

          boxShadow:
            "0px 10px 30px rgba(0,0,0,0.3)",
        }}
      >
        <CardContent
          sx={{
            p: 5,
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            mb={1}
            textAlign="center"
          >
            Add New Feed
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            mb={4}
            textAlign="center"
          >
            Create realtime feed
            updates instantly using
            WebSocket.
          </Typography>

          <form
            onSubmit={submitHandler}
          >
            <Box mb={3}>
              <TextField
                fullWidth
                label="Feed Title"
                value={title}
                onChange={(e) =>
                  setTitle(
                    e.target.value
                  )
                }
                required
              />
            </Box>

            <Box mb={4}>
              <TextField
                fullWidth
                multiline
                rows={5}
                label="Feed Description"
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
                required
              />
            </Box>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress
                  size={24}
                  sx={{
                    color: "white",
                  }}
                />
              ) : (
                "Add Feed"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}