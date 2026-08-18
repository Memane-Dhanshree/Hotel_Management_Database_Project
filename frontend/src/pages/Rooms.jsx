  import { useEffect, useState } from "react";
import { Typography, Grid } from "@mui/material";

import api from "../api/axios";
import RoomCard from "../components/RoomCard";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const loadRooms = async () => {
      try {
        const response = await api.get("/rooms");
        setRooms(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    loadRooms();
  }, []);

  return (
    <>
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={4}
      >
        Rooms
      </Typography>

      <Grid container spacing={3}>
        {rooms.map((room) => (
          <Grid
            key={room.room_id}
            size={{ xs: 12, sm: 6, md: 4 }}
          >
            <RoomCard room={room} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Rooms;