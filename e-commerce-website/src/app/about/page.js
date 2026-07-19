"use client";

import React from "react";
import { Container, Box, Typography, Grid, Paper, Card, CardMedia, CardContent, Avatar } from "@mui/material";
import StarRateIcon from "@mui/icons-material/StarRate";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import GroupsIcon from "@mui/icons-material/Groups";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PublicIcon from "@mui/icons-material/Public";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";

export default function About() {
  const stats = [
    { num: "50k+", label: "Happy Customers", icon: <GroupsIcon sx={{ fontSize: 32 }} /> },
    { num: "15M+", label: "Products Sold", icon: <ShoppingBagIcon sx={{ fontSize: 32 }} /> },
    { num: "99.9%", label: "Satisfaction Rate", icon: <VerifiedUserIcon sx={{ fontSize: 32 }} /> },
    { num: "24/7", label: "Global Shipping", icon: <PublicIcon sx={{ fontSize: 32 }} /> }
  ];

  const values = [
    {
      title: "Premium Quality",
      desc: "We curate only the finest materials and brands, ensuring every item passes structural and aesthetic quality audits.",
      icon: <StarRateIcon sx={{ fontSize: 40, color: "#fbbf24" }} />,
      bg: "rgba(251, 191, 36, 0.08)"
    },
    {
      title: "Express Delivery",
      desc: "Coordinating with top-tier international logistics pipelines to deliver products directly to your doorstep safely and rapidly.",
      icon: <LocalShippingIcon sx={{ fontSize: 40, color: "#10b981" }} />,
      bg: "rgba(16, 185, 129, 0.08)"
    },
    {
      title: "Customer Support",
      desc: "Our responsive customer support division is available around the clock to assist you with order status, returns, and catalog queries.",
      icon: <SupportAgentIcon sx={{ fontSize: 40, color: "#6366f1" }} />,
      bg: "rgba(99, 102, 241, 0.08)"
    },
    {
      title: "Easy Exchange & Return",
      desc: "Not fully satisfied with your purchase? We offer a hassle-free 30-day exchange and return policy on all standard orders.",
      icon: <AssignmentReturnIcon sx={{ fontSize: 40, color: "#ec4899" }} />,
      bg: "rgba(236, 72, 153, 0.08)"
    }
  ];


  return (
    <Box sx={{ bgcolor: "#f8fafc", minHeight: "100vh" }}>
      {/* Premium Hero Banner Section */}
      <Box 
        sx={{ 
          background: "linear-gradient(135deg, #0b0f19 0%, #1e293b 100%)",
          color: "#ffffff",
          py: { xs: 8, md: 12 },
          mb: 8,
          textAlign: "center",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <Box 
          sx={{ 
            position: "absolute",
            top: "-20%",
            right: "-10%",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)",
            filter: "blur(60px)",
            zIndex: 1
          }}
        />
        <Container maxWidth="md" sx={{ position: "relative", zIndex: 10 }}>
          <Typography variant="overline" color="primary.light" sx={{ fontWeight: 800, letterSpacing: 2, mb: 1, display: "inline-block" }}>
            LuxeMart Philosophy
          </Typography>
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              fontWeight: 900, 
              mb: 3, 
              letterSpacing: -1.5,
              fontSize: { xs: "2.5rem", md: "3.75rem" } 
            }}
          >
            Crafting the Future of Shopping
          </Typography>
          <Typography variant="h6" sx={{ color: "#94a3b8", maxWidth: 700, mx: "auto", lineHeight: 1.7, fontWeight: 400 }}>
            Established in 2026, LuxeMart was founded on a simple belief: high quality shopping should be simple, elegant, and accessible.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ pb: 10 }}>
        
        {/* Story Section */}
        <Grid container spacing={6} alignItems="center" sx={{ mb: 10 }}>
          <Grid item xs={12} md={6}>
            <Box 
              sx={{ 
                position: "relative",
                "&::after": {
                  content: "''",
                  position: "absolute",
                  bottom: -15,
                  left: -15,
                  width: "100%",
                  height: "100%",
                  border: "2px solid",
                  borderColor: "primary.light",
                  borderRadius: 4,
                  zIndex: 0
                }
              }}
            >
              <Box 
                component="img"
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800"
                alt="LuxeMart Story"
                sx={{ 
                  width: "100%", 
                  borderRadius: 4, 
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                  position: "relative",
                  zIndex: 2,
                  display: "block"
                }}
              />
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6} sx={{ pl: { md: 6 } }}>
            <Typography variant="overline" color="primary" sx={{ fontWeight: 800, letterSpacing: 1.5 }}>
              Who We Are
            </Typography>
            <Typography variant="h3" component="h2" sx={{ fontWeight: 900, mt: 1, mb: 3, letterSpacing: -1 }}>
              Reimagining E-Commerce
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2.5, lineHeight: 1.8, fontSize: "1.05rem" }}>
              LuxeMart is a premier destination for curated lifestyle goods. We coordinate directly with top designers and manufacturers to bring you high-value pieces without standard retail markups.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, fontSize: "1.05rem" }}>
              Every item in our catalogue passes thorough quality audits. From electronics to fine apparel, we focus on durability, aesthetics, and user satisfaction above all else.
            </Typography>
          </Grid>
        </Grid>

        {/* Stats Grid */}
        <Grid container spacing={4} sx={{ mb: 10 }}>
          {stats.map((stat, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Paper 
                elevation={0}
                sx={{ 
                  p: 4, 
                  textAlign: "center", 
                  border: "1px solid rgba(0, 0, 0, 0.06)", 
                  borderRadius: 4,
                  bgcolor: "background.paper",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1.5,
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": { 
                    transform: "translateY(-6px)", 
                    boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
                    borderColor: "primary.light"
                  }
                }}
              >
                <Avatar 
                  sx={{ 
                    bgcolor: "rgba(99, 102, 241, 0.08)", 
                    color: "primary.main",
                    width: 56,
                    height: 56
                  }}
                >
                  {stat.icon}
                </Avatar>
                <Box>
                  <Typography variant="h3" color="primary" sx={{ fontWeight: 800, mb: 0.5, letterSpacing: -1 }}>
                    {stat.num}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600 }}>
                    {stat.label}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Core Values Section */}
        <Box sx={{ mb: 12, bgcolor: "#ffffff", border: "1px solid rgba(0, 0, 0, 0.06)", borderRadius: 5, p: { xs: 4, md: 6 }, boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography variant="overline" color="primary" sx={{ fontWeight: 800, letterSpacing: 1.5 }}>
              Our Philosophy
            </Typography>
            <Typography variant="h4" component="h2" sx={{ fontWeight: 900, mt: 1, mb: 1, letterSpacing: -0.5 }}>
              Our Core Values
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 500, mx: "auto" }}>
              These principles guide how we work, innovate, and serve our customers daily.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {values.map((val, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Avatar sx={{ bgcolor: val.bg, width: 64, height: 64, borderRadius: 3 }}>
                    {val.icon}
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>
                    {val.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    {val.desc}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

      </Container>
    </Box>
  );
}
