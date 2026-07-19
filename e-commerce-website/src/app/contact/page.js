"use client";

import React, { useState } from "react";
import { Container, Box, Typography, Grid, Paper, TextField, Button, Alert } from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null); // 'success' or 'error'

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus("error");
      return;
    }
    // Mock submit success
    setStatus("success");
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setStatus(null), 5000);
  };

  const contactDetails = [
    {
      icon: <MapIcon sx={{ fontSize: 32 }} />,
      title: "Our Headquarters",
      value: "100 Innovation Way, Tech District, San Francisco, CA 94105"
    },
    {
      icon: <EmailIcon sx={{ fontSize: 32 }} />,
      title: "Email Support",
      value: "support@luxemart.com"
    },
    {
      icon: <PhoneIcon sx={{ fontSize: 32 }} />,
      title: "Phone Enquiries",
      value: "+1 (555) 019-2834 (Mon-Fri, 9am - 6pm PST)"
    }
  ];

  return (
    <Box>
      <Box 
        sx={{ 
          background: "linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(16, 185, 129, 0.05) 100%)",
          py: 8,
          mb: 6,
          textAlign: "center"
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" sx={{ fontWeight: 800, mb: 2 }}>
            Contact Us
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: "auto", lineHeight: 1.6 }}>
            Have a question or feedback? We'd love to hear from you. Get in touch with our team using the form below.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ pb: 8 }}>
        <Grid container spacing={6}>
          {/* Contact info list */}
          <Grid item xs={12} md={5}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {contactDetails.map((detail, i) => (
                <Paper 
                  key={i} 
                  elevation={0}
                  sx={{ 
                    p: 4, 
                    border: "1px solid", 
                    borderColor: "divider", 
                    borderRadius: 4,
                    display: "flex",
                    gap: 3,
                    alignItems: "flex-start"
                  }}
                >
                  <Box sx={{ color: "primary.main", mt: 0.5 }}>{detail.icon}</Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>{detail.title}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>{detail.value}</Typography>
                  </Box>
                </Paper>
              ))}
            </Box>
          </Grid>

          {/* Form wrapper */}
          <Grid item xs={12} md={7}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 5, 
                border: "1px solid", 
                borderColor: "divider", 
                borderRadius: 4,
                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.05)" 
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 3 }}>
                Send Us a Message
              </Typography>

              {status === "success" && (
                <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
                  Thank you! Your message has been received. We will respond shortly.
                </Alert>
              )}

              {status === "error" && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                  Please fill out all fields correctly.
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      required
                      label="Full Name"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      required
                      type="email"
                      label="Email Address"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      required
                      multiline
                      rows={5}
                      label="Message"
                      placeholder="How can we help you?"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button 
                      type="submit" 
                      variant="contained" 
                      color="primary" 
                      size="large"
                      sx={{ py: 1.5, px: 4, boxShadow: "0 4px 12px rgba(99, 102, 241, 0.2)" }}
                    >
                      Submit Message
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
