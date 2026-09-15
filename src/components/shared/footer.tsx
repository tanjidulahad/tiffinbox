import { Camera, Share2, Video } from "lucide-react";

export function Footer() {
  return (
      <footer className="bg-[#0D231E] text-slate-400 text-xs py-12 px-6 border-t border-emerald-900/50 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-white font-bold text-lg">
            🍱 Tiffin<span className="text-orange-500">Box</span>
          </div>
          <p className="text-[11px] text-slate-500">
            © 2026 TiffinBox. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Camera className="w-4 h-4 hover:text-white cursor-pointer transition" />
            <Share2 className="w-4 h-4 hover:text-white cursor-pointer transition" />
            <Video className="w-4 h-4 hover:text-white cursor-pointer transition" />
          </div>
        </div>
      </footer>
  );
}