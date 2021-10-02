import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Container, Grid, Paper, TextField } from "@mui/material";

const CheckApis = () => {
  const [list, setList] = useState([]);
  const [post, setPost] = useState({});
  const [note, setNote] = useState("");
  const [title, setTitle] = useState("");

  const listNotes = () => {
    axios({ method: "get", url: "http://localhost:5000/list" })
      .then((list) => setList(list.data))
      .catch(console.error);
  };

  const testPost = () => {
    axios({
      method: "post",
      url: "http://localhost:5000/add",
      data: {
        title,
        note,
      },
    }).then((res) => {
      setPost(res);
      listNotes();
    });
  };

  const testDelete = (params) => {
    console.log(params);
    axios({
      method: "delete",
      url: "http://localhost:5000/delete",
      data: { title: params.title, note: params.note },
    }).then((res) => {
      console.log(res);
      listNotes();
    });
  };

  useEffect(() => {
    listNotes();
  }, []);

  // const selectNote = (data) => {};

  return (
    <Container>
      <Grid container>
        <Grid xs={12} my={2}>
          <TextField
            label="title"
            value={title}
            fullWidth
            onChange={(e) => setTitle(e.target.value)}
          />
        </Grid>
        <Grid xs={12} my={2}>
          <TextField
            label="note"
            multiline
            maxRows={5}
            value={note}
            fullWidth
            onChange={(e) => setNote(e.target.value)}
          />
        </Grid>
        <Grid xs={12} my={2}>
          <Button variant="contained" size="large" onClick={testPost}>
            Post data
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {list.map((data, index) => (
          <Grid item xs={4} p={2} key={index}>
            <Paper
              elevation={2}
              sx={{ px: 2, py: 1 }}
              onClick={() => testDelete(data)}
            >
              <h3>{data.title}</h3>
              <p>{data.note}</p>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Grid container>
        <Grid xs={6} pr={1}>
          <Paper elevation={1} sx={{ p: 1 }}>
            <pre>
              <code>{JSON.stringify(list, null, 2)}</code>
            </pre>
          </Paper>
        </Grid>
        <Grid xs={6} pl={1}>
          <Paper elevation={1} sx={{ p: 1 }}>
            <pre>
              <code>{JSON.stringify(post, null, 2)}</code>
            </pre>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CheckApis;
