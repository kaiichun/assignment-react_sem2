import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";

export default function IsSidebar() {
  return (
    <div id="app" style={({ height: "100vh" }, { display: "flex" })}>
      <Sidebar style={{ height: "100vh" }}>
        <Menu>
          <MenuItem style={{ textAlign: "center" }}>
            {" "}
            <h2>Admin</h2>
          </MenuItem>

          <MenuItem>Home</MenuItem>
          <MenuItem>All</MenuItem>
          <MenuItem>Study</MenuItem>
          <MenuItem>Journal</MenuItem>
          <MenuItem>Dashboard</MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}
