"use client";
import useQuiz from "@/app/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const type = ["boolean", "multiple"];
const level = ["easy", "medium", "hard"];
const category = ["general knowledge", "maths", "english"];

export default function Dropdown() {
  const addLevel = useQuiz((state) => state.addLevel);
  const addCategory = useQuiz((state) => state.addCategory);
  const addType = useQuiz((state) => state.addType);
  const config = useQuiz((state) => state.config);
  return (
    <section className="flex justify-evenly items-center py-5">
      <div className="px-7 py-4 w-1/3 mx-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex outline-none justify-between w-full px-10 py-3 rounded-lg shadow-lg hover:bg-blue-400 hover:text-gray-100">
            {config.category ? config.category : "CATEGORY"} <ChevronDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>SELECT CATEGORY</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {category.map((e) => (
              <DropdownMenuItem key={e} onClick={() => addCategory(e)}>
                {e}
              </DropdownMenuItem>
            ))}{" "}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="px-7 py-4 w-1/3 mx-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex outline-none justify-between w-full px-10 py-3 rounded-lg shadow-lg hover:bg-blue-400 hover:text-gray-100">
            {config.level ? config.level : "LEVEL"} 
            <ChevronDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>SELECT LEVEL</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {level.map((e) => (
              <DropdownMenuItem key={e} onClick={() => addLevel(e)}>
                {e}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="px-7 py-4 w-1/3 mx-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex outline-none justify-between w-full px-10 py-3 rounded-lg shadow-lg hover:bg-blue-400 hover:text-gray-100">
            {config.type ? config.type : "TYPE"} 
            <ChevronDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>SELECT TYPE</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {type.map((e) => (
              <DropdownMenuItem key={e} onClick={() => addType(e)}>
                {e}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </section>
  );
}
