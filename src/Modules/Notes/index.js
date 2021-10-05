import React, { useEffect, useState } from "react";
import axios from "axios";
import {
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
import BackspaceIcon from "@mui/icons-material/Backspace";

const Notes = () => {
  const resetNote = {
    title: "",
    note: "",
    link: "",
  };

  const [list, setList] = useState([]);
  const [note, setNote] = useState(resetNote);

  const listNotes = () => {
    axios({ method: "get", url: "list" })
      .then((list) => setList(list.data))
      .catch(console.error);
  };

  const testPost = () => {
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
  };

  const testDelete = (params) => {
    axios({
      method: "delete",
      url: "delete",
      data: { title: params.title, note: params.note },
    }).then(() => {
      listNotes();
    });
  };

  useEffect(() => {
    listNotes();
  }, []);

  return (
    <Container>
      <Grid container spacing={2}>
        {list.map((data, index) => (
          <Grid item xs={4} p={2} key={index}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {data.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {data.note}
                </Typography>
                <Typography variant="body2" color="text.secondary">
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
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Grid container>
        <Grid xs={12} my={2}>
          <TextField
            label="title"
            value={note.title}
            fullWidth
            onChange={(e) => setNote({ ...note, title: e.target.value })}
          />
        </Grid>
        <Grid xs={12} my={2}>
          <TextField
            label="note"
            multiline
            maxRows={5}
            value={note.note}
            fullWidth
            onChange={(e) => setNote({ ...note, note: e.target.value })}
          />
        </Grid>
        <Grid xs={12} my={2}>
          <TextField
            label="link"
            multiline
            maxRows={5}
            value={note.link}
            fullWidth
            onChange={(e) => setNote({ ...note, link: e.target.value })}
          />
        </Grid>
        <Grid xs={12} my={2}>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<DeleteIcon />}
              onClick={testPost}
            >
              Add Notes
            </Button>
            <Button
              variant="contained"
              size="large"
              startIcon={<BackspaceIcon />}
              onClick={() => setNote(resetNote)}
            >
              Clear Notes
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Notes;
