import { Link } from "react-router-dom";
import "./MainPage.css";

import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function MainPage() {
  const [info, setInfo] = React.useState("");
  const handleChange = (event) => {
    setInfo(event.target.value);
  };

  return (
    <>
      <div className="container">
        <div className="title-container ">
          <h1 className="title is-1">Bazar Mladá Boleslav</h1>
        </div>
        <p className="title is-4">Kategorie</p>

        <div className="boxes">
          <Box sx={{ minWidth: 200 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Kočky</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={info}
                label="Kocky"
                onChange={handleChange}
              >
                <MenuItem value={10}>
                  <Link className="column" to={"/createcat"}>
                    <p>Vytvořit inzerát pro kočku</p>
                  </Link>
                </MenuItem>
                <MenuItem value={20}>
                  <Link className="column" to={"/cats"}>
                    <p>Seznam koček</p>
                  </Link>
                </MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ minWidth: 200 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Auta</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={info}
                label="Auta"
                onChange={handleChange}
              >
                <MenuItem value={10}>
                  <Link className="column" to={"/createcar"}>
                    <p>Vytvořit inzerát pro auto</p>
                  </Link>
                </MenuItem>
                <MenuItem value={20}>
                  <Link className="column" to={"/cars"}>
                    <p>Seznam aut</p>
                  </Link>
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
      </div>
    </>
  );
}
