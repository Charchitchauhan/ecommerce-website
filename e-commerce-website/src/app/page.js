"use client";

import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { 
  Container, 
  Box, 
  Typography, 
  Card, 
  CardMedia, 
  CardContent, 
  CardActions, 
  Button, 
  TextField, 
  Chip, 
  InputAdornment,
  CircularProgress,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Rating,
  Divider
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import StarIcon from "@mui/icons-material/Star";

export default function Home() {
  const { products, loading, error, addToCart } = useApp();
  
  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Snackbar Toast notification state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: ""
  });

  // Product Details Modal state
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");

  const handleOpenDetails = (product) => {
    setSelectedProduct(product);
    const isApparel = product.category.toLowerCase().includes("clothing");
    setSelectedSize(isApparel ? "M" : "One Size");
  };

  const handleCloseDetails = () => {
    setSelectedProduct(null);
    setSelectedSize("");
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleAddToCart = (product) => {
    const isApparel = product.category.toLowerCase().includes("clothing");
    const size = isApparel ? "M" : "One Size";
    addToCart(product, 1, size);
  };

  const handleDetailsAddToCart = () => {
    if (!selectedProduct) return;
    addToCart(selectedProduct, 1, selectedSize);
    handleCloseDetails();
  };

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("focusSearch") === "true") {
        setTimeout(() => {
          const searchInput = document.querySelector('input[placeholder*="Search products"]');
          if (searchInput) {
            searchInput.focus();
            searchInput.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 500);
      }
    }
  }, []);

  const categories = ["all", "electronics", "jewelery", "men's clothing", "women's clothing"];

  // Filter products by search and category
  const filteredProducts = products.filter((prod) => {
    const matchesCategory = selectedCategory === "all" || prod.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = prod.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          prod.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", gap: 2 }}>
        <CircularProgress />
        <Typography color="text.secondary">Loading LuxeMart Catalog...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", py: 8, px: 2, maxWidth: 500, mx: "auto" }}>
        <Typography variant="h4" color="error" gutterBottom>⚠️ Loading Failed</Typography>
        <Typography color="text.secondary">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Hero Banner Section */}
      <Box 
        sx={{ 
          background: "linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(16, 185, 129, 0.05) 100%)",
          borderBottom: "1px solid",
          borderColor: "divider",
          py: 8,
          mb: 6,
          textAlign: "center"
        }}
      >
        <Container maxWidth="md">
          <Chip 
            label="Premium Collection 2026" 
            color="primary" 
            variant="outlined" 
            sx={{ fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, mb: 3 }} 
          />
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ fontWeight: 900, mb: 2, letterSpacing: -1.5, fontSize: { xs: "2.5rem", md: "3.5rem" } }}
          >
            Curated Elegance<br />for Every Lifestyle
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400, maxWidth: 650, mx: "auto", mb: 0, lineHeight: 1.6 }}>
            Explore and shop high-quality modern products. Discover the latest collections and add them to your cart.
          </Typography>
        </Container>
      </Box>

      {/* Catalog & Content Section */}
      <Container maxWidth="lg" sx={{ pb: 8 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
          <Typography variant="h4" component="h2" sx={{ fontWeight: 800 }}>
            Explore Our Products
          </Typography>
        </Box>

        {/* Search & Filters */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mb: 5 }}>
          <TextField
            fullWidth
            placeholder="Search products by title or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{ backgroundColor: "background.paper" }}
          />

          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {categories.map((cat) => (
              <Chip
                key={cat}
                label={cat}
                onClick={() => setSelectedCategory(cat)}
                color={selectedCategory === cat ? "primary" : "default"}
                sx={{ 
                  fontWeight: 600, 
                  textTransform: "capitalize",
                  px: 1,
                  py: 2.2,
                  fontSize: "0.9rem",
                  cursor: "pointer"
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Products Grid using Native CSS Grid with MUI Cards */}
        {filteredProducts.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 8, bgcolor: "background.paper", borderRadius: 4, border: "1px solid", borderColor: "divider" }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>No products found</Typography>
            <Typography color="text.secondary">Try resetting filters or checking search spelling!</Typography>
          </Box>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((prod) => (
              <Card 
                key={prod.id} 
                sx={{ 
                  height: "100%", 
                  display: "flex", 
                  flexDirection: "column", 
                  position: "relative",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
                  border: "1px solid",
                  borderColor: "rgba(0, 0, 0, 0.06)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)",
                    borderColor: "primary.light"
                  }
                }}
              >
                {/* Category badge */}
                <Chip 
                  label={prod.category} 
                  size="small"
                  sx={{ 
                    position: "absolute", 
                    top: 12, 
                    left: 12, 
                    bgcolor: "rgba(15, 23, 42, 0.85)", 
                    color: "#ffffff",
                    fontWeight: 700,
                    textTransform: "capitalize",
                    backdropFilter: "blur(4px)",
                    zIndex: 10
                  }} 
                />

                {/* Rating */}
                <Chip
                  icon={<StarIcon sx={{ color: "#fbbf24 !important", fontSize: "0.9rem" }} />}
                  label={prod.rating?.rate.toFixed(1) || "5.0"}
                  size="small"
                  sx={{ 
                    position: "absolute", 
                    top: 12, 
                    right: 12, 
                    bgcolor: "rgba(255, 255, 255, 0.9)", 
                    color: "#0f172a",
                    fontWeight: 700,
                    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                    zIndex: 10
                  }}
                />

                {/* Product Image Wrapper with elegant proportions */}
                <Box 
                  onClick={() => handleOpenDetails(prod)}
                  sx={{ 
                    bgcolor: "#ffffff", 
                    p: 4, 
                    display: "flex", 
                    justifyContent: "center", 
                    alignItems: "center", 
                    height: 220, 
                    borderBottom: "1px solid", 
                    borderColor: "rgba(0, 0, 0, 0.06)",
                    cursor: "pointer",
                    overflow: "hidden"
                  }}
                >
                  <CardMedia
                    component="img"
                    image={prod.image}
                    alt={prod.title}
                    sx={{ 
                      maxHeight: "100%", 
                      maxWidth: "100%", 
                      width: "auto", 
                      objectFit: "contain",
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.05)"
                      }
                    }}
                  />
                </Box>

                <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 1, p: 2.5 }}>
                  <Typography 
                    variant="subtitle1" 
                    component="h3" 
                    onClick={() => handleOpenDetails(prod)}
                    sx={{ 
                      fontWeight: 700, 
                      lineHeight: 1.4, 
                      height: "2.8rem", 
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      color: "text.primary",
                      cursor: "pointer",
                      "&:hover": {
                        color: "primary.main"
                      }
                    }}
                  >
                    {prod.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ 
                      height: "2.4rem", 
                      overflow: "hidden", 
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      lineHeight: 1.4
                    }}
                  >
                    {prod.description}
                  </Typography>
                  
                  <Box sx={{ mt: "auto", pt: 1.5, borderTop: "1px solid", borderColor: "rgba(0, 0, 0, 0.06)" }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: "primary.main" }}>
                      ₹{(prod.price * 85).toFixed(2)}
                    </Typography>
                  </Box>
                </CardContent>

                <CardActions sx={{ px: 2.5, pb: 2.5, pt: 0 }}>
                  <Button 
                    fullWidth 
                    variant="contained" 
                    color="primary"
                    startIcon={<ShoppingCartIcon />} 
                    onClick={() => handleAddToCart(prod)}
                    sx={{ 
                      py: 1.2, 
                      borderRadius: 2,
                      boxShadow: "0 4px 12px rgba(99, 102, 241, 0.15)",
                      "&:hover": {
                        boxShadow: "0 6px 16px rgba(99, 102, 241, 0.25)"
                      }
                    }}
                  >
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            ))}
          </div>
        )}
      </Container>

      {/* Cart Feedback Toast Notification */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity="success" 
          variant="filled" 
          sx={{ width: "100%", borderRadius: 2, fontWeight: 600 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Product Details Modal Dialog */}
      <Dialog
        open={Boolean(selectedProduct)}
        onClose={handleCloseDetails}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 4, overflow: "hidden" }
        }}
      >
        {selectedProduct && (
          <Grid container sx={{ minHeight: 400 }}>
            {/* Left Column: Image wrapper */}
            <Grid item xs={12} md={5.5} sx={{ 
              bgcolor: "#ffffff", 
              display: "flex", 
              justifyContent: "center", 
              alignItems: "center", 
              p: 4, 
              borderRight: { xs: "none", md: "1px solid" }, 
              borderBottom: { xs: "1px solid", md: "none" },
              borderColor: "rgba(0, 0, 0, 0.06)" 
            }}>
              <Box component="img" src={selectedProduct.image} alt={selectedProduct.title} sx={{ maxHeight: 350, maxWidth: "100%", objectFit: "contain" }} />
            </Grid>
            {/* Right Column: Content */}
            <Grid item xs={12} md={6.5} sx={{ display: "flex", flexDirection: "column", p: 4 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Chip label={selectedProduct.category} size="small" sx={{ textTransform: "capitalize", fontWeight: 700, bgcolor: "rgba(99, 102, 241, 0.08)", color: "primary.main", mb: 2 }} />
                
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 1.5, lineHeight: 1.3 }}>
                  {selectedProduct.title}
                </Typography>

                {/* Rating & reviews */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2.5 }}>
                  <Rating value={selectedProduct.rating?.rate || 4.5} readOnly precision={0.1} size="small" />
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 700 }}>
                    {selectedProduct.rating?.rate || "4.5"} ({selectedProduct.rating?.count || "120"} reviews)
                  </Typography>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, mb: 3 }}>
                  {selectedProduct.description}
                </Typography>

                <Divider sx={{ my: 2.5 }} />

                {/* Size Selector */}
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5 }}>
                  Select Size:
                </Typography>
                <Box sx={{ display: "flex", gap: 1.5, mb: 3 }}>
                  {selectedProduct.category.toLowerCase().includes("clothing") ? (
                    ["S", "M", "L", "XL"].map((sz) => (
                      <Chip
                        key={sz}
                        label={sz}
                        onClick={() => setSelectedSize(sz)}
                        color={selectedSize === sz ? "primary" : "default"}
                        variant={selectedSize === sz ? "filled" : "outlined"}
                        sx={{ fontWeight: 700, px: 1, py: 2 }}
                      />
                    ))
                  ) : (
                    <Chip
                      label="One Size"
                      color="primary"
                      variant="filled"
                      sx={{ fontWeight: 700, px: 1, py: 2 }}
                    />
                  )}
                </Box>
              </Box>

              {/* Price and Add to Cart Section */}
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", pt: 2, borderTop: "1px solid", borderColor: "rgba(0, 0, 0, 0.06)" }}>
                <Box>
                  <Typography variant="caption" color="text.secondary" display="block" sx={{ fontWeight: 700, textTransform: "uppercase" }}>
                    Price
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: "primary.main" }}>
                    ₹{(selectedProduct.price * 85).toFixed(2)}
                  </Typography>
                </Box>
                
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button variant="outlined" color="inherit" onClick={handleCloseDetails} sx={{ fontWeight: 600 }}>
                    Close
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<ShoppingCartIcon />}
                    onClick={handleDetailsAddToCart}
                    sx={{ px: 4, py: 1.2, borderRadius: 2, fontWeight: 700 }}
                  >
                    Add to Cart
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        )}
      </Dialog>
    </Box>
  );
}
