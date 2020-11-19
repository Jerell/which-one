import React from "react";
import { TextField, Box } from "@material-ui/core";

export default function Header(props) {
  let style = {
    fontWeight: "bold",
    textTransform: "uppercase",
  };
  function handleChange(e) {
    let text = e.target.value;
    props.setWord(text);
  }
  return (
    <header>
      <Box display="flex" justifyContent="center" mb={2}>
        <TextField label={props.word} onChange={handleChange}></TextField>
      </Box>
    </header>
  );
}
