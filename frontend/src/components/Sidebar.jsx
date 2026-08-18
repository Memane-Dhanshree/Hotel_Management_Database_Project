import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import HotelIcon from "@mui/icons-material/Hotel";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import EventNoteIcon from "@mui/icons-material/EventNote";
import PaymentsIcon from "@mui/icons-material/Payments";

import { Link } from "react-router-dom";

const drawerWidth = 240;

const Sidebar = () => {
  const menuItems = [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      path: "/",
    },
    {
      text: "Rooms",
      icon: <HotelIcon />,
      path: "/rooms",
    },
    {
      text: "Book Room",
      icon: <BookOnlineIcon />,
      path: "/book-room",
    },
    {
      text: "Bookings",
      icon: <EventNoteIcon />,
      path: "/bookings",
    },
    {
      text: "Payments",
      icon: <PaymentsIcon />,
      path: "/payments",
    },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar>
        <Typography
            variant="h6"
            fontWeight="bold"
            color="primary"
        >
            🏨 Hotel Booking
        </Typography>
      </Toolbar>

      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>

              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;