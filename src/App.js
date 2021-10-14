import {
  addDoc,
  collection,
  query,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import "./App.css";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Container } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { db } from "./firebase";

async function submit(values, { resetForm }) {
  console.log("values", values);
  try {
    const docRef = await addDoc(collection(db, "ToDolist"), {
      item: values.item,
    });
    console.log("Document written with ID: ", docRef.id);

    resetForm({});
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

const validationSchema = yup.object({
  item: yup
    .string("Enter your item")
    .min(3, "item should be of minimum 3 characters length")
    .required("item is required"),
});

async function del(id) {
  await deleteDoc(doc(collection(db, "ToDolist"), id));
}

function App() {
  const [Data, setData] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "ToDolist"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let temp = [];
      snapshot.forEach((doc) => {
        let id = doc.id;
        let data = doc.data();

        temp.unshift({
          id: id,
          item: data.item,
        });
      });
      setData(temp);
    });

    return () => {
      unsubscribe();
      console.log("unsub");
    };
  }, []);

  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: {
      item: "",
    },
    onSubmit: submit,
  });

  async function deleteAllitems() {
    Data.forEach(async (element) => {
      await deleteDoc(doc(collection(db, "ToDolist"), element.id));
    });
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" className="navbar">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
              className="navbartext"
            >
              ToDo App
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Container>
        <div className="container">
          <div className="main">
            <form onSubmit={formik.handleSubmit}>
              <TextField
                id="outlined-basic"
                name="item"
                label="item"
                className="box"
                value={formik.values.item}
                onChange={formik.handleChange}
                error={formik.touched.item && Boolean(formik.errors.item)}
                helperText={formik.touched.item && formik.errors.item}
                variant="outlined"
              />

              <div className="btngroup">
                <Button
                  id="btn"
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  +
                </Button>

                <IconButton
                  aria-label="delete"
                  type="reset"
                  id="delbtt"
                  size="large"
                  onClick={deleteAllitems}
                >
                  <DeleteIcon id="delallbtn" />
                </IconButton>
              </div>
            </form>

            <div className="item">
              {Data.map((eachUser, i) => {
                return (
                  <div key={i}>
                    <div id="cont">
                      <li>{eachUser.item}</li>

                      <IconButton
                        aria-label="delete"
                        className="delbtn"
                        size="small"
                        onClick={() => {
                          del(eachUser.id);
                        }}
                      >
                        <DeleteIcon className="delicon" />
                      </IconButton>
                    </div>
                    <br />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default App;
