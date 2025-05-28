# Contributing

**IMPORTANT:** This project only accepts contributions based on [lucide icons](https://lucide.dev/). Pull requests containing custom icons or icons from other icon packs will be closed.

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
   yarn install
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

7. **Add your icon to the icon list:**

   a. Open the `icons/index.tsx` file.

   b. Import your new icon component at the top of the file:
   
   ```tsx
   import { [YourIconName]Icon } from './[icon-name]';
   ```

   c. Add your icon to the `ICON_LIST` array at the very beginning (top) of the list in this format:

   ```tsx
   {
     name: '[icon-name]',
     icon: [YourIconName]Icon,
     keywords: ['keyword1', 'keyword2', 'keyword3'],
   },
   ```

   For example:
   ```tsx
   {
     name: 'smile-plus',
     icon: SmilePlusIcon,
     keywords: ['smile', 'plus', 'emotion', 'face'],
   },
   ```

   Note: Use the exact icon name, keywords, and other data from the [lucide.dev](https://lucide.dev/) website for your specific icon.

8. Build the project to check for errors:

   ```
   yarn build
   ```

9. Test the application to ensure your changes work as expected:

   ```
   yarn lint
   yarn gen-cli
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
