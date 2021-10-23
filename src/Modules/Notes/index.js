import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Alert,
  AlertTitle,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  IconButton,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import BackspaceIcon from "@mui/icons-material/Backspace";
import EditIcon from "@mui/icons-material/Edit";

const Notes = ({ setLoader }) => {
  const resetNote = {
    title: "",
    note: "",
    link: "",
  };

  const [list, setList] = useState([]);
  const [note, setNote] = useState(resetNote);
  const [editNote, setEditNote] = useState(null);
  const [error, setError] = useState(null);

  const listNotes = () => {
    setLoader(true);
    axios({ method: "get", url: "list" })
      .then((list) => {
        setList(list.data);
        setError(null);
        setLoader(false);
      })
      .catch((err) => {
        setError(err);
        setLoader(false);
      });
  };

  const testPost = () => {
    const postData = list.find(
      (data) =>
        data.note === note.note &&
        data.title === note.title &&
        data.link === note.link
    );
    if (editNote) {
      if (
        editNote.note !== note.note ||
        editNote.title !== note.title ||
        editNote.link !== note.link
      ) {
        axios({
          method: "post",
          url: "edit",
          data: {
            old: editNote,
            update: note,
          },
        }).then(() => {
          listNotes();
          setEditNote(null);
          setNote(resetNote);
        });
      }
    } else if (!postData) {
      if (note.title || note.note || note.link) {
        axios({
          method: "post",
          url: "add",
          data: note,
        }).then(() => {
          setNote(resetNote);
          listNotes();
        });
      }
    }
  };

  const testDelete = (params) => {
    axios({
      method: "delete",
      url: "delete",
      data: { title: params.title, note: params.note, link: params.link },
    }).then(() => {
      listNotes();
      editNote(null);
    });
  };

  useEffect(() => {
    listNotes();
  }, []);

  return (
    <div>
      <Container maxWidth="xl">
        <Grid container alignItems="stretch" direction="row">
          {list.map((data, index) => (
            <Grid container alignItems="stretch" item lg={3} p={2} key={index}>
              <Card
                sx={{
                  display: "flex",
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <CardContent>
                  <Typography
                    sx={{ wordWrap: "break-word" }}
                    gutterBottom
                    variant="h5"
                    component="div"
                  >
                    {data.title}
                  </Typography>
                  <Typography
                    sx={{ wordWrap: "break-word" }}
                    variant="body2"
                    color="text.secondary"
                  >
                    {data.note}
                  </Typography>
                  <Typography
                    sx={{ wordWrap: "break-word" }}
                    variant="body2"
                    color="text.secondary"
                  >
                    <Link href={data.link}>{data.link}</Link>
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton
                    aria-label="delete"
                    onClick={() => testDelete(data)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    aria-label="edit"
                    onClick={() => {
                      setNote({
                        title: data.title,
                        note: data.note,
                        link: data.link,
                      });
                      setEditNote({
                        title: data.title,
                        note: data.note,
                        link: data.link,
                      });
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        {error && (
          <Grid container>
            <Grid item xs={12}>
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                This is an error alert — <strong>check it out!</strong>
                <pre>
                  <code>{JSON.stringify(error, null, 2)}</code>
                </pre>
              </Alert>
            </Grid>
          </Grid>
        )}
        <Grid container>
          <Grid item xs={12} my={2}>
            <TextField
              label="title"
              value={note.title}
              fullWidth
              onChange={(e) => setNote({ ...note, title: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} my={2}>
            <TextField
              label="note"
              multiline
              maxRows={5}
              value={note.note}
              fullWidth
              onChange={(e) => setNote({ ...note, note: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} my={2}>
            <TextField
              label="link"
              multiline
              maxRows={5}
              value={note.link}
              fullWidth
              onChange={(e) => setNote({ ...note, link: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} my={2}>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Button
                variant="contained"
                size="large"
                startIcon={editNote ? <EditIcon /> : <AddToPhotosIcon />}
                onClick={testPost}
              >
                {editNote ? "Edit Notes" : "Add Notes"}
              </Button>
              <Button
                variant="contained"
                size="large"
                startIcon={<BackspaceIcon />}
                onClick={() => {
                  setNote(resetNote);
                  setEditNote(null);
                }}
              >
                Clear Notes
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Notes;
