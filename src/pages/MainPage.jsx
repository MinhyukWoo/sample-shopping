import Cards from "../components/Cards";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

function MainPage() {
  return (
    <Box>
      <AppBar component="nav">
        <Toolbar>
          <Typography sx={{ flexGrow: 1 }}>지금</Typography>
          <Button color="inherit">로그인</Button>
        </Toolbar>
      </AppBar>
      <Toolbar></Toolbar>
      <Box component="main">
        <Cards></Cards>
      </Box>
    </Box>
  );
}

export default MainPage;
