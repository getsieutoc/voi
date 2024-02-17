'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui';
import {
  LogOut,
  ChevronDown,
  Settings,
  User,
  CircleUserRound,
} from '@/components/icons';
import { signOut } from 'next-auth/react';
import { Session } from 'next-auth';
import NextLink from 'next/link';

export type ProfileIconProps = {
  user: Session['user'];
};

export const ProfileMenu = ({ user }: ProfileIconProps) => {
  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex max-w-fit items-center hover:cursor-pointer">
          <Avatar size="sm">
            <AvatarImage
              alt={user.name ?? user.email ?? 'user profile'}
              src={user.image ?? ''}
            />
            <AvatarFallback>
              <CircleUserRound />
            </AvatarFallback>
          </Avatar>
          <ChevronDown className="h-4 w-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="end" className="w-56">
        <DropdownMenuLabel>{user.name ?? 'My Account'}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <NextLink href="/profile">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </NextLink>
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
