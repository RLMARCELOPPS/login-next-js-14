"use client";

import { FormValues } from "@/utils/validations/userSchema";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Typography,
  useTheme,
  Container,
} from "@mui/material";
import React from "react";
import LogoutProfile from "@/components/pages/auth/LogoutProfile";

interface IProfileInformationProps {
  data: FormValues;
}

const ProfileInformation = ({ data }: IProfileInformationProps) => {
  const theme = useTheme();

  return (
    <>
      <Container maxWidth="sm" style={{ marginTop: "2rem" }}>
        <Card style={{ padding: "1rem", textAlign: "center" }}>
          <Box display="flex" justifyContent="center" mb={2}>
            <Avatar
              src="/path-to-your-profile-pic.png"
              alt={data?.firstName}
              sx={{ fontSize: 80 }}
              style={{ width: 100, height: 100 }}
            />
          </Box>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              {data?.firstName} {data?.lastName}
            </Typography>
            <Box mt={2}>
              <Chip
                label={data?.mobileNumber}
                color="primary"
                style={{ marginBottom: "0.5rem" }}
              />
              <Typography variant="body2" color="textSecondary" component="p">
                Mobile Number
              </Typography>
            </Box>
            <Box mt={2} mb={2}>
              <Typography variant="body1" component="div" gutterBottom>
                <strong>First Name:</strong> {data?.firstName}
              </Typography>
              <Typography variant="body1" component="div">
                <strong>Middle Name:</strong> {data?.middleName}
              </Typography>
            </Box>
            <Typography variant="body1" component="div" gutterBottom>
              <strong>Last Name:</strong> {data?.lastName}
            </Typography>

            <LogoutProfile />

            <Typography
              variant="caption"
              display="block"
              mt={2}
              color="textSecondary"
            >
              500+ connections
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default ProfileInformation;
