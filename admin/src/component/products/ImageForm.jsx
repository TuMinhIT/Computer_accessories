import { assets } from "../../assets/assets";
import ImageUpload from "./ImageUpload";
const ImageForm = ({ imagePreviews, maxImage, onChange, onRemove }) => {
  return (
    <div className="mx-auto mt-6 sm:px-6 flex gap-10 md:flex-row flex-col">
      {/* if there is at least one item */}
      {imagePreviews[0] && (
        <>
          <div
            key={0}
            className="relative flex w-100 h-auto justify-center items-center max-h-70 bg-gray-200  overflow-hidden"
          >
            <button
              type="button"
              className="absolute top-1 right-1 bg-white/80 hover:bg-red-500 hover:text-white rounded-full p-1 shadow transition z-10"
              onClick={() => onRemove && onRemove(0)}
              title="Xóa ảnh này"
            >
              <img src={assets.close} alt="X" className="w-4 h-4" />
            </button>

            <img
              src={imagePreviews[0]}
              alt="Model wearing plain white basic tee."
              className="w-full overflow-hidden"
            />
          </div>
        </>
      )}
      <div className="flex flex-row flex-wrap gap-4 max-w-full py-2">
        {/* show all items */}
        {imagePreviews.length > 0 &&
          imagePreviews.slice(1).map((preview, index) => (
            <div
              key={index + 1}
              className="relative  w-24 h-20 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden shadow"
            >
              <button
                type="button"
                className="absolute top-1 right-1 bg-white/80 hover:bg-red-500 hover:text-white rounded-full p-1 shadow transition z-10"
                onClick={() => onRemove && onRemove(index + 1)}
                title="Xóa ảnh này"
              >
                <img src={assets.close} alt="X" className="w-4 h-4" />
              </button>
              <img
                src={preview}
                alt={`Preview ${index + 2}`}
                className="object-contain w-full h-full"
              />
            </div>
          ))}
        {imagePreviews.length > 0 && imagePreviews.length < maxImage ? (
          <div className="w-24 h-20 flex items-center justify-center">
            <ImageUpload miniSize={true} onChange={onChange} />
          </div>
        ) : null}
      </div>
      {/* if no items */}
      {imagePreviews.length === 0 ? (
        <div className="flex max-w-100 h-50">
          <ImageUpload onChange={onChange} />
        </div>
      ) : null}
    </div>
  );
};

export default ImageForm;
