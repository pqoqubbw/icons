# Contributing

**IMPORTANT:** This project only accepts contributions based on [lucide icons](https://lucide.dev/). Pull requests containing custom icons or icons from other icon packs will be closed.

**Animation Quality:** Pull requests with simple path length animations (`strokeDasharray`/`strokeDashoffset` "drawing" effect) will likely be rejected. This type of animation looks generic and doesn't add meaningful interaction. We're looking for creative, purposeful animations that enhance the icon's meaning.

We welcome contributions to our project! Please follow these steps to contribute:

1. Fork the repository on GitHub.

2. Clone your forked repository to your local machine:

   ```
   git clone https://github.com/pqoqubbw/icons.git
   ```

3. Navigate to the project directory:

   ```
   cd icons
   ```

4. Create a new branch for your feature or bug fix:

   ```
   git checkout -b your-branch-name
   ```

5. Install the project dependencies:

   ```
   pnpm install
   ```

6. **Create your animated icon:**

   a. Navigate to the `/icons/` directory and create a new file with the icon name in lowercase, using hyphens for spaces (following Lucide naming convention):

   ```
   /icons/[icon-name].tsx
   ```

   For example: `heart-icon.tsx`, `arrow-up.tsx`, `user-profile.tsx`

   b. Copy and paste the following template code into your new file:

   ```tsx
   'use client';

   import { useAnimation } from 'motion/react';
   import type { HTMLAttributes } from 'react';
   import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
   import { cn } from '@/lib/utils';

   export interface [YourIconName]IconHandle {
     startAnimation: () => void;
     stopAnimation: () => void;
   }

   interface [YourIconName]IconProps extends HTMLAttributes<HTMLDivElement> {
     size?: number;
   }

   const [YourIconName]Icon = forwardRef<[YourIconName]IconHandle, [YourIconName]IconProps>(
     ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
       const controls = useAnimation();
       const isControlledRef = useRef(false);

       useImperativeHandle(ref, () => {
         isControlledRef.current = true;
         return {
           startAnimation: () => controls.start('animate'),
           stopAnimation: () => controls.start('normal'),
         };
       });

       const handleMouseEnter = useCallback(
         (e: React.MouseEvent<HTMLDivElement>) => {
           if (!isControlledRef.current) {
             controls.start('animate');
           } else {
             onMouseEnter?.(e);
           }
         },
         [controls, onMouseEnter]
       );

       const handleMouseLeave = useCallback(
         (e: React.MouseEvent<HTMLDivElement>) => {
           if (!isControlledRef.current) {
             controls.start('normal');
           } else {
             onMouseLeave?.(e);
           }
         },
         [controls, onMouseLeave]
       );

       return (
         <div
           className={cn(className)}
           onMouseEnter={handleMouseEnter}
           onMouseLeave={handleMouseLeave}
           {...props}
         >
           <svg
             xmlns="http://www.w3.org/2000/svg"
             width={size}
             height={size}
             viewBox="0 0 24 24"
             fill="none"
             stroke="currentColor"
             strokeWidth="2"
             strokeLinecap="round"
             strokeLinejoin="round"
           >
             {/* your svg code here */}
           </svg>
         </div>
       );
     }
   );

   [YourIconName]Icon.displayName = '[YourIconName]Icon';

   export { [YourIconName]Icon };
   ```

   c. Replace `[YourIconName]` with your icon name in **PascalCase** (e.g., `HeartIcon`, `ArrowUp`, `UserProfile`).

   d. Find your icon on [lucide.dev](https://lucide.dev/), copy the SVG path elements, and replace the `{/* your svg code here */}` comment with the actual SVG content.

   e. Add your animation logic using Framer Motion's `motion` components and the `controls` object to create engaging hover animations.

7. **Register your icon:**

   ```
   pnpm gen-cli
   ```

   This is the only command you need. It does everything:

   - registers the icon in `icons/index.ts` (import + `ICON_LIST` entry)
   - syncs `scripts/registry-components.ts`
   - builds `public/r/*.json` and `registry.json` for the shadcn CLI
   - removes entries and JSON files for icons that no longer exist
   - drops duplicate imports and `ICON_LIST` entries
   - formats and lints everything
   - verifies the result and fails if anything is still out of sync

   Re-run it after any change to `/icons/` — it is idempotent and self-healing, so you never have to edit `icons/index.ts` or the registry by hand.

   `pnpm gen-cli:check` runs the same verification without writing anything. This is what CI runs.

8. **Improve the generated keywords:**

   `gen-cli` derives keywords from the file name, which is usually not enough for search. Open `icons/index.ts`, find your icon in `ICON_LIST`, and replace them with the keywords from [lucide.dev](https://lucide.dev/):

   ```tsx
   {
     name: 'smile-plus',
     icon: SmilePlusIcon,
     keywords: ['smile', 'plus', 'emotion', 'face'],
   },
   ```

9. Build the project to check for errors:

```
pnpm build
```

10. Commit your changes:

    ```
    git commit -m "Add [icon-name] animated icon"
    ```

11. Push your changes to your fork:

    ```
    git push origin your-branch-name
    ```

12. Open a pull request on the original repository with a clear description of the icon you've added and the animation you've implemented.

Thank you for contributing to our project!
