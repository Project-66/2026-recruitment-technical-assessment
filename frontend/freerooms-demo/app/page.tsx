import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  Grid2X2,
  Map,
  Search,
} from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div>
        {/* navbar */}
        <div>
          {/* logo component */}
        </div>
        <div className="flex flex-row gap-x-1">
          {/* navbar buttons */}
          <Button variant="outline" size="icon">
            <Search />
          </Button>
          <Button variant="outline" size="icon">
            <Grid2X2 />
          </Button>
           <Button variant="outline" size="icon">
            <Map />
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
