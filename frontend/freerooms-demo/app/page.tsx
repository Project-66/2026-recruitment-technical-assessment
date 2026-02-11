"use client"

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  Grid2X2,
  Map,
  Search,
} from "lucide-react";
import Image from "next/image";
import FreeroomLogoOpen from "@/assets/freeRoomsLogo.png";
import FreeroomLogoClosed from "@/assets/freeroomsDoorClosed.png";
import { useState } from "react";

export default function Home() {
  const [ doorOpen, setDoorOpen ] = useState(true);

  return (
    <>
      <div className="p-3 pb-2 w-screen flex flex-row items-center border-b">
        {/* navbar */}
        <div className="flex flex-row h-max items-center">
          <Image
            src={doorOpen ? FreeroomLogoOpen : FreeroomLogoClosed}
            alt="freerooms-logo"
            width={40}
            onClick={() => setDoorOpen(!doorOpen)}
          />
          <span className="text-[#ef7020] text-3xl font-bold">Freerooms</span>
        </div>
        <div className="flex-1">

        </div>
        <div className="flex flex-row gap-x-2">
          {/* navbar buttons */}
          {/* TODO: switch icons to the ones provided in README (google fonts ones) */}
          <Button variant="outline" size="icon">
            <Search color="#ef7020"/>
          </Button>
          <Button variant="default" size="icon" className="bg-[#ef7020]">
            <Grid2X2 color="white"/>
          </Button>
           <Button variant="outline" size="icon">
            <Map color="#ef7020"/>
          </Button>
          <ModeToggle />
        </div>
      </div>
      <div>
        {/* filters/search/sort */}
      </div>
      <div>
        {/* grid */}
      </div>
    </>
  );
}
