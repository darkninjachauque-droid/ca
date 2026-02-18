"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";

export function UserNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 w-full justify-start gap-2 px-2"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://picsum.photos/seed/user-avatar/40/40" alt="User" data-ai-hint="person face" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="truncate text-left group-data-[collapsible=icon]:hidden">
            <p className="truncate text-sm font-medium">Usuário</p>
            <p className="truncate text-xs text-muted-foreground">
              usuario@exemplo.com
            </p>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Usuário</p>
            <p className="text-xs leading-none text-muted-foreground">
              usuario@exemplo.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Perfil</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/login">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sair</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
