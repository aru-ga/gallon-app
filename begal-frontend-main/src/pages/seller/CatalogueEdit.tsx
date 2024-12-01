import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { fetchProducts, addProduct } from "@/api/depot";
import CardProductCatalogue from "@/components/CardProductCatalogue";
import instance from "@/lib/axios";
import { payloadProductType } from "@/types/productType";

export default function CatalogueEdit() {
  const [products, setProducts] = useState<payloadProductType[]>([]);
  const [saving, setSaving] = useState(false);
  const [savingImage, setSavingImage] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<payloadProductType | null>(null);
  const [initialProduct, setInitialProduct] =
    useState<payloadProductType | null>(null);
  const [newProduct, setNewProduct] = useState<{
    name: string;
    description: string;
    price: string;
    stock: string;
    image: File | null;
  }>({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: null,
  });
  const token: string | null = localStorage.getItem("authToken");

  const fetchCatalogue = async () => {
    const data = await fetchProducts(token);
    setProducts(data.data);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, files } = e.target;
    if (type === "file" && files) {
      setNewProduct((prev) => ({ ...prev, image: files[0] }));
    } else {
      setNewProduct((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedProduct) {
      const { id, value } = e.target;
      setSelectedProduct((prev) => (prev ? { ...prev, [id]: value } : null));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedProduct && e.target.files) {
      setSelectedProduct((prev) =>
        prev ? { ...prev, image: e.target.files[0] as unknown as string } : null
      );
    }
  };

  const saveEditedProduct = async () => {
    setSaving(true);
    if (!selectedProduct || !initialProduct) return;

    const updatePayload = createUpdatePayload(initialProduct, selectedProduct);

    // Exit early if no changes detected
    if (Object.keys(updatePayload).length === 0) {
      setSelectedProduct(null);
      return;
    }

    try {
      await instance.patch(
        `sellers/products/${selectedProduct.id}`,
        updatePayload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchCatalogue();
      setSelectedProduct(null);
      setInitialProduct(null);
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setSaving(false);
    }
  };

  const updateImage = async () => {
    setSavingImage(true);
    if (!selectedProduct || !selectedProduct.image) return;

    const formData = new FormData();
    formData.append("image", selectedProduct.image as unknown as File);

    try {
      await instance.patch(`sellers/products/${selectedProduct.id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCatalogue();
      setSelectedProduct(null);
      setInitialProduct(null);
    } catch (error) {
      console.error("Error updating image:", error);
    } finally {
      setSavingImage(false);
    }
  };

  const createUpdatePayload = (
    currentData: payloadProductType,
    updatedData: payloadProductType
  ) => {
    const payload: Partial<payloadProductType> = {};

    Object.keys(updatedData).forEach((key) => {
      const updatedValue = updatedData[key as keyof payloadProductType];
      const currentValue = currentData[key as keyof payloadProductType];

      // Exclude image if it's not updated
      if (key === "image" && (!updatedValue || updatedValue === currentValue)) {
        return;
      }

      if (updatedValue !== currentValue) {
        payload[key as keyof payloadProductType] = updatedValue;
      }
    });

    return payload;
  };

  const handleEditProduct = (product: payloadProductType) => {
    setSelectedProduct(product);
    setInitialProduct(product);
  };

  const handleAddProduct = async () => {
    try {
      const response = await addProduct(token, newProduct);
      console.log("Product added:", response);
      fetchCatalogue();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  useEffect(() => {
    fetchCatalogue();
  }, []);

  return (
    <div>
      <div className="m-10">
        <Link to="/seller/dashboard">Back</Link>
      </div>
      <div className="flex justify-center flex-col w-2/3 h-screen mx-auto space-y-10">
        <div className="flex flex-row justify-between">
          <h1 className="text-3xl font-bold dark:text-white">
            Customize your product catalogue here
          </h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add Product</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Product</DialogTitle>
                <DialogDescription>
                  Fill in the product details below.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  id="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                />
                <Input
                  id="description"
                  value={newProduct.description}
                  onChange={handleInputChange}
                />
                <Input
                  id="price"
                  value={newProduct.price}
                  onChange={handleInputChange}
                />
                <Input
                  id="stock"
                  value={newProduct.stock}
                  onChange={handleInputChange}
                />
                <Input id="image" type="file" onChange={handleInputChange} />
              </div>
              <DialogFooter>
                <Button onClick={handleAddProduct}>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex gap-5 flex-wrap">
          {products.map((product) => (
            <CardProductCatalogue
              key={product.id}
              {...product}
              onClickEdit={() => handleEditProduct(product)}
            />
          ))}
        </div>
      </div>
      {selectedProduct && (
        <Dialog
          open={!!selectedProduct}
          onOpenChange={() => setSelectedProduct(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
              <DialogDescription>
                Update the details for {selectedProduct.name}.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                id="name"
                placeholder="Product Name"
                value={selectedProduct.name}
                onChange={handleEditInputChange}
              />
              <Input
                id="description"
                placeholder="Product Description"
                value={selectedProduct.description}
                onChange={handleEditInputChange}
              />
              <Input
                id="price"
                placeholder="Product Price"
                value={selectedProduct.price}
                onChange={handleEditInputChange}
              />
              <Input
                id="stock"
                placeholder="Product Stock"
                value={selectedProduct.stock}
                onChange={handleEditInputChange}
              />
              <Input id="image" type="file" onChange={handleImageChange} />
            </div>
            <DialogFooter className="flex">
              <Button onClick={updateImage} disabled={savingImage}>
                {savingImage ? "Saving..." : "Save Image"}
              </Button>
              <Button disabled={saving} onClick={saveEditedProduct}>
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
