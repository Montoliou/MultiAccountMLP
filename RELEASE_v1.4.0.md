# 🚀 Version 1.4.0 - UI Overhaul: Sidebar Removal & Inline Editing

**Release Date:** November 24, 2024

## 🎯 Major Changes

This release represents a **complete UI restructure** of the application, removing the sidebar and introducing modern inline editing patterns.

### ⚠️ BREAKING CHANGES

- **Sidebar completely removed** (158 lines of HTML)
- All controls moved to new Control Bar (top-right)
- Fullwidth layout for flowchart visualization
- Booking calendar now modal-based (no sidebar dependency)

---

## ✨ New Features

### 1. Inline Basin Editors
Click directly on basins to edit values inline - no more sidebar navigation!

- **Einkommen**: Single-field editor
- **Konsum**: Dual-field editor (Mindestbestand + Überschuss)
- **Tagesgeld**: Dual-field editor (Aktuell + Sparziel)
- Smooth overlay with backdrop blur
- Keyboard shortcuts: `Enter` to save, `Esc` to cancel

### 2. Control Bar (Top-Right)
Fixed position control panel with compact chips:

- 🌓 **Theme Toggle** (Dark/Light)
- 🔀 **Variant Switch** (A/B)
- 💬 **Consultation Mode**
- 44px minimum touch targets
- Hover states with border highlights

### 3. Booking Calendar FAB
Floating Action Button for calendar access:

- Fixed bottom-right position
- Opens in fullscreen modal
- Icon-only compact buttons
- Dynamic content generation

### 4. Fullwidth Layout
Optimized screen space usage:

- Flowchart uses entire viewport width
- No sidebar constraints
- Better use of large displays
- Responsive design maintained

---

## 🔧 Technical Improvements

### Code Quality
- ✅ Comprehensive null-checks for all DOM element access
- ✅ Optional chaining (`?.`) for `input.value` access
- ✅ Removed duplicate event listener registrations
- ✅ Fixed undefined `basins` variable reference

### Bug Fixes
- 🐛 Fixed inline editor crashes (missing basins variable)
- 🐛 Fixed booking calendar not displaying content
- 🐛 Fixed missing input field references causing null errors
- 🐛 Fixed File System API permission requests on page load
- 🐛 Fixed variantSwitch event listener without null check

### Compatibility
- ✅ Hidden input fields for backward compatibility
- ✅ All 8 input fields present (income, konsumMin, konsumLeftover, tagesgeldCurrent, tagesgeldLimit, depotCurrent, anlagezeitraum, rendite)

---

## 🎨 Design

Following **Design-Guide** principles:

- 8px grid system (8px, 16px, 24px, 32px spacing)
- Minimum 44px touch targets
- Subtle shadows and clean borders
- Backdrop blur effects
- Professional typography hierarchy

---

## 📦 Files Changed

- `index.html`: +1335 insertions, -229 deletions

---

## 🔗 Links

- **GitHub Repository**: https://github.com/Montoliou/MultiAccountMLP
- **Documentation**: See ROADMAP.md for complete feature list
- **Previous Version**: v1.3.11

---

## 🙏 Credits

Built with [Claude Code](https://claude.com/claude-code) by Anthropic

Co-Authored-By: Claude <noreply@anthropic.com>
