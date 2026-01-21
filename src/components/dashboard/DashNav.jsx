import React from "react";
import {
  Bell,
  CheckCircle,
  Info,
  Menu,
  Moon,
  Package,
  Sun,
  X,
} from "lucide-react";
import ProfileDropdown from "../shared/ProfileDropdown";
import { useTheme } from "@/provider/ThemeProvider";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";

const DashNav = ({ user, isSidebarOpen, setSidebarOpen }) => {
  const { theme, toggleTheme } = useTheme();

  const { data: notifications = [], refetch } = useQuery({
    queryKey: ["notifications", user?.role, user?.email],
    queryFn: async () => {
      const res = await fetch(
        `/api/notifications?role=${user?.role}&email=${user?.email}`
      );
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
    refetchInterval: 15000,
    enabled: !!user?.role,
  });

  const unreadCount = notifications?.filter((n) => !n.isRead).length || 0;
  const markAllAsRead = async () => {
    if (unreadCount === 0) return;

    try {
      const res = await fetch("/api/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: user?.role, email: user?.email }),
      });

      if (res.ok) {
        refetch();
      }
    } catch (error) {
      console.error("Failed to mark notifications as read", error);
    }
  };

  return (
    <header className="h-20 bg-base-100/50 backdrop-blur-md border-b border-base-300 sticky top-0 z-50 px-6 flex items-center justify-between">
      <button
        onClick={() => setSidebarOpen(!isSidebarOpen)}
        className="lg:hidden p-2 hover:bg-base-300 rounded-lg"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className="ml-auto flex items-center gap-4">
        <div className="flex items-center gap-4">
          {" "}
          <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle btn-sm text-neutral hover:text-base-content"
          >
            {theme === "dark" ? <Sun size={22} /> : <Moon size={22} />}
          </button>
          <div className="dropdown dropdown-end">
            <button
              tabIndex={0}
              className="btn btn-ghost btn-circle btn-sm text-neutral relative"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-[10px] text-white flex items-center justify-center rounded-full border-2 border-base-100 font-bold">
                  {unreadCount}
                </span>
              )}
            </button>

            <ul
              tabIndex={0}
              className="dropdown-content z-60 mt-4 p-2 shadow-2xl bg-base-100 border border-base-200 rounded-3xl w-80 max-h-96 overflow-y-auto"
            >
              <div className="px-4 py-3 border-b border-base-200 flex justify-between items-center">
                <span className="font-black text-xs uppercase">
                  Notifications
                </span>
                {unreadCount > 0 && (
                  <span className="badge badge-primary badge-sm font-bold">
                    {unreadCount} New
                  </span>
                )}
              </div>

              {notifications?.length > 0 ? (
                notifications.map((note) => (
                  <li
                    key={note._id}
                    className="p-4 hover:bg-base-200 rounded-2xl transition-colors cursor-pointer border-b border-base-100 last:border-0"
                  >
                    <div className="flex gap-3">
                      <div
                        className={`p-2 rounded-xl h-fit ${
                          note.type === "alert"
                            ? "bg-error/10 text-error"
                            : "bg-primary/10 text-primary"
                        }`}
                      >
                        {note.type === "alert" ? (
                          <Info size={16} />
                        ) : (
                          <Package size={16} />
                        )}
                      </div>
                      <div className="flex-1">
                        <p
                          className={`text-xs leading-tight ${
                            !note.isRead
                              ? "font-black"
                              : "font-medium opacity-70"
                          }`}
                        >
                          {note.message}
                        </p>
                        <p className="text-[10px] opacity-50 mt-1 font-bold italic">
                          {formatDistanceToNow(new Date(note.createdAt))} ago
                        </p>
                      </div>
                      {!note.isRead && (
                        <div className="w-2 h-2 bg-primary rounded-full mt-1"></div>
                      )}
                    </div>
                  </li>
                ))
              ) : (
                <div className="p-8 text-center opacity-50">
                  <CheckCircle size={32} className="mx-auto mb-2 opacity-20" />
                  <p className="text-xs font-bold italic">
                    No notifications yet!
                  </p>
                </div>
              )}
              <div className="p-2">
                {notifications.length > 0 && (
                  <div className="p-2 border-t border-base-200 mt-2">
                    <button
                      onClick={markAllAsRead}
                      className="btn btn-ghost btn-xs w-full text-[10px] font-black uppercase opacity-70 hover:opacity-100 hover:text-primary transition-all"
                    >
                      Mark all as read
                    </button>
                  </div>
                )}
              </div>
            </ul>
          </div>
        </div>

        <div className="h-8 w-px bg-base-content/50 mx-2"></div>

        <div className="flex items-center gap-3 text-right">
          <div className="hidden sm:block">
            <p className="text-sm font-bold text-base-content leading-none">
              {user?.name}
            </p>
            <p className="text-[10px] text-neutral uppercase font-bold tracking-wider mt-1">
              {user?.role}
            </p>
          </div>
          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
};

export default DashNav;
