import Image from "next/image";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";

export default function Navbar() {
  return (
    <div className="flex">
      <div className="flex w-[176px] border-r border-b border">
        <Image src="/asset.svg" alt="Datalens" width={176} height={93} />
      </div>
      <div className="flex justify-between items-center px-20 py-4 border-b border w-full">
        <div className="flex items-center gap-3">
          <Image src="/logo.svg" alt="Datalens" width={30} height={42} />
          <h1 className="text-sm font-medium italic text-[#38D97C]">Data</h1>
        </div>
        <div className="flex items-center gap-8">
          <span className="text-sm font-medium text-muted-foreground cursor-pointer hover:text-[#38D97C] transition-all duration-300">
            home
          </span>
          <span className="text-sm font-medium text-muted-foreground cursor-pointer hover:text-[#38D97C] transition-all duration-300">
            dashboard
          </span>
          <Button className="hover:bg-muted-foreground hover:text-white transition-all duration-300 cursor-pointer">
            <ChevronRight />
            <span>transform</span>
          </Button>
        </div>
      </div>
      <div className="flex w-[68px] border-l border-b border">
        <Image src="/asset-left.svg" alt="Datalens" width={68} height={93} />
      </div>
    </div>
  );
}
