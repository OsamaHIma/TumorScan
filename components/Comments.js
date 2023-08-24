"use client";
import { addComment, deleteComment, getComments } from "@/lib/firebase";
import { useEffect, useState } from "react";
import {
  UserIcon,
  ClockIcon,
  TrashIcon,
  Send,
  Loader2Icon,
} from "lucide-react";
import { motion } from "framer-motion";
import { useUser } from "@/context/UserContext";
import { Translate } from "translate-easy";

const Comments = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const { user } = useUser();

  const getAllComments = async () => {
    const res = await getComments();
    setComments(res);
  };

  useEffect(() => {
    getAllComments();
  }, []);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleString();
  };

  const deleteThisComment = async (id) => {
    setIsDeleting(true);
    await deleteComment(id);
    const res = await getComments();
    setComments(res);
    setIsDeleting(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return toast.error("Please Sing up or login to add a comment");

    if (comment.trim() === "") {
      toast.error("Comment cannot be empty");
      return; // Don't submit empty comments
    }
    setIsLoading(true);
    await addComment({
      text: comment,
      author: user.displayName || user.email,
      email: user.email,
      timestamp: new Date(),
    });
    const res = await getComments();
    setComments(res);
    setIsLoading(false);
    setComment("");
  };

  return (
    <section className="paddings innerWidth">
      <h1
        className={`xs:text-[40px] mb-10 text-center text-[30px] font-black text-stone-500 dark:text-white sm:text-[50px] md:text-[60px]`}
      >
        <Translate>Tell us what you think</Translate>
      </h1>

      <form onSubmit={handleSubmit} className="flex items-center my-4">
        <textarea
          placeholder="Write a comment, feedback , suggestions:"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="px-4 w-full rounded-md bg-indigo-300/70 mx-3 dark:bg-slate-800 placeholder:text-slate-50 focus:outline-gray-200 py-2"
        />
        <button
          type="submit"
          className="text-white bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-md w-24"
        >
          {isLoading ? (
            <Loader2Icon className="inline-block mx-2 animate-spin text-slate-50" />
          ) : (
            <Send size={23} className="inline-block mx-2" />
          )}
        </button>
      </form>

      <div className="bg-stone-100 dark:bg-zinc-900 p-4 rounded-lg h-80 overflow-y-scroll hide-scroll-bar">
        <h2 className="text-2xl font-bold mb-4"><Translate translations={{ar:"التعليقات"}}>Comments</Translate></h2>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-white dark:bg-neutral-900 rounded-lg p-4 mb-4 shadow-md flex items-start"
            >
              <div className="ml-3 flex-grow">
                <div className="flex flex-col mt-2">
                  <div className="flex items-center gap-3">
                    <UserIcon size={24} className="text-orange-500" />
                    <div className="flex flex-col gap-1">
                      <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">
                        {comment.author}
                      </p>
                      <div className="flex items-center gap-2">
                        <ClockIcon
                          size={16}
                          className="text-gray-600 dark:text-gray-300"
                        />
                        <p className="text-gray-600 dark:text-gray-300/50 text-sm \">
                          {formatDate(comment.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-white !w-fit my-2 bg-gray-400 px-4 py-2 rounded-md">
                  {comment.text}
                </p>
              </div>
              <div className="flex-shrink-0 ml-3">
                {user.email === comment.email && (
                  <>
                    {isDeleting ? (
                      <Loader2Icon className="animate-spin text-red-400" />
                    ) : (
                      <TrashIcon
                        size={24}
                        className="text-red-500 hover:text-red-600 hover:font-semibold transition-all ease-in-out cursor-pointer"
                        onClick={() => deleteThisComment(comment.id)}
                      />
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Comments;
