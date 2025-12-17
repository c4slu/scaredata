"use client";
import { Check, ShieldCheck, Upload, Zap } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ChartAreaDefault } from "./chart";
import { FileUpload } from "./FileUpload";

export default function HomeSection() {
  return (
    <div className="h-11/12 border-l border-r ml-[155px] mr-[60px] flex items-center justify-between px-24">
      <div className="w-full flex flex-col justify-center h-full gap-6 ">
        <Badge
          variant="default"
          className="border-primary bg-primary/20 text-primary h-7"
        >
          <Zap />
          AI-Powered Data Quality
        </Badge>
        <h1 className="text-3xl font-semibold ">
          Turn raw data into trusted data —{" "}
          <span className="text-[#38D97C] flash-text">instantly</span>.
        </h1>
        <p className="text-base font-normal text-[#8C8C8C] w-[581px]">
          Upload your file and let AI uncover hidden issues, risks, and
          inconsistencies in your data before they impact your business.
        </p>
        <div className="flex gap-10">
          <Badge
            variant="default"
            className="border-primary/10 bg-background/20 text-white h-7 py-4 px-4"
          >
            <Check />
            No coding required
          </Badge>
          <Badge>
            <ShieldCheck />
            Enterprise-grade security
          </Badge>
        </div>
        <div className="w-2/3 border py-3 px-5 rounded-xl border-dashed">
          <div className="flex gap-10 items-center">
            <span className="bg-primary/20 rounded-3xl p-3">
              <Upload size={20} />
            </span>
            <p className="text-sm text-white">
              Drop your file{" "}
              <span className="text-xs text-muted-foreground">
                or click browser
              </span>
            </p>
            <div>
              <Button
                className="w-full cursor-pointer"
                onClick={() => {
                  window.location.href = "/upload";
                }}
              >
                Select File
              </Button>
              <span className="w-full flex items-center justify-center text-xs font-light text-muted-foreground pt-2">
                Supports CSV, Excel, JSON, XML (up to 100MB)
              </span>
            </div>
          </div>
        </div>
      </div>
      <ChartAreaDefault />
    </div>
  );
}
