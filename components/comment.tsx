import {
  CommentButtonClient,
  CommentInvisibleDetailsLinkClient,
} from "./comment.client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const CommentBlock = () => (
  <div className="relative my-[40px] flex w-full max-w-[610px] flex-col items-center justify-center pl-4 after:absolute after:left-0 after:h-full after:w-[4px] after:bg-neutral-400/50 max-[655px]:px-4 max-[655px]:after:left-4">
    <blockquote className="font-sans text-neutral-700 text-sm/[150%] tracking-[0.01em] before:content-[open-quote] after:content-[close-quote] max-[655px]:pl-4 dark:text-neutral-200">
      i made another thing. <CommentInvisibleDetailsLinkClient /> is an image
      cropper for react that feels like the crop tool in ios photos: a dial to
      straighten, pinch to zoom, handles you can drag with two fingers at once.
      headless, zero dependencies, mit licensed.
    </blockquote>
    <div className="mt-4 flex w-full flex-wrap items-center justify-between gap-4 border-neutral-200 border-t pt-4 max-[655px]:pl-4 dark:border-neutral-800">
      <div className="flex items-center gap-2">
        <Avatar size="sm">
          <AvatarImage
            alt="Dmytro Tovstokor, the author of the lucide-animated"
            className="select-none"
            src="https://pqoqubbw.b-cdn.net/me.jpg"
          />
          <AvatarFallback className="bg-neutral-200 font-sans dark:bg-neutral-800">
            DT
          </AvatarFallback>
        </Avatar>
        <p className="text-[13px] text-neutral-600 tracking-[0.01em] dark:text-neutral-400">
          dmytro, creator of lucide-animated
        </p>
      </div>
      <CommentButtonClient />
    </div>
  </div>
);

export { CommentBlock };
