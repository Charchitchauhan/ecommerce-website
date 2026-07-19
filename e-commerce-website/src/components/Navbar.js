"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "../context/AppContext";
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Badge, 
  IconButton, 
  Box, 
  Container, 
  Menu, 
  MenuItem, 
  Divider, 
  ListItemIcon, 
  ListItemText, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField, 
  Tooltip, 
  Zoom,
  Drawer,
  Chip,
  Avatar,
  List,
  ListItem
} from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import HistoryIcon from "@mui/icons-material/History";
import QrCodeIcon from "@mui/icons-material/QrCode";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Navbar() {
  const pathname = usePathname();
  const { cart, user, isLoggedIn, updateUserProfile, login, logout, cartDrawerOpen, setCartDrawerOpen, updateCartQuantity, removeFromCart } = useApp();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Profile menu state
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  // Mobile drawer navigation state
  const [mobileDrawerOpen, setMobileDrawerOpen] = React.useState(false);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  // Profile Dialog modal state
  const [isProfileModalOpen, setIsProfileModalOpen] = React.useState(false);
  const [profileForm, setProfileForm] = React.useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  React.useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || ""
      });
    }
  }, [user]);

  const handleProfileModalOpen = () => {
    setIsProfileModalOpen(true);
    handleProfileMenuClose();
  };

  const handleProfileModalClose = () => {
    setIsProfileModalOpen(false);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateUserProfile(profileForm);
    setIsProfileModalOpen(false);
  };

  const handleSearchClick = () => {
    if (pathname !== "/") {
      window.location.href = "/?focusSearch=true";
    } else {
      const searchInput = document.querySelector('input[placeholder*="Search products"]');
      if (searchInput) {
        searchInput.focus();
        searchInput.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  return (
    <AppBar 
      position="sticky" 
      elevation={0} 
      sx={{ 
        backgroundColor: "rgba(255, 255, 255, 0.8)", 
        backdropFilter: "blur(8px)", 
        borderBottom: "1px solid",
        borderColor: "divider",
        color: "text.primary"
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: "space-between", px: { xs: 0 } }}>
          {/* Left Area: Logo & Mobile Hamburger */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* Hamburger Menu Icon (Mobile Only) */}
            <IconButton
              color="primary"
              onClick={() => setMobileDrawerOpen(true)}
              sx={{ display: { md: "none" }, mr: 1, p: 0.8 }}
            >
              <MenuIcon />
            </IconButton>

            {/* Logo */}
            <Typography 
              component={Link} 
              href="/" 
              sx={{ 
                fontFamily: "var(--font-outfit), sans-serif",
                fontSize: { xs: "1.35rem", md: "2.1rem" },
                fontWeight: 900, 
                textDecoration: "none", 
                color: "text.primary",
                display: "flex",
                alignItems: "center",
                gap: 0.8,
                letterSpacing: "-0.75px"
              }}
            >
              {/* Minimalist Glowing Dot Brand Seal */}
              <Box 
                sx={{ 
                  width: { xs: 8, md: 11 }, 
                  height: { xs: 8, md: 11 }, 
                  borderRadius: "50%", 
                  background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                  display: "inline-block",
                  boxShadow: "0 0 10px rgba(99, 102, 241, 0.65)"
                }}
              />
              <Box component="span" sx={{ 
                background: "linear-gradient(135deg, #6366f1 0%, #818cf8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: 900
              }}>
                Luxe
              </Box>
              <Box component="span" sx={{ fontWeight: 800, color: "#0f172a" }}>
                Mart
              </Box>
            </Typography>
          </Box>

          {/* Links (Desktop Only) */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3, alignItems: "center" }}>
            <Button 
              component={Link} 
              href="/" 
              color="inherit"
              sx={{ 
                fontWeight: 600,
                color: pathname === "/" ? "primary.main" : "text.secondary",
                "&:hover": { color: "primary.main" }
              }}
            >
              Home
            </Button>
            <Button 
              component={Link} 
              href="/about" 
              color="inherit"
              sx={{ 
                fontWeight: 600,
                color: pathname === "/about" ? "primary.main" : "text.secondary",
                "&:hover": { color: "primary.main" }
              }}
            >
              About Us
            </Button>
            <Button 
              component={Link} 
              href="/contact" 
              color="inherit"
              sx={{ 
                fontWeight: 600,
                color: pathname === "/contact" ? "primary.main" : "text.secondary",
                "&:hover": { color: "primary.main" }
              }}
            >
              Contact Us
            </Button>
          </Box>

          {/* Icons and Actions */}
          <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
            {/* Search Icon */}
            <Tooltip title="Search Products" TransitionComponent={Zoom}>
              <IconButton 
                onClick={handleSearchClick}
                color="primary"
                sx={{ 
                  backgroundColor: "rgba(99, 102, 241, 0.04)",
                  "&:hover": {
                    backgroundColor: "primary.main",
                    color: "#ffffff"
                  },
                  p: 1.2
                }}
              >
                <SearchIcon />
              </IconButton>
            </Tooltip>

            {/* Profile Dropdown Icon */}
            {isLoggedIn ? (
              <Tooltip title="Account Settings" TransitionComponent={Zoom}>
                <IconButton 
                  onClick={handleProfileMenuOpen}
                  color="primary"
                  sx={{ 
                    backgroundColor: "rgba(99, 102, 241, 0.04)",
                    "&:hover": {
                      backgroundColor: "primary.main",
                      color: "#ffffff"
                    },
                    p: 1.2
                  }}
                >
                  <PersonOutlinedIcon />
                </IconButton>
              </Tooltip>
            ) : (
              <Button 
                variant="outlined" 
                color="primary" 
                onClick={login}
                size="small"
                sx={{ 
                  borderRadius: 99, 
                  fontWeight: 700, 
                  textTransform: "none", 
                  px: 2.5,
                  py: 0.8
                }}
              >
                Login
              </Button>
            )}

            {/* Cart Icon */}
            <Tooltip title="View Cart" TransitionComponent={Zoom}>
              <IconButton 
                onClick={() => setCartDrawerOpen(true)}
                color="primary"
                sx={{ 
                  backgroundColor: "rgba(99, 102, 241, 0.08)",
                  "&:hover": {
                    backgroundColor: "primary.main",
                    color: "#ffffff"
                  },
                  p: 1.2
                }}
              >
                <Badge badgeContent={totalItems} color="error">
                  <ShoppingBagIcon />
                </Badge>
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>

      {/* Profile Menu Dropdown */}
      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleProfileMenuClose}
        onClick={handleProfileMenuClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 8px 16px rgba(0,0,0,0.08))",
              border: "1px solid rgba(0, 0, 0, 0.06)",
              borderRadius: 3,
              mt: 1.5,
              minWidth: 180,
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
                borderLeft: "1px solid rgba(0, 0, 0, 0.06)",
                borderTop: "1px solid rgba(0, 0, 0, 0.06)",
              },
            },
          }
        }}
      >
        <MenuItem onClick={handleProfileModalOpen} sx={{ py: 1.2, px: 2 }}>
          <ListItemIcon sx={{ minWidth: "36px !important" }}>
            <PersonOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="My Profile" primaryTypographyProps={{ fontSize: "0.95rem", fontWeight: 600 }} />
        </MenuItem>
        <MenuItem 
          component={Link} 
          href="/cart#orders-history" 
          onClick={handleProfileMenuClose}
          sx={{ py: 1.2, px: 2 }}
        >
          <ListItemIcon sx={{ minWidth: "36px !important" }}>
            <HistoryIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Orders" primaryTypographyProps={{ fontSize: "0.95rem", fontWeight: 600 }} />
        </MenuItem>
        <MenuItem 
          component={Link} 
          href="/track" 
          onClick={handleProfileMenuClose}
          sx={{ py: 1.2, px: 2 }}
        >
          <ListItemIcon sx={{ minWidth: "36px !important" }}>
            <QrCodeIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Track Order" primaryTypographyProps={{ fontSize: "0.95rem", fontWeight: 600 }} />
        </MenuItem>
        <Divider />
        <MenuItem onClick={logout} sx={{ py: 1.2, px: 2, color: "error.main" }}>
          <ListItemIcon sx={{ minWidth: "36px !important", color: "error.main" }}>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Logout" primaryTypographyProps={{ fontSize: "0.95rem", fontWeight: 600 }} />
        </MenuItem>
      </Menu>

      {/* My Profile Editor Dialog */}
      <Dialog 
        open={isProfileModalOpen} 
        onClose={handleProfileModalClose}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 4, px: 1, py: 0.5 }
        }}
      >
        <form onSubmit={handleSaveProfile}>
          <DialogTitle sx={{ fontWeight: 800, fontSize: "1.4rem", pb: 1 }}>
            My Profile Details
          </DialogTitle>
          <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2.5, pt: 1.5 }}>
            <TextField
              required
              fullWidth
              label="Full Name"
              value={profileForm.name}
              onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
            />
            <TextField
              required
              fullWidth
              type="email"
              label="Email Address"
              value={profileForm.email}
              onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
            />
            <TextField
              required
              fullWidth
              label="Phone Number"
              value={profileForm.phone}
              onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
            />
            <TextField
              required
              fullWidth
              multiline
              rows={3}
              label="Shipping Address"
              value={profileForm.address}
              onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
            />
          </DialogContent>
          <DialogActions sx={{ p: 3, pt: 1 }}>
            <Button onClick={handleProfileModalClose} color="inherit" sx={{ fontWeight: 600 }}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary" sx={{ fontWeight: 700, px: 3 }}>
              Save Changes
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Amazon-style Cart Drawer */}
      <Drawer
        anchor="right"
        open={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        PaperProps={{
          sx: { width: { xs: "100%", sm: 400 }, display: "flex", flexDirection: "column", height: "100%" }
        }}
      >
        {/* Drawer Header */}
        <Box sx={{ p: 2.5, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid", borderColor: "divider" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              Shopping Cart
            </Typography>
            <Chip 
              label={`${cart.reduce((sum, item) => sum + item.quantity, 0)} items`} 
              size="small" 
              color="primary" 
              sx={{ fontWeight: 700 }} 
            />
          </Box>
          <IconButton onClick={() => setCartDrawerOpen(false)} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Drawer Scrollable Body */}
        <Box sx={{ flexGrow: 1, overflowY: "auto", p: 2.5, display: "flex", flexDirection: "column", gap: 2.5 }}>
          {cart.length === 0 ? (
            /* Empty State */
            <Box sx={{ py: 8, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
              <Typography variant="h2">🛒</Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                Your cart is empty
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 220 }}>
                Explore our catalog and add items to your cart to begin shopping.
              </Typography>
              <Button 
                variant="contained" 
                onClick={() => setCartDrawerOpen(false)} 
                sx={{ borderRadius: 2, px: 3, fontWeight: 700 }}
              >
                Start Shopping
              </Button>
            </Box>
          ) : (
            /* Items List */
            cart.map((item) => (
              <Box 
                key={item.cartId || item.id} 
                sx={{ 
                  display: "flex", 
                  gap: 2, 
                  alignItems: "center", 
                  p: 1.5, 
                  border: "1px solid", 
                  borderColor: "divider", 
                  borderRadius: 3 
                }}
              >
                {/* Thumbnail */}
                <Avatar 
                  variant="rounded" 
                  src={item.image} 
                  sx={{ width: 64, height: 64, bgcolor: "white", p: 0.5, border: "1px solid #e2e8f0" }} 
                />
                
                {/* Details */}
                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                  <Typography variant="subtitle2" noWrap sx={{ fontWeight: 700, lineHeight: 1.2, mb: 0.5 }}>
                    {item.title}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                    {item.selectedSize && (
                      <Chip 
                        label={`Size: ${item.selectedSize}`} 
                        size="small" 
                        sx={{ height: 16, fontSize: "0.65rem", fontWeight: 700, bgcolor: "rgba(99, 102, 241, 0.06)", color: "primary.main" }} 
                      />
                    )}
                  </Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "primary.main" }}>
                    ₹{(item.price * 85).toFixed(2)}
                  </Typography>
                </Box>

                {/* Counter & Actions */}
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 1 }}>
                  <IconButton 
                    size="small" 
                    color="error" 
                    onClick={() => removeFromCart(item.cartId || item.id)}
                    sx={{ p: 0.5 }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                  
                  <Box sx={{ display: "flex", alignItems: "center", border: "1px solid", borderColor: "divider", borderRadius: 99, overflow: "hidden" }}>
                    <IconButton size="small" onClick={() => updateCartQuantity(item.cartId || item.id, item.quantity - 1)} sx={{ p: 0.2 }}>
                      <RemoveIcon sx={{ fontSize: "0.75rem" }} />
                    </IconButton>
                    <Typography sx={{ mx: 1, fontWeight: 700, fontSize: "0.8rem" }}>
                      {item.quantity}
                    </Typography>
                    <IconButton size="small" onClick={() => updateCartQuantity(item.cartId || item.id, item.quantity + 1)} sx={{ p: 0.2 }}>
                      <AddIcon sx={{ fontSize: "0.75rem" }} />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            ))
          )}
        </Box>

        {/* Drawer Footer summary block */}
        {cart.length > 0 && (
          <Box sx={{ p: 2.5, borderTop: "1px solid", borderColor: "divider", bgcolor: "grey.50" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Typography sx={{ fontWeight: 800 }}>Subtotal:</Typography>
              <Typography sx={{ fontWeight: 800 }} color="primary.main">
                ₹{(cart.reduce((sum, item) => sum + item.price * item.quantity, 0) * 85).toFixed(2)}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Button 
                variant="outlined" 
                fullWidth 
                component={Link} 
                href="/cart"
                onClick={() => setCartDrawerOpen(false)}
                sx={{ py: 1.2, borderRadius: 2, fontWeight: 700 }}
              >
                View Full Cart
              </Button>
              <Button 
                variant="contained" 
                color="secondary" 
                fullWidth 
                component={Link} 
                href="/cart"
                onClick={() => setCartDrawerOpen(false)}
                sx={{ py: 1.2, borderRadius: 2, fontWeight: 700, boxShadow: "0 4px 12px rgba(16, 185, 129, 0.2)" }}
              >
                Proceed to Checkout
              </Button>
            </Box>
          </Box>
        )}
      </Drawer>

      {/* Mobile Drawer (Left Slide-in) */}
      <Drawer
        anchor="left"
        open={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        PaperProps={{
          sx: { width: 250 }
        }}
      >
        <Box sx={{ p: 2.5, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid", borderColor: "divider" }}>
          <Typography variant="h6" sx={{ fontWeight: 800, color: "primary.main" }}>
            Menu
          </Typography>
          <IconButton onClick={() => setMobileDrawerOpen(false)} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          <ListItem button component={Link} href="/" onClick={() => setMobileDrawerOpen(false)}>
            <ListItemText primary="Home" primaryTypographyProps={{ fontWeight: 600 }} />
          </ListItem>
          <ListItem button component={Link} href="/about" onClick={() => setMobileDrawerOpen(false)}>
            <ListItemText primary="About Us" primaryTypographyProps={{ fontWeight: 600 }} />
          </ListItem>
          <ListItem button component={Link} href="/contact" onClick={() => setMobileDrawerOpen(false)}>
            <ListItemText primary="Contact Us" primaryTypographyProps={{ fontWeight: 600 }} />
          </ListItem>
          <ListItem button component={Link} href="/track" onClick={() => setMobileDrawerOpen(false)}>
            <ListItemText primary="Track Order" primaryTypographyProps={{ fontWeight: 600 }} />
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
}
