import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
} from "@mui/material";

const RoomCard = ({ room }) => {
  return (
    <Card
      sx={{
        borderRadius: 4,
        boxShadow: 3,
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 6,
        },
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
        >
          Room {room.room_number}
        </Typography>

        <Typography variant="body1">
          Type: {room.room_type}
        </Typography>

        <Typography
          variant="body1"
          sx={{ mt: 1 }}
        >
          ₹{room.price_per_day} / day
        </Typography>

        <Box mt={2}>
          <Chip
            label={room.status}
            color={
              room.status === "Available"
                ? "success"
                : "error"
            }
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default RoomCard;