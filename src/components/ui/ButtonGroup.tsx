"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import Icon from "@/components/Icon";

import { cn } from "@/lib/utils";

const ButtonGroup = React.forwardRef<
  (React.ElementRef<typeof RadioGroupPrimitive.Root>),
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> & { errorMsg?: string}
>(({ className, errorMsg, ...props }, ref,) => {
  return (
    <>
    <RadioGroupPrimitive.Root
      className={cn("flex gap-5", className)}
      {...props}
      ref={ref}
    />
    <div className="min-h-8 mt-1">
        {!!errorMsg && (
          <span className="text-red-500 text-sm block ">{errorMsg}</span>
        )}
    </div>
    </>
  );
});
ButtonGroup.displayName = RadioGroupPrimitive.Root.displayName;

const ButtonGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  {
    icon: React.ReactNode;
    label?: string;
  } & React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, icon, label, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "border data-[state=checked]:bg-zinc-800 text-center h-[125px] w-[125px] rounded-md focus:outline-none 2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.RadioGroupIndicator className="relative">
        <div className="relative">
          <div className="absolute -ml-2 -mt-[30px] ">
            <Icon id="checkCircle" size={24} className="fill-zinc-200" />
          </div>
        </div>
      </RadioGroupPrimitive.RadioGroupIndicator>

      <div className="flex flex-col justify-center">
        <div className="self-center">{icon}</div>
        {!!label && <div className="text-sm pt-2">{label}</div>}
      </div>
    </RadioGroupPrimitive.Item>
  );
});
ButtonGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { ButtonGroup, ButtonGroupItem };