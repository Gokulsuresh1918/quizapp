"use client";
import useQuiz from "../../../store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

const type = ["boolean", "multiple"];
const level = ["easy", "medium", "hard"];

type CategoryType = {
  id: number;
  name: string;
};
export default function Dropdown() {
  const addLevel = useQuiz((state) => state.addLevel);
  const addCategory = useQuiz((state) => state.addCategory);
  const addType = useQuiz((state) => state.addType);
  const config = useQuiz((state) => state.config);
  const [categoryies, setCategoryies] = useState<CategoryType[]>([]);
  useEffect(() => {
    async function getcategory() {
      try {
        const { trivia_categories } = await (
          await fetch(`https://opentdb.com/api_category.php`)
        ).json();
        setCategoryies([...trivia_categories]);
      } catch (error) {
        console.log(error);
      }
    }
    getcategory();
  }, []);
  return (
    <section className="flex justify-evenly items-center py-5">
      <div className="px-7 py-4 w-1/3 mx-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex outline-none justify-between w-full px-10 py-3 rounded-lg shadow-lg hover:bg-blue-400 hover:text-gray-100">
            {config.category.name ? config.category.name : "CATEGORY"}{" "}
            <ChevronDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>SELECT CATEGORY</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {categoryies.map((category) => (
              <DropdownMenuItem
                key={category.name}
                onClick={() => addCategory(category.id, category.name)}
              >
                {category.name}
              </DropdownMenuItem>
            ))}
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
