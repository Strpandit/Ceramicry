import React from 'react'

const categories = ["Adhesive Tapes", "Glues & Removers", "Hair Wigs", "Hair Extensions", "Hair Patches", "Accessories & Styling"]

const ProductFilter = ({ selectedCategory, setSelectedCategory, priceRange, setPriceRange }) => {
   return (
    <div className='sticky top-24 bg-white p-4 border rounded-lg shadow-md space-y-6'>
      <div>
        <h2 className='font-bold mbb-2'>Shop By Category</h2>
        <div className='space-y-2 text-sm text-gray-700'>
          {categories.map((item, idx) => (
            <label key={idx} className='block'>
              <input type="radio" name="category" id="cat" value={item} checked={selectedCategory === item} onChange={() => setSelectedCategory(item)}className='mr-2' />{item}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h2 className="font-bold mb-2">Max Price: ₹{priceRange}</h2>
        <input
          type="range"
          min="50"
          max="10000"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div>
        <h2 className="font-bold mb-2">Sort By</h2>
        <select className="w-full border rounded px-2 py-1 text-sm">
          <option>Popularity</option>
          <option>Low to High</option>
          <option>High to Low</option>
          <option>A - Z</option>
          <option>Z - A</option>
        </select>
      </div>
    </div>
  );
};

export default ProductFilter;