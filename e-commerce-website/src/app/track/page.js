"use client";

import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { 
  Container, 
  Box, 
  Typography, 
  Paper, 
  TextField, 
  Button, 
  Divider, 
  Grid, 
  Stepper, 
  Step, 
  StepLabel, 
  Avatar, 
  List, 
  ListItem, 
  ListItemText,
  Chip
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import HistoryIcon from "@mui/icons-material/History";

export default function TrackOrder() {
  const { orders } = useApp();
  const [searchId, setSearchId] = useState("");
  const [foundOrder, setFoundOrder] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchId.trim()) return;
    
    const matched = orders.find(
      (order) => order.id.toUpperCase().trim() === searchId.toUpperCase().trim()
    );
    setFoundOrder(matched || null);
    setSearched(true);
  };

  // Get active step index based on order status
  const getActiveStep = (status) => {
    switch (status) {
      case "Placed":
        return 0;
      case "Processing":
        return 1;
      case "Shipped":
        return 2;
      case "Out for Delivery":
        return 3;
      case "Delivered":
        return 4;
      default:
        return 1;
    }
  };

  const steps = [
    { label: "Order Placed", desc: "Order confirmation received by store" },
    { label: "Processing", desc: "Packaging, sorting, and quality checks" },
    { label: "Shipped", desc: "Handed over to international courier pipelines" },
    { label: "Out for Delivery", desc: "Package has arrived at nearest local hub" },
    { label: "Delivered", desc: "Successfully delivered to recipient" }
  ];

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography variant="overline" color="primary" sx={{ fontWeight: 800, letterSpacing: 1.5 }}>
          Realtime Delivery Pipeline
        </Typography>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 900, mt: 1, mb: 1, letterSpacing: -1 }}>
          Track Your Order
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 500, mx: "auto" }}>
          Check the transit status of your luxury purchases instantly using your invoice code.
        </Typography>
      </Box>

      {/* Lookup Card */}
      <Paper 
        elevation={0}
        sx={{ 
          p: 4, 
          border: "1px solid", 
          borderColor: "divider", 
          borderRadius: 5, 
          boxShadow: "0 10px 25px rgba(0,0,0,0.03)",
          mb: 5 
        }}
      >
        <form onSubmit={handleSearch}>
          <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
            <TextField 
              fullWidth
              placeholder="Enter Order ID (e.g. ORD-123456)" 
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              sx={{ 
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                }
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<SearchIcon />}
              sx={{ px: 4, py: 1.8, borderRadius: 3, fontWeight: 700 }}
            >
              Search
            </Button>
          </Box>
        </form>

        {/* Suggest Helper */}
        {orders && orders.length > 0 && (
          <Box sx={{ mt: 3, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 1.5 }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>
              YOUR RECENT ORDER CODES:
            </Typography>
            {orders.map((ord) => (
              <Chip 
                key={ord.id}
                label={ord.id} 
                onClick={() => { setSearchId(ord.id); }}
                size="small"
                clickable
                sx={{ fontWeight: 700, bgcolor: "rgba(99, 102, 241, 0.06)", color: "primary.main" }}
              />
            ))}
          </Box>
        )}
      </Paper>

      {/* Search Result */}
      {searched && (
        foundOrder ? (
          /* Active Order Status details */
          <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {/* Tracking Pipeline Visual */}
            <Paper 
              elevation={0} 
              sx={{ 
                p: { xs: 3, md: 5 }, 
                border: "1px solid", 
                borderColor: "divider", 
                borderRadius: 5,
                bgcolor: "background.paper"
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
                <Avatar sx={{ bgcolor: "rgba(99, 102, 241, 0.08)", color: "primary.main", width: 48, height: 48 }}>
                  <LocalShippingIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
                    Status: {foundOrder.status}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Placed on {foundOrder.date} • Secured Gateway Payment
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ mb: 4 }} />

              {/* Stepper */}
              <Stepper 
                activeStep={getActiveStep(foundOrder.status)} 
                orientation="vertical" 
                sx={{ 
                  "& .MuiStepIcon-root.Mui-active": { color: "primary.main" },
                  "& .MuiStepIcon-root.Mui-completed": { color: "success.main" },
                  "& .MuiStepLabel-label": { fontWeight: 700 }
                }}
              >
                {steps.map((step, idx) => (
                  <Step key={idx}>
                    <StepLabel optional={<Typography variant="caption" color="text.secondary">{step.desc}</Typography>}>
                      {step.label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Paper>

            {/* Order Details & Summary Card */}
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Paper variant="outlined" sx={{ p: 4, borderRadius: 4, height: "100%" }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 2 }}>
                    Shipping Details
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="caption" color="text.secondary" display="block">RECIPIENT</Typography>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{foundOrder.shippingInfo.name}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="caption" color="text.secondary" display="block">SHIPPING ADDRESS</Typography>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                        {foundOrder.shippingInfo.address}, {foundOrder.shippingInfo.city}, {foundOrder.shippingInfo.zipCode}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="caption" color="text.secondary" display="block">CONTACT EMAIL</Typography>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{foundOrder.shippingInfo.email}</Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper variant="outlined" sx={{ p: 4, borderRadius: 4, height: "100%" }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 2 }}>
                    Items & Billing
                  </Typography>
                  <List disablePadding sx={{ mb: 2 }}>
                    {foundOrder.items.map((item, idx) => (
                      <ListItem key={idx} sx={{ px: 0, py: 0.75 }}>
                        <ListItemText 
                          primary={`${item.title} (x${item.quantity})`} 
                          primaryTypographyProps={{ variant: "body2", sx: { fontWeight: 600, color: "text.primary" } }}
                          secondary={item.selectedSize ? `Size: ${item.selectedSize}` : null}
                          secondaryTypographyProps={{ variant: "caption", sx: { color: "text.secondary", fontWeight: 700 } }}
                        />
                        <Typography variant="body2" sx={{ fontWeight: 800 }}>
                          ₹{(item.price * 85 * item.quantity).toFixed(2)}
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography sx={{ fontWeight: 800 }} variant="subtitle1">Amount Paid:</Typography>
                    <Typography sx={{ fontWeight: 800 }} variant="subtitle1" color="primary.main">
                      ₹{(foundOrder.total * 85).toFixed(2)}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        ) : (
          /* Order Not Found Screen */
          <Paper 
            elevation={0} 
            sx={{ 
              p: 5, 
              textAlign: "center", 
              border: "1px solid", 
              borderColor: "error.light", 
              borderRadius: 5, 
              bgcolor: "rgba(244, 63, 94, 0.02)" 
            }}
          >
            <Avatar sx={{ bgcolor: "rgba(244, 63, 94, 0.08)", color: "error.main", width: 56, height: 56, mx: "auto", mb: 2 }}>
              <HistoryIcon />
            </Avatar>
            <Typography variant="h5" color="error" sx={{ fontWeight: 800, mb: 1 }}>
              Order Not Found
            </Typography>
            <Typography color="text.secondary" variant="body2" sx={{ maxWidth: 400, mx: "auto", mb: 2 }}>
              We couldn't find any active record matching the tracking code <Box component="span" sx={{ fontWeight: 700, color: "text.primary" }}>{searchId}</Box>. Please check your order invoice and try again.
            </Typography>
          </Paper>
        )
      )}
    </Container>
  );
}
