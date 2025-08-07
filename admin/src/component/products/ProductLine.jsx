import ActionButton from "./ActionButton";
const ProductLine = ({ product }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm w-full group hover:shadow-lg hover:border-amber-400 transition-all duration-200 mb-3">
      <div className="grid grid-cols-12 gap-4 items-center px-4 py-3">
        {/* Image */}
        <div className="col-span-1 flex justify-center">
          <div className="w-14 h-14 rounded-xl overflow-hidden border bg-gray-50 flex items-center justify-center">
            <img
              src={product.imageUrl[0]}
              alt=""
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        {/* Name & Code */}
        <div className="col-span-2 min-w-0">
          <div className="font-semibold text-gray-900 truncate">
            {product.name}
          </div>
          <div className="text-xs text-gray-500">
            Code: <span className="font-mono">{product.barcode}</span>
          </div>
        </div>
        {/* Category & Brand */}
        <div className="col-span-2 min-w-0">
          <div className="text-sm text-gray-700 font-medium truncate">
            {product.category}
          </div>
          <div className="text-xs text-gray-500">Brand: {product.brand}</div>
        </div>
        {/* Price & Cost */}
        <div className="col-span-2">
          <div className="text-sm text-blue-700 font-bold">
            Price: <span className="font-mono">{product.price}</span>
          </div>
          <div className="text-xs text-gray-500">
            Cost: <span className="font-mono">{product.cost}</span>
          </div>
        </div>
        {/* Stock & Warranty */}
        <div className="col-span-1">
          <div className="text-sm font-medium text-gray-900">
            Stock: <span className="font-mono">{product.stock}</span>
          </div>
          <div className="text-xs text-gray-500">
            Warranty: {product.warrantyMonths}m
          </div>
        </div>
        {/* Bestseller & CreatedAt */}
        <div className="col-span-2 flex flex-col gap-1">
          <label className="flex items-center gap-2 text-xs font-medium text-gray-700">
            <input
              type="checkbox"
              checked={product.bestseller}
              readOnly
              className="accent-amber-500 w-4 h-4 rounded"
            />
            Bestseller
          </label>
          <div className="text-xs text-gray-500">
            Created: {product.createdAt}
          </div>
        </div>
        {/* Actions */}
        <div className="col-span-2 flex justify-end">
          <ActionButton />
        </div>
      </div>
      <div className="hidden group-hover:block text-left overflow-x-auto bg-amber-50 p-3 rounded-b-xl border-t border-amber-100 transition-all duration-200">
        <div className="text-sm text-gray-700 leading-relaxed">
          {product.description}
        </div>
      </div>
    </div>
  );
};

export default ProductLine;
