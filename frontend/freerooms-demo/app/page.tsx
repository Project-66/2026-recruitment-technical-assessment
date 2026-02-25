"use client"

/* -------------------------------------------------------------------------- */
/*                             Frontend Demo Task                             */
/* -------------------------------------------------------------------------- */

/* --------------------------------- Imports -------------------------------- */

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  Filter,
  Grid2X2,
  Map,
  Search,
  SortDesc,
} from "lucide-react";
import Image from "next/image";
import FreeroomLogoOpen from "@/assets/freeRoomsLogo.png";
import FreeroomLogoClosed from "@/assets/freeroomsDoorClosed.png";
import { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

/* -------------------------- Buildings (Test) Data ------------------------- */

const buildings = [
  {
    "name": "AGSM",
    "rooms_available": 9,
    "building_file": "./agsm.webp"
  },
  {
    "name": "Ainsworth Building",
    "rooms_available": 16,
    "building_picture": "./ainsworth.webp"
  },
  {
    "name": "Anita B Lawrence Centre",
    "rooms_available": 44,
    "building_picture": "./anitb.webp"
  },
  {
    "name": "Biological Sciences",
    "rooms_available": 6,
    "building_picture": "./biologicalScience.webp"
  },
  {
    "name": "Biological Science (West)",
    "rooms_available": 8,
    "building_picture": "biologicalScienceWest.webp"
  },
  {
    "name": "Blockhouse",
    "rooms_available": 42,
    "building_picture": "./blockhouse.webp"
  },
  {
    "name": "Business School",
    "rooms_available": 18,
    "building_picture": "./businessSchool.webp"
  },
  {
    "name": "Civil Engineering Building",
    "rooms_available": 8,
    "building_picture": "./civilBuilding.webp"
  },
  {
    "name": "Colombo Building",
    "rooms_available": 5,
    "building_picture": "./colombo.webp"
  },
  {
    "name": "Computer Science & Eng (K17)",
    "rooms_available": 7,
    "building_picture": "./cseBuilding.webp"
  }
];

/* ----------------------------- Home Component ----------------------------- */

export default function Home() {
  const [ doorOpen, setDoorOpen ] = useState(true);

  return (
    <div className="flex flex-col">
      <div className="p-3 pb-2 w-screen flex flex-row items-center border-b">
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
          <Button variant="outline" size="icon" className="border-[#ef7020]">
            <Search color="#ef7020"/>
          </Button>
          <Button variant="default" size="icon" className="bg-[#ef7020]">
            <Grid2X2 color="white"/>
          </Button>
           <Button variant="outline" size="icon" className="border-[#ef7020]">
            <Map color="#ef7020"/>
          </Button>
          <ModeToggle />
        </div>
      </div>
      <div className="p-3 pb-2 w-screen flex flex-row items-center">
        {/* filters/search/sort */}
        <Button variant="outline" size="lg" className="border-[#ef7020] border-3 rounded-xl text-[#ef7020] text-lg">
          <Filter />
          Filter
        </Button>
        <div className="flex-1" />
         <InputGroup className="max-w-1/2">
            <InputGroupInput placeholder="Search..." />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>
        <div className="flex-1" />
        <Button variant="outline" size="lg" className="border-[#ef7020] border-3 rounded-xl text-[#ef7020] text-lg">
          <SortDesc />
          Sort
        </Button>
      </div>
      <div>
        {/* grid */}
      </div>
    </div>
  );
}
