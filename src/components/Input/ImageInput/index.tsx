import { RefObject } from 'react';

export default function ImageInput({ id, uploadImage, imgInputRef }: { id: string; uploadImage: () => void; imgInputRef: RefObject<HTMLInputElement> }) {
  return (
    <input
      id={id}
      type='file'
      accept='image/*'
      onChange={() => uploadImage()}
      ref={imgInputRef}
      className={`rounded-[1.2rem] overflow-hidden border border-dashed border-gray-500 dark:border-gray-[#b4b4b4] w-[18rem] max-lg:w-[20.6rem] max-lg:file:w-[20.6rem] max-lg:file:h-[20.6rem] max-md:w-[16.7rem] max-md:file:w-[16.7rem] max-md:file:h-[16.7rem] file:border-none text-transparent file:h-[18rem] file:w-[18rem] file:cursor-pointer dark:file:bg-[url("/images/ImageInput_dark.png")] file:bg-[url("/images/ImageInput.png")] file:bg-cover file:bg-no-repeat file:text-transparent`}
    />
  );
}
