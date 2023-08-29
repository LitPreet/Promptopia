"use client";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session} = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const [copied, setCopied] = useState("");

  const handleCopy = () => {
    setCopied(post?.prompt)
    navigator.clipboard.writeText(post?.prompt);
    setTimeout(() => setCopied(""),3000);
  }
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5 ">
        <div className="flex-1 flex-col  flex justify-start items-center gap-3 cursor-pointer">
          <div className="flex   w-[100%] my-1">
            <Image
              src={post?.creator?.image}
              alt="user_image"
              width={40}
              height={40}
              className="rounded-full object-contain"
            />
            <div className="flex flex-col mx-3">
              <h3 className="font-santoshi font-semibold text-gray-900">
                {post?.creator?.username}
              </h3>
              <p className="font-inter text-sm text-gray-500">
                {post?.creator?.email}
              </p>
            </div>
            <div className="copy_btn" onClick={handleCopy} >
              <Image
                src={
                  copied === post?.prompt
                    ? "/assets/icons/tick.svg"
                    : "/assets/icons/copy.svg"
                }
                alt="img"
                width={12}
                height={12}
              />
            </div>
          </div>
          <p className="font-inter text-sm my-4 text-gray-700 w-full">
            {post?.prompt}
          </p>
          <p className="font-inter text-sm blue_gradient cursor-pointer w-full" onClick={() => handleTagClick && handleTagClick(post?.tag) }>{post?.tag}</p>
          {session?.user.id === post.creator._id && pathName ==='/profile' && (
            <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
              <p className="font-inter text-sm green_gradient cursor-pointer" onClick={handleEdit}>Edit</p>
              <p className="font-inter text-sm orange_gradient cursor-pointer" onClick={handleDelete}>Delete</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromptCard;
