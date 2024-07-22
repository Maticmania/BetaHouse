import React, { useState, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { IoImages } from "react-icons/io5";
import { propertyTypes } from "../../db/data";


const CreateProduct = () => {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    bedrooms: "",
    bathrooms: "",
    toilets: "",
    address: { street: "", city: "", state: "" },
    images: [],
    category: "",
    price: "",
    propertyType: "", // Added propertyType to the state
  });
  const [loading, setLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, address: { ...product.address, [name]: value } });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles((prevFiles) => [...prevFiles, ...files]);

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prevPreviews) => [...prevPreviews, ...previews]);
  };

  const handleDelete = (index) => {
    const newImageFiles = [...imageFiles];
    newImageFiles.splice(index, 1);
    setImageFiles(newImageFiles);

    const newPreviews = [...previews];
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", product.title);
      formData.append("description", product.description);
      formData.append("bedrooms", product.bedrooms);
      formData.append("bathrooms", product.bathrooms);
      formData.append("toilets", product.toilets);
      formData.append("street", product.address.street);
      formData.append("city", product.address.city);
      formData.append("state", product.address.state);
      formData.append("category", product.category);
      formData.append("price", product.price);
      formData.append("propertyType", product.propertyType); // Added propertyType to formData

      imageFiles.forEach((file) => {
        formData.append("images", file);
      });

      const response = await axios.post("/product/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(response?.data?.message);
      console.log(response.data);
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMoreImages = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="max-w-2xl mx-auto p-6 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Create New Product</h1>
      <p><span className=" font-medium">Comment: </span>This is not admin dashborad i just use this to create product</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="pt-2">
          {/* Display uploaded images */}
          <div className="mb-3" style={{ position: "relative" }}>
            {previews.map((preview, index) => (
              <div
                key={index}
                style={{ display: "inline-block", position: "relative" }}
              >
                <span
                  className="bg-danger text-light p-1 rounded-5 text-center"
                  style={{
                    position: "absolute",
                    left: "13%",
                    width: "20px",
                    height: "20px",
                    fontSize: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleDelete(index)}
                >
                  X
                </span>
                <img
                  src={preview}
                  alt={`Image ${index + 1}`}
                  className="img-thumbnail mr-2 mx-2"
                  style={{ width: "100px", height: "100px" }}
                />
              </div>
            ))}
            {previews.length > 0 && (
              <span
                className="text-center text-dark p-2"
                style={{ display: "inline-block", cursor: "pointer" }}
                onClick={handleAddMoreImages}
              >
                Add
                <FaPlus className="ms-1" />
              </span>
            )}
          </div>

          <label className="btn btn-outline-dark mb-3">
            <IoImages /> Upload images
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              multiple
              hidden
              ref={fileInputRef}
            />
          </label>
        </div>
        {/* Rest of the form fields */}
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
          <label htmlFor="title" className="text-lg font-semibold mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={product.title}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 rounded-lg w-full"
          />
          </div>
          <div className="flex flex-col">
            <label htmlFor="propertyType" className="text-lg font-semibold mb-2">
              Property Type
            </label>
            <select
              id="propertyType"
              name="propertyType"
              value={product.propertyType}
              onChange={handleChange}
              required
              className="border border-gray-300 p-2 rounded-lg w-full"
            >
              <option value="" className=" cursor-pointer">Select a property type</option>
              {propertyTypes.map((type, index) => (
                <option key={index} value={type} className=" cursor-pointer">
                  {type}
                </option>
              ))}
            </select>
          </div>


        </div>
        <div className="flex flex-col">
          <label htmlFor="description" className="text-lg font-semibold mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 rounded-lg h-32"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col">
            <label htmlFor="bedrooms" className="text-lg font-semibold mb-2">
              Bedrooms
            </label>
            <input
              type="number"
              id="bedrooms"
              name="bedrooms"
              value={product.bedrooms}
              onChange={handleChange}
              required
              className="border border-gray-300 p-2 rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="bathrooms" className="text-lg font-semibold mb-2">
              Bathrooms
            </label>
            <input
              type="number"
              id="bathrooms"
              name="bathrooms"
              value={product.bathrooms}
              onChange={handleChange}
              required
              className="border border-gray-300 p-2 rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="toilets" className="text-lg font-semibold mb-2">
              Toilets
            </label>
            <input
              type="number"
              id="toilets"
              name="toilets"
              value={product.toilets}
              onChange={handleChange}
              required
              className="border border-gray-300 p-2 rounded-lg"
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col">
            <label htmlFor="street" className="text-lg font-semibold mb-2">
              Address Street
            </label>
            <input
              type="text"
              id="street"
              name="street"
              value={product.address.street}
              onChange={handleAddressChange}
              required
              className="border border-gray-300 p-2 rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="city" className="text-lg font-semibold mb-2">
              Address City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={product.address.city}
              onChange={handleAddressChange}
              required
              className="border border-gray-300 p-2 rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="state" className="text-lg font-semibold mb-2">
              Address State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={product.address.state}
              onChange={handleAddressChange}
              required
              className="border border-gray-300 p-2 rounded-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="category" className="text-lg font-semibold mb-2">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={product.category}
              onChange={handleChange}
              required
              className="border border-gray-300 p-2 rounded-lg"
            >
              {/* Add category options here */}
              <option value="">Select a category</option>
              <option value="Sale">For Sale</option>
              <option value="Rent">For Rent</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="price" className="text-lg font-semibold mb-2">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
              className="border border-gray-300 p-2 rounded-lg"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`p-4 text-white rounded-xl ${loading ? "bg-green-700 " : "bg-gray-800"} w-full`}
        >
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
