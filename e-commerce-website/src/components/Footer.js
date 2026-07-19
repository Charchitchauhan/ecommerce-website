"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Box, Container, Grid, Typography, Link as MuiLink, TextField, Button, IconButton, Divider } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import SendIcon from "@mui/icons-material/Send";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <Box 
      component="footer" 
      sx={{ 
        backgroundColor: "#0b0f19", // Deep luxury slate background
        color: "#94a3b8", // Slate light text
        borderTop: "1px solid rgba(255, 255, 255, 0.05)",
        pt: 8, 
        pb: 4,
        mt: "auto" 
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5} justifyContent="space-between">
          
          {/* Brand & Story Column */}
          <Grid item xs={12} md={4}>
            <Typography 
              variant="h5" 
              component={Link} 
              href="/" 
              sx={{ 
                fontWeight: 900, 
                textDecoration: "none", 
                color: "#ffffff", 
                mb: 2.5, 
                display: "inline-block",
                letterSpacing: -0.5
              }}
            >
              <Box component="span" sx={{ color: "#6366f1" }}>Luxe</Box>Mart
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, lineHeight: 1.7, color: "#cbd5e1", maxWidth: 320 }}>
              Curating premium quality global trends for your modern lifestyle. Experience visual design excellence combined with seamless shopping utility.
            </Typography>
            
            {/* Social Icons */}
            <Box sx={{ display: "flex", gap: 1.5 }}>
              <IconButton 
                size="small" 
                sx={{ 
                  color: "#cbd5e1", 
                  bgcolor: "rgba(255, 255, 255, 0.05)",
                  "&:hover": { bgcolor: "#6366f1", color: "#ffffff", transform: "translateY(-3px)" },
                  transition: "all 0.3s ease"
                }}
              >
                <InstagramIcon fontSize="small" />
              </IconButton>
              <IconButton 
                size="small" 
                sx={{ 
                  color: "#cbd5e1", 
                  bgcolor: "rgba(255, 255, 255, 0.05)",
                  "&:hover": { bgcolor: "#6366f1", color: "#ffffff", transform: "translateY(-3px)" },
                  transition: "all 0.3s ease"
                }}
              >
                <TwitterIcon fontSize="small" />
              </IconButton>
              <IconButton 
                size="small" 
                sx={{ 
                  color: "#cbd5e1", 
                  bgcolor: "rgba(255, 255, 255, 0.05)",
                  "&:hover": { bgcolor: "#6366f1", color: "#ffffff", transform: "translateY(-3px)" },
                  transition: "all 0.3s ease"
                }}
              >
                <FacebookIcon fontSize="small" />
              </IconButton>
              <IconButton 
                size="small" 
                sx={{ 
                  color: "#cbd5e1", 
                  bgcolor: "rgba(255, 255, 255, 0.05)",
                  "&:hover": { bgcolor: "#6366f1", color: "#ffffff", transform: "translateY(-3px)" },
                  transition: "all 0.3s ease"
                }}
              >
                <LinkedInIcon fontSize="small" />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Categories Column */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#ffffff", mb: 3, textTransform: "uppercase", letterSpacing: 1.2 }}>
              Shop
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <MuiLink component={Link} href="/?category=electronics" sx={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.9rem", "&:hover": { color: "#ffffff", pl: 0.5 }, transition: "all 0.2s ease" }}>
                Electronics
              </MuiLink>
              <MuiLink component={Link} href="/?category=jewelery" sx={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.9rem", "&:hover": { color: "#ffffff", pl: 0.5 }, transition: "all 0.2s ease" }}>
                Jewelry
              </MuiLink>
              <MuiLink component={Link} href="/?category=men's clothing" sx={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.9rem", "&:hover": { color: "#ffffff", pl: 0.5 }, transition: "all 0.2s ease" }}>
                Men&apos;s Clothing
              </MuiLink>
              <MuiLink component={Link} href="/?category=women's clothing" sx={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.9rem", "&:hover": { color: "#ffffff", pl: 0.5 }, transition: "all 0.2s ease" }}>
                Women&apos;s Clothing
              </MuiLink>
            </Box>
          </Grid>

          {/* Company Column */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#ffffff", mb: 3, textTransform: "uppercase", letterSpacing: 1.2 }}>
              Company
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <MuiLink component={Link} href="/about" sx={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.9rem", "&:hover": { color: "#ffffff", pl: 0.5 }, transition: "all 0.2s ease" }}>
                Our Story
              </MuiLink>
              <MuiLink component={Link} href="/about" sx={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.9rem", "&:hover": { color: "#ffffff", pl: 0.5 }, transition: "all 0.2s ease" }}>
                Careers
              </MuiLink>
              <MuiLink component={Link} href="/contact" sx={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.9rem", "&:hover": { color: "#ffffff", pl: 0.5 }, transition: "all 0.2s ease" }}>
                Support FAQs
              </MuiLink>
              <MuiLink component={Link} href="/contact" sx={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.9rem", "&:hover": { color: "#ffffff", pl: 0.5 }, transition: "all 0.2s ease" }}>
                Contact Support
              </MuiLink>
            </Box>
          </Grid>

          {/* Newsletter Column */}
          <Grid item xs={12} sm={6} md={3.5}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#ffffff", mb: 3, textTransform: "uppercase", letterSpacing: 1.2 }}>
              Newsletter
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.6, color: "#cbd5e1" }}>
              Subscribe to get notified about sales, new releases, and styling guides!
            </Typography>
            
            {subscribed ? (
              <Box sx={{ p: 1.5, bgcolor: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.2)", borderRadius: 2, color: "#10b981", fontSize: "0.85rem", fontWeight: 600 }}>
                ✓ Subscribed successfully! Check your inbox.
              </Box>
            ) : (
              <form onSubmit={handleSubscribe}>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <TextField 
                    size="small"
                    placeholder="Your email address"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ 
                      flexGrow: 1,
                      bgcolor: "rgba(255, 255, 255, 0.05)",
                      borderRadius: 1.5,
                      input: { color: "#ffffff", fontSize: "0.85rem", py: 1.2 },
                      "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255, 255, 255, 0.1)" },
                      "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255, 255, 255, 0.2)" },
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#6366f1" }
                    }}
                  />
                  <IconButton 
                    type="submit" 
                    sx={{ 
                      bgcolor: "#6366f1", 
                      color: "#ffffff", 
                      borderRadius: 1.5,
                      p: 1.2,
                      "&:hover": { bgcolor: "#4f46e5" } 
                    }}
                  >
                    <SendIcon fontSize="small" />
                  </IconButton>
                </Box>
              </form>
            )}
          </Grid>
        </Grid>

        <Divider sx={{ my: 5, borderColor: "rgba(255, 255, 255, 0.05)" }} />

        {/* Footer Bottom Row */}
        <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" sx={{ fontSize: "0.85rem", color: "#64748b" }}>
              &copy; {new Date().getFullYear()} LuxeMart Inc. All rights reserved. Created for visual excellence.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: { xs: "flex-start", sm: "flex-end" }, gap: 2, color: "#64748b" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <CreditCardIcon sx={{ fontSize: 18 }} />
              <Typography variant="caption">Secure Mock Checkout</Typography>
            </Box>
            <Typography variant="caption">|</Typography>
            <Typography variant="caption">Privacy Policy</Typography>
            <Typography variant="caption">|</Typography>
            <Typography variant="caption">Terms of Service</Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
