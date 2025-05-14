import {
  Sun,
  Moon,
  Settings,
  Plus,
  Check,
  Trash,
  Pencil,
  Calendar,
  Flag,
  X,
  ArrowUp,
  ArrowDown,
  MoveDiagonal,
  Tag,
  Filter,
  CheckCircle,
  Wave,
  ListTodo,
  LogOut,
  FileQuestion
} from 'lucide-react';

// Map of icon names to their corresponding components
const iconMap = {
  Sun,
  Moon,
  Settings,
  Plus,
  Check,
  Trash,
  Pencil,
  Calendar,
  Flag,
  X,
  ArrowUp,
  ArrowDown,
  Move: MoveDiagonal, // Alias
  Tag,
  Filter,
  CheckCircle,
  Wave,
  ListTodo,
  LogOut,
  FileQuestion
};

// Get icon component by name
function getIcon(name) {
  return iconMap[name] || null;
}

export default getIcon;