import { useEffect, useState } from "react";

import {
  Typography,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";

import api from "../api/axios";

const Payments = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const loadPayments = async () => {
      try {
        const response = await api.get("/payments");
        setPayments(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    loadPayments();
  }, []);

  return (
    <>
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
      >
        Payments
      </Typography>

      <TableContainer component={Card}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Payment ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Room</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Method</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {payments.length > 0 ? (
              payments.map((payment) => (
                <TableRow key={payment.payment_id}>
                  <TableCell>
                    {payment.payment_id}
                  </TableCell>

                  <TableCell>
                    {payment.full_name}
                  </TableCell>

                  <TableCell>
                    {payment.room_number}
                  </TableCell>

                  <TableCell>
                    ₹{payment.amount}
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={payment.payment_method}
                      color="primary"
                    />
                  </TableCell>

                  <TableCell>
                    {new Date(
                      payment.payment_date
                    ).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  align="center"
                >
                  No Payments Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Payments;