import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";

import Button from "../../components/Button/Button";
import Modal from "../../components/FeedbackComponents/Modal/Modal";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import Tag from "../../components/Tag/Tag";

import { useCreatePost } from "../../hooks/usePosts";

import { crochetTags, MAX_TAGS } from "../../utils/consts";
import { createPostSchema } from "../../utils/formFields";

import classes from "./CreatePost.module.css";

export default function CreatePost() {
  const {
    mutate,
    isPending,
    isSuccess,
    isError,
    reset: resetMutation,
  } = useCreatePost();

  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      body: "",
      tags: [],
    },
    resolver: zodResolver(createPostSchema),
  });

  const [inputValue, setInputValue] = useState("");
  const [postImage, setPostImage] = useState(null);

  let modalMessage = isSuccess
    ? "Post created successfully! 🎉"
    : "Error creating post. Try again later";

  const onSubmit = (data) => {
    mutate({
      ...data,
      image: postImage,
    });

    reset();
    setInputValue("");
    setPostImage(null);
  };

  return (
    <main className={classes.background}>
      <Modal
        open={isSuccess || isError}
        message={modalMessage}
        onClose={resetMutation}
        buttons={[{ name: "OK" }]}
      />
      <div className={classes.formWrapper}>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
          {/* TITLE */}
          <div className={classes.formField}>
            <label>Title</label>
            <input
              {...register("title", { required: true })}
              placeholder="Title"
              className={errors.title ? classes.inputError : ""}
            />
            {errors.title && (
              <p className={classes.error}>{errors.title.message}</p>
            )}
          </div>

          {/* BODY */}
          <div className={classes.formField}>
            <label>Description</label>
            <textarea
              {...register("body", { required: true })}
              placeholder="Your Pattern"
              className={errors.body ? classes.inputError : ""}
            />
            {errors.body && (
              <p className={classes.error}>{errors.body.message}</p>
            )}
          </div>

          {/* TAGS */}
          <div className={classes.formField}>
            <label>Tags</label>

            <Controller
              name="tags"
              control={control}
              rules={{
                validate: (value) =>
                  value.length <= MAX_TAGS || `Max ${MAX_TAGS} tags`,
              }}
              render={({ field }) => (
                <>
                  {/* INPUT + BUTTON */}
                  <div className={classes.tagInputRow}>
                    <input
                      list="tags-list"
                      value={inputValue}
                      disabled={field.value.length >= MAX_TAGS}
                      placeholder="Add a tag"
                      onChange={(e) => setInputValue(e.target.value)}
                    />

                    <Button
                      type="button"
                      disabled={field.value.length >= MAX_TAGS}
                      onClick={() => {
                        const newTag = inputValue.trim().toUpperCase();

                        if (
                          newTag &&
                          !field.value.includes(newTag) &&
                          field.value.length < MAX_TAGS
                        ) {
                          field.onChange([...field.value, newTag]);
                          setInputValue("");
                        }
                      }}
                    >
                      Add
                    </Button>
                  </div>

                  {/* COUNTER */}
                  <small className={classes.tagCounter}>
                    {field.value.length}/{MAX_TAGS} tags
                  </small>

                  {/* DATALIST */}
                  <datalist id="tags-list">
                    {crochetTags.map((tag) => (
                      <option key={tag} value={tag} />
                    ))}
                  </datalist>

                  {/* TAGS */}
                  <div className={classes.tagsWrapper}>
                    {field.value.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        className={classes.tagButton}
                        onClick={() =>
                          field.onChange(field.value.filter((t) => t !== tag))
                        }
                      >
                        <Tag name={tag} isClickable={false} excludeButton />
                      </button>
                    ))}
                  </div>
                </>
              )}
            />
          </div>

          {/* IMAGE */}
          <div className={classes.formField}>
            <label>Post Image</label>

            <ImageUpload onImagePick={(file) => setPostImage(file)} />
          </div>

          {/* SUBMIT */}
          <Button type="submit" disabled={isPending}>
            {isPending ? <ClipLoader size={20} color="#fff" /> : "Create Post"}
          </Button>
        </form>
      </div>
    </main>
  );
}
