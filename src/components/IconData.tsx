import { House } from "lucide-astro";
import { Building } from "lucide-astro";
import { Presentation } from "lucide-astro";
import { UserSearch } from "lucide-astro";
import { Mail } from "lucide-astro";

export interface IconData {
  name: string;
  icon: () => string;
}

export const IconData: IconData[] = [
  { name: "home", icon : House },
  { name: "company", icon: Building },
  { name: "services", icon: Presentation },
  { name: "recruit", icon: UserSearch },
  { name: "contact", icon: Mail }
];