☕ Sublime Coffee CMS

A modern, dynamic coffee shop website and content management system built for Sublime Coffee, powered by Next.js and Supabase.

This project serves both a public-facing website and an internal CMS for managing content like stories, menus, gallery images, and featured products.

🚀 Tech Stack
Frontend: Next.js (App Router)
Backend: Supabase
Database
Authentication
Storage (S3-like file storage)
Styling: Tailwind CSS + utility libraries
Rich Text Editor: Tiptap
UI Components: Radix UI, shadcn-style components
State & UX Enhancements:
react-hot-toast (notifications)
react-hotkeys-hook (keyboard shortcuts)
react-loader-spinner (loading states)
Icons:
Lucide React
Remixicon
FontAwesome

✨ Features
🔐 Authentication (CRM Access)
Secure login/logout via Supabase Auth
Protected CMS routes
Session handling integrated with Next.js SSR
📝 Story Management
Rich text editor powered by Tiptap
Create and update coffee shop stories
Supports:
Headings
Paragraphs
Lists
Underline
Text styles
📋 Menu Management
Upload restaurant menu files (PDF/images)
Stored in Supabase Storage (S3-like bucket)
Replace or update menu anytime
File preview before upload
🖼️ Gallery System
Upload up to 6 images max
Create and delete images dynamically
Preview before upload using local state management
Optimized storage via Supabase
⭐ Featured Products
Manage up to 3 featured products
Create, update, and delete products
Image uploads with preview support
Designed for highlighting signature coffee items
📦 File Upload System

All media uploads (menu, gallery, products):

Use Supabase Storage (S3-like)
Include real-time file previews via React state
Validate limits before upload (e.g., 6 images max for gallery)
Optimized for fast UX and minimal refetching
🧠 CMS Overview

The CMS is designed for simplicity and speed:

Centralized dashboard for managing content
Real-time updates via Supabase
Minimal reload interactions
Structured for non-technical users (barista/staff-friendly)