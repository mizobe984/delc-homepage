import { Button } from "@/components/ui/button"
import {
  Drawer as BaseDrawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { AlignJustify } from "lucide-react";

import "@/styles/delcGlobal.css"
import { companyTable, serviceTable } from "@/lib/data.json"
import { Building, Presentation, UserSearch, Mail } from 'lucide-react'


const menuItems = [
  {
    title: 'COMPANY',
    url: '/company',
    icon: Building,
    items: companyTable,
  },
  {
    title: 'SERVICES',
    url: '/services',
    icon: Presentation,
    items: serviceTable,
  },
  {
    title: 'RECRUIT',
    url: '/recruit',
    icon: UserSearch,
    items: [],
  },
  {
    title: 'CONTACT',
    url: '/contact',
    icon: Mail,
    items: [],
  },
]


export function Drawer() {
  return (
    <BaseDrawer direction="left">
      <DrawerTrigger asChild>
        <Button variant="outline" className="z-50 fixed top-10 right-4 h-12 w-12 p-0"><AlignJustify size={24}></AlignJustify></Button>
      </DrawerTrigger>
      <DrawerContent className="h-screen bg-background text-primary">
        <div className="w-3/4">
          <a href="/" className="flex h-[48px] ml-[1rem] group w-40 mt-10 mb-16">
            <div className='bg-primary transition-all group-hover:-rotate-[25deg] company-branding' />
            <div className='bg-primary transition-all group-hover:-translate-y-[1px] company-logo' />
          </a>

          {
            menuItems.map((item, index) => (
              <div className="ml-8 mt-4" key={index}>
                <a
                  href={item.url}
                  className="font-bold text-4xl items-center flex select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  <item.icon size={32} />
                  {item.title}
                </a>

                <ul className="grid grid-cols-2 ml-3 w-full p-4 gap-3">
                  {item.items.map((component) => (
                    <li key={component.title} >
                      <a
                        href={component.url}
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-lg font-medium leading-none">{component.title}</div>
                        <p className="text-lg line-clamp-2 leading-snug text-muted-foreground">{component.description}</p>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          }
        </div>
      </DrawerContent>
    </BaseDrawer >
  )
}
