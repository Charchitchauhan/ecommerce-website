"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "../../context/AppContext";
import { 
  Container, 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Button, 
  IconButton, 
  TextField, 
  Divider, 
  List, 
  ListItem, 
  Avatar, 
  ListItemText,
  Chip,
  Tab,
  Tabs,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import QrCodeIcon from "@mui/icons-material/QrCode";
import PaymentIcon from "@mui/icons-material/Payment";
import CancelIcon from "@mui/icons-material/Cancel";
import WarningIcon from "@mui/icons-material/Warning";

export default function Cart() {
  const { cart, updateCartQuantity, removeFromCart, placeOrder, orders } = useApp();
  
  // Checkout form fields
  const [shippingForm, setShippingForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zipCode: ""
  });
  
  const [successOrder, setSuccessOrder] = useState(null); // stores order details on success
  const [loadingPayment, setLoadingPayment] = useState(false);

  // Custom Payment Portal states
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0); // 0 = Credit Card, 1 = UPI, 2 = Razorpay
  const [cardForm, setCardForm] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: ""
  });
  const [upiId, setUpiId] = useState("");
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  // Load Razorpay SDK on mount
  React.useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Handle smooth scroll to orders history if hash is present
  React.useEffect(() => {
    const handleHashScroll = () => {
      if (window.location.hash === "#orders-history") {
        setTimeout(() => {
          const el = document.getElementById("orders-history");
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 300);
      }
    };
    handleHashScroll();
    window.addEventListener("hashchange", handleHashScroll);
    return () => window.removeEventListener("hashchange", handleHashScroll);
  }, []);

  // Calculate prices
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!shippingForm.name || !shippingForm.email || !shippingForm.address) return;
    setPaymentDialogOpen(true);
    setPaymentError(null);
    setPaymentLoading(false);
  };

  const simulatePayment = (methodName) => {
    setPaymentLoading(true);
    setPaymentError(null);

    setTimeout(() => {
      setPaymentLoading(false);
      setPaymentError({
        txnId: "TXN-" + Math.floor(10000000 + Math.random() * 90000000),
        reason: `Your payment of ₹${(total * 85).toFixed(2)} via ${methodName} was declined by the bank/gateway. Payment was not successfully completed.`,
        payee: "Charchit chauhan"
      });
    }, 2000);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Title */}
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 4 }}>
        Your Shopping Cart
      </Typography>

      {successOrder ? (
        /* Order Success Receipt Panel */
        <Paper 
          elevation={0}
          sx={{ 
            p: { xs: 3, md: 5 }, 
            textAlign: "center", 
            border: "1px solid", 
            borderColor: "success.light", 
            borderRadius: 4,
            mb: 6,
            bgcolor: "rgba(16, 185, 129, 0.02)",
            boxShadow: "0 10px 15px -3px rgba(0,0,0,0.02)" 
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
            <CheckCircleIcon color="success" sx={{ fontSize: 80 }} />
          </Box>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, color: "success.main" }}>
            Order Placed Successfully!
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 4 }}>
            Thank you for shopping with LuxeMart. Your order has been registered and listed in your order history below.
          </Typography>

          <Paper 
            variant="outlined" 
            sx={{ 
              p: 3, 
              textAlign: "left", 
              bgcolor: "background.default", 
              borderRadius: 3, 
              mb: 4,
              borderStyle: "dashed",
              maxWidth: 600,
              mx: "auto"
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Invoice / Receipt
            </Typography>
            
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Order ID:</Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{successOrder.id}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Date:</Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{successOrder.date}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Customer Name:</Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{successOrder.shippingInfo.name}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Shipping Email:</Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{successOrder.shippingInfo.email}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Razorpay Payment ID:</Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "success.main" }}>
                  {successOrder.shippingInfo.paymentId}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">Shipping Address:</Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  {successOrder.shippingInfo.address}, {successOrder.shippingInfo.city}, {successOrder.shippingInfo.zipCode}
                </Typography>
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Items Ordered:</Typography>
            <List disablePadding>
              {successOrder.items.map((item) => (
                <ListItem key={item.cartId || item.id} sx={{ px: 0, py: 0.5 }}>
                  <ListItemText 
                    primary={`${item.title} (x${item.quantity})`} 
                    primaryTypographyProps={{ variant: "body2", sx: { fontWeight: 500 } }}
                    secondary={item.selectedSize ? `Size: ${item.selectedSize}` : null}
                    secondaryTypographyProps={{ variant: "caption", sx: { color: "text.secondary", fontWeight: 600 } }}
                  />
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    ₹{(item.price * 85 * item.quantity).toFixed(2)}
                  </Typography>
                </ListItem>
              ))}
            </List>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>Total Paid (incl. Tax):</Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "primary.main" }}>
                ₹{(successOrder.total * 85).toFixed(2)}
              </Typography>
            </Box>
          </Paper>

          <Button 
            variant="outlined" 
            color="primary" 
            onClick={() => setSuccessOrder(null)}
            sx={{ px: 4, py: 1.2 }}
          >
            Close Invoice
          </Button>
        </Paper>
      ) : cart.length === 0 ? (
        /* Empty Cart State inside checkout grid context */
        <Paper 
          elevation={0}
          sx={{ 
            p: 5, 
            textAlign: "center", 
            border: "1px solid", 
            borderColor: "divider", 
            borderRadius: 4,
            mb: 6
          }}
        >
          <Typography variant="h1" component="div" sx={{ fontSize: "4rem", mb: 2 }}>🛒</Typography>
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
            Your Cart is Empty
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Explore LuxeMart and add some premium quality items to your shopping cart.
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            component={Link} 
            href="/"
            startIcon={<ArrowBackIcon />}
            sx={{ px: 3, py: 1 }}
          >
            Back to Catalog
          </Button>
        </Paper>
      ) : (
        /* Cart items grid and Shipping form */
        <Grid container spacing={5} sx={{ mb: 6 }}>
          {/* Left Column: Cart items */}
          <Grid item xs={12} md={7.5}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
              {cart.map((item) => (
                <Paper 
                  key={item.id} 
                  elevation={0}
                  sx={{ 
                    p: 2.5, 
                    border: "1px solid", 
                    borderColor: "divider", 
                    borderRadius: 4,
                    display: "flex",
                    gap: 3,
                    alignItems: "center"
                  }}
                >
                  {/* Product thumbnail */}
                  <Avatar 
                    variant="rounded" 
                    src={item.image} 
                    sx={{ width: 80, height: 80, bgcolor: "white", p: 1, border: "1px solid", borderColor: "divider" }}
                  />

                  {/* Details */}
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.4, mb: 0.5 }}>
                      {item.title}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1, alignItems: "center", mb: 1 }}>
                      <Typography variant="caption" color="text.muted" sx={{ textTransform: "uppercase", fontWeight: 700 }}>
                        {item.category}
                      </Typography>
                      {item.selectedSize && (
                        <Chip 
                          label={`Size: ${item.selectedSize}`} 
                          size="small" 
                          sx={{ height: 18, fontSize: "0.7rem", fontWeight: 700, bgcolor: "rgba(99, 102, 241, 0.08)", color: "primary.main" }} 
                        />
                      )}
                    </Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "primary.main" }}>
                      ₹{(item.price * 85).toFixed(2)}
                    </Typography>
                  </Box>

                  {/* Item Counter and remove btn */}
                  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 1.5 }}>
                    <Box 
                      sx={{ 
                        display: "flex", 
                        alignItems: "center", 
                        border: "1px solid", 
                        borderColor: "divider", 
                        borderRadius: 99,
                        overflow: "hidden" 
                      }}
                    >
                      <IconButton size="small" onClick={() => updateCartQuantity(item.cartId, item.quantity - 1)}>
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <Typography sx={{ mx: 2, fontWeight: 700, fontSize: "0.95rem" }}>
                        {item.quantity}
                      </Typography>
                      <IconButton size="small" onClick={() => updateCartQuantity(item.cartId, item.quantity + 1)}>
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Box>

                    <IconButton 
                      color="error" 
                      onClick={() => removeFromCart(item.cartId)}
                      sx={{ bgcolor: "rgba(244, 63, 94, 0.08)", p: 0.8 }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Paper>
              ))}
            </Box>
          </Grid>

          {/* Right Column: Checkout Summary & Form */}
          <Grid item xs={12} md={4.5}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 4, 
                border: "1px solid", 
                borderColor: "divider", 
                borderRadius: 4,
                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.05)",
                position: "sticky",
                top: 100
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>
                Order Summary
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography color="text.secondary" variant="body2">Subtotal</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>₹{(subtotal * 85).toFixed(2)}</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography color="text.secondary" variant="body2">Estimated Shipping</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: "success.main" }}>FREE</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography color="text.secondary" variant="body2">Sales Tax (8%)</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>₹{(tax * 85).toFixed(2)}</Typography>
                </Box>
                <Divider />
                <Box sx={{ display: "flex", justifyContent: "space-between", pt: 1 }}>
                  <Typography sx={{ fontWeight: 800 }} variant="subtitle1">Total Price</Typography>
                  <Typography sx={{ fontWeight: 800 }} variant="subtitle1" color="primary.main">
                    ₹{(total * 85).toFixed(2)}
                  </Typography>
                </Box>
              </Box>

              <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, mt: 1 }}>
                Shipping Details
              </Typography>
              <form onSubmit={handlePlaceOrder}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
                  <TextField
                    required
                    fullWidth
                    size="small"
                    label="Recipient Name"
                    value={shippingForm.name}
                    onChange={(e) => setShippingForm({ ...shippingForm, name: e.target.value })}
                  />
                  <TextField
                    required
                    fullWidth
                    size="small"
                    type="email"
                    label="Contact Email"
                    value={shippingForm.email}
                    onChange={(e) => setShippingForm({ ...shippingForm, email: e.target.value })}
                  />
                  <TextField
                    required
                    fullWidth
                    size="small"
                    label="Street Address"
                    value={shippingForm.address}
                    onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })}
                  />
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <TextField
                      required
                      fullWidth
                      size="small"
                      label="City"
                      value={shippingForm.city}
                      onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                    />
                    <TextField
                      required
                      fullWidth
                      size="small"
                      label="Zip Code"
                      value={shippingForm.zipCode}
                      onChange={(e) => setShippingForm({ ...shippingForm, zipCode: e.target.value })}
                    />
                  </Box>
                </Box>

                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  fullWidth
                  size="large"
                  sx={{ py: 1.5, fontWeight: 700, boxShadow: "0 4px 12px rgba(16, 185, 129, 0.2)" }}
                >
                  Place Order
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* Placed Orders History Section */}
      <Box id="orders-history" sx={{ mt: 8 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 3 }}>
          Placed Orders History
        </Typography>
        
        {(!orders || orders.length === 0) ? (
          <Paper variant="outlined" sx={{ p: 4, textAlign: "center", borderRadius: 3 }}>
            <Typography color="text.secondary">No orders placed yet.</Typography>
          </Paper>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {orders.map((order) => (
              <Paper 
                key={order.id} 
                variant="outlined" 
                sx={{ p: 3, borderRadius: 3, bgcolor: "background.paper" }}
              >
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={12} sm={2.5}>
                    <Typography variant="caption" color="text.secondary" display="block">ORDER ID</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>{order.id}</Typography>
                  </Grid>
                  <Grid item xs={6} sm={1.5}>
                    <Typography variant="caption" color="text.secondary" display="block">DATE</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{order.date}</Typography>
                  </Grid>
                  <Grid item xs={6} sm={2}>
                    <Typography variant="caption" color="text.secondary" display="block">SHIPPED TO</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{order.shippingInfo.name}</Typography>
                  </Grid>
                  <Grid item xs={6} sm={2.5}>
                    <Typography variant="caption" color="text.secondary" display="block">PAYMENT ID</Typography>
                    <Typography variant="body2" sx={{ fontSize: "0.8rem", color: "success.main", fontWeight: 700 }}>
                      {order.shippingInfo.paymentId || "COD / Mock"}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={1.5}>
                    <Typography variant="caption" color="text.secondary" display="block">STATUS</Typography>
                    <Chip label={order.status} size="small" color="primary" sx={{ fontWeight: 600, fontSize: "0.75rem" }} />
                  </Grid>
                  <Grid item xs={6} sm={2} sx={{ textAlign: { sm: "right" } }}>
                    <Typography variant="caption" color="text.secondary" display="block">TOTAL</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 800, color: "primary.main" }}>
                      ₹{(order.total * 85).toFixed(2)}
                    </Typography>
                  </Grid>
                </Grid>
                
                <Divider sx={{ my: 1.5 }} />
                
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, mb: 1, display: "block" }}>ITEMS ORDERED</Typography>
                <List disablePadding>
                  {order.items.map((item, idx) => (
                    <ListItem key={idx} sx={{ px: 0, py: 0.25 }}>
                      <ListItemText 
                        primary={`${item.title} (x${item.quantity})`} 
                        primaryTypographyProps={{ variant: "body2", sx: { color: "text.secondary", fontWeight: 500 } }}
                        secondary={item.selectedSize ? `Size: ${item.selectedSize}` : null}
                        secondaryTypographyProps={{ variant: "caption", sx: { color: "text.disabled", fontWeight: 600 } }}
                      />
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        ₹{(item.price * 85 * item.quantity).toFixed(2)}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              </Paper>
            ))}
          </Box>
        )}
      </Box>

      {/* Custom Payment Portal Dialog */}
      <Dialog
        open={paymentDialogOpen}
        onClose={() => !paymentLoading && setPaymentDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 4, overflow: "hidden" }
        }}
      >
        {paymentLoading ? (
          /* Payment Processing Screen */
          <Box sx={{ p: 6, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3, minHeight: 300 }}>
            <CircularProgress size={60} color="primary" />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Connecting to secure gateway...
            </Typography>
            <Typography color="text.secondary" variant="body2" sx={{ textAlign: "center", maxWidth: 300 }}>
              Please do not refresh the page or click back. We are routing your transaction securely.
            </Typography>
          </Box>
        ) : paymentError ? (
          /* Payment Failed Outcome Screen */
          <Box sx={{ p: 5, display: "flex", flexDirection: "column", alignItems: "center", gap: 2.5, minHeight: 350 }}>
            <CancelIcon sx={{ fontSize: 80, color: "error.main" }} />
            <Typography variant="h5" color="error" sx={{ fontWeight: 800 }}>
              Transaction Declined
            </Typography>
            <Paper variant="outlined" sx={{ p: 3, width: "100%", bgcolor: "rgba(244, 63, 94, 0.02)", borderRadius: 3, borderStyle: "dashed" }}>
              <Grid container spacing={2.5}>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary" display="block">PAYEE NAME</Typography>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{paymentError.payee}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary" display="block">TRANSACTION ID</Typography>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: "0.85rem" }}>{paymentError.txnId}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary" display="block">AMOUNT</Typography>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "error.main" }}>₹{(total * 85).toFixed(2)}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary" display="block">STATUS</Typography>
                  <Chip label="FAILED" size="small" color="error" sx={{ fontWeight: 700 }} />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="caption" color="text.secondary" display="block">DECLINE REASON</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, mt: 0.5, lineHeight: 1.4 }}>
                    {paymentError.reason}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
            <Box sx={{ display: "flex", gap: 2, width: "100%", mt: 2 }}>
              <Button 
                variant="contained" 
                color="primary" 
                fullWidth 
                onClick={() => setPaymentError(null)} 
                sx={{ py: 1.2, fontWeight: 700 }}
              >
                Try Another Method
              </Button>
              <Button 
                variant="outlined" 
                color="inherit" 
                fullWidth
                onClick={() => setPaymentDialogOpen(false)} 
                sx={{ py: 1.2, fontWeight: 600 }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        ) : (
          /* Payment Tabs Form Screen */
          <Box>
            <DialogTitle sx={{ fontWeight: 800, fontSize: "1.4rem", borderBottom: "1px solid", borderColor: "divider", pb: 2 }}>
              Secure Payment Gateway
            </DialogTitle>
            <Tabs 
              value={activeTab} 
              onChange={(e, val) => setActiveTab(val)} 
              variant="fullWidth" 
              sx={{ borderBottom: "1px solid", borderColor: "divider" }}
            >
              <Tab icon={<CreditCardIcon />} label="Credit Card" sx={{ fontWeight: 700, textTransform: "none" }} />
              <Tab icon={<QrCodeIcon />} label="UPI Scan" sx={{ fontWeight: 700, textTransform: "none" }} />
              <Tab icon={<PaymentIcon />} label="Razorpay" sx={{ fontWeight: 700, textTransform: "none" }} />
            </Tabs>
            
            <DialogContent sx={{ p: 4 }}>
              {activeTab === 0 && (
                /* Card Payment Form */
                <form onSubmit={(e) => { e.preventDefault(); simulatePayment("Credit Card"); }}>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                    <TextField 
                      required 
                      fullWidth 
                      label="Card Number" 
                      placeholder="1234 5678 9876 5432" 
                      value={cardForm.number}
                      onChange={(e) => setCardForm({ ...cardForm, number: e.target.value })}
                    />
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <TextField 
                        required 
                        fullWidth 
                        label="Expiry Date" 
                        placeholder="MM/YY" 
                        value={cardForm.expiry}
                        onChange={(e) => setCardForm({ ...cardForm, expiry: e.target.value })}
                      />
                      <TextField 
                        required 
                        fullWidth 
                        type="password" 
                        label="CVV" 
                        placeholder="123" 
                        value={cardForm.cvv}
                        onChange={(e) => setCardForm({ ...cardForm, cvv: e.target.value })}
                      />
                    </Box>
                    <TextField 
                      required 
                      fullWidth 
                      label="Cardholder Name" 
                      placeholder="Charchit Chauhan" 
                      value={cardForm.name}
                      onChange={(e) => setCardForm({ ...cardForm, name: e.target.value })}
                    />
                    <Button 
                      type="submit" 
                      variant="contained" 
                      color="secondary" 
                      fullWidth 
                      size="large" 
                      sx={{ py: 1.5, mt: 1.5, fontWeight: 700 }}
                    >
                      Pay ₹{(total * 85).toFixed(2)}
                    </Button>
                  </Box>
                </form>
              )}

              {activeTab === 1 && (
                /* UPI Payment (payee Charchit chauhan & SVG QR Code) */
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                      Payee: Charchit chauhan
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      UPI ID: <Box component="span" sx={{ fontWeight: 700 }}>charchitchauhan@upi</Box>
                    </Typography>
                  </Box>

                  {/* Vector SVG QR Code */}
                  <svg width="180" height="180" viewBox="0 0 29 29" style={{ background: "#ffffff", padding: "8px", border: "1px solid #e2e8f0", borderRadius: "8px" }}>
                    <path d="M0,0 h7 v2 h-5 v5 h-2 z" fill="#0f172a"/>
                    <path d="M22,0 h7 v7 h-2 v-5 h-5 z" fill="#0f172a"/>
                    <path d="M0,22 v7 h7 v-2 h-5 v-5 z" fill="#0f172a"/>
                    <path d="M22,29 h7 v-7 h-2 v5 h-5 z" fill="#0f172a"/>
                    <rect x="2" y="2" width="5" height="5" fill="none" stroke="#0f172a" strokeWidth="1.5"/>
                    <rect x="3.5" y="3.5" width="2" height="2" fill="#0f172a"/>
                    <rect x="22" y="2" width="5" height="5" fill="none" stroke="#0f172a" strokeWidth="1.5"/>
                    <rect x="23.5" y="3.5" width="2" height="2" fill="#0f172a"/>
                    <rect x="2" y="22" width="5" height="5" fill="none" stroke="#0f172a" strokeWidth="1.5"/>
                    <rect x="3.5" y="23.5" width="2" height="2" fill="#0f172a"/>
                    <rect x="11" y="11" width="7" height="7" rx="1.5" fill="#6366f1"/>
                    <text x="14.5" y="15.5" fontSize="2.8" fill="#ffffff" fontWeight="bold" textAnchor="middle">UPI</text>
                    <rect x="9" y="2" width="1" height="2" fill="#334155"/>
                    <rect x="11" y="3" width="2" height="1" fill="#334155"/>
                    <rect x="14" y="2" width="3" height="1" fill="#334155"/>
                    <rect x="18" y="3" width="2" height="2" fill="#334155"/>
                    <rect x="9" y="6" width="3" height="1" fill="#334155"/>
                    <rect x="13" y="5" width="2" height="2" fill="#334155"/>
                    <rect x="16" y="7" width="1" height="2" fill="#334155"/>
                    <rect x="2" y="9" width="2" height="1" fill="#334155"/>
                    <rect x="5" y="10" width="3" height="2" fill="#334155"/>
                    <rect x="9" y="9" width="1" height="3" fill="#334155"/>
                    <rect x="20" y="9" width="4" height="1" fill="#334155"/>
                    <rect x="25" y="10" width="2" height="2" fill="#334155"/>
                    <rect x="2" y="14" width="3" height="1" fill="#334155"/>
                    <rect x="6" y="15" width="1" height="2" fill="#334155"/>
                    <rect x="9" y="17" width="2" height="1" fill="#334155"/>
                    <rect x="20" y="13" width="1" height="3" fill="#334155"/>
                    <rect x="23" y="15" width="3" height="1" fill="#334155"/>
                    <rect x="9" y="20" width="3" height="1" fill="#334155"/>
                    <rect x="13" y="21" width="1" height="2" fill="#334155"/>
                    <rect x="16" y="20" width="2" height="1" fill="#334155"/>
                    <rect x="15" y="23" width="1" height="4" fill="#334155"/>
                    <rect x="18" y="25" width="3" height="1" fill="#334155"/>
                    <rect x="9" y="25" width="2" height="2" fill="#334155"/>
                  </svg>

                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: "uppercase" }}>
                    Scan QR with GPay, PhonePe, Paytm or BHIM
                  </Typography>

                  <Divider sx={{ width: "100%", my: 1 }} />

                  <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2 }}>
                    <TextField 
                      fullWidth 
                      size="small" 
                      label="Or enter your UPI ID" 
                      placeholder="name@upi" 
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                    />
                    <Button 
                      variant="contained" 
                      color="secondary" 
                      fullWidth 
                      onClick={() => simulatePayment("UPI")}
                      sx={{ py: 1.5, fontWeight: 700 }}
                    >
                      Verify & Pay ₹{(total * 85).toFixed(2)}
                    </Button>
                  </Box>
                </Box>
              )}

              {activeTab === 2 && (
                /* Razorpay Test Trigger */
                <Box sx={{ py: 4, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", maxWidth: 350 }}>
                    Trigger the standard Razorpay gateway mockup. Note that the mock test payment will result in a declined outcome.
                  </Typography>
                  <Button 
                    variant="contained" 
                    color="secondary" 
                    size="large"
                    onClick={() => simulatePayment("Razorpay SDK")}
                    sx={{ px: 5, py: 1.5, fontWeight: 700 }}
                  >
                    Open Razorpay Gateway
                  </Button>
                </Box>
              )}
            </DialogContent>
          </Box>
        )}
      </Dialog>
  </Container>
  );
}
