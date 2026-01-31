import { Radio as BaseRadio } from "@base-ui/react/radio";
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group";
import * as React from "react";

import { cn } from "@/lib/utils";

const RadioGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseRadioGroup>) => {
  return <BaseRadioGroup className={cn("grid", className)} {...props} />;
};

const Radio = {
  Root: React.forwardRef<
    React.ElementRef<typeof BaseRadio.Root>,
    React.ComponentPropsWithoutRef<typeof BaseRadio.Root>
  >(({ className, ...props }, ref) => (
    <BaseRadio.Root className={className} ref={ref} {...props} />
  )),
  Indicator: React.forwardRef<
    React.ElementRef<typeof BaseRadio.Indicator>,
    React.ComponentPropsWithoutRef<typeof BaseRadio.Indicator>
  >(({ className, ...props }, ref) => (
    <BaseRadio.Indicator
      className={cn("flex items-center justify-center", className)}
      ref={ref}
      {...props}
    />
  )),
};

Radio.Root.displayName = "Radio.Root";
Radio.Indicator.displayName = "Radio.Indicator";

export { RadioGroup, Radio };
