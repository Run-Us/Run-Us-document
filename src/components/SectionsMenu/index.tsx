/*
 * Modified by hughesgoon on October 20, 2024.
 * Original project: dyte-io/docs.
 * Changes:
 * - Converted the original JSX files to TSX format.
 * - Refined type definitions for better TypeScript support.
 */

import React, { forwardRef } from "react";
import * as Select from "@radix-ui/react-select";
import clsx from "clsx";
import { Check, ChevronDown, ChevronUp, Icon } from "react-feather";

interface SectionsMenuProps {
  defaultValue: string;
  values: { name: string; docId: string; icon?: Icon; disabled?: boolean }[];
  onValueChange: (version: string) => void;
  className?: string;
  children?: React.ReactNode;
}

const SectionsMenu = forwardRef<HTMLDivElement, SectionsMenuProps>(
  ({ defaultValue = "", values = [], children, className, ...props }, ref) => {
    return (
      <Select.Root defaultValue={defaultValue} {...props}>
        <Select.Trigger
          aria-label="Select Section"
          className={clsx("sections-menu-trigger", className)}
        >
          <Select.Value />
          <Select.Icon>
            <ChevronDown className="sections-menu-scrollButton" />
          </Select.Icon>
        </Select.Trigger>

        <Select.Content className={clsx("sections-menu-content", className)}>
          <Select.ScrollUpButton className="sections-menu-scrollButton">
            <ChevronUp />
          </Select.ScrollUpButton>

          <Select.Viewport>
            <Select.Group>
              {values.map(({ docId, name, icon: Icon, disabled = false }) => (
                <Select.Item
                  value={docId}
                  key={docId}
                  className={clsx("sections-menu-item")}
                  disabled={disabled}
                >
                  <Select.ItemText>
                    <div className="item-text text-text-400">
                      {Icon && <Icon />}
                      <span>{name}</span>
                    </div>
                  </Select.ItemText>
                  <Select.ItemIndicator className="flex items-center">
                    <Check className="item-indicator" />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
              {children}
            </Select.Group>
          </Select.Viewport>

          <Select.ScrollDownButton className="sections-menu-scrollButton">
            <ChevronDown />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Root>
    );
  }
);

export default SectionsMenu;
