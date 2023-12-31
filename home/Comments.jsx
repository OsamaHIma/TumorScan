"use client";
import { addComment, deleteComment, getComments } from "@/lib/firebase";
import { useEffect, useState, useRef } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  UserIcon,
  ClockIcon,
  TrashIcon,
  Send,
  Loader2Icon,
  ImageIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { useUser } from "@/context/UserContext";
import { Translate, useLanguage } from "translate-easy";
import { toast } from "react-toastify";
import { slideIn, staggerContainer } from "@/utils/motion";
import { TitleText, TypingText } from "@/components/TypingText";
import {
  Badge,
  IconButton,
  Textarea,
} from "@material-tailwind/react";

const Comments = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const { user } = useUser();
  const { selectedLanguage } = useLanguage();
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

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
    try {
      await deleteComment(id);
      const res = await getComments();
      setComments(res);
      setIsDeleting(false);
    } catch (error) {
      setIsDeleting(false);
      console.error("Error deleting the comment" + error)
      toast.error("Sorry someting went wrong while deleting the comment")
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return toast.error("Please Sign up or login to add a comment");

    if (comment.trim() === "") {
      toast.error("Comment cannot be empty");
      return; // Don't submit empty comments
    }
    setIsLoading(true);

    try {
      const storage = getStorage();

      let imageURL = null;
      if (selectedImage) {
        const fileRef = ref(storage, selectedImage.name);
        await uploadBytes(fileRef, selectedImage);
        imageURL = await getDownloadURL(fileRef);
      }
      await addComment({
        text: comment,
        author: user.displayName || user.email,
        email: user.email,
        timestamp: new Date(),
        imageURL: imageURL,
      });

      const res = await getComments();
      setComments(res);
      setIsLoading(false);
      setComment("");
      setSelectedImage(null);
    } catch (error) {
      setIsLoading(false)
      console.error("Error adding the comment" + error)
      toast.error("Sorry someting went wrong while adding the comment")
    }
  };
  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      //   viewport={{ once: true }}
      className="innerWidth paddings"
    >
      <TypingText title="| Your Opinion Matters" textStyles="text-center" />
      <TitleText title="Tell Us What You Think" textStyles="text-center" />

      <form onSubmit={handleSubmit} className="flex items-center my-4">
        <div className="flex w-full flex-row items-center gap-2 rounded-[99px] border border-gray-900/10 dark:border-gray-100/10 bg-gray-900/5 dark:bg-stone-800 p-2">
          <div className="flex">
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={(e) => setSelectedImage(e.target.files[0])}
            />

            <IconButton
              variant="text"
              className="rounded-full relative"
              onClick={() => fileInputRef.current.click()}
            >{selectedImage && <div className="absolute inset-0 -top-1 w-3 h-3 bg-green-600 rounded-full"></div>}
              <ImageIcon className="dark:text-stone-300" />
            </IconButton>

          </div>

          <Textarea
            rows={1}
            resize={true}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Your Message"
            className="min-h-full dark:placeholder:text-gray-400 dark:text-gray-300 !border-0 focus:border-transparent bg"
            containerProps={{
              className: "grid h-full",
            }}
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <div>

            <IconButton variant="text" className="rounded-full" type="submit">
              {isLoading ? (
                <Loader2Icon className="inline-block mx-2 animate-spin text-green-400" />
              ) : (
                <Send
                  size={23}
                  className="inline-block mx-2 dark:text-slate-50"
                />
              )}
            </IconButton>
          </div>
        </div>
      </form>

      <div className="bg-stone-100 shadow-inner dark:bg-stone-900 p-4 rounded-lg max-h-[120rem] overflow-y-scroll hide-scroll-bar">
        <h2 className="text-2xl font-bold mb-4">
          <Translate translations={{ ar: "التعليقات" }}>Comments</Translate>
        </h2>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {comments.map((comment, index) => (
            <motion.div
              key={comment.id}
              variants={slideIn(
                "left",
                "tween",
                0.5 * index,
                1.3,
                selectedLanguage
              )}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="bg-stone-50 dark:bg-stone-800 rounded-lg p-4 mb-4 shadow-md flex items-start"
            >
              <div className="ml-3 flex-grow">
                <div className="flex flex-col mt-2">
                  <div className="flex items-center justify-between">
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

                    <IconButton variant="text" className="rounded-full">
                      {user.email === comment.email && (
                        <>
                          {isDeleting ? (
                            <Loader2Icon
                              size={23}
                              className="animate-spin text-red-400"
                            />
                          ) : (
                            <TrashIcon
                              size={25}
                              className="text-red-400 hover:text-red-600 hover:font-semibold transition-all ease-in-out cursor-pointer"
                              onClick={() => deleteThisComment(comment.id)}
                            />
                          )}
                        </>
                      )}
                    </IconButton>
                  </div>

                </div>
                <p className="!w-fit my-2 bg-gray-600/10 dark:bg-gray-50/30 px-4 py-2 rounded-md">
                  {comment.text}
                </p>
                {comment.imageURL && (
                  <div className="flex justify-center mt-3">
                    <img src={comment.imageURL} alt="Comment Image" className="max-w-[15rem] md:max-w-[20rem] rounded-md h-auto" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Comments;
